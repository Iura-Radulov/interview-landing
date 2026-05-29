'use client';

import { BOT_USERNAME } from '@/lib/constants';
import { useTranslation } from '@/lib/i18n';

export default function LandingCTA() {
  const botDeepLink = `tg://resolve?domain=${BOT_USERNAME}&start`;
  const { t } = useTranslation();

  return (
    <section
      className="py-24 px-4 text-center"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-slate-300 mb-10">
          {t('cta.subtitle')}
        </p>

        <a
          href={botDeepLink}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-bold text-xl transition-all duration-150 shadow-xl shadow-emerald-500/30 mb-6"
        >
          {t('cta.button')}
        </a>

        <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
          <span>✈️</span>
          {t('cta.telegram')}
        </p>
      </div>
    </section>
  );
}