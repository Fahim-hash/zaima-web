import { createHash, createSign, randomBytes } from 'crypto';

type Row = Record<string, string>;

const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';
const STUDIO_BASE = process.env.NEXT_PUBLIC_STUDIO_BASE_URL || 'https://tometu.ami.bd';
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'studio@syedfahimmuddasir.bro.bd';

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString('base64url');
}

function serviceAccountToken() {
  const email = required('GOOGLE_CLIENT_EMAIL');
  const key = required('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(JSON.stringify({
    iss: email,
    scope: GOOGLE_SCOPE,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claim}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  return `${unsigned}.${base64url(signer.sign(key))}`;
}

let tokenCache: { token: string; expiresAt: number } | null = null;

async function googleToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.token;
  const jwt = serviceAccountToken();
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Google auth failed: ${response.status}`);
  const data = await response.json();
  tokenCache = { token: data.access_token, expiresAt: Date.now() + Number(data.expires_in) * 1000 };
  return data.access_token as string;
}

async function googleFetch(url: string, init: RequestInit = {}) {
  const token = await googleToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(url, { ...init, headers, cache: 'no-store' });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google API ${response.status}: ${body.slice(0, 500)}`);
  }
  return response;
}

export async function appendSheet(sheet: string, row: string[]) {
  const spreadsheetId = required('GOOGLE_SHEET_ID');
  const range = encodeURIComponent(`${sheet}!A:Z`);
  await googleFetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ values: [row] }),
  });
}

export async function readSheet(sheet: string): Promise<Row[]> {
  const spreadsheetId = required('GOOGLE_SHEET_ID');
  const range = encodeURIComponent(`${sheet}!A:Z`);
  const response = await googleFetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`);
  const data = await response.json();
  const values: string[][] = data.values || [];
  if (!values.length) return [];
  const headers = values[0];
  return values.slice(1).map((cells) => Object.fromEntries(headers.map((h, i) => [h, cells[i] || ''])));
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
  await googleFetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ range: `${sheet}!A${rowNumber}:Z${rowNumber}`, majorDimension: 'ROWS', values: [headers.map((h) => next[h] || '')] }),
  });
}

export async function createDriveFolder(name: string) {
  const folderId = required('GOOGLE_DRIVE_FOLDER_ID');
  const response = await googleFetch('https://www.googleapis.com/drive/v3/files?fields=id,name', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name, mimeType: 'application/vnd.google-apps.folder', parents: [folderId] }),
  });
  return response.json() as Promise<{ id: string; name: string }>;
}

export async function createDriveUploadSession(name: string, mimeType: string, size: number, parentId: string) {
  const token = await googleToken();
  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,mimeType,size,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Upload-Content-Type': mimeType || 'application/octet-stream',
      'X-Upload-Content-Length': String(size),
    },
    body: JSON.stringify({ name, parents: [parentId] }),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Drive upload session failed: ${response.status} ${await response.text()}`);
  const location = response.headers.get('location');
  if (!location) throw new Error('Drive did not return an upload session URL');
  return location;
}

export async function getDriveFile(fileId: string) {
  return googleFetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?fields=id,name,mimeType,size,webViewLink,webContentLink`);
}

export async function makeDownloadUrl(fileId: string) {
  const response = await getDriveFile(fileId);
  const data = await response.json();
  return data.webContentLink || `${STUDIO_BASE}/api/studio/download/${encodeURIComponent(fileId)}`;
}

export async function sendStudioEmail(to: string, subject: string, text: string, html: string, idempotencyKey: string) {
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
  if (!response.ok) throw new Error(`Resend failed: ${response.status} ${await response.text()}`);
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
