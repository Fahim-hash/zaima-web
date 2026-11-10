import { NextResponse } from 'next/server';
import { findRow, getDriveMedia, readDownloadToken, readSheet } from '@/lib/studio';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const token = new URL(request.url).searchParams.get('token') || '';
    const grant = readDownloadToken(token);
    const [file, project, payments] = await Promise.all([
      findRow('Files', 'driveFileId', grant.fileId),
      findRow('Projects', 'slug', grant.slug),
      readSheet('Payments'),
    ]);

    const paid = payments.some((payment) =>
      payment.projectSlug === grant.slug &&
      payment.clientEmail?.toLowerCase() === grant.email.toLowerCase() &&
      payment.status === 'approved'
    );

    if (!file || file.projectSlug !== grant.slug || file.status === 'deleted' || !project ||
        project.clientEmail?.toLowerCase() !== grant.email.toLowerCase() || !paid) {
      return NextResponse.json({ error: 'This download is not authorised.' }, { status: 403 });
    }

    const upstream = await getDriveMedia(grant.fileId, request.headers.get('range'));
    if (!upstream.ok && upstream.status !== 206) {
      return NextResponse.json({ error: 'The file is temporarily unavailable.' }, { status: upstream.status });
    }

    const safeName = String(file.name || 'final-file').replace(/[\r\n"]/g, '_');
    const headers = new Headers({
      'Content-Type': file.mimeType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(safeName)}`,
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'Accept-Ranges': 'bytes',
    });
    for (const key of ['content-length', 'content-range']) {
      const value = upstream.headers.get(key);
      if (value) headers.set(key, value);
    }

    return new Response(upstream.body, { status: upstream.status, headers });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Download link is invalid or expired.' }, { status: 403 });
  }
}
