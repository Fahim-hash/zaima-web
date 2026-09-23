import { NextResponse } from 'next/server';
import { readSheet } from '@/lib/studio';

export async function GET() {
  try {
    const [payments, projects] = await Promise.all([readSheet('Payments'), readSheet('Projects')]);
    const projectMap = new Map(projects.map((p) => [p.slug, p]));
    const rows = payments.map((payment) => ({ ...payment, projectTitle: projectMap.get(payment.projectSlug)?.title || payment.projectSlug }));
    return NextResponse.json({ payments: rows });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Payments loading failed' }, { status: 500 });
  }
}
