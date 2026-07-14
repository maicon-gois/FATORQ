'use client';

type QuantumInstantFallbackProps = {
  hidden?: boolean;
};

export function QuantumInstantFallback({ hidden = false }: QuantumInstantFallbackProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_70%_48%,rgba(34,211,238,0.075),transparent_34%)] transition-opacity duration-700 ease-out ${hidden ? 'opacity-0 [&_*]:[animation-play-state:paused]' : 'opacity-100'}`}
    >
      <div className="absolute left-[var(--quantum-core-x,70%)] top-[var(--quantum-core-y,50%)] aspect-square w-[min(38vw,500px)] -translate-x-1/2 -translate-y-1/2 animate-[spin_1.7s_linear_infinite]">
        <span className="absolute left-[8%] top-[23%] h-1 w-1 bg-cyan-100/70 shadow-[0_0_12px_rgba(207,250,254,0.8)]" />
        <span className="absolute right-[15%] top-[12%] h-0.5 w-0.5 bg-white/70 shadow-[0_0_10px_white]" />
        <span className="absolute bottom-[19%] right-[8%] h-1 w-1 bg-cyan-200/55 shadow-[0_0_12px_rgba(103,232,249,0.7)]" />
        <span className="absolute bottom-[9%] left-[25%] h-0.5 w-0.5 bg-white/55 shadow-[0_0_10px_white]" />
      </div>
      <div className="absolute left-[var(--quantum-core-x,70%)] top-[var(--quantum-core-y,50%)] aspect-square w-[min(18vw,230px)] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[4%] animate-[spin_1.85s_linear_infinite] rounded-[46%_54%_51%_49%] bg-[conic-gradient(from_40deg,transparent_0deg,rgba(207,250,254,0.5)_48deg,transparent_105deg,rgba(34,211,238,0.35)_190deg,transparent_255deg)] blur-[3px] [mask-image:radial-gradient(circle,transparent_51%,black_59%,transparent_72%)]" />
        <div className="absolute inset-[12%] animate-[spin_1.25s_linear_infinite_reverse] rounded-[52%_48%_44%_56%] border border-cyan-100/20 shadow-[0_0_18px_rgba(103,232,249,0.16)]" />
        <div className="absolute inset-[21%] animate-[pulse_1.4s_ease-in-out_infinite] rounded-full border border-white/10" />
      </div>
      <div className="absolute left-[var(--quantum-core-x,70%)] top-[var(--quantum-core-y,50%)] aspect-square w-[min(12.2vw,160px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[radial-gradient(circle_at_35%_27%,#ffffff_0%,#dce4e8_11%,#89949c_32%,#3e4851_55%,#10171d_78%)] shadow-[inset_-18px_-20px_28px_rgba(0,4,8,0.76),inset_10px_8px_16px_rgba(255,255,255,0.34),0_0_34px_rgba(148,229,240,0.16)]" />
    </div>
  );
}
