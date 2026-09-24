import { NextResponse } from 'next/server';
import { readSheet } from '@/lib/studio';
import { isStudioAdmin, unauthorized } from '@/lib/studio-auth';

export async function GET(request: Request) {
  if (!isStudioAdmin(request)) return unauthorized();
  try {
    const [deliveries, projects] = await Promise.all([readSheet('Deliveries'), readSheet('Projects')]);
    const map = new Map(projects.map((p) => [p.slug, p.title]));
    return NextResponse.json({ deliveries: deliveries.reverse().map((d) => ({ ...d, projectTitle: map.get(d.projectSlug) || d.projectSlug })) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Deliveries loading failed' }, { status: 500 });
  }
}
