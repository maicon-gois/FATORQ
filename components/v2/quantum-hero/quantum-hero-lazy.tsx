'use client';

import dynamic from 'next/dynamic';

export const QuantumHeroLazy = dynamic(
  () => import('@/components/v2/quantum-hero/quantum-hero').then((mod) => mod.QuantumHero),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-0 w-full" />,
  }
);
