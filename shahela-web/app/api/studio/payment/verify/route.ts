import { NextResponse } from 'next/server';
import { isStudioAdmin, unauthorized } from '@/lib/studio-auth';
import { appendSheet, findRow, readSheet, sendStudioEmail, updateRow, studioBaseUrl } from '@/lib/studio';

export async function POST(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();
  try {
    const body = await request.json();
    const paymentId = String(body.paymentId || '');
    const decision = String(body.decision || '');
    if (!paymentId || !['approved','rejected'].includes(decision)) {
      return NextResponse.json({ error: 'paymentId and a valid decision are required.' }, { status: 400 });
    }

    const payments = await readSheet('Payments');
    const payment = payments.find((row) => row.id === paymentId);
    if (!payment) return NextResponse.json({ error: 'Payment not found.' }, { status: 404 });
    const project = await findRow('Projects', 'slug', payment.projectSlug);
    if (!project) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });

    const now = new Date().toISOString();
    await updateRow('Payments', 'id', paymentId, { status: decision, verifiedAt: now });

    if (decision === 'rejected') {
      await updateRow('Projects', 'slug', payment.projectSlug, { status: 'approved', updatedAt: now });
      await sendStudioEmail(payment.clientEmail, `Payment needs attention — ${project.title}`, `Your payment submission for ${project.title} could not be verified. Please contact the studio for the next step.`, `<p>Your payment submission for <strong>${project.title}</strong> could not be verified.</p><p>Please contact the studio for the next step.</p>`, `payment-rejected-${paymentId}`);
      return NextResponse.json({ ok: true, status: 'rejected' });
    }

    const files = (await readSheet('Files')).filter((row) => row.projectSlug === payment.projectSlug && row.status !== 'deleted');
    await updateRow('Projects', 'slug', payment.projectSlug, { status: 'payment_verified', updatedAt: now });

    const links = files.map((file) => `<li><a href="${escapeHtml(file.downloadUrl)}">${escapeHtml(file.name)}</a></li>`).join('');
    const textLinks = files.map((file) => `- ${file.name}: ${file.downloadUrl}`).join('\n');
    await sendStudioEmail(
      payment.clientEmail,
      `Final delivery — ${project.title}`,
      `Your final files for ${project.title} are ready.\n\n${textLinks}`,
      `<p>Your final files for <strong>${escapeHtml(project.title)}</strong> are ready.</p><ul>${links}</ul><p>Thank you.</p>`,
      `delivery-${paymentId}`,
    );
    await appendSheet('Deliveries', [Date.now().toString(), payment.projectSlug, payment.clientEmail, files.length.toString(), now, 'sent']);
    await updateRow('Projects', 'slug', payment.projectSlug, { status: 'delivered', updatedAt: new Date().toISOString() });

    return NextResponse.json({ ok: true, status: 'delivered', files: files.length });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Payment verification failed' }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char] || char));
}
