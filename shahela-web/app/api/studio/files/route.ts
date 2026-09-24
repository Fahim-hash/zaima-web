import { NextResponse } from 'next/server';
import { isStudioAdmin, unauthorized } from '@/lib/studio-auth';
import {
  appendSheet,
  findRow,
  getDriveFile,
  makeDownloadUrl,
  makeDriveFileClientReadable,
  makeSlug,
} from '@/lib/studio';

export async function POST(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();

  try {
    const body = await request.json();
    const projectSlug = String(body.projectSlug || '').trim();
    const fileId = String(body.fileId || '').trim();

    if (!projectSlug || !fileId) {
      return NextResponse.json(
        { error: 'projectSlug and fileId are required.' },
        { status: 400 },
      );
    }

    const project = await findRow('Projects', 'slug', projectSlug);
    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    const response = await getDriveFile(fileId);
    const file = await response.json();

    // The review link is intentionally shareable, so the completed file needs
    // link-reader access for browser previews/downloads without Google login.
    await makeDriveFileClientReadable(file.id);

    const now = new Date().toISOString();
    const downloadUrl = await makeDownloadUrl(file.id);

    await appendSheet('Files', [
      makeSlug(),
      projectSlug,
      file.id,
      file.name || '',
      file.mimeType || '',
      file.size || '',
      downloadUrl,
      'active',
      now,
    ]);

    return NextResponse.json({
      ok: true,
      file: {
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size,
        downloadUrl,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'File registration failed' },
      { status: 500 },
    );
  }
}
