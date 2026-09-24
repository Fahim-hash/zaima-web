import { NextResponse } from 'next/server';
import { isStudioAdmin, unauthorized } from '@/lib/studio-auth';
import { getDriveUploadStatus, readUploadTicket } from '@/lib/studio';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();

  try {
    const body = await request.json();
    const token = String(body.uploadTicket || '');
    const ticket = readUploadTicket(token);
    const result = await getDriveUploadStatus(ticket);

    return NextResponse.json({
      ok: true,
      complete: result.complete,
      nextStart: result.nextStart,
      file: result.complete ? result.file : undefined,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload status failed' },
      { status: 500 },
    );
  }
}
