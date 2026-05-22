'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardShellProps {
  username: string | null;
  firstName: string | null;
  children: React.ReactNode;
}

export default function DashboardShell({ username, firstName, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'POST' });
    router.replace('/auth/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />
      <div className="flex flex-col flex-1 min-w-0 md:ml-16 lg:ml-60">
        <DashboardHeader
          username={username}
          firstName={firstName}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
