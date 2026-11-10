import { NextResponse } from 'next/server';
import { appendSheet, findRow, readSheet, sendStudioEmail, updateRow, studioBaseUrl } from '@/lib/studio';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || '').trim();
    const clientEmail = String(body.clientEmail || '').trim().toLowerCase();
    const method = String(body.method || '').trim();
    const trxId = String(body.trxId || '').trim();

    if (!slug || !clientEmail || !method || !trxId) {
      return NextResponse.json({ error: 'Choose a payment method and enter your transaction ID.' }, { status: 400 });
    }
    if (trxId.length < 4 || trxId.length > 100) {
      return NextResponse.json({ error: 'Enter a valid transaction ID.' }, { status: 400 });
    }

    const project = await findRow('Projects', 'slug', slug);
    if (!project) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    if (clientEmail !== String(project.clientEmail || '').toLowerCase()) {
      return NextResponse.json({ error: 'Use the email address attached to this project.' }, { status: 400 });
    }
    if (project.status !== 'approved') {
      return NextResponse.json({ error: 'This project is not currently accepting a payment submission.' }, { status: 400 });
    }

    const [methods, payments] = await Promise.all([readSheet('PaymentMethods'), readSheet('Payments')]);
    const activeMethod = methods.find((item) => item.name === method && item.enabled !== 'false');
    if (!activeMethod) return NextResponse.json({ error: 'This payment method is not available.' }, { status: 400 });

    const normalizedTrx = trxId.toLowerCase();
    if (payments.some((item) => String(item.trxId || '').trim().toLowerCase() === normalizedTrx)) {
      return NextResponse.json({ error: 'This transaction ID has already been submitted.' }, { status: 409 });
    }

    const now = new Date().toISOString();
    const paymentId = Date.now().toString();
    const clientName = String(project.clientName || '').trim();
    const amount = String(project.price || '').trim();
    if (!amount) return NextResponse.json({ error: 'Project price is not configured.' }, { status: 400 });

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
