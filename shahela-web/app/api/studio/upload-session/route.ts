import { NextResponse } from 'next/server';
import { isStudioAdmin, unauthorized } from '@/lib/studio-auth';
import { createDriveUploadSession, createUploadTicket } from '@/lib/studio';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();

  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const mimeType = String(body.mimeType || 'application/octet-stream');
    const size = Number(body.size || 0);
    const parentId = String(body.parentId || '').trim();

    if (!name || !parentId || !Number.isFinite(size) || size <= 0) {
      return NextResponse.json(
        { error: 'name, size and parentId are required.' },
        { status: 400 },
      );
    }

    const sessionUrl = await createDriveUploadSession(name, mimeType, size, parentId);
    const uploadTicket = createUploadTicket({ sessionUrl, name, mimeType, size });

    return NextResponse.json({
      ok: true,
      uploadTicket,
      chunkSize: 3 * 1024 * 1024,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload session failed' },
      { status: 500 },
    );
  }
}
