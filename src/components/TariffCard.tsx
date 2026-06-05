'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { TariffPlan } from '@/types';
import { BOT_USERNAME } from '@/lib/constants';
import { useTranslation } from '@/lib/i18n';

interface TariffCardProps {
  plan: TariffPlan;
  highlighted?: boolean;
}

export default function TariffCard({ plan, highlighted = false }: TariffCardProps) {
  const router = useRouter();
  const { t, uiLang } = useTranslation();
  const [loading, setLoading] = useState(false);
  const botLink = `https://t.me/${BOT_USERNAME}`;
  const isFree = plan.price === 0;
  const priceDisplay = isFree ? t('tariffs.free_forever') : `$${plan.price.toFixed(2)}`;
  const periodDisplay = isFree ? '' : ` ${t('tariffs.per_month')}`;
  // Use Russian features when interface language is Russian
  const displayFeatures = uiLang === 'ru' && plan.features_ru ? plan.features_ru : plan.features;

  const handleSubscribe = async () => {
    if (isFree) {
      window.open(botLink, '_blank');
      return;
    }

    setLoading(true);

    try {
      // Call Stripe checkout through landing API
      const res = await fetch('/api/tariffs/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_id: plan.id }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else if (data.loginUrl) {
        router.push(data.loginUrl);
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-200 ${
        highlighted
          ? 'bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 scale-105'
          : 'bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg shadow-sm'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wide uppercase shadow">
            {t('tariffs.most_popular')}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`text-xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-slate-900'}`}
        >
          {t(`plans.${plan.name}`, { defaultValue: plan.name })}
        </h3>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl font-extrabold ${highlighted ? 'text-white' : 'text-slate-900'}`}
          >
            {priceDisplay}
          </span>
          {periodDisplay && (
            <span className={`text-sm ${highlighted ? 'text-emerald-100' : 'text-slate-400'}`}>
              {periodDisplay}
            </span>
          )}
        </div>
        {!isFree && (
          <p className={`text-sm mt-1 ${highlighted ? 'text-emerald-100' : 'text-slate-400'}`}>
            {t('tariffs.duration', { days: plan.duration_days })}
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {displayFeatures.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex-shrink-0 text-lg ${highlighted ? 'text-emerald-100' : 'text-emerald-500'}`}
            >
              ✓
            </span>
            <span
              className={`text-sm leading-relaxed ${highlighted ? 'text-emerald-50' : 'text-slate-600'}`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-base transition-all duration-150 active:scale-95 disabled:opacity-50 ${
          highlighted
            ? 'bg-white text-emerald-600 hover:bg-emerald-50'
            : 'bg-emerald-500 hover:bg-emerald-400 text-white'
        }`}
      >
        {loading ? t('tariffs.redirecting') : isFree ? t('tariffs.get_started') : t('tariffs.subscribe_now')}
      </button>
    </div>
  );
}
