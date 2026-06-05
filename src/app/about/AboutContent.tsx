'use client';

import Image from 'next/image';
import LandingNav from '@/components/LandingNav';
import Footer from '@/components/Footer';
import { useTranslation } from '@/lib/i18n';

export default function AboutContent() {
  const { t } = useTranslation();
  const EMAIL = 'info@techinterviewai.com';

  const features = [
    {
      titleKey: 'about.feature1.title',
      bodyKey: 'about.feature1.body',
    },
    {
      titleKey: 'about.feature2.title',
      bodyKey: 'about.feature2.body',
    },
    {
      titleKey: 'about.feature3.title',
      bodyKey: 'about.feature3.body',
    },
    {
      titleKey: 'about.feature4.title',
      bodyKey: 'about.feature4.body',
    },
    {
      titleKey: 'about.feature5.title',
      bodyKey: 'about.feature5.body',
    },
    {
      titleKey: 'about.feature6.title',
      bodyKey: 'about.feature6.body',
    },
  ];

  return (
    <>
      <LandingNav />

      <div
        className="relative px-4 py-24 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
      >
        {/* Hero illustration background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="relative w-full h-full max-w-4xl mx-auto">
            <Image
              src="/images/hero-about.svg"
              alt=""
              fill
              className="object-contain opacity-50 sm:opacity-60 md:opacity-70"
              style={{
                objectPosition: '50% 50%',
                maskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, black 25%, transparent 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, black 25%, transparent 65%)',
              }}
              priority
              aria-hidden
            />
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto pt-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-20 space-y-16">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('about.mission.title')}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t('about.mission.p1')}
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {t('about.mission.p2')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('about.what.title')}</h2>
            <p className="text-slate-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('about.what.p') }}>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.titleKey} className="rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{t(f.titleKey)}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(f.bodyKey) }} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('about.team.title')}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t('about.team.p1')}
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {t('about.team.p2')}
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed text-sm border-t border-slate-200 pt-4">
              {t('about.team.p3')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('about.contact.title')}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t('about.contact.p', { email: EMAIL })}
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
