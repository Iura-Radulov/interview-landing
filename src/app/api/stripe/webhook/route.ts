import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import Stripe from 'stripe';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
  return new Stripe(key);
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const db = getDb();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = parseInt(session.metadata?.user_id || '0');
        const planId = parseInt(session.metadata?.plan_id || '0');
        const subscriptionId = session.subscription as string;

        if (!userId || !planId) break;

        const plan = db.prepare('SELECT * FROM tariff_plans WHERE id = ?').get(planId) as Record<string, unknown> | undefined;
        if (!plan) break;

        db.prepare(`
          UPDATE users SET 
            stripe_subscription_id = ?,
            subscription_status = 'active',
            max_interviews_per_day = ?
          WHERE id = ?
        `).run(subscriptionId, plan.max_interviews_per_day, userId);

        // Check for existing active subscription to extend from its end_date
        const existingActive = db.prepare(
          "SELECT id, end_date FROM subscriptions WHERE user_id = ? AND status = 'active' AND end_date > datetime('now') ORDER BY end_date DESC LIMIT 1"
        ).get(userId) as { id: number; end_date: string } | undefined;

        if (existingActive) {
          // Extend from current end_date (renewal)
          db.prepare(
            "UPDATE subscriptions SET end_date = datetime(end_date, '+' || ? || ' days'), updated_at = datetime('now') WHERE id = ?"
          ).run(plan.duration_days, existingActive.id);
        } else {
          // New subscription from now
          db.prepare(`
            INSERT INTO subscriptions (user_id, tariff_plan_id, start_date, end_date, status, created_at, updated_at)
            VALUES (?, ?, datetime('now'), datetime('now', '+' || ? || ' days'), 'active', datetime('now'), datetime('now'))
          `).run(userId, planId, plan.duration_days);
        }

        db.prepare(`
          INSERT INTO payments (user_id, tariff_plan_id, amount, currency, status, payment_method, payment_id, paid_at, created_at, updated_at)
          VALUES (?, ?, ?, 'USD', 'completed', 'stripe', ?, datetime('now'), datetime('now'), datetime('now'))
        `).run(userId, planId, plan.price, session.payment_intent || session.id);

        console.log(`Subscription activated: user=${userId}, plan=${planId}`);
        break;
      }

      case 'customer.subscription.deleted':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = db.prepare('SELECT id FROM users WHERE stripe_customer_id = ?').get(customerId) as Record<string, unknown> | undefined;
        if (!user) break;

        if (subscription.status === 'canceled' || subscription.status === 'past_due' || subscription.status === 'unpaid' || (subscription.cancel_at_period_end && subscription.status === 'active')) {
          // Cancel or pending cancellation — downgrade to Free
          db.prepare("UPDATE users SET subscription_status = 'free', stripe_subscription_id = NULL, max_interviews_per_day = 2 WHERE id = ?").run(user.id);
          db.prepare("UPDATE subscriptions SET status = 'cancelled' WHERE user_id = ? AND status = 'active'").run(user.id);
        } else if (subscription.status === 'active' && !subscription.cancel_at_period_end) {
          // Subscription is active and NOT pending cancellation — just ensure status
          db.prepare("UPDATE users SET subscription_status = 'active' WHERE id = ?").run(user.id);
          // Do NOT extend end_date — it was set correctly at checkout
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.error(`Payment failed for customer ${invoice.customer}: ${invoice.amount_due}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
