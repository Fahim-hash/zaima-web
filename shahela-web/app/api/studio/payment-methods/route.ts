import { NextResponse } from 'next/server';
import { appendSheet, readSheet, updateRow } from '@/lib/studio';
import { isStudioAdmin, unauthorized } from '@/lib/studio-auth';

export async function GET(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();
  try {
    return NextResponse.json({ methods: await readSheet('PaymentMethods') });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Payment methods loading failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const accountName = String(body.accountName || '').trim();
    const accountNumber = String(body.accountNumber || '').trim();
    const instructions = String(body.instructions || '').trim();
    const enabled = body.enabled === false ? 'false' : 'true';

    if (!name) return NextResponse.json({ error: 'Payment method name is required.' }, { status: 400 });

    const existing = (await readSheet('PaymentMethods')).find((row) => row.name === name);
    if (existing) {
      await updateRow('PaymentMethods', 'name', name, { accountName, accountNumber, instructions, enabled });
    } else {
      await appendSheet('PaymentMethods', [name, accountName, accountNumber, instructions, enabled]);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Payment method save failed' }, { status: 500 });
  }
}
