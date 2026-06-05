import type { Metadata } from 'next';
import TelegramLoginPage from './TelegramLoginPage';

export const metadata: Metadata = {
  title: 'Login — AI Interview Trainer',
  description: 'Sign in via Telegram to access your dashboard.',
};

export default function LoginPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10 text-center">
          <div className="mb-6">
            <span className="text-5xl">🤖</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back
          </h1>
          <p className="text-slate-400 mb-8">
            Sign in with Telegram to access your interview dashboard.
          </p>

          <TelegramLoginPage />

          <ol className="mt-8 text-left space-y-3 text-sm text-slate-400">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
              Click the button to open Telegram bot
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
              Send <code className="px-1 py-0.5 rounded bg-white/10 text-emerald-300">/start</code> to the bot
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
              Copy the code from the bot&apos;s reply
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
              Enter it below and click Sign in
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
