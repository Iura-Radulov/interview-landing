import { getSession } from '@/lib/auth';
import { getUserStats } from '@/lib/db';
import StatsCard from '@/components/StatsCard';
import { BarChart3, Trophy, CreditCard, Calendar } from 'lucide-react';
import { MINI_APP_URL } from '@/lib/constants';
import Link from 'next/link';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
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

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const stats = getUserStats(session.telegramId);

  const avgScoreColor =
    stats.avgScore == null ? 'gray' : stats.avgScore >= 75 ? 'green' : stats.avgScore >= 50 ? 'yellow' : 'red';

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Welcome back, {session.firstName || session.username || 'User'}!
      </h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <StatsCard
          title="Total Interviews"
          value={stats.totalInterviews}
          icon={<BarChart3 className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Average Score"
          value={stats.avgScore !== null ? Math.round(stats.avgScore) : '—'}
          icon={<Trophy className="w-6 h-6" />}
          color={avgScoreColor}
        />
        <StatsCard
          title="Current Plan"
          value={stats.currentPlan?.name ?? 'Free'}
          icon={<CreditCard className="w-6 h-6" />}
          color="purple"
        />
        <StatsCard
          title="Sessions This Week"
          value={stats.sessionsThisWeek}
          icon={<Calendar className="w-6 h-6" />}
          color="teal"
        />
      </div>

      {/* Recent interviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Interviews</h2>
          <Link href="/dashboard/interviews" className="text-sm text-blue-600 hover:underline">
            View all →
          </Link>
        </div>

        {stats.recentSessions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No interviews yet. Start your first one!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Date</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Role</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Level</th>
                  <th className="text-left py-2 font-medium text-gray-500">Score</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSessions.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 pr-4 text-gray-600">{formatDate(s.started_at)}</td>
                    <td className="py-3 pr-4 text-gray-900 font-medium capitalize">{s.role}</td>
                    <td className="py-3 pr-4 text-gray-600 capitalize">{s.experience_level}</td>
                    <td className={`py-3 font-semibold ${scoreColor(s.total_score)}`}>
                      {s.completed && s.total_score != null ? s.total_score : s.completed ? '—' : 'In Progress'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CTA */}
      <a
        href={MINI_APP_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Start New Practice →
      </a>
    </div>
  );
}
