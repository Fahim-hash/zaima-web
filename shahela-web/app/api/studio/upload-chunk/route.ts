import { NextResponse } from 'next/server';
import { isStudioAdmin, unauthorized } from '@/lib/studio-auth';
import { readUploadTicket, uploadDriveChunk } from '@/lib/studio';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function PUT(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();

  try {
    const ticketToken = request.headers.get('x-upload-ticket') || '';
    const start = Number(request.headers.get('x-chunk-start'));
    const end = Number(request.headers.get('x-chunk-end'));

    if (!ticketToken || !Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start) {
      return NextResponse.json({ error: 'Invalid upload chunk metadata.' }, { status: 400 });
    }

    const ticket = readUploadTicket(ticketToken);
    if (end >= ticket.size) {
      return NextResponse.json({ error: 'Chunk exceeds the file size.' }, { status: 400 });
    }

    const body = await request.arrayBuffer();
    const result = await uploadDriveChunk(ticket, start, end, body);

    return NextResponse.json({
      ok: true,
      complete: result.complete,
      nextStart: result.nextStart,
      file: result.complete ? result.file : undefined,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Chunk upload failed' },
      { status: 500 },
    );
  }
}
