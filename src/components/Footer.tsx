'use client';

import Link from 'next/link';
import { BOT_USERNAME } from '@/lib/constants';
import { useTranslation } from '@/lib/i18n';

export default function Footer() {
  const currentYear = 2026;
  const { t } = useTranslation();

  return (
    <footer style={{ backgroundColor: '#0f172a' }} className="text-slate-400">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.product')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link href="/tariffs" className="hover:text-white transition-colors">
                  {t('footer.pricing')}
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-white transition-colors">
                  {t('footer.companies')}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  {t('footer.dashboard')}
                </Link>
              </li>
              <li>
                <a
                  href={`https://t.me/${BOT_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t('footer.telegram_bot')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-sm text-center text-slate-500">
          <p>AI Interview Trainer is a trading name of <strong>PrepCraft LTD</strong>.</p>
          <p className="mt-1">Registered in England and Wales. Company number: 17249290.</p>
          <p className="mt-1">Registered office: 5 Brayford Square, London, E1 0SG, United Kingdom.</p>
          <p className="mt-4">{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}