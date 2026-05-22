import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  return NextResponse.json({
    authenticated: session !== null,
    username: session?.username ?? null,
    firstName: session?.firstName ?? null,
  });
}
