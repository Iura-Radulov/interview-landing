'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ListChecks, UserCircle, Smartphone, ExternalLink, Bot, LogOut, X, House, Building2, FileText } from 'lucide-react';
import { MINI_APP_WEB_URL, MINI_APP_URL, LANDING_URL } from '@/lib/constants';
import { useTranslation } from '@/lib/i18n';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function DashboardSidebar({ isOpen, onClose, onLogout }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isPremium, setIsPremium] = useState(false);
  const [planLoaded, setPlanLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/dashboard/profile')
      .then((r) => r.json())
      .then((data) => {
        setIsPremium(data.subscription?.plan_name === 'Premium');
        setPlanLoaded(true);
      })
      .catch(() => setPlanLoaded(true));
  }, []);

  const navLinks = [
    { href: '/dashboard', icon: LayoutDashboard, label: t('dashboard.home') },
    { href: '/dashboard/interviews', icon: ListChecks, label: t('dashboard.my_interviews') },
    { href: '/dashboard/profile', icon: UserCircle, label: t('dashboard.profile') },
    { href: '/dashboard/companies', icon: Building2, label: t('dashboard.companies'), premium: true },
    { href: '/dashboard/resumes', icon: FileText, label: t('dashboard.resumes') },
  ].filter(l => !l.premium || isPremium);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed top-0 left-0 h-full bg-[#0f172a] text-white z-40 flex flex-col',
          'transition-transform duration-300',
          'w-60',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:w-16',
          'lg:w-60',
        ].join(' ')}
      >
        {/* Logo / app name — ссылка на главную лендинга */}
        <a
          href={LANDING_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-5 border-b border-white/10 shrink-0 hover:bg-white/5 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
            AI
          </div>
          <span className="font-semibold text-sm truncate md:hidden lg:block">
            AI Interview
          </span>
          <ExternalLink className="w-3 h-3 ml-auto text-white/30 md:hidden lg:block" />
          <button
            onClick={(e) => { e.preventDefault(); onClose(); }}
            className="ml-auto text-white/60 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </a>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navLinks.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={[
                  'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors text-sm',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white',
                ].join(' ')}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate md:hidden lg:block">{label}</span>
              </Link>
            );
          })}

          {/* Web App */}
          <a
            href={MINI_APP_WEB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors text-sm text-white/70 hover:bg-blue-600/20 hover:text-blue-400"
          >
            <Smartphone className="w-5 h-5 shrink-0" />
            <span className="truncate md:hidden lg:block">{t('dashboard.web_app')}</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-50 md:hidden lg:block" />
          </a>

          <a
            href={MINI_APP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors text-sm text-white/50 hover:text-white"
          >
            <Bot className="w-4 h-4 shrink-0" />
            <span className="truncate md:hidden lg:block text-xs">{t('dashboard.open_in_telegram')}</span>
          </a>

          <div className="border-t border-white/5 my-2 mx-4" />
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-2 shrink-0">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm text-white/70 hover:bg-red-500/20 hover:text-red-400"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="truncate md:hidden lg:block">{t('dashboard.logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
