import { NextResponse } from 'next/server';
import { appendSheet, findRow, readSheet, sendStudioEmail, updateRow, studioBaseUrl } from '@/lib/studio';

export async function GET(request: Request) {
  try {
    const slug = new URL(request.url).searchParams.get('slug') || '';
    const project = await findRow('Projects', 'slug', slug);
    if (!project) return NextResponse.json({ error: 'Review link not found.' }, { status: 404 });

    const files = (await readSheet('Files')).filter((row) => row.projectSlug === slug && row.status !== 'deleted');
    const payments = (await readSheet('Payments')).filter((row) => row.projectSlug === slug);
    const methods = (await readSheet('PaymentMethods')).filter((row) => row.enabled !== 'false');

    if (project.status === 'draft') await updateRow('Projects', 'slug', slug, { status: 'sent', updatedAt: new Date().toISOString() });

    return NextResponse.json({
      project: {
        slug: project.slug,
        title: project.title,
        clientName: project.clientName,
        price: project.price,
        status: project.status === 'draft' ? 'sent' : project.status,
        version: project.version || '1',
        whatsapp: project.whatsapp || '',
      },
      files: files.map(({ id, projectSlug, driveFileId, name, mimeType, size, downloadUrl }) => ({ id, projectSlug, driveFileId, name, mimeType, size, downloadUrl })),
      paymentMethods: methods.map(({ name, accountName, accountNumber, instructions, enabled }) => ({ name, accountName, accountNumber, instructions, enabled })),
      payment: payments.sort((a,b) => (b.createdAt || '').localeCompare(a.createdAt || ''))[0] || null,
      reviewUrl: `${studioBaseUrl()}/studio/review/${slug}`,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Review loading failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || '');
    const action = String(body.action || '');
    const project = await findRow('Projects', 'slug', slug);
    if (!project) return NextResponse.json({ error: 'Review link not found.' }, { status: 404 });

    const now = new Date().toISOString();

    if (action === 'approve') {
      await updateRow('Projects', 'slug', slug, { status: 'approved', updatedAt: now });
      await appendSheet('Reviews', [Date.now().toString(), slug, 'approved', '', now, project.clientEmail]);
      return NextResponse.json({ ok: true, status: 'approved' });
    }

    if (action === 'revision') {
      const message = String(body.message || '').trim();
      if (!message) return NextResponse.json({ error: 'Revision message is required.' }, { status: 400 });
      await updateRow('Projects', 'slug', slug, { status: 'revision_requested', updatedAt: now });
      await appendSheet('Revisions', [Date.now().toString(), slug, message, now, project.clientEmail]);
      return NextResponse.json({ ok: true, status: 'revision_requested', whatsapp: project.whatsapp || '' });
    }

    return NextResponse.json({ error: 'Unsupported action.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Review action failed' }, { status: 500 });
  }
}
