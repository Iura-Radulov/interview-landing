import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AuthGuard from '@/components/AuthGuard';
import DashboardShell from '@/components/DashboardShell';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect('/auth/login');
  }

  return (
    <AuthGuard>
      <DashboardShell username={session.username} firstName={session.firstName}>
        {children}
      </DashboardShell>
    </AuthGuard>
  );
}
