'use client';

import { useTranslation } from '@/lib/i18n';

export default function LandingFeatures() {
  const { t } = useTranslation();

  const features = [
    {
      icon: '🎤',
      titleKey: 'features.voice.title',
      descKey: 'features.voice.desc',
    },
    {
      icon: '🌐',
      titleKey: 'features.platform.title',
      descKey: 'features.platform.desc',
    },
    {
      icon: '🌍',
      titleKey: 'features.languages.title',
      descKey: 'features.languages.desc',
    },
    {
      icon: '📄',
      titleKey: 'features.resume.title',
      descKey: 'features.resume.desc',
    },
    {
      icon: '🎭',
      titleKey: 'features.behavioral.title',
      descKey: 'features.behavioral.desc',
    },
    {
      icon: '📚',
      titleKey: 'features.tracking.title',
      descKey: 'features.tracking.desc',
    },
    {
      icon: '⚡',
      titleKey: 'features.feedback.title',
      descKey: 'features.feedback.desc',
    },
    {
      icon: '🏢',
      titleKey: 'features.companies.title',
      descKey: 'features.companies.desc',
    },
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="flex gap-5 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-200"
            >
              <div className="text-4xl flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{t(feature.titleKey)}</h3>
                <p className="text-slate-500 leading-relaxed">{t(feature.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}