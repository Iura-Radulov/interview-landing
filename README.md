# Browser Frontend — Master Plan

## Overview
Создаём браузерный фронтенд для AI Interview Trainer: лендинг + тарифы + дашборд с авторизацией через Telegram бота (magic link).

## Tech Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS 4
- better-sqlite3 + jose (JWT)
- lucide-react (иконки)

## DB
Общая SQLite: `/home/hermes/projects/ai-interview-trainer/data/interviews.db`

## Project Path
`~/projects/interview-landing/` — отдельный проект, не трогать существующие.

## Execution Plan (3 chunks)

### Chunk 1 — Scaffold + Landing
Создать проект, структуру папок, типы, DB helper, лендинг с Hero/Features/HowItWorks/CTA/Footer.

### Chunk 2 — Auth + Tariffs
JWT, login через Telegram magic link, callback, middleware, страница тарифов.

### Chunk 3 — Dashboard
Sidebar, stats cards, история интервью, профиль, защита роутов.

## Port
Отдельный порт 3001 (standalone). Не трогать Mini App на 3000.
