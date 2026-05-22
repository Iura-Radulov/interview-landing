import Database from 'better-sqlite3';
import type { TariffPlan, User, InterviewSession, Subscription, UserStats } from '@/types';

const DB_PATH = '/home/hermes/projects/ai-interview-trainer/data/interviews.db';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH, { readonly: false });
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

export function createAuthToken(telegramId: number, token: string): void {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  getDb()
    .prepare(
      'INSERT INTO auth_tokens (telegram_id, token, expires_at) VALUES (?, ?, ?)'
    )
    .run(telegramId, token, expiresAt);
}

export function consumeAuthToken(token: string): { telegramId: number } | null {
  const db = getDb();
  const row = db
    .prepare(
      "SELECT id, telegram_id FROM auth_tokens WHERE token = ? AND used = 0 AND expires_at > datetime('now')"
    )
    .get(token) as { id: number; telegram_id: number } | undefined;
  if (!row) return null;
  db.prepare('UPDATE auth_tokens SET used = 1 WHERE id = ?').run(row.id);
  return { telegramId: row.telegram_id };
}

export function getUserByTelegramId(telegramId: number): User | null {
  const row = getDb()
    .prepare('SELECT * FROM users WHERE telegram_id = ?')
    .get(telegramId) as User | undefined;
  return row ?? null;
}

export function getActiveTariffs(): TariffPlan[] {
  const stmt = getDb().prepare(
    'SELECT * FROM tariff_plans WHERE is_active = 1 ORDER BY price ASC'
  );
  const rows = stmt.all() as Array<Omit<TariffPlan, 'features'> & { features: string }>;
  return rows.map((row) => ({
    ...row,
    features: JSON.parse(row.features || '[]'),
    is_active: Boolean(row.is_active),
  }));
}

export function getUserStats(telegramId: number): UserStats {
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE telegram_id = ?').get(telegramId) as { id: number } | undefined;
  if (!user) {
    return { totalInterviews: 0, avgScore: null, sessionsThisWeek: 0, currentPlan: null, recentSessions: [] };
  }

  const { count: totalInterviews } = db
    .prepare('SELECT COUNT(*) as count FROM sessions WHERE user_id = ?')
    .get(user.id) as { count: number };

  const { avg } = db
    .prepare('SELECT AVG(total_score) as avg FROM sessions WHERE user_id = ? AND completed = 1 AND total_score IS NOT NULL')
    .get(user.id) as { avg: number | null };

  const { count: sessionsThisWeek } = db
    .prepare("SELECT COUNT(*) as count FROM sessions WHERE user_id = ? AND started_at >= datetime('now', '-7 days')")
    .get(user.id) as { count: number };

  const rawSessions = db
    .prepare('SELECT * FROM sessions WHERE user_id = ? ORDER BY started_at DESC LIMIT 5')
    .all(user.id) as Array<Omit<InterviewSession, 'completed'> & { completed: number }>;

  const recentSessions: InterviewSession[] = rawSessions.map((s) => ({
    ...s,
    completed: Boolean(s.completed),
  }));

  const subscription = getUserSubscription(telegramId);

  return {
    totalInterviews,
    avgScore: avg,
    sessionsThisWeek,
    currentPlan: subscription ? { name: subscription.plan_name, features: subscription.features } : null,
    recentSessions,
  };
}

export function getUserInterviews(
  telegramId: number,
  page: number,
  perPage: number,
): { sessions: InterviewSession[]; total: number } {
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE telegram_id = ?').get(telegramId) as { id: number } | undefined;
  if (!user) return { sessions: [], total: 0 };

  const { count: total } = db
    .prepare('SELECT COUNT(*) as count FROM sessions WHERE user_id = ?')
    .get(user.id) as { count: number };

  const offset = (page - 1) * perPage;
  const rawSessions = db
    .prepare('SELECT * FROM sessions WHERE user_id = ? ORDER BY started_at DESC LIMIT ? OFFSET ?')
    .all(user.id, perPage, offset) as Array<Omit<InterviewSession, 'completed'> & { completed: number }>;

  const sessions: InterviewSession[] = rawSessions.map((s) => ({
    ...s,
    completed: Boolean(s.completed),
  }));

  return { sessions, total };
}

export function getUserSubscription(telegramId: number): Subscription | null {
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE telegram_id = ?').get(telegramId) as { id: number } | undefined;
  if (!user) return null;

  const row = db
    .prepare(
      `SELECT s.*, tp.name as plan_name, tp.features
       FROM subscriptions s
       JOIN tariff_plans tp ON s.tariff_plan_id = tp.id
       WHERE s.user_id = ? AND s.status = 'active' AND s.end_date > datetime('now')
       ORDER BY s.end_date DESC
       LIMIT 1`,
    )
    .get(user.id) as (Omit<Subscription, 'features'> & { features: string }) | undefined;

  if (!row) return null;
  return { ...row, features: JSON.parse(row.features || '[]') };
}
