import { NextResponse } from 'next/server';
import { isStudioAdmin, unauthorized } from '@/lib/studio-auth';
import { appendSheet, createDriveFolder, makeSlug, readSheet, studioBaseUrl } from '@/lib/studio';

export async function GET(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();
  try {
    const projects = await readSheet('Projects');
    return NextResponse.json({ projects: projects.reverse() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Projects loading failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();
  try {
    const body = await request.json();
    const title = String(body.title || '').trim();
    const clientName = String(body.clientName || '').trim();
    const clientEmail = String(body.clientEmail || '').trim().toLowerCase();
    const price = String(body.price || '').trim();
    const whatsapp = String(body.whatsapp || '').trim();

    if (!title || !clientName || !clientEmail || !price) {
      return NextResponse.json({ error: 'Title, client name, client email and price are required.' }, { status: 400 });
    }

    const slug = makeSlug();
    const folder = await createDriveFolder(`Studio - ${title}`);
    const now = new Date().toISOString();

    await appendSheet('Projects', [
      slug, title, clientName, clientEmail, price, 'draft', '1', folder.id, whatsapp, now, now,
    ]);

    await appendSheet('ActivityLog', [
      makeSlug(), slug, 'project_created', 'Project created', now,
    ]);

    return NextResponse.json({
      ok: true,
      slug,
      reviewUrl: `${studioBaseUrl()}/studio/review/${slug}`,
      driveFolderId: folder.id,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Project creation failed' }, { status: 500 });
  }
}
