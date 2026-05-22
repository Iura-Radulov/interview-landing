import { type NextRequest, NextResponse } from 'next/server';
import { consumeAuthToken, getUserByTelegramId } from '@/lib/db';
import { createSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const origin = process.env.NEXT_PUBLIC_APP_URL || 'https://techinterviewai.com';

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login?error=missing_token', origin));
  }

  const result = consumeAuthToken(token);
  if (!result) {
    return NextResponse.redirect(new URL('/auth/login?error=invalid_token', origin));
  }

  const user = getUserByTelegramId(result.telegramId);
  if (!user) {
    return NextResponse.redirect(new URL('/auth/login?error=user_not_found', origin));
  }

  await createSession({
    telegramId: user.telegram_id,
    username: user.username,
    firstName: user.first_name,
  });

  return NextResponse.redirect(new URL('/dashboard', origin));
}
