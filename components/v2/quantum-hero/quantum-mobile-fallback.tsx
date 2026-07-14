'use client';

import Image from 'next/image';

export function QuantumMobileFallback() {
  return (
    <div className="relative h-full min-h-[860px] w-full overflow-hidden bg-[#020609]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_36%,rgba(34,211,238,0.26),transparent_42%)]" />
      <div className="absolute right-[-42%] top-[18%] aspect-square w-[108%] rounded-full border border-cyan-200/15 shadow-[0_0_90px_rgba(34,211,238,0.1)]" />
      <div className="absolute right-[-28%] top-[23%] aspect-square w-[82%] rounded-full border-[10px] border-cyan-300/[0.08] shadow-[inset_0_0_44px_rgba(34,211,238,0.12)]" />
      <div className="absolute right-[-10%] top-[29%] aspect-square w-[54%] rounded-full border border-cyan-100/20 bg-cyan-300/[0.055] backdrop-blur-sm" />
      <Image
        src="/media/brand/fatorq-seal-mark-transparent.png"
        alt=""
        width={1024}
        height={1024}
        priority
        aria-hidden
        className="absolute right-[-1%] top-[35%] h-auto w-[36%] opacity-75 drop-shadow-[0_0_26px_rgba(34,211,238,0.45)]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020609] via-[#020609]/82 to-[#020609]/18" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050508] to-transparent" />
    </div>
  );
}
