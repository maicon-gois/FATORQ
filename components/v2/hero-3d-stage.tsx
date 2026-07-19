'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { type MotionValue } from 'motion/react';
import { Hero3DQLazy } from '@/components/v2/hero-3d-q-lazy';
import { QuantumHeroLazy } from '@/components/v2/quantum-hero/quantum-hero-lazy';
import { QuantumInstantFallback } from '@/components/v2/quantum-hero/quantum-instant-fallback';
import { QuantumMobileFallback } from '@/components/v2/quantum-hero/quantum-mobile-fallback';
import { siteConfig } from '@/lib/site-config';

type HeroRenderMode = 'pending' | 'static' | 'interactive';

declare global {
  interface Window {
    __fatorqBootIntent?: boolean;
  }
}

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
  const [experienceStarted, setExperienceStarted] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [fallbackEngaged, setFallbackEngaged] = useState(false);
  const [fallbackPressed, setFallbackPressed] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const webglReadyRef = useRef(false);
  const pendingRevealRef = useRef(false);
  const pendingActivationRef = useRef(false);

  const announceIntent = useCallback(() => {
    setFallbackEngaged(true);
    window.dispatchEvent(new Event('fatorq:boot-intent'));
  }, []);

  const requestReveal = useCallback(() => {
    announceIntent();
    if (webglReadyRef.current) {
      window.dispatchEvent(new Event('fatorq:request-reveal'));
      return;
    }
    pendingRevealRef.current = true;
  }, [announceIntent]);

  const markWebglReady = useCallback(() => {
    if (webglReadyRef.current) return;
    webglReadyRef.current = true;
    setWebglReady(true);
    onReady();
    window.dispatchEvent(new Event('fatorq:webgl-ready'));

    if (!pendingRevealRef.current && !pendingActivationRef.current) return;
    window.requestAnimationFrame(() => {
      if (pendingRevealRef.current) {
        window.dispatchEvent(new Event('fatorq:request-reveal'));
        pendingRevealRef.current = false;
      }
      if (pendingActivationRef.current) {
        window.dispatchEvent(new Event('fatorq:request-activation'));
        pendingActivationRef.current = false;
      }
    });
  }, [onReady]);

  useEffect(() => {
    if (renderMode === 'static') onReady();
  }, [onReady, renderMode]);

  useEffect(() => {
    const onPhase = (event: Event) => {
      const { phase } = (event as CustomEvent<{ phase: string }>).detail;
      if (phase === 'brand' || phase === 'cinematic') setExperienceStarted(true);
    };

    window.addEventListener('fatorq:core-phase', onPhase);
    return () => window.removeEventListener('fatorq:core-phase', onPhase);
  }, []);

  useEffect(() => {
    if (hero3d.mode !== 'quantum' || renderMode === 'static' || experienceStarted) return;

    const onEarlyWheel = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      requestReveal();
    };

    window.addEventListener('wheel', onEarlyWheel, { passive: true });
    const recoveryFrame = window.requestAnimationFrame(() => {
      const stage = stageRef.current;
      const hotspot = stage?.querySelector<HTMLElement>('[data-quantum-logo-hotspot]');
      const pointerAlreadyInside = hotspot?.matches(':hover') ?? false;
      const focusAlreadyInside = document.activeElement === hotspot;
      const scrollAlreadyMoved = window.scrollY > 8;
      const intentCapturedBeforeHydration = window.__fatorqBootIntent === true;

      if (pointerAlreadyInside || focusAlreadyInside || scrollAlreadyMoved || intentCapturedBeforeHydration) {
        onEarlyWheel();
        window.__fatorqBootIntent = false;
      }
    });

    return () => {
      window.removeEventListener('wheel', onEarlyWheel);
      window.cancelAnimationFrame(recoveryFrame);
    };
  }, [experienceStarted, hero3d.mode, renderMode, requestReveal]);

  if (renderMode === 'static') {
    if (hero3d.mode === 'quantum') {
      return <QuantumMobileFallback />;
    }

    return <Hero3DStaticScene />;
  }

  if (hero3d.mode === 'quantum') {
    return (
      <div
        ref={stageRef}
        data-quantum-stage
        data-webgl-ready={webglReady ? 'true' : 'false'}
        data-core-position={experienceStarted ? 'brand' : 'center'}
        style={{ '--quantum-core-x': experienceStarted ? '70%' : '50%', '--quantum-core-y': '50%' } as CSSProperties}
        className="relative h-full min-h-0 w-full overflow-hidden bg-[#030609]"
      >
        {renderMode === 'interactive' && (
          <QuantumHeroLazy key="quantum-webgl" scrollProgress={scrollProgress} onReady={markWebglReady} />
        )}
        <QuantumInstantFallback
          key="quantum-fallback"
          hidden={webglReady}
          engaged={fallbackEngaged}
          pressed={fallbackPressed}
          ready={webglReady}
        />
        <button
          key="quantum-hotspot"
          type="button"
          data-quantum-logo-hotspot
          aria-busy={!webglReady}
          aria-label="Aproxime para energizar; segure para ativar o nucleo FatorQ; arraste para girar"
          onPointerEnter={requestReveal}
          onPointerDown={() => {
            setFallbackPressed(true);
            requestReveal();
          }}
          onPointerUp={() => setFallbackPressed(false)}
          onPointerCancel={() => setFallbackPressed(false)}
          onPointerLeave={() => setFallbackPressed(false)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            requestReveal();
            if (webglReadyRef.current) {
              window.dispatchEvent(new Event('fatorq:request-activation'));
            } else {
              pendingActivationRef.current = true;
            }
          }}
          className="pointer-events-auto absolute left-[var(--quantum-core-x,50%)] top-[var(--quantum-core-y,50%)] z-[4] h-[min(38vw,500px)] w-[min(38vw,500px)] -translate-x-1/2 -translate-y-1/2 touch-none select-none cursor-grab rounded-full bg-transparent transition-[left] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none focus-visible:ring-1 focus-visible:ring-cyan-200/60 active:cursor-grabbing"
        />
      </div>
    );
  }

  if (renderMode === 'pending') {
    return <Hero3DPlaceholder />;
  }

  if (hero3d.mode === 'spline' && hero3d.splineSceneUrl) {
    return <SplineEmbed sceneUrl={hero3d.splineSceneUrl} />;
  }

  if (hero3d.mode === 'spline' && !hero3d.splineSceneUrl) {
    return <Hero3DPlaceholder />;
  }

  return <Hero3DQLazy />;
}
