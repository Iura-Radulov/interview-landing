import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUserInterviews } from '@/lib/db';

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get('perPage') ?? '10', 10)));

  const { sessions, total } = getUserInterviews(session.telegramId, page, perPage);

  return NextResponse.json({
    sessions,
    total,
    page,
    totalPages: Math.ceil(total / perPage),
  });
}
