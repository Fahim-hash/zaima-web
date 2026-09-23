import { NextResponse } from 'next/server';
import { appendSheet, findRow, getDriveFile, makeDownloadUrl, makeSlug } from '@/lib/studio';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projectSlug = String(body.projectSlug || '').trim();
    const fileId = String(body.fileId || '').trim();
    if (!projectSlug || !fileId) return NextResponse.json({ error: 'projectSlug and fileId are required.' }, { status: 400 });

    const project = await findRow('Projects', 'slug', projectSlug);
    if (!project) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });

    const response = await getDriveFile(fileId);
    const file = await response.json();
    const now = new Date().toISOString();

    await appendSheet('Files', [
      makeSlug(), projectSlug, file.id, file.name || '', file.mimeType || '', file.size || '', await makeDownloadUrl(file.id), 'active', now,
    ]);

    return NextResponse.json({ ok: true, file });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'File registration failed' }, { status: 500 });
  }
}
