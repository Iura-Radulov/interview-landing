import { getSession } from '@/lib/auth';
import { getUserByTelegramId, getUserSubscription } from '@/lib/db';
import LogoutButton from '@/components/LogoutButton';
import { UserCircle, CreditCard, ExternalLink } from 'lucide-react';
import { BOT_USERNAME } from '@/lib/constants';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) return null;

  const user = getUserByTelegramId(session.telegramId);
  const subscription = getUserSubscription(session.telegramId);

  const isExpired = subscription
    ? new Date(subscription.end_date) < new Date()
    : false;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

      {/* User info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <UserCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-semibold text-gray-900">Account</h2>
        </div>
        <dl className="space-y-3 text-sm">
          {session.firstName && (
            <div className="flex justify-between">
              <dt className="text-gray-500">Name</dt>
              <dd className="text-gray-900 font-medium">{session.firstName}</dd>
            </div>
          )}
          {session.username && (
            <div className="flex justify-between">
              <dt className="text-gray-500">Telegram</dt>
              <dd className="text-gray-900 font-medium">@{session.username}</dd>
            </div>
          )}
          {user?.email && (
            <div className="flex justify-between">
              <dt className="text-gray-500">Email</dt>
              <dd className="text-gray-900 font-medium">{user.email}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-gray-500">Telegram ID</dt>
            <dd className="text-gray-400 font-mono text-xs">{session.telegramId}</dd>
          </div>
        </dl>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <CreditCard className="w-5 h-5 text-purple-600" />
          <h2 className="text-base font-semibold text-gray-900">Subscription</h2>
        </div>

        {subscription ? (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Plan</span>
              <span className="font-semibold text-gray-900">{subscription.plan_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isExpired ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {isExpired ? 'Expired' : 'Active'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Started</span>
              <span className="text-gray-900">{formatDate(subscription.start_date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{isExpired ? 'Expired' : 'Expires'}</span>
              <span className={isExpired ? 'text-red-600' : 'text-gray-900'}>{formatDate(subscription.end_date)}</span>
            </div>
            {subscription.features.length > 0 && (
              <div>
                <p className="text-gray-500 mb-2">Features</p>
                <ul className="space-y-1">
                  {subscription.features.map((f, i) => (
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
            <p className="text-gray-500 mb-1">No active subscription</p>
            <p className="text-sm text-gray-400">You are on the Free plan</p>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-gray-100">
          <a
            href={`https://t.me/${BOT_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Manage subscription in Telegram bot
          </a>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Account Actions</h2>
        <LogoutButton />
      </div>
    </div>
  );
}
