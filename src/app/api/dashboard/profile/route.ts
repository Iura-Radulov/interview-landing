import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUserByTelegramId, getUserSubscription } from '@/lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = getUserByTelegramId(session.telegramId);
  const subscription = getUserSubscription(session.telegramId);

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
