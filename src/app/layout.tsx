import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.FRONTEND_URL || 'https://techinterviewai.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI Interview Trainer — Ace Your Next Tech Interview with AI',
    template: '%s | AI Interview Trainer',
  },
  description:
    'Practice technical and behavioral (STAR method) interviews with AI-powered feedback. Frontend, Backend, Fullstack, System Design — 3 experience levels. Instant scoring, progress tracking, voice answers. Start free.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'AI Interview Trainer — Ace Your Next Tech Interview with AI',
    description:
      'Practice technical and behavioral (STAR method) interviews with AI. Instant feedback, voice answers, progress tracking. Start free.',
    url: siteUrl,
    siteName: 'AI Interview Trainer',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Interview Trainer — Ace Your Next Tech Interview with AI',
    description:
      'Practice technical and behavioral (STAR method) interviews with AI. Instant feedback, voice answers, progress tracking. Start free.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: '6fzPYzm_D-a9gogcWfLMWFugQSJf8Omw1YelHDhcIBI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <GoogleAnalytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}