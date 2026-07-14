'use client';

import dynamic from 'next/dynamic';

export const Hero3DQLazy = dynamic(
  () => import('@/components/v2/hero-3d-q').then((mod) => mod.Hero3DQ),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-full min-h-[860px] w-full overflow-hidden bg-[#030609] lg:min-h-[900px] xl:min-h-screen">
        <div className="absolute right-[18%] top-1/2 h-[34vw] w-[34vw] -translate-y-1/2 animate-pulse rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
    ),
  }
);
