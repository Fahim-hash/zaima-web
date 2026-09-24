import { createHash, createHmac, createSign, randomBytes, timingSafeEqual } from 'crypto';

type Row = Record<string, string>;

const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';
const STUDIO_BASE = process.env.NEXT_PUBLIC_STUDIO_BASE_URL || 'https://tometu.ami.bd';
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'studio@syedfahimmuddasir.bro.bd';
export const STUDIO_UPLOAD_CHUNK_SIZE = 3 * 1024 * 1024;

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

let tokenCache: { token: string; expiresAt: number } | null = null;

async function googleToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.token;

  const clientId = required('GOOGLE_CLIENT_ID');
  const clientSecret = required('GOOGLE_CLIENT_SECRET');
  const refreshToken = required('GOOGLE_REFRESH_TOKEN');

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google OAuth refresh failed: ${response.status} ${body.slice(0, 800)}`);
  }

  const data = await response.json();
  tokenCache = {
    token: data.access_token as string,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
  };
  return tokenCache.token;
}

async function googleFetch(url: string, init: RequestInit = {}) {
  const token = await googleToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(url, { ...init, headers, cache: 'no-store' });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google API ${response.status}: ${body.slice(0, 800)}`);
  }
  return response;
}

export async function appendSheet(sheet: string, row: string[]) {
  const spreadsheetId = required('GOOGLE_SHEET_ID');
  const range = encodeURIComponent(`${sheet}!A:Z`);
  await googleFetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    },
  );
}

