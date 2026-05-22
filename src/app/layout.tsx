import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Interview Trainer — Ace Your Next Tech Interview',
  description:
    'Practice technical interviews with AI-powered feedback and realistic questions. 4 roles, 3 experience levels, instant scoring.',
  openGraph: {
    title: 'AI Interview Trainer — Ace Your Next Tech Interview',
    description:
      'Practice technical interviews with AI-powered feedback and realistic questions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>{children}</body>
    </html>
  );
}
