'use client';

import { useEffect, useState, useCallback } from 'react';
import type { InterviewSession } from '@/types';
import { ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ScoreBadge({ score, completed }: { score?: number; completed: boolean }) {
  const { t } = useTranslation();
  if (!completed) return <span className="text-yellow-600 text-xs font-medium">{t('dashboard.in_progress')}</span>;
  if (score == null) return <span className="text-gray-400">—</span>;
  const color = score >= 75 ? 'text-green-700 bg-green-50' : score >= 50 ? 'text-yellow-700 bg-yellow-50' : 'text-red-700 bg-red-50';
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>{score}</span>;
}

export default function InterviewsPage() {
  const { t, uiLang } = useTranslation();
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchPage = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/dashboard/interviews?page=${p}&perPage=10`);
      if (!res.ok) throw new Error('Failed to load interviews');
      const data = await res.json();
      setSessions(data.sessions);
      setTotal(data.total);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch {
      setError(t('dashboard.error_load'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => { fetchPage(1); }, [fetchPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-gray-500">{error}</p>
        <button
          onClick={() => fetchPage(page)}
          className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
        >
          <RefreshCw className="w-4 h-4" /> {t('dashboard.retry')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.interviews_title')}</h1>
        <p className="text-sm text-gray-500">{t('dashboard.interviews_total', { count: total })}</p>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg mb-2">{t('dashboard.no_interviews_title')}</p>
          <p className="text-gray-400 text-sm">{t('dashboard.no_interviews_desc')}</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div /> {/* expand toggle */}
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dashboard.date_role')}</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dashboard.level')}</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dashboard.score')}</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dashboard.status')}</span>
            </div>

            {sessions.map((s) => (
              <div key={s.id} className="border-b border-gray-50 last:border-0">
                <button
                  className="w-full grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-4 text-left hover:bg-gray-50 transition-colors items-center"
                  onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                >
                  <div className="text-gray-400">
                    {expandedId === s.id
                      ? <ChevronDown className="w-4 h-4" />
                      : <ChevronRight className="w-4 h-4" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{s.role}</p>
                    <p className="text-sm text-gray-500">{formatDate(s.started_at, uiLang)}</p>
                  </div>
                  <span className="text-sm text-gray-600 capitalize">{s.experience_level}</span>
                  <ScoreBadge score={s.total_score} completed={s.completed} />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.completed ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    {s.completed ? t('dashboard.done') : t('dashboard.active')}
                  </span>
                </button>

                {expandedId === s.id && (
                  <div className="px-12 pb-4 pt-1 bg-gray-50 text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-700">{t('dashboard.session_id')}:</span> {s.id}</p>
                    <p><span className="font-medium text-gray-700">{t('dashboard.started')}:</span> {new Date(s.started_at).toLocaleString(uiLang === 'ru' ? 'ru-RU' : 'en-US')}</p>
                    {s.completed_at && (
                      <p><span className="font-medium text-gray-700">{t('dashboard.completed')}:</span> {new Date(s.completed_at).toLocaleString(uiLang === 'ru' ? 'ru-RU' : 'en-US')}</p>
                    )}
                    {s.total_score != null && (
                      <p><span className="font-medium text-gray-700">{t('dashboard.score')}:</span> {t('dashboard.score_value', { score: s.total_score })}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                {t('dashboard.page_of', { page, total: totalPages })}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchPage(page - 1)}
                  disabled={page <= 1}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  {t('dashboard.previous')}
                </button>
                <button
                  onClick={() => fetchPage(page + 1)}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  {t('dashboard.next')}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
