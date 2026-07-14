'use client';

const PARTICLES = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 47 + 11) % 100}%`,
  top: `${(index * 31 + 7) % 100}%`,
  size: 1 + (index % 3),
  opacity: 0.12 + (index % 5) * 0.045,
  delay: `${-(index % 9) * 0.7}s`,
}));

const SYMBOLS = [
  { value: 'Q', left: '13%', top: '24%' },
  { value: 'f(x)', left: '27%', top: '71%' },
  { value: 'Σ', left: '46%', top: '18%' },
  { value: '√', left: '62%', top: '62%' },
  { value: 'π', left: '79%', top: '28%' },
  { value: 'λ', left: '88%', top: '76%' },
  { value: '01', left: '36%', top: '43%' },
  { value: 'x²', left: '70%', top: '88%' },
];

export function V2ParticleContinuum() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#03080c]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(8,145,178,0.18),transparent_42%),radial-gradient(circle_at_28%_76%,rgba(6,182,212,0.08),transparent_36%)]" />

      <div className="absolute inset-[-28%] motion-safe:animate-[spin_44s_linear_infinite] motion-reduce:animate-none">
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-cyan-100 shadow-[0_0_10px_rgba(103,232,249,0.65)] motion-safe:animate-pulse motion-reduce:animate-none"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-[-16%] motion-safe:animate-[spin_58s_linear_infinite_reverse] motion-reduce:animate-none">
        {SYMBOLS.map((symbol, index) => (
          <span
            key={symbol.value}
            className="absolute font-[family-name:var(--font-space)] text-[clamp(1.1rem,2vw,2rem)] font-light text-cyan-100/[0.075] blur-[0.2px]"
            style={{ left: symbol.left, top: symbol.top, transform: `scale(${0.72 + (index % 3) * 0.2})` }}
          >
            {symbol.value}
          </span>
        ))}
      </div>

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020507] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#06080d] to-transparent" />
    </div>
  );
}
