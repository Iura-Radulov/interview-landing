import { type NextRequest, NextResponse } from 'next/server';
import { createHash, createHmac } from 'crypto';
import { createUser, getUserByTelegramId } from '@/lib/db';
import { createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, first_name, last_name, username, photo_url, auth_date, hash } = body;

    if (!id || !hash || !auth_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check auth_date is within 24 hours
    const now = Math.floor(Date.now() / 1000);
    if (now - parseInt(auth_date, 10) > 86400) {
      return NextResponse.json({ error: 'Auth data expired' }, { status: 401 });
    }

    // Build data-check-string: all params sorted alphabetically by key
    const params: Record<string, string> = { id, first_name, auth_date };
    if (last_name) params.last_name = last_name;
    if (username) params.username = username;
    if (photo_url) params.photo_url = photo_url;

    const sortedKeys = Object.keys(params).sort();
    const dataCheckString = sortedKeys.map((k) => `${k}=${params[k]}`).join('\n');

    // Compute secret key = SHA256(bot_token)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }
    const secretKey = createHash('sha256').update(botToken).digest();

    // Compute expected hash
    const computedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (computedHash !== hash) {
      return NextResponse.json({ error: 'Invalid auth data' }, { status: 401 });
    }

    // Look up or create user
    const telegramId = parseInt(id, 10);
    let user = getUserByTelegramId(telegramId);
    if (!user) {
      user = createUser(telegramId, username || null, first_name || null);
    }

    // Create session (cookie)
    await createSession({
      telegramId: user.telegram_id,
      username: user.username,
      firstName: user.first_name,
    });

    return NextResponse.json({
      ok: true,
      user: {
        id: user.telegram_id,
        first_name: user.first_name,
        username: user.username,
      },
    });
  } catch (err) {
    console.error('Telegram login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
