'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SessionPayload } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch('/api/auth')
      .then((res) => res.json())
      .then((session: SessionPayload | null) => {
        if (!session) {
          router.replace('/auth/login');
        } else {
          setChecked(true);
        }
      })
      .catch(() => {
        router.replace('/auth/login');
      });
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
