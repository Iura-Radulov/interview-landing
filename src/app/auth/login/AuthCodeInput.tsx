'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function AuthCodeInput() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (trimmed.length < 4) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid code');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setCode('');
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="Enter code"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
        disabled={loading}
        autoFocus
        className="w-full max-w-[200px] text-center text-2xl tracking-[0.3em] font-mono
                   px-4 py-3 rounded-xl border border-white/20 bg-white/5
                   text-white placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                   disabled:opacity-50 transition-all"
      />

      <button
        type="submit"
        disabled={loading || code.length < 4}
        className="inline-flex items-center justify-center w-full px-8 py-3 rounded-xl
                   bg-emerald-600 hover:bg-emerald-500 active:scale-95
                   text-white font-semibold text-lg transition-all duration-150
                   shadow-lg shadow-emerald-600/20
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {loading ? (
          <span className="animate-pulse">Verifying…</span>
        ) : (
          'Sign in'
        )}
      </button>

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-center">
          {error === 'invalid_token'
            ? 'Code is invalid or expired. Get a new one via Telegram.'
            : error}
        </div>
      )}
    </form>
  );
}
