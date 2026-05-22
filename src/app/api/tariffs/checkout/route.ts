import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthenticated', loginUrl: '/auth/login' }, { status: 401 });
    }

    const { plan_id } = await request.json();
    if (!plan_id) {
      return NextResponse.json({ error: 'plan_id required' }, { status: 400 });
    }

    // Get plan from DB
    const db = getDb();
    const plan = db.prepare('SELECT * FROM tariff_plans WHERE id = ? AND is_active = 1').get(plan_id) as Record<string, unknown> | undefined;
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    const stripePriceId = plan.stripe_price_id as string | null;
    if (!stripePriceId) {
      return NextResponse.json({ error: 'This plan is not available for online payment yet. Stripe price ID not configured.' }, { status: 400 });
    }

    // Get or find user
    const user = db.prepare('SELECT id, stripe_customer_id FROM users WHERE telegram_id = ?').get(session.telegramId) as Record<string, unknown> | undefined;
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

    let customerId = user.stripe_customer_id as string | null;

    // Create Stripe customer if needed
    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { user_id: String(user.id), telegram_id: String(session.telegramId) },
      });
      customerId = customer.id;
      db.prepare('UPDATE users SET stripe_customer_id = ? WHERE id = ?').run(customerId, user.id);
    }

    // Create Checkout Session
    const checkout = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL || 'https://techinterviewai.com'}/dashboard?subscribe=success`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://techinterviewai.com'}/tariffs?subscribe=cancelled`,
      metadata: {
        user_id: String(user.id),
        plan_id: String(plan.id),
      },
    });

    return NextResponse.json({ url: checkout.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
