'use client';

import { BOT_USERNAME } from '@/lib/constants';

export default function LandingCTA() {
  const botDeepLink = `tg://resolve?domain=${BOT_USERNAME}&start`;

  return (
    <section
      className="py-24 px-4 text-center"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Ace Your Interview?
        </h2>
        <p className="text-lg text-slate-300 mb-10">
          Join thousands of developers practicing with AI. Start free — no credit card required.
        </p>

        <a
          href={botDeepLink}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-bold text-xl transition-all duration-150 shadow-xl shadow-emerald-500/30 mb-6"
        >
          Start Practicing →
        </a>

        <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
          <span>✈️</span>
          Open in Telegram
        </p>
      </div>
    </section>
  );
}
