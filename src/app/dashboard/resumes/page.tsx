'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from '@/lib/i18n';
import {
  FileText, Upload, Download, Trash2, Loader2,
  CheckCircle, AlertCircle, Star, X,
  Plus, Briefcase, Eye
} from 'lucide-react';

interface AnalysisResult {
  overall_score: number;
  ats_score: number;
  strengths: string[];
  weaknesses: string[];
  section_scores: Record<string, number>;
  recommendations: string[];
  missing_keywords: string[];
  formatting_suggestions: string[];
  fixed_content: string;
}

interface ResumeItem {
  id: number;
  original_filename: string;
  role: string;
  experience_level: string;
  company_name: string;
  analysis: AnalysisResult | null;
  created_at: string;
}

interface RoleItem {
  name_en: string;
  name_ru: string;
  emoji: string;
  is_primary: number;
}

interface UserCompanyItem {
  id: number;
  company_name: string;
  position: string;
}

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color =
    score >= 80 ? 'bg-emerald-100 text-emerald-800' :
    score >= 60 ? 'bg-amber-100 text-amber-800' :
    'bg-red-100 text-red-800';

  return (
    <div className={`px-3 py-2 rounded-lg ${color} text-center min-w-[100px]`}>
      <div className="text-2xl font-bold">{score}</div>
      <div className="text-xs font-medium opacity-80">{label}</div>
    </div>
  );
}

function ScoreBar({ label, score, maxScore = 100 }: { label: string; score: number; maxScore?: number }) {
  const pct = Math.round((score / maxScore) * 100);
  const color = pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-10 text-right">{score}</span>
    </div>
  );
}

const LEVELS = ['Junior', 'Mid', 'Senior'];

