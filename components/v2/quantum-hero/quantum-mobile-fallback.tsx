'use client';

import { QuantumInstantFallback } from '@/components/v2/quantum-hero/quantum-instant-fallback';

export function QuantumMobileFallback() {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[#020609] [--quantum-core-x:76%] [--quantum-core-y:42%] [--quantum-core-size:min(28vw,142px)] [--quantum-orbit-size:min(42vw,210px)] [--quantum-particle-size:min(58vw,280px)]">
      <QuantumInstantFallback ready showStatus={false} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020609] via-[#020609]/82 to-[#020609]/18" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050508] to-transparent" />
    </div>
  );
}
