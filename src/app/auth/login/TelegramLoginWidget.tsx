'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BOT_USERNAME, LANDING_URL } from '@/lib/constants';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramUser) => void;
    Telegram?: {
      Login?: {
        auth: (options: { bot_id: string; request_access?: boolean }, callback: (data: TelegramUser) => void) => void;
      };
    };
  }
}

export default function TelegramLoginWidget() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = useCallback(
    async (user: TelegramUser) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/auth/telegram-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Login failed');
        }

        // Redirect to dashboard
        router.push('/dashboard');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
        setLoading(false);
      }
    },
    [router],
  );

  useEffect(() => {
    // Expose callback globally for the Telegram widget script
    window.onTelegramAuth = handleAuth;

    // Load Telegram Login Widget script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', BOT_USERNAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      window.onTelegramAuth = undefined;
      // Clean up script element if still mounted
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [handleAuth]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={containerRef} className="flex justify-center" />

      {loading && (
        <p className="text-sm text-slate-400 animate-pulse">
          Signing in…
        </p>
      )}

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          {error === 'Invalid auth data'
            ? 'Authentication failed. Please try again.'
            : error}
        </div>
      )}
    </div>
  );
}
