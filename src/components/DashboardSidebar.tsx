'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ListChecks, UserCircle, Smartphone, LogOut, X } from 'lucide-react';
import { MINI_APP_URL } from '@/lib/constants';

const navLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/dashboard/interviews', icon: ListChecks, label: 'My Interviews' },
  { href: '/dashboard/profile', icon: UserCircle, label: 'Profile' },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function DashboardSidebar({ isOpen, onClose, onLogout }: DashboardSidebarProps) {
  const pathname = usePathname();

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
        {/* Logo / app name */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
            AI
          </div>
          <span className="font-semibold text-sm truncate md:hidden lg:block">
            AI Interview
          </span>
          <button
            onClick={onClose}
            className="ml-auto text-white/60 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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

          <a
            href={MINI_APP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors text-sm text-white/70 hover:bg-white/10 hover:text-white"
          >
            <Smartphone className="w-5 h-5 shrink-0" />
            <span className="truncate md:hidden lg:block">Mini App</span>
          </a>
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-2 shrink-0">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm text-white/70 hover:bg-red-500/20 hover:text-red-400"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="truncate md:hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
