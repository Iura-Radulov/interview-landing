'use client';

import { useEffect } from 'react';
import { I18nProvider } from '@/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Sync html lang attribute
    const lang = localStorage.getItem('ui_lang');
    if (lang === 'ru' || lang === 'en') {
      document.documentElement.setAttribute('lang', lang);
    }
  }, []);

  return <I18nProvider>{children}</I18nProvider>;
}