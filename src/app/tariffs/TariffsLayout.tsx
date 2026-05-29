'use client';

import LandingNav from '@/components/LandingNav';
import Footer from '@/components/Footer';
import { useTranslation } from '@/lib/i18n';

export default function TariffsLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <LandingNav />
        <div className="max-w-6xl mx-auto px-4 py-20 pt-28">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              {t('tariffs.title')}
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              {t('tariffs.subtitle')}
            </p>
          </div>

          {children}

          <div className="mt-16 text-center text-slate-400 text-sm">
            <p>{t('tariffs.footnote')}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}