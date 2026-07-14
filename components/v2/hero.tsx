'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Hero3DStage } from '@/components/v2/hero-3d-stage';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

const wordEase = [0.22, 1, 0.36, 1] as const;
const subscribeToInitialCapabilities = () => () => undefined;
let initialInteractiveNarrativeSnapshot: boolean | undefined;
const getInteractiveNarrativeSnapshot = () => {
  if (initialInteractiveNarrativeSnapshot !== undefined) return initialInteractiveNarrativeSnapshot;
  if (typeof window === 'undefined') return false;
  initialInteractiveNarrativeSnapshot = !window.matchMedia('(pointer: coarse)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return initialInteractiveNarrativeSnapshot;
};
const getInteractiveNarrativeServerSnapshot = () => false;

type AnimatedLineProps = {
  children: string;
  delay: number;
  ready: boolean;
  accent?: boolean;
};

function AnimatedLine({ children, delay, ready, accent = false }: AnimatedLineProps) {
  return (
    <span className="block overflow-hidden pb-[0.09em]">
      <motion.span
        className={`block ${accent ? 'bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent' : ''}`}
        initial={{ y: '105%', opacity: 0, filter: 'blur(8px)' }}
        animate={ready ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : { y: '105%', opacity: 0, filter: 'blur(8px)' }}
        transition={{ duration: 1.02, delay, ease: wordEase }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function V2Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visualReady, setVisualReady] = useState(false);
  const [activated, setActivated] = useState(false);
  const [corePhase, setCorePhase] = useState<'ambient' | 'reveal' | 'brand' | 'cinematic'>('ambient');
  const interactiveNarrative = useSyncExternalStore(
    subscribeToInitialCapabilities,
    getInteractiveNarrativeSnapshot,
    getInteractiveNarrativeServerSnapshot,
  );
  const copyTargetX = useMotionValue(0);
  const copyTargetY = useMotionValue(0);
  const copyParallaxX = useSpring(copyTargetX, { stiffness: 95, damping: 24, mass: 0.45 });
  const copyParallaxY = useSpring(copyTargetY, { stiffness: 95, damping: 24, mass: 0.45 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 230, damping: 34, mass: 0.16, restDelta: 0.0005 });
  const contentOpacity = useTransform(smoothProgress, [0, 0.42, 0.76], [1, 1, 0]);
  const contentY = useTransform(smoothProgress, [0.34, 0.78], [0, -28]);
  const hintOpacity = useTransform(smoothProgress, [0, 0.42, 0.7], [1, 1, 0]);
  const progressScale = useTransform(smoothProgress, [0.02, 0.98], [0, 1]);

  const handleSceneReady = useCallback(() => setVisualReady(true), []);

  useEffect(() => {
    const onActivated = () => setActivated(true);
    const onPhase = (event: Event) => {
      const phase = (event as CustomEvent<{ phase: 'ambient' | 'reveal' | 'brand' | 'cinematic' }>).detail.phase;
      setCorePhase(phase);
      if (phase === 'cinematic') {
        copyTargetX.set(0);
        copyTargetY.set(0);
      }
    };
    const onCorePointer = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
      copyTargetX.set(x * -4.5);
      copyTargetY.set(y * -3.2);
    };

    window.addEventListener('fatorq:core-activated', onActivated);
    window.addEventListener('fatorq:core-phase', onPhase);
    window.addEventListener('fatorq:core-pointer', onCorePointer);
    return () => {
      window.removeEventListener('fatorq:core-activated', onActivated);
      window.removeEventListener('fatorq:core-phase', onPhase);
      window.removeEventListener('fatorq:core-pointer', onCorePointer);
    };
  }, [copyTargetX, copyTargetY]);

  const copyReady = visualReady && (!interactiveNarrative || corePhase === 'brand');

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className={`relative bg-[#020507] ${interactiveNarrative ? 'h-[220svh] min-h-[1320px]' : 'min-h-[820px]'}`}
    >
      <div className={`relative flex items-center overflow-hidden bg-[#020507] pt-16 ${interactiveNarrative ? 'sticky top-0 h-[100svh]' : 'min-h-[820px]'}`}>
        <div className="absolute inset-0 z-0">
          <Hero3DStage scrollProgress={smoothProgress} onReady={handleSceneReady} />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,#020507_0%,rgba(2,5,7,0.95)_18%,rgba(2,5,7,0.55)_39%,rgba(2,5,7,0.08)_63%,rgba(2,5,7,0.12)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#020507]/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-t from-[#020507]/90 to-transparent" />

        <div className="relative z-20 mx-auto w-full max-w-[1480px] px-6 sm:px-10 lg:px-14 xl:px-20">
          <motion.div style={{ opacity: contentOpacity, y: contentY }} className="max-w-[760px]">
            <motion.div style={{ x: copyParallaxX, y: copyParallaxY }}>
            <motion.div
              animate={corePhase === 'cinematic' ? { opacity: 0, y: -18 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.78, ease: wordEase }}
            >
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={copyReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
              transition={{ duration: 0.78, delay: 0.08, ease: wordEase }}
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-gradient-to-r from-cyan-200/80 to-transparent" />
              <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-100/75">
                {siteConfig.brand.ecosystem}
              </p>
            </motion.div>

            <h1
              aria-label="Inteligencia em movimento."
              className="max-w-[760px] font-[family-name:var(--font-space)] text-[3.5rem] font-semibold leading-[0.9] tracking-[-0.065em] text-white sm:text-[5rem] lg:text-[6.2rem] xl:text-[7rem]"
            >
              <AnimatedLine delay={0.12} ready={copyReady}>Inteligencia em</AnimatedLine>
              <AnimatedLine delay={0.32} ready={copyReady} accent>movimento.</AnimatedLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={copyReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.86, delay: 0.54, ease: wordEase }}
              className="mt-7 max-w-[520px] text-sm font-light leading-6 text-slate-300/80 sm:text-base"
            >
              Software, IA e infraestrutura para negocios que avancam.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={copyReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.8, delay: 0.68, ease: wordEase }}
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-3 border-b border-white/20 pb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:border-cyan-200/70 hover:text-cyan-100"
            >
              Iniciar projeto
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visualReady ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1.12 }}
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${activated ? 'bg-cyan-200 shadow-[0_0_16px_rgba(165,243,252,0.95)]' : 'bg-white/45'}`} />
          <span className="text-[9px] font-medium uppercase tracking-[0.32em] text-slate-400">
            {activated
              ? 'Role para continuar'
              : corePhase === 'brand'
                ? 'Arraste para girar ou segure para atravessar'
                : corePhase === 'reveal'
                  ? 'Ignicao sincronizada'
                  : 'Aproxime o cursor para energizar'}
          </span>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.055]">
          <motion.div style={{ scaleX: progressScale }} className="h-px origin-left bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
