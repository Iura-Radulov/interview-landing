'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MINI_APP_WEB_URL } from '@/lib/constants';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function LandingNav() {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, uiLang, setUiLang } = useTranslation();

  useEffect(() => {
    fetch('/api/auth/status')
      .then((r) => r.json())
      .then((data) => setAuthed(data.authenticated))
      .catch(() => setAuthed(false))
      .finally(() => setLoading(false));
  }, []);

  const navLinks = [
    { href: '/tariffs', label: t('nav.plans') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/about', label: t('nav.about') },
  ];

  function handleSetLang(lang: 'en' | 'ru') {
    setUiLang(lang);
    setLangOpen(false);
    document.documentElement.setAttribute('lang', lang);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
    style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-lg"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-sm">
              AI
            </div>
            Interview Trainer
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-emerald-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}

            <a
              href={MINI_APP_WEB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t('nav.web_app')} <span className="text-xs opacity-50">↗</span>
            </a>

            {/* Desktop language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-xs text-slate-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded-lg transition-colors"
                aria-label="Switch language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="font-medium text-xs">{uiLang === 'en' ? 'EN' : 'RU'}</span>
              </button>

              {/* Desktop language dropdown */}
              {langOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-20 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                    <button
                      onClick={() => handleSetLang('en')}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        uiLang === 'en' ? 'text-emerald-600 font-medium bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t('lang.en')}
                    </button>
                    <button
                      onClick={() => handleSetLang('ru')}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        uiLang === 'ru' ? 'text-emerald-600 font-medium bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t('lang.ru')}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="ml-4">
              {loading ? (
                <div className="w-24 h-9 rounded-full bg-white/5 animate-pulse" />
              ) : authed ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-400 transition-all"
                >
                  {t('nav.dashboard')}
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-400 transition-all"
                >
                  {t('nav.sign_in')}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded-lg transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-medium text-xs">{uiLang === 'en' ? 'EN' : 'RU'}</span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white/70 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Language dropdown — mobile only */}
      {langOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-10"
            onClick={() => setLangOpen(false)}
          />
          <div className="fixed right-4 top-14 z-20 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
            <button
              onClick={() => handleSetLang('en')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                uiLang === 'en' ? 'text-emerald-600 font-medium bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('lang.en')}
            </button>
            <button
              onClick={() => handleSetLang('ru')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                uiLang === 'ru' ? 'text-emerald-600 font-medium bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('lang.ru')}
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0f172a]">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href={MINI_APP_WEB_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {t('nav.web_app')} ↗
            </a>
            <div className="pt-2 px-4">
              {loading ? null : authed ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-medium"
                >
                  {t('nav.dashboard')}
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-sm font-medium"
                >
                  {t('nav.sign_in')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