export default function DashboardResumesPage() {
  const { t, uiLang } = useTranslation();

  // Data states
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [companies, setCompanies] = useState<UserCompanyItem[]>([]);
  const [planName, setPlanName] = useState<string | null>(null);
  const [usage, setUsage] = useState<{
    used_this_month: number;
    max_monthly: number;
    remaining: number;
    unlimited: boolean;
  } | null>(null);

  // UI states
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'list' | 'upload'>('list');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Upload form states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [dragOver, setDragOver] = useState(false);

  // View
  const [viewingResume, setViewingResume] = useState<ResumeItem | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPremium = planName === 'Premium';
  const isSubscribed = planName === 'Pro' || planName === 'Premium';
  const canFullAccess = isPremium;
  const canDownloadFixed = isPremium;
  const canUseCompany = isPremium;
  const limitReached = usage !== null && !usage.unlimited && usage.remaining <= 0;

  const fetchData = useCallback(async () => {
    try {
      const [resumesRes, rolesRes, companiesRes, profileRes, usageRes] = await Promise.all([
        fetch('/api/dashboard/resumes'),
        fetch('/api/dashboard/roles'),
        fetch('/api/dashboard/companies'),
        fetch('/api/dashboard/profile'),
        fetch('/api/dashboard/resumes/usage'),
      ]);

      if (resumesRes.ok) {
        const data = await resumesRes.json();
        setResumes(data.resumes || []);
      }
      if (rolesRes.ok) {
        const data = await rolesRes.json();
        setRoles(data.roles || []);
      }
      if (companiesRes.ok) {
        const data = await companiesRes.json();
        setCompanies(data.userCompanies || []);
      }
      if (profileRes.ok) {
        const data = await profileRes.json();
        setPlanName(data.subscription?.plan_name || null);
      }
      if (usageRes.ok) {
        const data = await usageRes.json();
        setUsage(data);
      }
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setError('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setError('');
    }
  };

  // Prevent browser from opening / navigating to dropped files
  useEffect(() => {
    const preventDefault = (e: DragEvent) => {
      e.preventDefault();
    };
    document.addEventListener('dragover', preventDefault);
    document.addEventListener('drop', preventDefault);
    return () => {
      document.removeEventListener('dragover', preventDefault);
      document.removeEventListener('drop', preventDefault);
    };
  }, []);

  const handleCompanySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCompany(val);
    // Auto-fill role from company position if available
    if (val) {
      const company = companies.find(c => String(c.id) === val);
      if (company?.position) {
        setSelectedRole(company.position);
      }
    }
  };

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) {
      setError(t('dashboard.resumes_file_required'));
      return;
    }
    if (!selectedRole) {
      setError(t('dashboard.resumes_role_required'));
      return;
    }
    if (selectedFile.type && !selectedFile.type.includes('pdf')) {
      setError(t('dashboard.resumes_pdf_only'));
      return;
    }

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('target_role', selectedRole);
      formData.append('experience_level', selectedLevel || 'Mid');

      // Build company context string
      let companyContext = '';
      if (selectedCompany) {
        const company = companies.find(c => String(c.id) === selectedCompany);
        if (company) {
          companyContext = `${company.company_name}${company.position ? ' - ' + company.position : ''}`;
        }
      }
      formData.append('company_context', companyContext);

      const res = await fetch('/api/dashboard/resumes', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || 'Upload failed');
        return;
      }

      setSuccess(t('dashboard.resumes_success'));
      setSelectedFile(null);
      setSelectedRole('');
      setSelectedLevel('');
      setSelectedCompany('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTab('list');
      await fetchData();
    } catch {
      setError('Network error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(t('dashboard.resumes_delete_confirm'))) return;
    setDeletingId(id);
    try {
      await fetch(`/api/dashboard/resumes?id=${id}`, { method: 'DELETE' });
      await fetchData();
      if (viewingResume?.id === id) setViewingResume(null);
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
    }
  }

  function handleDownload(resume: ResumeItem) {
    if (!resume.analysis?.fixed_content) return;
    const filename = (resume.original_filename || 'resume').replace(/\.pdf$/i, '') + '_improved.txt';
    const blob = new Blob([resume.analysis.fixed_content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('en-CA'); // YYYY-MM-DD
    } catch {
      return dateStr;
    }
  }

  const roleDisplayName = (r: RoleItem) =>
    uiLang === 'ru' ? `${r.emoji || ''} ${r.name_ru}`.trim() : `${r.emoji || ''} ${r.name_en}`.trim();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Detail View ──
  if (viewingResume && viewingResume.analysis) {
    const a = viewingResume.analysis;
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setViewingResume(null)}
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-2 transition-colors"
            >
              {t('dashboard.resumes_back') || 'Back'}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{viewingResume.original_filename}</h1>
            <p className="text-gray-500 text-sm mt-1">
              {viewingResume.role} · {viewingResume.experience_level}
              {viewingResume.company_name && ` · ${viewingResume.company_name}`}
            </p>
          </div>
          {canDownloadFixed && (
          <button
            onClick={() => handleDownload(viewingResume)}
            disabled={!a.fixed_content}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-medium text-sm transition-all"
          >
            <Download className="w-4 h-4" />
            {t('dashboard.resumes_download')}
          </button>
          )}
        </div>

        {/* Scores */}
        <div className="flex gap-4 flex-wrap">
          <ScoreBadge score={a.overall_score} label={t('dashboard.resumes_overall')} />
          <ScoreBadge score={a.ats_score} label={t('dashboard.resumes_ats')} />
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {a.strengths?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                {t('dashboard.resumes_strengths')}
              </h3>
              <ul className="space-y-1.5">
                {a.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {a.weaknesses?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                {t('dashboard.resumes_weaknesses')}
              </h3>
              <ul className="space-y-1.5">
                {a.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section Scores */}
        {a.section_scores && Object.keys(a.section_scores).length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {t('dashboard.resumes_sections')}
            </h3>
            <div className="space-y-2.5">
              {Object.entries(a.section_scores).map(([key, score]) => (
                <ScoreBar key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} score={score} />
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {a.recommendations?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {t('dashboard.resumes_recommendations')}
            </h3>
            <ol className="space-y-2">
              {a.recommendations.map((r, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-blue-500 font-medium shrink-0 w-5">{i + 1}.</span>
                  {r}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Missing Keywords */}
        {a.missing_keywords?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {t('dashboard.resumes_keywords')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {a.missing_keywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Formatting Suggestions */}
        {a.formatting_suggestions?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {t('dashboard.resumes_formatting') || 'Formatting Suggestions'}
            </h3>
            <ul className="space-y-1.5">
              {a.formatting_suggestions.map((s, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // ── Main View ──
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.resumes_title')}</h1>
        <p className="text-gray-500 mt-1 text-sm">{t('dashboard.resumes_subtitle')}</p>
        {usage && !usage.unlimited && (
          <p className="text-xs text-gray-400 mt-2">
            {t('dashboard.resumes_used')}: {usage.used_this_month}/{usage.max_monthly} —{' '}
            {usage.remaining > 0
              ? `${t('dashboard.resumes_left')}: ${usage.remaining}`
              : t('dashboard.resumes_limit_reached')}
          </p>
        )}
      </div>

      {/* Plan upgrade hint for Free users */}
      {!isSubscribed && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <p className="text-sm text-blue-800 font-medium">{t('dashboard.resumes_upgrade_hint')}</p>
          </div>
          <a
            href="/tariffs"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium transition-all shrink-0"
          >
            {t('nav.plans')} →
          </a>
        </div>
      )}

      {/* Premium feature notice for Pro users */}
      {planName === 'Pro' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">⭐</span>
          <div className="flex-1">
            <p className="text-sm text-amber-800 font-medium">{t('dashboard.resumes_pro_hint')}</p>
          </div>
          <a
            href="/tariffs"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium transition-all shrink-0"
          >
            {t('nav.plans')} →
          </a>
        </div>
      )}
          {/* Tab navigation */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
            <button
              onClick={() => setTab('list')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              {t('dashboard.resumes_my')}
            </button>
            <button
              onClick={() => setTab('upload')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'upload' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              {t('dashboard.resumes_upload')}
            </button>
          </div>

          {/* Success / Error messages */}
          {success && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
              <CheckCircle className="w-4 h-4 shrink-0" />
              {success}
              <button onClick={() => setSuccess('')} className="ml-auto text-emerald-400 hover:text-emerald-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
              <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Tab: My Resumes */}
          {tab === 'list' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {resumes.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">{t('dashboard.resumes_empty')}</p>
                  <button
                    onClick={() => setTab('upload')}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    {t('dashboard.resumes_upload')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {resumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-lg shrink-0">
                        <FileText className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {resume.original_filename}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {resume.role} · {resume.experience_level}
                          {resume.company_name && ` · ${resume.company_name}`}
                        </p>
                        {resume.analysis && (
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                              resume.analysis.overall_score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                              resume.analysis.overall_score >= 60 ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              <Star className="w-3 h-3" />
                              {resume.analysis.overall_score}/100
                            </span>
                            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                              resume.analysis.ats_score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                              resume.analysis.ats_score >= 60 ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              ATS {resume.analysis.ats_score}/100
                            </span>
                            <span className="text-xs text-gray-400">{formatDate(resume.created_at)}</span>
                          </div>
                        )}
                        {!resume.analysis && (
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-400">{formatDate(resume.created_at)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {resume.analysis && (
                          <>
                            <button
                              onClick={() => setViewingResume(resume)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-all"
                            >
                              <Eye className="w-3 h-3" />
                              {t('dashboard.resumes_view')}
                            </button>
                            {canDownloadFixed && resume.analysis.fixed_content && (
                              <>
                              <button
                                onClick={() => handleDownload(resume)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 transition-all"
                              >
                                <Download className="w-3 h-3" />
                                {t('dashboard.resumes_download')}
                              </button>
                              <a
                                href={`/api/dashboard/resumes/download-pdf?id=${resume.id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-all"
                                download
                              >
                                <FileText className="w-3 h-3" />
                                PDF
                              </a>
                              </>
                            )}
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(resume.id)}
                          disabled={deletingId === resume.id}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                          title={t('dashboard.resumes_delete')}
                        >
                          {deletingId === resume.id ? (
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
          )}

          {/* Tab: Upload */}
          {tab === 'upload' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <form onSubmit={handleUpload} className="space-y-5">
                {/* File drop zone */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                    selectedFile
                      ? 'border-emerald-400 bg-emerald-50/50'
                      : dragOver
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {selectedFile ? (
                    <div>
                      <FileText className="w-10 h-10 mx-auto mb-2 text-emerald-500" />
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="mt-2 text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm text-gray-500">
                        {t('dashboard.resumes_file')}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF only</p>
                    </div>
                  )}
                </div>

                {/* Role selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('dashboard.resumes_role')} *
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                    >
                      <option value="">— {t('dashboard.resumes_select') || 'Select'} —</option>
                      {roles.map((r) => (
                        <option key={r.name_en} value={r.name_en}>
                          {roleDisplayName(r)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('dashboard.resumes_level')} *
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                    >
                      <option value="">— {t('dashboard.resumes_select') || 'Select'} —</option>
                      {LEVELS.map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Company selection (optional) */}
                {canUseCompany && companies.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('dashboard.resumes_company')}
                    </label>
                    <select
                      value={selectedCompany}
                      onChange={handleCompanySelect}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                    >
                      <option value="">— {t('dashboard.resumes_no_company') || 'No company'} —</option>
                      {companies.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.company_name}{c.position ? ` - ${c.position}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {limitReached && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {t('dashboard.resumes_limit_reached_msg')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !selectedFile || !selectedRole || limitReached}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold text-sm transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('dashboard.resumes_analyzing')}
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      {t('dashboard.resumes_analyze')}
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
    </div>
  );
}
