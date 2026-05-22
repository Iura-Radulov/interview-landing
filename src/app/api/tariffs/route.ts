import { NextResponse } from 'next/server';
import { getActiveTariffs } from '@/lib/db';

export async function GET() {
  try {
    const tariffs = getActiveTariffs();
    return NextResponse.json(tariffs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tariffs' }, { status: 500 });
  }
}
