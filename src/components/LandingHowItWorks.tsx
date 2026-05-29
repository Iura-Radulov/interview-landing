'use client';

import { useTranslation } from '@/lib/i18n';

export default function LandingHowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      titleKey: 'how.step1.title',
      descKey: 'how.step1.desc',
    },
    {
      number: 2,
      titleKey: 'how.step2.title',
      descKey: 'how.step2.desc',
    },
    {
      number: 3,
      titleKey: 'how.step3.title',
      descKey: 'how.step3.desc',
    },
  ];

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t('how.title')}</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            {t('how.subtitle')}
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex-1 flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-px border-t-2 border-dashed border-emerald-200 z-0" />
              )}
              <div className="relative z-10 w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-200 mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{t(step.titleKey)}</h3>
              <p className="text-slate-500 leading-relaxed max-w-xs">{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}