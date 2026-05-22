'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BOT_USERNAME } from '@/lib/constants';

export default function LandingHero() {
  const botDeepLink = `tg://resolve?domain=${BOT_USERNAME}&start`;
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/status')
      .then((r) => r.json())
      .then((data) => setAuthed(data.authenticated))
      .catch(() => setAuthed(false))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-24 text-center"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
    >
      <div className="absolute top-5 right-6 z-20">
        {loading ? (
          <div className="w-24 h-9 rounded-full bg-white/5 animate-pulse" />
        ) : authed ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-400 transition-all duration-200"
          >
            Dashboard →
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-400 transition-all duration-200"
          >
            Sign In →
          </Link>
        )}
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AI-powered technical interview practice
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Ace Your Next{' '}
          <span className="text-emerald-400">Tech Interview</span>{' '}
          with AI
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Practice with realistic questions, get instant AI feedback, and track your progress
          across 4 roles and 3 experience levels.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={botDeepLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-semibold text-lg transition-all duration-150 shadow-lg shadow-emerald-500/25"
          >
            Start Free Practice
            <span>→</span>
          </a>
          <Link
            href="/tariffs"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 hover:border-white/50 active:scale-95 text-white font-semibold text-lg transition-all duration-150"
          >
            View Plans
          </Link>
        </div>

        <p className="mt-6 text-slate-500 text-sm">No credit card required · Free plan available</p>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.15) 0%, transparent 60%)',
        }}
      />
    </section>
  );
}