export async function readSheet(sheet: string): Promise<Row[]> {
  const spreadsheetId = required('GOOGLE_SHEET_ID');
  const range = encodeURIComponent(`${sheet}!A:Z`);
  const response = await googleFetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`);
  const data = await response.json();
  const values: string[][] = data.values || [];
  if (!values.length) return [];
  const headers = values[0];
  return values.slice(1).map((cells) =>
    Object.fromEntries(headers.map((h, i) => [h, cells[i] || ''])),
  );
}

export async function findRow(sheet: string, key: string, value: string) {
  const rows = await readSheet(sheet);
  return rows.find((row) => row[key] === value) || null;
}

export async function updateRow(sheet: string, key: string, value: string, patch: Row) {
  const spreadsheetId = required('GOOGLE_SHEET_ID');
  const rows = await readSheet(sheet);
  const index = rows.findIndex((row) => row[key] === value);
  if (index < 0) throw new Error('Row not found');

  const headers = Object.keys(rows[0] || patch);
  const next = { ...rows[index], ...patch };
  const rowNumber = index + 2;
  const range = encodeURIComponent(`${sheet}!A${rowNumber}:Z${rowNumber}`);

  await googleFetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        range: `${sheet}!A${rowNumber}:Z${rowNumber}`,
        majorDimension: 'ROWS',
        values: [headers.map((h) => next[h] || '')],
      }),
    },
  );
}

export async function createDriveFolder(name: string) {
  const folderId = required('GOOGLE_DRIVE_FOLDER_ID');
  const response = await googleFetch('https://www.googleapis.com/drive/v3/files?fields=id,name', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [folderId],
    }),
  });
  return response.json() as Promise<{ id: string; name: string }>;
}

export async function createDriveUploadSession(
  name: string,
  mimeType: string,
  size: number,
  parentId: string,
) {
  const token = await googleToken();
  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,mimeType,size,webViewLink,webContentLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Type': mimeType || 'application/octet-stream',
        'X-Upload-Content-Length': String(size),
      },
      body: JSON.stringify({ name, parents: [parentId] }),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(`Drive upload session failed: ${response.status} ${await response.text()}`);
  }

  const location = response.headers.get('location');
  if (!location) throw new Error('Drive did not return an upload session URL');
  return location;
}

type UploadTicket = {
  sessionUrl: string;
  name: string;
  mimeType: string;
  size: number;
  createdAt: number;
};

function uploadSecret() {
  return required('STUDIO_ADMIN_SECRET');
}

export function createUploadTicket(data: Omit<UploadTicket, 'createdAt'>) {
  const payload: UploadTicket = { ...data, createdAt: Date.now() };
  const encoded = base64url(JSON.stringify(payload));
  const signature = createHmac('sha256', uploadSecret()).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

export function readUploadTicket(token: string): UploadTicket {
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) throw new Error('Invalid upload ticket');

  const expected = createHmac('sha256', uploadSecret()).update(encoded).digest('base64url');
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    throw new Error('Invalid upload ticket signature');
  }

  const payload = JSON.parse(decodeBase64url(encoded)) as UploadTicket;
  if (!payload.sessionUrl || !payload.name || !payload.size || Date.now() - payload.createdAt > 7 * 24 * 60 * 60 * 1000) {
    throw new Error('Upload ticket expired');
  }
  return payload;
}

export async function uploadDriveChunk(
  ticket: UploadTicket,
  start: number,
  end: number,
  body: ArrayBuffer,
) {
  const token = await googleToken();
  const contentLength = end - start + 1;

  if (body.byteLength !== contentLength) {
    throw new Error(`Chunk length mismatch: expected ${contentLength}, received ${body.byteLength}`);
  }

  const response = await fetch(ticket.sessionUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': ticket.mimeType || 'application/octet-stream',
      'Content-Length': String(contentLength),
      'Content-Range': `bytes ${start}-${end}/${ticket.size}`,
    },
    body,
    cache: 'no-store',
  });

  if (response.status === 308) {
    return {
      complete: false,
      nextStart: parseRangeEnd(response.headers.get('range')),
    };
  }

  if (response.ok) {
    return {
      complete: true,
      nextStart: ticket.size,
      file: await response.json(),
    };
  }

  const errorText = await response.text();
  throw new Error(`Drive chunk upload failed: ${response.status} ${errorText.slice(0, 800)}`);
}

export async function getDriveUploadStatus(ticket: UploadTicket) {
  const token = await googleToken();
  const response = await fetch(ticket.sessionUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Range': `bytes */${ticket.size}`,
      'Content-Length': '0',
    },
    cache: 'no-store',
  });

  if (response.status === 308) {
    return { complete: false, nextStart: parseRangeEnd(response.headers.get('range')) };
  }

  if (response.ok) {
    return { complete: true, nextStart: ticket.size, file: await response.json() };
  }

  if (response.status === 404) throw new Error('Drive upload session expired. Please restart this file upload.');
  throw new Error(`Drive upload status failed: ${response.status} ${await response.text()}`);
}

function parseRangeEnd(range: string | null) {
  if (!range) return 0;
  const match = range.match(/(\\d+)-(\\d+)$/);
  return match ? Number(match[2]) + 1 : 0;
}

export async function makeDriveFileClientReadable(fileId: string) {
  const response = await googleFetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}/permissions?supportsAllDrives=true&fields=id`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        type: 'anyone',
        role: 'reader',
        allowFileDiscovery: false,
      }),
    },
  );
  return response.json();
}

export async function getDriveFile(fileId: string) {
  return googleFetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?fields=id,name,mimeType,size,webViewLink,webContentLink`,
  );
}

export async function makeDownloadUrl(fileId: string) {
  const response = await getDriveFile(fileId);
  const data = await response.json();
  return data.webContentLink || `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

export async function sendStudioEmail(
  to: string,
  subject: string,
  text: string,
  html: string,
  idempotencyKey: string,
) {
  const apiKey = required('RESEND_API_KEY');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({ from: RESEND_FROM, to: [to], subject, text, html }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Resend failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

export function makeSlug() {
  return `${Date.now().toString(36)}-${randomBytes(9).toString('hex')}`;
}

export function hashToken(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

export function studioBaseUrl() {
  return STUDIO_BASE.replace(/\/$/, '');
}
