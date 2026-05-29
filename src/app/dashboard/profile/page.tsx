'use client';

import { useEffect, useState } from 'react';
import LogoutButton from '@/components/LogoutButton';
import ManageSubscriptionButton from '@/components/ManageSubscriptionButton';
import { UserCircle, CreditCard, ExternalLink } from 'lucide-react';
import { BOT_USERNAME } from '@/lib/constants';
import { useTranslation } from '@/lib/i18n';

interface ProfileData {
  firstName: string | null;
  username: string | null;
  telegramId: number;
  email: string | null;
  subscription: {
    plan_name: string;
    start_date: string;
    end_date: string;
    features: string[];
    payment_type: string;
  } | null;
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ProfilePage() {
  const { t, uiLang } = useTranslation();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/dashboard/profile');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const isExpired = data.subscription
    ? new Date(data.subscription.end_date) < new Date()
    : false;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.profile_title')}</h1>

      {/* User info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <UserCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-semibold text-gray-900">{t('dashboard.account')}</h2>
        </div>
        <dl className="space-y-3 text-sm">
          {data.firstName && (
            <div className="flex justify-between">
              <dt className="text-gray-500">{t('dashboard.name')}</dt>
              <dd className="text-gray-900 font-medium">{data.firstName}</dd>
            </div>
          )}
          {data.username && (
            <div className="flex justify-between">
              <dt className="text-gray-500">{t('dashboard.telegram')}</dt>
              <dd className="text-gray-900 font-medium">@{data.username}</dd>
            </div>
          )}
          {data.email && (
            <div className="flex justify-between">
              <dt className="text-gray-500">{t('dashboard.email')}</dt>
              <dd className="text-gray-900 font-medium">{data.email}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-gray-500">{t('dashboard.telegram_id')}</dt>
            <dd className="text-gray-400 font-mono text-xs">{data.telegramId}</dd>
          </div>
        </dl>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <CreditCard className="w-5 h-5 text-purple-600" />
          <h2 className="text-base font-semibold text-gray-900">{t('dashboard.subscription')}</h2>
        </div>

        {data.subscription ? (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">{t('dashboard.plan')}</span>
              <span className="font-semibold text-gray-900">{data.subscription.plan_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">{t('dashboard.status_label')}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isExpired ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {isExpired ? t('dashboard.expired') : t('dashboard.active_status')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t('dashboard.started')}</span>
              <span className="text-gray-900">{formatDate(data.subscription.start_date, uiLang)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{isExpired ? t('dashboard.expired') : t('dashboard.expires')}</span>
              <span className={isExpired ? 'text-red-600' : 'text-gray-900'}>{formatDate(data.subscription.end_date, uiLang)}</span>
            </div>
            {data.subscription.features.length > 0 && (
              <div>
                <p className="text-gray-500 mb-2">{t('dashboard.features')}</p>
                <ul className="space-y-1">
                  {(uiLang === 'ru' && data.subscription.features_ru
                    ? data.subscription.features_ru
                    : data.subscription.features
                  ).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-1">{t('dashboard.no_subscription')}</p>
            <p className="text-sm text-gray-400">{t('dashboard.free_plan')}</p>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
          {data.subscription?.payment_type === 'card' ? (
            <ManageSubscriptionButton />
          ) : data.subscription?.payment_type === 'stars' ? (
            <a
              href={`https://t.me/${BOT_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-yellow-600 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              {t('dashboard.manage_in_bot')}
            </a>
          ) : (
            <a
              href={`https://t.me/${BOT_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              {t('dashboard.subscribe_via_bot')}
            </a>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">{t('dashboard.account_actions')}</h2>
        <LogoutButton />
      </div>
    </div>
  );
}
