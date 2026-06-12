import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUserByTelegramId, getUserSubscription, getDb } from '@/lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = getUserByTelegramId(session.telegramId);
  const subscription = getUserSubscription(session.telegramId);

  // Auto-downgrade: if subscription expired (not found by getPublishedPosts filter), reset user status
  if (!subscription) {
    const db = getDb();
    const userRow = db.prepare('SELECT id, subscription_status, max_interviews_per_day FROM users WHERE telegram_id = ?')
      .get(session.telegramId) as { id: number; subscription_status: string; max_interviews_per_day: number } | undefined;
    if (userRow && userRow.subscription_status !== 'free') {
      // Mark expired subscriptions as cancelled
      db.prepare("UPDATE subscriptions SET status = 'expired' WHERE user_id = ? AND status = 'active' AND end_date <= datetime('now')").run(userRow.id);
      // Reset user to Free
      db.prepare("UPDATE users SET subscription_status = 'free', max_interviews_per_day = 2 WHERE id = ?").run(userRow.id);
    }
  }

  return NextResponse.json({
    firstName: session.firstName,
    username: session.username,
    telegramId: session.telegramId,
    email: user?.email || null,
    subscription: subscription ? {
      plan_name: subscription.plan_name,
      start_date: subscription.start_date,
      end_date: subscription.end_date,
      features: subscription.features,
      features_ru: subscription.features_ru,
      payment_type: subscription.payment_type,
    } : null,
  });
}
