import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

function signature() {
  const secret = process.env.STUDIO_ADMIN_SECRET || process.env.STUDIO_ADMIN_PASSWORD;
  if (!secret) throw new Error('Missing STUDIO_ADMIN_SECRET or STUDIO_ADMIN_PASSWORD');
  return createHmac('sha256', secret).update('studio-admin').digest('hex');
}
export function isStudioAdmin(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const value = cookie.match(/(?:^|; )studio_admin=([^;]+)/)?.[1] || '';
  const expected = signature();
  if (!value || value.length !== expected.length) return false;
  try { return timingSafeEqual(Buffer.from(value), Buffer.from(expected)); } catch { return false; }
}
export function unauthorized() { return NextResponse.json({error:'Studio admin authentication required.'},{status:401}); }
export function studioAdminSignature() { return signature(); }
