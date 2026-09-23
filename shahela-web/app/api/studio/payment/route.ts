import { NextResponse } from 'next/server';
import { appendSheet, findRow, readSheet, sendStudioEmail, updateRow, studioBaseUrl } from '@/lib/studio';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || '');
    const clientName = String(body.clientName || '').trim();
    const clientEmail = String(body.clientEmail || '').trim().toLowerCase();
    const method = String(body.method || '').trim();
    const trxId = String(body.trxId || '').trim();
    const amount = String(body.amount || '').trim();

    if (!slug || !clientName || !clientEmail || !method || !trxId || !amount) {
      return NextResponse.json({ error: 'All payment fields are required.' }, { status: 400 });
    }

    const project = await findRow('Projects', 'slug', slug);
    if (!project) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    if (project.status !== 'approved' && project.status !== 'payment_submitted') {
      return NextResponse.json({ error: 'Project must be approved before payment.' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const paymentId = Date.now().toString();
    await appendSheet('Payments', [paymentId, slug, clientName, clientEmail, method, trxId, amount, 'pending', now, '']);
    await updateRow('Projects', 'slug', slug, { status: 'payment_submitted', updatedAt: now });

    await sendStudioEmail(
      requiredAdminEmail(),
      `Payment submitted — ${project.title}`,
      `A payment was submitted for ${project.title}. Client: ${clientName}. Method: ${method}. Transaction ID: ${trxId}. Amount: ${amount}. Review it in Studio.`,
      `<p>A payment was submitted for <strong>${escapeHtml(project.title)}</strong>.</p><p>Client: ${escapeHtml(clientName)}<br>Method: ${escapeHtml(method)}<br>Transaction ID: ${escapeHtml(trxId)}<br>Amount: ${escapeHtml(amount)}</p><p><a href="${studioBaseUrl()}/studio/payments">Open Studio Payments</a></p>`,
      `payment-${paymentId}`,
    );

    return NextResponse.json({ ok: true, status: 'payment_submitted' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Payment submission failed' }, { status: 500 });
  }
}

function requiredAdminEmail() {
  const email = process.env.STUDIO_ADMIN_EMAIL;
  if (!email) throw new Error('Missing STUDIO_ADMIN_EMAIL');
  return email;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char] || char));
}
