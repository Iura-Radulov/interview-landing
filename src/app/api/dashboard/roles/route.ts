import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const roles = db
      .prepare("SELECT name_en, name_ru, emoji, is_primary FROM interview_roles WHERE is_active = 1 ORDER BY id")
      .all();
    return NextResponse.json({ roles });
  } catch (err) {
    console.error('Failed to load roles:', err);
    return NextResponse.json({ error: 'Failed to load roles' }, { status: 500 });
  }
}
