# Task: Browser Frontend (Landing + Dashboard)

## Project Overview
Create a full-featured browser-based frontend for the AI Interview Trainer platform. This is a public website with a landing page, pricing page, and a protected dashboard for authenticated users. Auth is via Telegram bot (magic link flow).

## Context
The project already has:
- **Telegram Bot** (@developing_interview_trainer_bot) — conducts AI interviews
- **Telegram Mini App** (Next.js 16, port 3000) — mobile web app inside Telegram
- **FastAPI Backend** (port 8000) — serves the Mini App API
- **Laravel Admin Panel** (port 80, /admin) — for admin management
- **Shared SQLite DB** at `~/projects/ai-interview-trainer/data/interviews.db`
- **DB schema**: Users (telegram_id, username, first_name, email, password, role), Sessions, Answers, TariffPlans, Subscriptions, Payments

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **DB Access**: better-sqlite3 (for server components & API routes)
- **Auth**: JWT tokens (jose library) in HTTP-only cookies
- **Icons**: lucide-react
- **Deployment**: Standalone on port 3001 (next start)

## Project Structure
```
~/projects/interview-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata, fonts, providers
│   │   ├── page.tsx            # Landing page (hero, features, CTA)
│   │   ├── tariffs/
│   │   │   └── page.tsx        # Pricing plans page
│   │   ├── dashboard/
│   │   │   ├── layout.tsx      # Dashboard layout (sidebar, header)
│   │   │   ├── page.tsx        # Dashboard home (stats overview)
│   │   │   ├── interviews/
│   │   │   │   └── page.tsx    # Interview history list
│   │   │   └── profile/
│   │   │       └── page.tsx    # User profile settings
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # Login page (shows Telegram login button)
│   │   │   └── callback/
│   │   │       └── route.ts    # Handle magic link from bot
│   │   └── api/
│   │       ├── auth/
│   │       │   └── route.ts    # POST: verify token, set session cookie
│   │       ├── dashboard/
│   │       │   └── route.ts    # GET: dashboard stats for current user
│   │       └── tariffs/
│   │           └── route.ts    # GET: list tariff plans
│   ├── components/
│   │   ├── LandingHero.tsx
│   │   ├── LandingFeatures.tsx
│   │   ├── LandingCTA.tsx
│   │   ├── TariffCard.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── StatsCard.tsx
│   │   ├── InterviewRow.tsx
│   │   ├── AuthGuard.tsx     # Middleware: redirect to login if no session
│   │   └── TelegramLoginButton.tsx
│   ├── lib/
│   │   ├── db.ts              # better-sqlite3 connection to shared DB
│   │   ├── auth.ts            # JWT create/verify, session helpers
│   │   ├── api.ts             # Shared API helpers for client components
│   │   └── constants.ts       # App-wide constants
│   └── types/
│       └── index.ts           # TypeScript interfaces
├── public/
│   └── images/                # Landing page images
├── .env.local                 # Environment variables (see below)
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Pages & Components Detail

### 1. Landing Page (`/`)
- **Hero section**: Big headline "Ace Your Next Tech Interview with AI", subtitle about AI-powered practice, CTA buttons ("Start Free" → /auth/login, "View Plans" → /tariffs)
- **Features section**: 3-4 feature cards with icons and descriptions (AI Evaluation, Realistic Questions, Progress Tracking, Detailed Feedback)
- **How it works section**: 3 steps (Choose role → Practice → Get feedback)
- **Stats strip**: Numbers like "10,000+ interviews completed", "95% satisfaction rate" (static for now)
- **CTA section**: Final call-to-action with Telegram bot link
- **Footer**: Links, copyright, Telegram link

### 2. Pricing Page (`/tariffs`)
- 3 tariff cards side by side: **Free** ($0), **Pro** ($19.99/mo), **Enterprise** ($49.99/mo)
- Each card shows: plan name, price, features list, "Choose Plan" button
- Free plan CTA → /auth/login
- Paid plans CTA → "Coming Soon" or redirect to bot
- Highlight "Most Popular" on Pro plan
- Data fetched from `GET /api/tariffs` (reads from DB)

### 3. Auth Flow
**Login page (`/auth/login`)**:
- Shows Telegram bot username (@developing_interview_trainer_bot)
- Large "Login via Telegram" button
- Button: opens Telegram deep link `tg://resolve?domain=developing_interview_trainer_bot&start=auth`
- After user clicks, bot sends them a magic link with token
- Also show QR code fallback text

**Magic link callback (`/api/auth/callback`)**:
- Bot generates a one-time auth token, stores in DB (new `auth_tokens` table or in memory)
- Bot sends link: `https://interviewai.app/auth/callback?token=xxx`
- API route validates token, creates JWT session cookie, redirects to /dashboard
- Token expires after 5 minutes, single-use

**Bot integration needed** (separate task, noted for reference):
- Add `/login` command to bot that generates auth token
- Add `start=auth` deep link handler

