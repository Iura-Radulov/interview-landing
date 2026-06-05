import { type NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByTelegramId } from '@/lib/db';
import { createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'missing_code' }, { status: 400 });
    }

    const trimmed = code.trim();

    // Verify the auth token from the shared SQLite database
    const { consumeAuthToken } = await import('@/lib/db');
    const result = consumeAuthToken(trimmed);

    if (!result) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 401 });
    }

    // Look up user
    let user = getUserByTelegramId(result.telegramId);
    if (!user) {
      user = createUser(result.telegramId, null, null);
    }

    // Create session
    await createSession({
      telegramId: user.telegram_id,
      username: user.username,
      firstName: user.first_name,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('verify-code error:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
