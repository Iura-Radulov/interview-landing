import { type NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';
import { consumeAuthToken, getUserByTelegramId, createUser } from '@/lib/db';

const BASE_URL = process.env.FRONTEND_URL || 'https://techinterviewai.com';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const redirect = searchParams.get('redirect') || '/dashboard';

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', BASE_URL));
    }

    // Verify the auth token
    const result = consumeAuthToken(token);
    if (!result) {
      return NextResponse.redirect(new URL('/auth/login?error=expired', BASE_URL));
    }

    // Look up or create user
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

    // Redirect to the original page using the public URL
    const dest = new URL(redirect, BASE_URL);
    return NextResponse.redirect(dest);
  } catch (err) {
    console.error('auto-login error:', err);
    return NextResponse.redirect(new URL('/auth/login?error=error', BASE_URL));
  }
}
