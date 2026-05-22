import { Suspense } from 'react';
import { getActiveTariffs } from '@/lib/db';
import TariffCardsGrid from '@/components/TariffCardsGrid';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — AI Interview Trainer',
  description: 'Choose the plan that fits your interview prep goals.',
};

function TariffsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl bg-slate-100 animate-pulse h-96" />
      ))}
    </div>
  );
}

async function TariffsContent() {
  let tariffs: ReturnType<typeof getActiveTariffs> = [];
  try {
    tariffs = getActiveTariffs();
  } catch {
    tariffs = [];
  }
  return <TariffCardsGrid tariffs={tariffs} />;
}

export default function TariffsPage() {
  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <nav
          className="px-4 py-4 border-b border-slate-200 bg-white"
          style={{ backgroundColor: '#0f172a' }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-white font-bold text-lg hover:text-emerald-400 transition-colors">
              AI Interview Trainer
            </Link>
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Start free. Upgrade when you need more. Cancel anytime.
            </p>
          </div>

          <Suspense fallback={<TariffsSkeleton />}>
            <TariffsContent />
          </Suspense>

          <div className="mt-16 text-center text-slate-400 text-sm">
            <p>All plans include access via Telegram. No app download required.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
