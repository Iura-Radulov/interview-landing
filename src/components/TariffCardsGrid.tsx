'use client';

import type { TariffPlan } from '@/types';
import TariffCard from './TariffCard';

interface TariffCardsGridProps {
  tariffs: TariffPlan[];
}

export default function TariffCardsGrid({ tariffs }: TariffCardsGridProps) {
  if (tariffs.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-xl">No plans available at the moment.</p>
        <p className="text-sm mt-2">Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {tariffs.map((plan) => (
        <TariffCard
          key={plan.id}
          plan={plan}
          highlighted={plan.name.toLowerCase().includes('pro')}
        />
      ))}
    </div>
  );
}
