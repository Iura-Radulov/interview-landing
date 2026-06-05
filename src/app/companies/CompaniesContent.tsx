'use client';

import Link from 'next/link';
import LandingNav from '@/components/LandingNav';
import Footer from '@/components/Footer';
import { COMPANIES } from '@/lib/companies';
import { useTranslation } from '@/lib/i18n';
import { BOT_USERNAME } from '@/lib/constants';

export default function CompaniesContent() {
  const { t, uiLang } = useTranslation();
  const botDeepLink = `tg://resolve?domain=${BOT_USERNAME}&start`;

  return (
    <>
      <LandingNav />

      {/* Hero */}
      <div
        className="relative px-4 py-24 pt-28 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('companies.title')}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t('companies.subtitle')}
          </p>
        </div>
      </div>

      {/* Company cards */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANIES.map((company) => {
              const name = uiLang === 'ru' ? company.nameRu : company.nameEn;
              const desc = uiLang === 'ru' ? company.descriptionRu : company.descriptionEn;
              const tags = uiLang === 'ru' ? company.tagsRu : company.tagsEn;
              return (
                <Link
                  key={company.slug}
                  href={`/companies/${company.slug}`}
                  className="group relative flex flex-col p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-4xl mb-4">{company.emoji}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                    {desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            {t('hero.cta_start')}
          </h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            {t('hero.footnote')}
          </p>
          <a
            href={botDeepLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-semibold text-lg transition-all duration-150 shadow-lg shadow-emerald-500/25"
          >
            {t('hero.cta_start')}
            <span>→</span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
