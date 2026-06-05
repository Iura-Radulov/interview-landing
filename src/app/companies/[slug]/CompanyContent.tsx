'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import LandingNav from '@/components/LandingNav';
import Footer from '@/components/Footer';
import { getCompanyBySlug, COMPANIES } from '@/lib/companies';
import { useTranslation } from '@/lib/i18n';
import { BOT_USERNAME } from '@/lib/constants';

interface Props {
  slug: string;
}

export default function CompanyPageContent({ slug }: Props) {
  const company = getCompanyBySlug(slug);
  const { t, uiLang } = useTranslation();
  const botDeepLink = `tg://resolve?domain=${BOT_USERNAME}&start`;

  if (!company) {
    notFound();
  }

  const name = uiLang === 'ru' ? company.nameRu : company.nameEn;
  const desc = uiLang === 'ru' ? company.descriptionRu : company.descriptionEn;
  const longDesc = uiLang === 'ru' ? company.longDescriptionRu : company.longDescriptionEn;
  const tags = uiLang === 'ru' ? company.tagsRu : company.tagsEn;
  const otherCompanies = COMPANIES.filter((c) => c.slug !== slug);

  return (
    <>
      <LandingNav />

      {/* Hero */}
      <div
        className="relative px-4 py-24 pt-28 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-5xl mb-6">{company.emoji}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('companies.prepare_for', { company: name })}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
            {desc}
          </p>
          <a
            href={botDeepLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-semibold text-lg transition-all duration-150 shadow-lg shadow-emerald-500/25"
          >
            {t('companies.start_practice')}
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Long description */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-slate-600 leading-relaxed">
            {longDesc}
          </p>
        </div>
      </section>

      {/* Focus areas */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            {t('companies.interview_focus')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {t('companies.cta_title', { company: name })}
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            {t('companies.cta_desc')}
          </p>
          <a
            href={botDeepLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-semibold text-lg transition-all duration-150 shadow-lg shadow-emerald-500/25"
          >
            {t('companies.start_practice')}
            <span>→</span>
          </a>
        </div>
      </section>

      {/* Other companies */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            {t('companies.view_all')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCompanies.slice(0, 6).map((c) => {
              const cName = uiLang === 'ru' ? c.nameRu : c.nameEn;
              const cDesc = uiLang === 'ru' ? c.descriptionRu : c.descriptionEn;
              return (
                <Link
                  key={c.slug}
                  href={`/companies/${c.slug}`}
                  className="group flex flex-col p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-3xl mb-3">{c.emoji}</div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {cName}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {cDesc}
                  </p>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-emerald-400 text-slate-700 font-medium transition-all"
            >
              {t('companies.view_all')}
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
