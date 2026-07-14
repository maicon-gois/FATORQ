'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const IMPACT_PARTICLES = Array.from({ length: 48 }, (_, index) => ({
  left: `${(index * 47 + 9) % 100}%`,
  top: `${(index * 29 + 13) % 100}%`,
  size: 1 + (index % 3),
  delay: `${-(index % 12) * 0.31}s`,
  duration: `${3.8 + (index % 7) * 0.42}s`,
  depth: 0.2 + (index % 5) * 0.17,
}));

const IMPACT_GLYPHS = ['Q', 'f(x)', 'Σ', '√', 'π', 'λ', 'x²', '{ }', '01', 'AI', 'n!', 'Δ', '∞', '</>', '∫', 'FQ', '2ⁿ', 'API'];

export function QuantumImpactBackdrop() {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 90, damping: 22, mass: 0.42 });
  const y = useSpring(targetY, { stiffness: 90, damping: 22, mass: 0.42 });
  const farX = useTransform(x, (value) => value * -0.45);
  const farY = useTransform(y, (value) => value * -0.38);
  const nearX = useTransform(x, (value) => value * 0.72);
  const nearY = useTransform(y, (value) => value * 0.58);

  useEffect(() => {
    const onPointer = (event: Event) => {
      const { x: pointerX, y: pointerY } = (event as CustomEvent<{ x: number; y: number }>).detail;
      targetX.set(pointerX * 24);
      targetY.set(pointerY * -16);
    };

    window.addEventListener('fatorq:core-pointer', onPointer);
    return () => window.removeEventListener('fatorq:core-pointer', onPointer);
  }, [targetX, targetY]);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_48%,rgba(13,139,168,0.18),transparent_35%),radial-gradient(ellipse_at_50%_50%,rgba(7,49,62,0.1),transparent_66%)]" />

      <motion.div style={{ x: farX, y: farY }} className="absolute inset-[-8%] [perspective:1000px]">
        <div className="quantum-impact-title absolute left-[27%] top-[24%] text-[clamp(2.9rem,7.8vw,8.8rem)]">
          TECNOLOGIA
        </div>
        <div className="quantum-impact-title absolute left-[52%] top-[45%] text-[clamp(0.72rem,1.3vw,1.25rem)] tracking-[0.52em]">
          QUE
        </div>
        <div className="quantum-impact-title quantum-impact-title-solid absolute left-[47%] top-[49%] text-[clamp(3.8rem,9vw,10.4rem)]">
          MOVE
        </div>
      </motion.div>

      <motion.div style={{ x: nearX, y: nearY }} className="absolute inset-[-10%]">
        {IMPACT_PARTICLES.map((particle, index) => (
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

        {IMPACT_GLYPHS.map((glyph, index) => (
          <span
            key={`${glyph}-${index}`}
            className="quantum-impact-glyph absolute font-[family-name:var(--font-space)] text-cyan-100"
            style={{
              left: `${(index * 41 + 7) % 94}%`,
              top: `${(index * 23 + 11) % 88}%`,
              fontSize: `${10 + (index % 4) * 3}px`,
              animationDelay: `${-(index % 9) * 0.47}s`,
              animationDuration: `${5.2 + (index % 6) * 0.62}s`,
            }}
          >
            {glyph}
          </span>
        ))}
      </motion.div>

      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#020507] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020507] to-transparent" />
    </motion.div>
  );
}
