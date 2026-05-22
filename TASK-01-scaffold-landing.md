# Chunk 1/3 — Project Scaffold + Landing Page

## Goal
Создать Next.js проект с нуля: инициализация, структура, базовая DB интеграция, полный лендинг.

## Deliverables
1. Рабочий Next.js проект на порту 3001
2. Лендинг с Hero, Features, HowItWorks, CTA секциями и Footer
3. DB helper для better-sqlite3 (подключение к общей SQLite)
4. API route `/api/tariffs` для чтения тарифов из БД
5. Страница `/tariffs` с карточками тарифов

## Step-by-step

### 1. Init project
```bash
cd ~/projects
npx create-next-app@latest interview-landing --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd interview-landing
npm install better-sqlite3 jose lucide-react
npm install -D @types/better-sqlite3
```

### 2. Create folder structure
Create these directories under src/:
- src/types/
- src/lib/
- src/components/
- src/app/tariffs/
- src/app/api/tariffs/

### 3. Types (`src/types/index.ts`)
```typescript
export interface TariffPlan {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  features: string[];
  max_interviews_per_day: number;
  is_active: boolean;
}

export interface InterviewSession {
  id: number;
  role: string;
  experience_level: string;
  started_at: string;
  completed: boolean;
  total_score?: number;
}

export interface User {
  id: number;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  email: string | null;
  role: string;
}
```

### 4. DB helper (`src/lib/db.ts`)
```typescript
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

export function getActiveTariffs(): TariffPlan[] {
  const stmt = getDb().prepare(
    'SELECT * FROM tariff_plans WHERE is_active = 1 ORDER BY price ASC'
  );
  return stmt.all() as TariffPlan[];
}

import type { TariffPlan } from '@/types';
```

### 5. Constants (`src/lib/constants.ts`)
```typescript
export const APP_NAME = 'AI Interview Trainer';
export const APP_DESCRIPTION = 'Practice technical interviews with AI-powered feedback and realistic questions.';
export const BOT_USERNAME = 'developing_interview_trainer_bot';
export const MINI_APP_URL = 'https://provincial-indicating-rip-operation.trycloudflare.com';
```

### 6. API Route (`src/app/api/tariffs/route.ts`)
```typescript
import { NextResponse } from 'next/server';
import { getActiveTariffs } from '@/lib/db';

export async function GET() {
  try {
    const tariffs = getActiveTariffs();
    return NextResponse.json(tariffs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tariffs' }, { status: 500 });
  }
}
```

### 7. Root Layout (`src/app/layout.tsx`)
- Import Inter font from next/font/google
- HTML lang="en"
- SEO metadata: title "AI Interview Trainer — Ace Your Next Tech Interview"
- Viewport with device-width, initial-scale=1
- Import globals.css
- Wrap children in a simple div with min-h-screen

### 8. Landing Page Components

All landing components go in `src/components/`. All are 'use client' for animations/interactions.

#### LandingHero (`src/components/LandingHero.tsx`)
```
'use client'
- Large headline: "Ace Your Next Tech Interview with AI"
- Subtitle: "Practice with realistic questions, get instant AI feedback, and track your progress across 4 roles and 3 experience levels."
- Two CTA buttons side by side:
  "Start Free Practice" → deep link to Telegram bot (tg://resolve?domain=developing_interview_trainer_bot&start)
  "View Plans" → /tariffs
- Background: gradient from dark blue (#0f172a) to darker (#020617)
- Text: white
- Buttons: primary (emerald #10b981) and outline (white border)
- Responsive: centered on mobile, wider on desktop
```

#### LandingFeatures (`src/components/LandingFeatures.tsx`)
```
'use client'
- Title: "Why AI Interview Trainer?"
- 4 feature cards in 2x2 grid (1 column on mobile):
  1. 🤖 AI-Powered Evaluation — GPT-4o scores your answers 1-10 with detailed feedback
  2. 📚 4 Roles, 3 Levels — Frontend, Backend, Fullstack, ML × Junior, Mid, Senior
  3. 📊 Progress Tracking — Track scores, identify weak spots, revisit past sessions
  4. ⚡ Instant Feedback — No waiting. Answer, get evaluated, improve immediately
- Each card: icon emoji (large), title (bold), description
- Cards have subtle border, rounded corners, light hover effect
- Section bg: white/gray-50, cards: white with shadow
```

