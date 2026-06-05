'use client';

import Image from 'next/image';
import Link from 'next/link';
import LandingNav from './LandingNav';
import { BOT_USERNAME } from '@/lib/constants';
import { useTranslation } from '@/lib/i18n';

export default function LandingHero() {
  const botDeepLink = `tg://resolve?domain=${BOT_USERNAME}&start`;
  const { t } = useTranslation();

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-24 pt-28 text-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
    >
      <LandingNav />

      {/* Hero illustration background — below the fixed nav */}
      <div className="absolute left-0 right-0 top-16 bottom-0 flex items-center justify-center pointer-events-none select-none">
        <Image
          src="/images/hero-orbits.svg"
          alt=""
          fill
          className="object-cover opacity-70 sm:opacity-80"
          priority
          aria-hidden
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {t('hero.badge')}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            {t('hero.title', { role: '' })}{' '}
            <span className="text-emerald-400">{t('hero.title_highlight')}</span>{' '}
            with AI
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={botDeepLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-semibold text-lg transition-all duration-150 shadow-lg shadow-emerald-500/25 w-full sm:w-auto"
          >
            {t('hero.cta_start')}
            <span>→</span>
          </a>
          <Link
            href="/tariffs"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 hover:border-white/50 active:scale-95 text-white font-semibold text-lg transition-all duration-150 w-full sm:w-auto"
          >
            {t('hero.cta_plans')}
          </Link>
        </div>

        <p className="mt-6 text-slate-500 text-sm">{t('hero.footnote')}</p>
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
