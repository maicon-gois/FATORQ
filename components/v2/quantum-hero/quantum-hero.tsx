'use client';

import { useEffect, useRef, useState } from 'react';
import { type MotionValue } from 'motion/react';
import { QuantumBlueprintBackdrop } from '@/components/v2/quantum-hero/quantum-blueprint-backdrop';
import { QuantumCanvas } from '@/components/v2/quantum-hero/quantum-canvas';

export type QuantumHeroProps = {
  scrollProgress: MotionValue<number>;
  onReady: () => void;
};

export function QuantumHero({ scrollProgress, onReady }: QuantumHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const intersectingRef = useRef(true);
  const [active, setActive] = useState(true);
  const [fieldActive, setFieldActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateActivity = () => setActive(intersectingRef.current && document.visibilityState === 'visible');
    const observer = new IntersectionObserver(([entry]) => {
      intersectingRef.current = entry.isIntersecting;
      updateActivity();
    }, { threshold: 0.01 });
    const onVisibilityChange = () => updateActivity();

    observer.observe(root);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const activateField = () => setFieldActive(true);
    window.addEventListener('fatorq:core-activated', activateField);
    return () => window.removeEventListener('fatorq:core-activated', activateField);
  }, []);

  return (
    <div ref={rootRef} className="relative h-full min-h-0 w-full overflow-hidden bg-[#020507]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_47%,rgba(34,211,238,0.22),rgba(8,145,178,0.07)_28%,transparent_61%)]" />
      <div className="pointer-events-none absolute left-[var(--quantum-core-x,70%)] top-[var(--quantum-core-y,50%)] h-[58%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/[0.045] blur-[105px]" />

      {fieldActive && <QuantumBlueprintBackdrop scrollProgress={scrollProgress} />}

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <QuantumCanvas scrollProgress={scrollProgress} active={active} onReady={onReady} />
      </div>

      <button
        type="button"
        data-quantum-logo-hotspot
        aria-label="Segure para ativar o nucleo FatorQ; arraste para girar"
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            window.dispatchEvent(new Event('fatorq:request-activation'));
          }
        }}
        className="pointer-events-auto absolute left-[var(--quantum-core-x,70%)] top-[var(--quantum-core-y,50%)] z-[4] h-[min(38vw,500px)] w-[min(38vw,500px)] -translate-x-1/2 -translate-y-1/2 touch-none select-none cursor-grab rounded-full bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-cyan-200/60 active:cursor-grabbing"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#020507] to-transparent" />
    </div>
  );
}
