# Chunk 2/3 — Auth System + Tariffs Page

## Goal
Реализовать авторизацию через Telegram bot (magic link) и страницу тарифов.

## Prerequisites
Chunk 1 выполнен — проект существует в `~/projects/interview-landing/`, лендинг работает.

## Deliverables
1. JWT auth helper (create/verify session)
2. Auth tokens table migration (sqlite3 script)
3. Login page (/auth/login) — кнопка "Login via Telegram"
4. Callback API route (/api/auth/callback) — обработка magic link
5. /api/auth/me — получение текущего пользователя
6. /api/auth/logout — выход
7. AuthGuard middleware — защита дашборда
8. Login page UI — большая кнопка с Telegram, инструкция

## Auth Flow
1. User нажимает "Login via Telegram" на сайте
2. Сайт открывает deep link: tg://resolve?domain=developing_interview_trainer_bot&start=auth_<uuid>
3. Бот получает команду /start auth_<uuid>, генерирует одноразовый токен
4. Бот сохраняет токен в таблицу auth_tokens (telegram_id, token, expires_at)
5. Бот отправляет пользователю magic link: https://provincial-indicating-rip-operation.trycloudflare.com/auth/callback?token=<token>
6. User кликает — API валидирует токен, создаёт JWT, редиректит на /dashboard

NOTE: пункты 3-4 (бот) НЕ входят в этот таск — это отдельная доработка бота.
Этот таск делает ТОЛЬКО сайтовую часть.

## Files to Create/Modify

### src/lib/auth.ts
```typescript
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-dev-secret');
const COOKIE_NAME = 'session';

interface SessionPayload {
  telegramId: number;
  username: string | null;
  firstName: string | null;
}

export async function createSession(payload: SessionPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET);
  
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  
  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).delete(COOKIE_NAME);
}
```

### src/lib/db.ts — add functions:
```typescript
export function createAuthToken(telegramId: number, token: string): void {
  // Insert into auth_tokens table
}

export function consumeAuthToken(token: string): { telegramId: number } | null {
  // Find unused, non-expired token, mark as used, return telegram_id
}

export function getUserByTelegramId(telegramId: number): User | null {
  // SELECT from users table
}
```

### Migration script: `scripts/migrate-auth-tokens.sql`
```sql
CREATE TABLE IF NOT EXISTS auth_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id INTEGER NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
```
Run with: `sqlite3 /home/hermes/projects/ai-interview-trainer/data/interviews.db < scripts/migrate-auth-tokens.sql`

### src/app/auth/login/page.tsx
- Server component for metadata
- Client component TelegramLoginButton:
  - Large button "Login via Telegram" with paper-plane icon
  - On click: opens tg://resolve?domain=developing_interview_trainer_bot&start=auth
  - Instructions text: "1. Click the button above 2. Open Telegram 3. Send /start to the bot 4. Click the magic link you receive"
  - Optional: show QR code or alternative link
  - Clean, centered layout, dark gradient bg matching landing hero

### src/app/api/auth/callback/route.ts
```typescript
// GET /api/auth/callback?token=xxx
// 1. Read token from query
// 2. consumeAuthToken(token) — validate + mark used
// 3. Get user from users table by telegram_id
// 4. createSession() — set JWT cookie
// 5. Redirect to /dashboard
// OR: return error page if invalid/expired
```

### src/app/api/auth/route.ts
```typescript
// GET /api/auth — returns current user from session, or null
// POST /api/auth/logout — destroySession(), return success
```

### src/components/AuthGuard.tsx
```typescript
'use client'
// Wraps dashboard pages
// On mount: fetch /api/auth to check session
// If no session: redirect to /auth/login
// If session: render children
// Show loading spinner while checking
```

### src/middleware.ts
```typescript
// Next.js middleware (edge)
// Protect /dashboard/* routes
// If no session cookie → redirect to /auth/login
// Allow /, /tariffs, /auth/*, /api/* (public)
```

## Run
```bash
# Run migration first
sqlite3 /home/hermes/projects/ai-interview-trainer/data/interviews.db < scripts/migrate-auth-tokens.sql

# Start dev server
cd ~/projects/interview-landing && npm run dev -- -p 3001
```

## Quality
- JWT secret from env (fallback for dev only)
- Token single-use + 5-min expiry
- Proper error handling for expired/invalid tokens
- Middleware doesn't block static files or API routes
- TypeScript strict throughout
