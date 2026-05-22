# Chunk 3/3 — Dashboard

## Goal
Создать полноценный дашборд для авторизованных пользователей.

## Prerequisites
Chunk 1 и 2 выполнены — лендинг работает, авторизация через Telegram работает.

## Deliverables
1. Dashboard layout с sidebar + header
2. Dashboard home — stats cards, recent interviews
3. Interview history page — таблица с пагинацией
4. Profile page — отображение данных, план, настройки
5. API routes для данных дашборда

## Files to Create

### src/app/dashboard/layout.tsx
```typescript
// Dashboard layout with sidebar + header
// Imports DashboardSidebar, DashboardHeader
// AuthGuard wrapping
// Responsive: sidebar collapses to hamburger on mobile
```

### src/components/DashboardSidebar.tsx
```
'use client'
- Logo/app name at top
- Navigation links with icons (lucide-react):
  - Home (LayoutDashboard icon) → /dashboard
  - My Interviews (ListChecks icon) → /dashboard/interviews
  - Profile (UserCircle icon) → /dashboard/profile
  - Mini App (Smartphone icon) → opens Mini App in new tab
- Bottom: Logout button (LogOut icon)
- Active link highlighted with accent color
- Collapsible on mobile (hamburger toggle)
- Dark sidebar (#0f172a) with white text
```

### src/components/DashboardHeader.tsx
```
'use client'
- Top bar across main content area
- Left: page title (passed as prop)
- Right: user avatar (first letter circle) + username dropdown
- Responsive: full width
- Light background (white), subtle bottom border
```

### src/app/dashboard/page.tsx
```
- Server component (or client with data fetching)
- Shows:
  - Welcome back, {username}!
  - 4 stats cards in 2x2 grid:
    1. Total Interviews — number
    2. Average Score — number with color indicator
    3. Current Plan — plan name
    4. Sessions This Week — number
  - "Recent Interviews" section (last 5)
    - Each row: date, role, level, score
    - Click → /dashboard/interviews (scroll to detail)
  - "Start New Practice" button → opens Mini App
```

### src/components/StatsCard.tsx
```
Props: title, value, icon (lucide ReactNode), color (optional accent color)
- Card with icon, title (small gray), value (large bold)
- Subtle shadow, rounded corners
```

### src/app/dashboard/interviews/page.tsx
```
- Table of all user's interviews
- Columns: Date, Role, Level, Score, Actions
- Sorted by date desc
- Pagination (10 per page)
- Click row → expand or modal with full session summary
- Empty state: "No interviews yet. Start your first one!"
- Data from: /api/dashboard/interviews?page=1
```

### src/app/dashboard/profile/page.tsx
```
- User info section: telegram username, first name, email
- Current tariff plan with expiry date
- Subscription status (active/expired)
- Link to Telegram bot for payments
- Logout button (red, secondary)
```

### API Routes

#### GET /api/dashboard/stats
```typescript
// Auth required
// Returns:
{
  totalInterviews: number,
  avgScore: number,
  currentPlan: { name: string, features: string[] } | null,
  recentSessions: InterviewSession[]
}
// Query sessions from shared DB for current user
```

#### GET /api/dashboard/interviews
```typescript
// Auth required
// Query: page (default 1), perPage (default 10)
// Returns:
{
  sessions: InterviewSession[],
  total: number,
  page: number,
  totalPages: number
}
```

### src/lib/db.ts — add functions:
```typescript
export function getUserStats(telegramId: number): UserStats
export function getUserInterviews(telegramId: number, page: number, perPage: number): { sessions: Session[], total: number }
export function getUserSubscription(telegramId: number): Subscription | null
```

## Design
- Sidebar: fixed left, 240px wide, dark bg
- Main content: margin-left 240px, white bg, padding
- Stats cards: 2x2 grid, each has icon + value + label
- Interview table: clean, minimal, hover rows
- Responsive breakpoints:
  - <768px: sidebar hidden (hamburger drawer), full-width content
  - 768-1024px: sidebar icons only (collapsed)
  - >1024px: full sidebar

## Run
```bash
cd ~/projects/interview-landing && npm run dev -- -p 3001
```

## Quality
- All API routes check auth (401 if no session)
- Pagination with page indicators
- Empty states for no data
- Loading states (skeleton/spinner)
- Error states (retry button)
- Responsive: works on mobile and desktop
