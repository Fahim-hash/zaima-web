import { NextResponse } from 'next/server';
import { findRow, getDriveMedia } from '@/lib/studio';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug') || '';
    const fileId = url.searchParams.get('file') || '';
    if (!slug || !fileId) return NextResponse.json({ error: 'Missing preview reference.' }, { status: 400 });

    const [file, project] = await Promise.all([
      findRow('Files', 'driveFileId', fileId),
      findRow('Projects', 'slug', slug),
    ]);
    if (!file || file.projectSlug !== slug || file.status === 'deleted' || !project) {
      return NextResponse.json({ error: 'Preview not found.' }, { status: 404 });
    }

    const upstream = await getDriveMedia(fileId, request.headers.get('range'));
    if (!upstream.ok && upstream.status !== 206) {
      return NextResponse.json({ error: 'Preview is temporarily unavailable.' }, { status: upstream.status });
    }

    const headers = new Headers();
    headers.set('Content-Type', file.mimeType || 'application/octet-stream');
    headers.set('Content-Disposition', `inline; filename*=UTF-8''${encodeURIComponent(file.name || 'preview')}`);
    headers.set('Cache-Control', 'private, no-store, max-age=0');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Accept-Ranges', 'bytes');
    for (const key of ['content-length', 'content-range']) {
      const value = upstream.headers.get(key);
      if (value) headers.set(key, value);
    }

    return new Response(upstream.body, { status: upstream.status, headers });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Preview failed.' }, { status: 500 });
  }
}
