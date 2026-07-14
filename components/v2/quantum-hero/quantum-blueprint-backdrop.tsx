'use client';

import { useEffect } from 'react';
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from 'motion/react';

const BLUEPRINT_PARTICLES = Array.from({ length: 54 }, (_, index) => ({
  left: `${(index * 47 + 9) % 100}%`,
  top: `${(index * 29 + 13) % 100}%`,
  size: 1 + (index % 3),
  delay: `${-(index % 12) * 0.31}s`,
  duration: `${3.6 + (index % 7) * 0.4}s`,
  depth: 0.22 + (index % 5) * 0.16,
}));

const BLUEPRINT_GLYPHS = ['Q', 'f(x)', 'Σ', '√', 'π', 'λ', 'x²', '{ }', '01', 'AI', 'n!', 'Δ', '∞', '</>', '∫', 'FQ', '2ⁿ', 'API'];

type QuantumBlueprintBackdropProps = {
  scrollProgress: MotionValue<number>;
};

export function QuantumBlueprintBackdrop({ scrollProgress }: QuantumBlueprintBackdropProps) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 92, damping: 23, mass: 0.42 });
  const y = useSpring(targetY, { stiffness: 92, damping: 23, mass: 0.42 });
  const farX = useTransform(x, (value) => value * -0.48);
  const farY = useTransform(y, (value) => value * -0.4);
  const nearX = useTransform(x, (value) => value * 0.78);
  const nearY = useTransform(y, (value) => value * 0.62);
  const blueprintY = useTransform(scrollProgress, [0, 0.58, 0.92], [0, 28, 132]);
  const blueprintScale = useTransform(scrollProgress, [0, 0.72, 1], [1, 0.98, 0.9]);
  const blueprintOpacity = useTransform(scrollProgress, [0, 0.6, 0.9], [1, 0.82, 0]);

  useEffect(() => {
    const onPointer = (event: Event) => {
      const { x: pointerX, y: pointerY } = (event as CustomEvent<{ x: number; y: number }>).detail;
      targetX.set(pointerX * 26);
      targetY.set(pointerY * -18);
    };

    window.addEventListener('fatorq:core-pointer', onPointer);
    return () => window.removeEventListener('fatorq:core-pointer', onPointer);
  }, [targetX, targetY]);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_48%,rgba(13,139,168,0.2),transparent_34%),radial-gradient(ellipse_at_50%_58%,rgba(7,49,62,0.13),transparent_68%)]" />

      <motion.div style={{ x: farX, y: farY }} className="absolute inset-[-10%]">
        {BLUEPRINT_GLYPHS.map((glyph, index) => (
          <span
            key={`${glyph}-${index}`}
            className="quantum-impact-glyph absolute font-[family-name:var(--font-space)] text-cyan-100"
            style={{
              left: `${(index * 41 + 7) % 94}%`,
              top: `${(index * 23 + 11) % 88}%`,
              fontSize: `${10 + (index % 4) * 3}px`,
              animationDelay: `${-(index % 9) * 0.47}s`,
              animationDuration: `${5 + (index % 6) * 0.6}s`,
            }}
          >
            {glyph}
          </span>
        ))}
      </motion.div>

      <motion.div
        style={{ x: nearX, y: blueprintY, scale: blueprintScale, opacity: blueprintOpacity }}
        className="quantum-blueprint-plane absolute left-1/2 top-1/2 h-[min(56vh,520px)] w-[min(72vw,980px)] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="quantum-blueprint-grid absolute inset-[-18%] opacity-45" />
        <div className="quantum-blueprint-scan absolute inset-x-[-6%] top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/80 to-transparent" />

        <div className="relative grid h-full grid-cols-3 gap-[clamp(10px,1.6vw,24px)]">
          <div className="quantum-blueprint-module quantum-blueprint-delay-1 relative overflow-hidden border border-cyan-100/20 bg-cyan-300/[0.025]">
            <div className="flex h-9 items-center gap-1.5 border-b border-cyan-100/15 px-3">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-100/45" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-100/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-100/15" />
            </div>
            <div className="space-y-3 p-4">
              <span className="block h-1 w-[62%] bg-cyan-100/36" />
              <span className="block h-1 w-[38%] bg-cyan-100/16" />
              <div className="mt-6 grid grid-cols-3 gap-2">
                <span className="h-14 border border-cyan-100/15 bg-cyan-200/[0.025]" />
                <span className="h-14 border border-cyan-100/15 bg-cyan-200/[0.04]" />
                <span className="h-14 border border-cyan-100/15 bg-cyan-200/[0.025]" />
              </div>
              <div className="quantum-blueprint-chart relative mt-6 h-24 border-b border-l border-cyan-100/15" />
            </div>
          </div>

          <div className="quantum-blueprint-module quantum-blueprint-delay-2 relative overflow-hidden border border-cyan-100/25 bg-cyan-300/[0.035]">
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/28 shadow-[0_0_36px_rgba(34,211,238,0.12)]" />
            <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-cyan-100/55 bg-cyan-100/[0.06]" />
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                className="quantum-blueprint-node absolute h-3 w-3 rounded-full border border-cyan-100/45 bg-[#061116]"
                style={{
                  left: `${18 + (index % 3) * 32}%`,
                  top: `${20 + Math.floor(index / 3) * 58}%`,
                  animationDelay: `${index * -0.24}s`,
                }}
              />
            ))}
            <span className="absolute left-[20%] top-[24%] h-px w-[62%] rotate-[24deg] bg-cyan-100/20" />
            <span className="absolute left-[18%] top-[67%] h-px w-[66%] -rotate-[22deg] bg-cyan-100/20" />
            <span className="absolute left-1/2 top-[18%] h-[64%] w-px -rotate-[11deg] bg-cyan-100/16" />
          </div>

          <div className="quantum-blueprint-module quantum-blueprint-delay-3 relative overflow-hidden border border-cyan-100/20 bg-cyan-300/[0.025] p-4">
            <div className="absolute inset-x-4 top-5 flex h-7 items-end gap-1 border-b border-cyan-100/15">
              {[32, 58, 44, 78, 66, 92, 74].map((height, index) => (
                <span key={index} className="flex-1 bg-cyan-100/20" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="absolute inset-x-5 bottom-7 space-y-3">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="quantum-blueprint-server flex h-10 items-center gap-3 border border-cyan-100/16 px-3" style={{ animationDelay: `${index * -0.3}s` }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-100/55" />
                  <span className="h-px flex-1 bg-cyan-100/18" />
                  <span className="h-1 w-7 bg-cyan-100/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div style={{ x: nearX, y: nearY }} className="absolute inset-[-10%]">
        {BLUEPRINT_PARTICLES.map((particle, index) => (
          <span
            key={index}
            className="quantum-impact-particle absolute bg-cyan-100 shadow-[0_0_10px_rgba(103,232,249,0.68)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.depth,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#020507] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020507] to-transparent" />
    </motion.div>
  );
}
