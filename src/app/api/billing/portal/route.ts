import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import Stripe from 'stripe';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
  return new Stripe(key);
}

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthenticated', loginUrl: '/auth/login' }, { status: 401 });
    }

    const db = getDb();
    const user = db.prepare('SELECT id, stripe_customer_id FROM users WHERE telegram_id = ?')
      .get(session.telegramId) as { id: number; stripe_customer_id: string | null } | undefined;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.stripe_customer_id) {
      return NextResponse.json({ error: 'No Stripe customer ID. Subscribe first.' }, { status: 400 });
    }

    const stripe = getStripe();

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${process.env.FRONTEND_URL || 'https://techinterviewai.com'}/dashboard/profile`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Customer Portal error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create portal session' }, { status: 500 });
  }
}