#### LandingHowItWorks (`src/components/LandingHowItWorks.tsx`)
```
'use client'
- Title: "How It Works"
- 3 steps in a row (vertical on mobile):
  1. Choose Your Role — Pick from Frontend, Backend, Fullstack, or Machine Learning
  2. Answer 5 Questions — Type your answers, each one is evaluated by AI in real-time
  3. Get Your Score — Receive detailed feedback, scores, and study recommendations
- Each step: number circle (1,2,3), title, description
- Connected by dashed line on desktop
- Section bg: gray-50
```

#### LandingCTA (`src/components/LandingCTA.tsx`)
```
'use client'
- Title: "Ready to Ace Your Interview?"
- Subtitle: "Join thousands of developers practicing with AI. Start free — no credit card."
- Big CTA button: "Start Practicing →" → tg://resolve?domain=developing_interview_trainer_bot&start
- Secondary text: "Open in Telegram" with Telegram icon (paper plane emoji)
- Background: dark gradient matching hero
```

#### Footer (`src/components/Footer.tsx`)
```
Not 'use client' — server component
- 3 columns:
  Product: Home, Pricing (/tariffs), Telegram Bot
  Company: About, Privacy, Terms (placeholder links)
  Connect: Telegram link, Email (placeholder)
- Bottom bar: © 2026 AI Interview Trainer. All rights reserved.
- Subtle, dark bg (#0f172a), light gray text
```

#### TariffCard (`src/components/TariffCard.tsx`)
```
'use client'
- Props: plan: TariffPlan, highlighted?: boolean (for "Most Popular")
- Card shows:
  - Name (bold, large)
  - Price: $X.XX / month (or "Free Forever" for $0)
  - Feature list with checkmarks (✓)
  - "Most Popular" badge on Pro plan (if highlighted)
  - CTA button: "Get Started" (Free → Telegram bot)
- Responsive: full width on mobile, 1/3 on desktop
```

### 9. Landing Page (`src/app/page.tsx`)
```typescript
import LandingHero from '@/components/LandingHero';
import LandingFeatures from '@/components/LandingFeatures';
import LandingHowItWorks from '@/components/LandingHowItWorks';
import LandingCTA from '@/components/LandingCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingCTA />
      <Footer />
    </>
  );
}
```

### 10. Tariffs Page (`src/app/tariffs/page.tsx`)
- Server component that fetches tariffs via getActiveTariffs()
- Passes tariffs array to client component TariffCardsGrid
- TariffCardsGrid: renders TariffCard for each plan
- Highlights Pro as "Most Popular"
- Shows loading/empty states

### 11. Global CSS (`src/app/globals.css`)
```css
@import "tailwindcss";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

### 12. next.config.ts
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
```

### 13. .env.local
```
JWT_SECRET=dev-secret-do-not-use-in-production-change-me
DATABASE_PATH=/home/hermes/projects/ai-interview-trainer/data/interviews.db
TELEGRAM_BOT_USERNAME=developing_interview_trainer_bot
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 14. Run
```bash
cd ~/projects/interview-landing
npm run dev -- -p 3001
```

## Design Notes
- **Colors**: bg dark #0f172a (hero/footer), white/gray-50 (content sections), emerald #10b981 (primary accent)
- **Typography**: Inter font via next/font/google
- **Landing style**: Modern SaaS landing (like Vercel/Linear) — clean, spacious, dark sections alternating with light
- **Responsive**: Mobile-first, breakpoints at 768px and 1024px
- **Animations**: Subtle — buttons have hover/active scale, cards have border highlight on hover (via CSS, no library)

## Quality
- TypeScript strict — no `any` types anywhere
- Server components for data fetching, 'use client' only for interactive components
- Loading skeleton on /tariffs while data loads
- SEO metadata on layout.tsx (title, description, open graph)
- No placeholder text or TODO comments

## You must NOT modify
- Any files outside ~/projects/interview-landing/
- The existing projects: ai-interview-trainer, ai-interview-trainer-back, interview-mini-app
