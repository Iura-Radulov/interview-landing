'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from '@/lib/i18n';
import { Building2, Plus, ExternalLink, Trash2, Loader2, CheckCircle, Link as LinkIcon, Briefcase } from 'lucide-react';

interface CompanySetItem {
  slug: string;
  name_en: string;
  name_ru: string;
  emoji: string | null;
  is_free: number;
}

interface UserCompanyItem {
  id: number;
  company_name: string;
  vacancy_url: string;
  position: string;
  ai_context: string;
  created_at: string;
}

export default function DashboardCompaniesPage() {
  const { t, uiLang } = useTranslation();
  const [companySets, setCompanySets] = useState<CompanySetItem[]>([]);
  const [userCompanies, setUserCompanies] = useState<UserCompanyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [planName, setPlanName] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formPosition, setFormPosition] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const isPremium = planName === 'Premium';

  const fetchData = useCallback(async () => {
    try {
      const [companiesRes, profileRes] = await Promise.all([
        fetch('/api/dashboard/companies'),
        fetch('/api/dashboard/profile'),
      ]);
      if (companiesRes.ok) {
        const data = await companiesRes.json();
        setCompanySets(data.companySets || []);
        setUserCompanies(data.userCompanies || []);
      }
      if (profileRes.ok) {
        const data = await profileRes.json();
        setPlanName(data.subscription?.plan_name || null);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!formName.trim() || !formPosition.trim() || !formUrl.trim()) return;
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/dashboard/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formName.trim(),
          vacancy_url: formUrl.trim(),
          position: formPosition.trim(),
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || 'Failed to add company');
        return;
      }

      setSuccess(t('dashboard.companies_added'));
      setFormName('');
      setFormUrl('');
      setFormPosition('');
      setShowForm(false);
      await fetchData();
    } catch {
      setError('Network error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(t('dashboard.companies_delete_confirm'))) return;
    setDeletingId(id);
    try {
      await fetch(`/api/dashboard/companies?id=${id}`, { method: 'DELETE' });
      await fetchData();
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const webDeepLink = (id: number) => `https://mini.techinterviewai.com/company?id=${id}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.companies_title')}</h1>
        <p className="text-gray-500 mt-1 text-sm">{t('dashboard.companies_subtitle')}</p>
      </div>

      {/* Premium restriction notice */}
      {!isPremium && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">⭐</div>
          <h3 className="text-lg font-semibold text-amber-900 mb-2">{t('dashboard.premium_only')}</h3>
          <p className="text-amber-700 text-sm mb-4">{t('dashboard.companies_premium')}</p>
          <a
            href="/tariffs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm transition-all"
          >
            {t('nav.plans')} →
          </a>
        </div>
      )}

      {isPremium && (
        <>
          {/* Built-in Company Sets */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-500" />
              {t('dashboard.companies_available')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {companySets.map((cs) => {
                const name = uiLang === 'ru' ? cs.name_ru : cs.name_en;
                return (
                  <div
                    key={cs.slug}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-slate-50 text-sm text-slate-700"
                  >
                    <span>{cs.emoji || '🏢'}</span>
                    <span className="font-medium truncate">{name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User's Custom Companies */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                {t('dashboard.companies_custom')}
              </h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-all"
              >
                <Plus className="w-4 h-4" />
                {t('dashboard.companies_add')}
              </button>
            </div>

            {/* Add form */}
            {showForm && (
              <form onSubmit={handleAdd} className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('dashboard.companies_name')} *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={t('dashboard.companies_name_placeholder')}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('dashboard.companies_position')}
                  </label>
                  <input
                    type="text"
                    value={formPosition}
                    onChange={(e) => setFormPosition(e.target.value)}
                    placeholder={t('dashboard.companies_position_placeholder')}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('dashboard.companies_url')}
                  </label>
                  <input
                    type="url"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder={t('dashboard.companies_url_placeholder')}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && (
                  <p className="text-sm text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> {success}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={submitting || !formName.trim() || !formPosition.trim() || !formUrl.trim()}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white text-sm font-medium transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('dashboard.companies_ai_generating')}
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        {t('dashboard.companies_add')}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Companies list */}
            {userCompanies.length === 0 && !showForm ? (
              <div className="text-center py-8 text-gray-400">
                <p>{t('dashboard.companies_empty')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userCompanies.map((uc) => (
                  <div
                    key={uc.id}
                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-lg shrink-0">
                      🏢
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">{uc.company_name}</h3>
                      {uc.position && (
                        <p className="text-xs text-gray-500 mt-0.5">{uc.position}</p>
                      )}
                      <div className="flex flex-wrap gap-3 mt-2">
                        {uc.vacancy_url ? (
                          <a
                            href={uc.vacancy_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                          >
                            <LinkIcon className="w-3 h-3" />
                            {t('dashboard.companies_url')}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">{t('dashboard.companies_no_url')}</span>
                        )}
                        {uc.ai_context && (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                            <CheckCircle className="w-3 h-3" />
                            {t('dashboard.companies_generated')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={webDeepLink(uc.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 transition-all"
                      >
                        {t('dashboard.companies_start_interview')}
                      </a>
                      <button
                        onClick={() => handleDelete(uc.id)}
                        disabled={deletingId === uc.id}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                        title={t('dashboard.companies_delete')}
                      >
                        {deletingId === uc.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
