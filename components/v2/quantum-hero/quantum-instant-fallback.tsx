'use client';

import Image from 'next/image';

type QuantumInstantFallbackProps = {
  hidden?: boolean;
  engaged?: boolean;
  pressed?: boolean;
  ready?: boolean;
  showStatus?: boolean;
};

export function QuantumInstantFallback({
  hidden = false,
  engaged = false,
  pressed = false,
  ready = false,
  showStatus = true,
}: QuantumInstantFallbackProps) {
  const status = ready ? 'Nucleo pronto' : engaged ? 'Sinal capturado' : 'Nucleo em sincronia';

  return (
    <div
      aria-hidden
      data-engaged={engaged ? 'true' : 'false'}
      data-hidden={hidden ? 'true' : 'false'}
      data-pressed={pressed ? 'true' : 'false'}
      data-ready={ready ? 'true' : 'false'}
      style={{ opacity: hidden ? 0 : 1, visibility: hidden ? 'hidden' : 'visible' }}
      className={`quantum-instant-fallback pointer-events-none absolute inset-0 z-[3] overflow-hidden bg-[radial-gradient(circle_at_70%_48%,rgba(18,93,108,0.11),transparent_36%)] ${hidden ? '[&_*]:[animation-play-state:paused]' : ''}`}
    >
      <div className="quantum-core-positioned quantum-core-particle-field absolute left-[var(--quantum-core-x,50%)] top-[var(--quantum-core-y,50%)] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_1.7s_linear_infinite]">
        <span className="absolute left-[8%] top-[23%] h-1 w-1 bg-cyan-100/70 shadow-[0_0_12px_rgba(207,250,254,0.8)]" />
        <span className="absolute right-[15%] top-[12%] h-0.5 w-0.5 bg-white/70 shadow-[0_0_10px_white]" />
        <span className="absolute bottom-[19%] right-[8%] h-1 w-1 bg-cyan-200/55 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
        <span className="absolute bottom-[9%] left-[25%] h-0.5 w-0.5 bg-white/55 shadow-[0_0_10px_white]" />
      </div>
      <div className="quantum-core-positioned quantum-core-orbit absolute left-[var(--quantum-core-x,50%)] top-[var(--quantum-core-y,50%)] aspect-square -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[4%] animate-[spin_1.85s_linear_infinite] rounded-[46%_54%_51%_49%] bg-[conic-gradient(from_40deg,transparent_0deg,rgba(207,250,254,0.5)_48deg,transparent_105deg,rgba(34,211,238,0.35)_190deg,transparent_255deg)] blur-[3px] [mask-image:radial-gradient(circle,transparent_51%,black_59%,transparent_72%)]" />
        <div className="absolute inset-[12%] animate-[spin_1.25s_linear_infinite_reverse] rounded-[52%_48%_44%_56%] border border-cyan-100/20 shadow-[0_0_18px_rgba(103,232,249,0.16)]" />
        <div className="absolute inset-[21%] animate-[pulse_1.4s_ease-in-out_infinite] rounded-full border border-white/10" />
      </div>
      <Image
        src="/media/quantum/fatorq-sphere-poster.webp"
        alt=""
        width={360}
        height={360}
        draggable={false}
        priority
        unoptimized
        className="quantum-core-positioned quantum-sphere-poster absolute left-[var(--quantum-core-x,50%)] top-[var(--quantum-core-y,50%)] aspect-square w-[min(25vw,360px)] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
      <span className="quantum-core-positioned quantum-boot-wave quantum-boot-wave-a absolute left-[var(--quantum-core-x,50%)] top-[var(--quantum-core-y,50%)] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/35" />
      <span className="quantum-core-positioned quantum-boot-wave quantum-boot-wave-b absolute left-[var(--quantum-core-x,50%)] top-[var(--quantum-core-y,50%)] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
      {showStatus && (
        <div className="quantum-core-positioned quantum-core-status absolute left-[var(--quantum-core-x,50%)] top-[var(--quantum-core-y,50%)] flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="flex gap-1">
            <i />
            <i />
            <i />
          </span>
          <span>{status}</span>
        </div>
      )}
    </div>
  );
}
