import { Suspense } from 'react';
import { getActiveTariffs } from '@/lib/db';
import TariffCardsGrid from '@/components/TariffCardsGrid';
import TariffsLayout from './TariffsLayout';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

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
    <TariffsLayout>
      <Suspense fallback={<TariffsSkeleton />}>
        <TariffsContent />
      </Suspense>
    </TariffsLayout>
  );
}