import { NextResponse } from 'next/server';
import { getSession, destroySession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(null);
  }
  return NextResponse.json(session);
}

export async function POST() {
  await destroySession();
  return NextResponse.json({ success: true });
}
