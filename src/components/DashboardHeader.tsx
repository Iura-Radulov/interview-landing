'use client';

import { useState } from 'react';
import { Menu, ChevronDown, LogOut, Globe } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface DashboardHeaderProps {
  title?: string;
  username: string | null;
  firstName: string | null;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

export default function DashboardHeader({
  title,
  username,
  firstName,
  onToggleSidebar,
  onLogout,
}: DashboardHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, uiLang, setUiLang } = useTranslation();

  const displayName = firstName || username || 'User';
  const initial = displayName[0].toUpperCase();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 hover:text-gray-700 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        {title && <h1 className="text-lg font-semibold text-gray-800">{title}</h1>}
      </div>

      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{uiLang === 'en' ? 'EN' : 'RU'}</span>
          </button>

          {langOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setLangOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                <button
                  onClick={() => { setUiLang('en'); setLangOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    uiLang === 'en' ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('lang.en')}
                </button>
                <button
                  onClick={() => { setUiLang('ru'); setLangOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    uiLang === 'ru' ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t('lang.ru')}
                </button>
              </div>
            </>
          )}
        </div>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              {initial}
            </div>
            <span className="hidden sm:block font-medium">{displayName}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{displayName}</p>
                  {username && <p className="text-xs text-gray-500">@{username}</p>}
                </div>
                <button
                  onClick={() => { setDropdownOpen(false); onLogout(); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  {t('dashboard.logout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
