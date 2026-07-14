'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { type MotionValue } from 'motion/react';
import { Hero3DQLazy } from '@/components/v2/hero-3d-q-lazy';
import { QuantumHeroLazy } from '@/components/v2/quantum-hero/quantum-hero-lazy';
import { QuantumInstantFallback } from '@/components/v2/quantum-hero/quantum-instant-fallback';
import { QuantumMobileFallback } from '@/components/v2/quantum-hero/quantum-mobile-fallback';
import { siteConfig } from '@/lib/site-config';

type HeroRenderMode = 'pending' | 'static' | 'interactive';

const subscribeToInitialCapabilities = () => () => undefined;
let initialRenderModeSnapshot: HeroRenderMode | undefined;
const getRenderModeSnapshot = (): HeroRenderMode => {
  if (initialRenderModeSnapshot) return initialRenderModeSnapshot;
  if (typeof window === 'undefined') return 'pending';
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  initialRenderModeSnapshot = coarsePointer || reducedMotion ? 'static' : 'interactive';
  return initialRenderModeSnapshot;
};
const getRenderModeServerSnapshot = (): HeroRenderMode => 'pending';

function Hero3DPlaceholder() {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[#030609]">
      <QuantumInstantFallback />
    </div>
  );
}

function Hero3DStaticScene() {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[#030609]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(6,182,212,0.2),transparent_38%)]" />
      <div className="absolute inset-x-[-35%] bottom-[-10%] h-[45%] -rotate-6 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute right-[-38%] top-[18%] h-[62vw] w-[62vw] min-h-[430px] min-w-[430px] rounded-full border border-cyan-200/10" />
      <div className="absolute right-[-29%] top-[23%] h-[50vw] w-[50vw] min-h-[360px] min-w-[360px] rounded-full border border-dashed border-cyan-200/10" />
      <Image
        src="/logo-fatorq.png"
        alt=""
        width={900}
        height={540}
        priority
        aria-hidden
        className="absolute right-[-30%] top-[24%] h-auto w-[92%] max-w-none opacity-35 drop-shadow-[0_0_38px_rgba(6,182,212,0.25)] sm:right-[-16%] sm:w-[72%]"
      />
    </div>
  );
}

function SplineEmbed({ sceneUrl }: { sceneUrl: string }) {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[#030609]">
      <iframe
        title="FatorQ 3D scene"
        src={sceneUrl}
        className="h-full w-full"
        loading="lazy"
        allow="fullscreen; autoplay"
      />
    </div>
  );
}

type Hero3DStageProps = {
  scrollProgress: MotionValue<number>;
  onReady: () => void;
};

export function Hero3DStage({ scrollProgress, onReady }: Hero3DStageProps) {
  const { hero3d } = siteConfig;
  const renderMode = useSyncExternalStore(subscribeToInitialCapabilities, getRenderModeSnapshot, getRenderModeServerSnapshot);
  const [webglReady, setWebglReady] = useState(false);

  const markWebglReady = useCallback(() => {
    setWebglReady(true);
    onReady();
  }, [onReady]);

  useEffect(() => {
    if (renderMode === 'static') onReady();
  }, [onReady, renderMode]);

  if (renderMode === 'pending') {
    return <Hero3DPlaceholder />;
  }

  if (renderMode === 'static') {
    if (hero3d.mode === 'quantum') {
      return <QuantumMobileFallback />;
    }

    return <Hero3DStaticScene />;
  }

  if (hero3d.mode === 'quantum') {
    return (
      <div
        data-quantum-stage
        className="relative h-full min-h-0 w-full overflow-hidden bg-[#030609] [--quantum-core-x:70%] [--quantum-core-y:50%]"
      >
        <QuantumHeroLazy scrollProgress={scrollProgress} onReady={markWebglReady} />
        <QuantumInstantFallback hidden={webglReady} />
      </div>
    );
  }

  if (hero3d.mode === 'spline' && hero3d.splineSceneUrl) {
    return <SplineEmbed sceneUrl={hero3d.splineSceneUrl} />;
  }

  if (hero3d.mode === 'spline' && !hero3d.splineSceneUrl) {
    return <Hero3DPlaceholder />;
  }

  return <Hero3DQLazy />;
}
