import { NextResponse } from 'next/server';
import { isStudioAdmin, unauthorized } from '@/lib/studio-auth';
import {
  appendSheet,
  findRow,
  getDriveFile,
  makeDriveFilePrivate,
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

    // Keep the original private in Drive. Previews and paid downloads are streamed
    // through server routes so the raw Drive URL is never exposed to the client.
    await makeDriveFilePrivate(file.id);

    const now = new Date().toISOString();

    await appendSheet('Files', [
      makeSlug(),
      projectSlug,
      file.id,
      file.name || '',
      file.mimeType || '',
      file.size || '',
      '',
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
        previewUrl: `/api/studio/preview?slug=${encodeURIComponent(projectSlug)}&file=${encodeURIComponent(file.id)}`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'File registration failed' },
      { status: 500 },
    );
  }
}
