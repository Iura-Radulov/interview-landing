'use client';

import { useEffect, useState, useCallback } from 'react';
import type { InterviewSession } from '@/types';
import { ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ScoreBadge({ score, completed }: { score?: number; completed: boolean }) {
  if (!completed) return <span className="text-yellow-600 text-xs font-medium">In Progress</span>;
  if (score == null) return <span className="text-gray-400">—</span>;
  const color = score >= 75 ? 'text-green-700 bg-green-50' : score >= 50 ? 'text-yellow-700 bg-yellow-50' : 'text-red-700 bg-red-50';
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>{score}</span>;
}

export default function InterviewsPage() {
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
      setError('Failed to load interviews. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

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
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Interviews</h1>
        <p className="text-sm text-gray-500">{total} total</p>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg mb-2">No interviews yet.</p>
          <p className="text-gray-400 text-sm">Start your first practice session in the Mini App!</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div /> {/* expand toggle */}
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date / Role</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Level</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Score</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
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
                    <p className="text-sm text-gray-500">{formatDate(s.started_at)}</p>
                  </div>
                  <span className="text-sm text-gray-600 capitalize">{s.experience_level}</span>
                  <ScoreBadge score={s.total_score} completed={s.completed} />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.completed ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    {s.completed ? 'Done' : 'Active'}
                  </span>
                </button>

                {expandedId === s.id && (
                  <div className="px-12 pb-4 pt-1 bg-gray-50 text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-700">Session ID:</span> {s.id}</p>
                    <p><span className="font-medium text-gray-700">Started:</span> {new Date(s.started_at).toLocaleString()}</p>
                    {s.completed_at && (
                      <p><span className="font-medium text-gray-700">Completed:</span> {new Date(s.completed_at).toLocaleString()}</p>
                    )}
                    {s.total_score != null && (
                      <p><span className="font-medium text-gray-700">Score:</span> {s.total_score}/100</p>
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
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchPage(page - 1)}
                  disabled={page <= 1}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchPage(page + 1)}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