### 4. Dashboard (`/dashboard/*`)
**Layout**: Sidebar (collapsed on mobile) + main content area + top header

**Dashboard Home (`/dashboard`)**:
- Welcome message with user's name
- Stats cards: Total Interviews, Average Score, Active Days Streak, Current Plan
- Recent interviews list (last 5, clickable → detail view)
- Quick action: "Start New Interview"

**Interviews History (`/dashboard/interviews`)**:
- Table/list of all past interviews
- Columns: Date, Role, Level, Score, Completed
- Sort by date descending
- Click row → detailed summary view (modal or page)
- Pagination (10 per page)

**Profile (`/dashboard/profile`)**:
- Display: Telegram username, first name, email
- Edit: email, notification preferences
- Show current tariff plan and expiration date
- Link to Mini App

### 5. API Routes (Next.js)

**POST /api/auth** — Login via magic link token
```ts
// Request: { token: string }
// Response: { success: true, redirect: "/dashboard" }
// Sets HTTP-only cookie with JWT
```

**GET /api/auth/me** — Get current user from session cookie
```ts
// Response: User | null
```

**POST /api/auth/logout** — Clear session cookie
```ts
// Response: { success: true }
```

**GET /api/tariffs** — List active tariff plans
```ts
// Response: TariffPlan[]
```

**GET /api/dashboard/stats** — Dashboard stats for authenticated user
```ts
// Response: { totalInterviews, avgScore, recentSessions, currentPlan }
```

**GET /api/dashboard/interviews** — Paginated interview history
```ts
// Query: { page?: number, perPage?: number }
// Response: { sessions: Session[], total: number, page: number }
```

## Database Access

Use `better-sqlite3` (synchronous) in Next.js server components and API routes.

The shared SQLite path: `/home/hermes/projects/ai-interview-trainer/data/interviews.db`

```typescript
// src/lib/db.ts
import Database from 'better-sqlite3';
import path from 'path';

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
```

**Auth tokens table**: Add a migration script that creates `auth_tokens` table:
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

## Auth Implementation

Use `jose` library for JWT:
```typescript
// src/lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = 'session';

export async function createSession(telegramId: number, username: string) {
  const token = await new SignJWT({ telegramId, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET);
  
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}
```

## Design Guidelines

- **Color scheme**: Dark blue (#1e3a5f) primary, emerald (#10b981) accent, white/gray backgrounds
- **Typography**: Inter font (next/font/google)
- **Responsive**: Desktop-first with mobile breakpoints (landing + dashboard)
- **Dashboard**: Clean sidebar navigation, card-based stats, subtle shadows
- **Landing**: Modern SaaS landing page style (similar to Vercel/Linear aesthetic)
- **Animations**: Subtle fade-in on scroll (CSS animations, no heavy library)

## Environment Variables (`.env.local`)
```
JWT_SECRET=<random-64-char-hex>
DATABASE_PATH=/home/hermes/projects/ai-interview-trainer/data/interviews.db
TELEGRAM_BOT_USERNAME=developing_interview_trainer_bot
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## Quality Standards
1. All components must have TypeScript types — NO `any`
2. Server components by default, 'use client' only where needed
3. Proper loading states (loading.tsx per route)
4. Error boundaries (error.tsx per route)
5. SEO metadata on all public pages
6. No UI library — custom Tailwind components only
7. Responsive: works on desktop (1440px) and tablet (768px)
8. Accessibility: proper headings, alt texts, aria labels

## Phased Execution Plan

### Phase 1: Project Scaffold + Landing Page
1. Initialize Next.js project with TypeScript + Tailwind
2. Install dependencies: better-sqlite3, jose, lucide-react, @types/better-sqlite3
3. Create project structure (folders, layout, types)
4. Build Landing page (Hero, Features, How it works, CTA, Footer)
5. Build Pricing page with tariff cards from DB

### Phase 2: Auth System
1. Create DB helper + auth_tokens migration
2. Implement JWT create/verify in lib/auth.ts
3. Build /auth/login page with Telegram button
4. Build /api/auth/callback route
5. Create AuthGuard component and dashboard middleware
6. Test full auth flow

### Phase 3: Dashboard
1. Dashboard layout with sidebar + header
2. Dashboard home page with stats cards and recent interviews
3. Interview history page with pagination
4. Profile page with settings

### Phase 4: Polish
1. Loading skeletons and error states
2. Mobile responsiveness audit
3. SEO metadata for all public pages
4. Performance optimization

## Constraints
- Do NOT modify existing projects (ai-interview-trainer, ai-interview-trainer-back, interview-mini-app)
- Do NOT install packages globally — use npm/pnpm in the new project only
- DB is shared — read-only queries preferred, write only auth_tokens and user profile updates
- Do NOT use any paid APIs or services
- All code must be production-quality (no TODOs, no placeholders)
