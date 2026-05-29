'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/StatsCard';
import { BarChart3, Trophy, CreditCard, Calendar, ExternalLink } from 'lucide-react';
import { MINI_APP_WEB_URL } from '@/lib/constants';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

interface Stats {
  totalInterviews: number;
  avgScore: number | null;
  currentPlan: { name: string } | null;
  scores: number[];
  recentSessions: Array<{
    id: number;
    started_at: string;
    role: string;
    experience_level: string;
    total_score: number | null;
    completed: boolean;
  }>;
  sessionsThisWeek: number;
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function scoreColor(score: number | null | undefined) {
  if (score == null) return 'text-gray-400';
  if (score >= 75) return 'text-green-600';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
}

export default function DashboardPage() {
  const { t, uiLang } = useTranslation();
  const [stats, setStats] = useState<Stats | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, meRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/auth/me'),
        ]);
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data);
        }
        if (meRes.ok) {
          const me = await meRes.json();
          setFirstName(me.firstName);
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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const avgScoreColor =
    stats?.avgScore == null ? 'gray' as const : stats.avgScore >= 75 ? 'green' as const : stats.avgScore >= 50 ? 'yellow' as const : 'red' as const;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('dashboard.welcome', { name: firstName || 'User' })}
      </h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <StatsCard
          title={t('dashboard.total_interviews')}
          value={stats?.totalInterviews ?? 0}
          icon={<BarChart3 className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title={t('dashboard.avg_score')}
          value={stats?.avgScore !== null && stats?.avgScore !== undefined ? Math.round(stats.avgScore) : '—'}
          icon={<Trophy className="w-6 h-6" />}
          color={avgScoreColor}
        />
        <StatsCard
          title={t('dashboard.current_plan')}
          value={stats?.currentPlan?.name ?? 'Free'}
          icon={<CreditCard className="w-6 h-6" />}
          color="purple"
        />
        <StatsCard
          title={t('dashboard.sessions_this_week')}
          value={stats?.sessionsThisWeek ?? 0}
          icon={<Calendar className="w-6 h-6" />}
          color="teal"
        />
      </div>

      {/* Recent interviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.recent_interviews')}</h2>
          <Link href="/dashboard/interviews" className="text-sm text-blue-600 hover:underline">
            {t('dashboard.view_all')}
          </Link>
        </div>

        {!stats || stats.recentSessions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('dashboard.no_interviews')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">{t('dashboard.date_role')}</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">{t('dashboard.level')}</th>
                  <th className="text-left py-2 font-medium text-gray-500">{t('dashboard.score')}</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSessions.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-gray-900 capitalize">{s.role}</p>
                      <p className="text-xs text-gray-500">{formatDate(s.started_at, uiLang)}</p>
                    </td>
                    <td className="py-3 pr-4 text-gray-600 capitalize">{s.experience_level}</td>
                    <td className={`py-3 font-semibold ${scoreColor(s.total_score)}`}>
                      {s.completed && s.total_score != null ? s.total_score : s.completed ? '—' : t('dashboard.in_progress')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-3">
        <a
          href={MINI_APP_WEB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {t('dashboard.start_practice')}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
