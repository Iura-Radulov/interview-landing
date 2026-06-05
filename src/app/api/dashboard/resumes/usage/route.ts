import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { FASTAPI_URL } from '@/lib/constants';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const resp = await fetch(`${FASTAPI_URL}/api/user-resumes/usage`, {
      headers: { 'X-User-ID': String(session.telegramId) },
    });

    if (!resp.ok) {
      return NextResponse.json(
        { used_this_month: 0, max_monthly: 2, remaining: 2, unlimited: false },
        { status: 200 }
      );
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { used_this_month: 0, max_monthly: 2, remaining: 2, unlimited: false },
      { status: 200 }
    );
  }
}