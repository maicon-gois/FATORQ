'use client';

import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

export function V2Medal() {
  const { seal, mission } = siteConfig;

  return (
    <section id="sobre" className="py-28 relative bg-[#050508] overflow-hidden flex flex-col items-center border-t border-white/5">
      <motion.div
        animate={{ y: [-6, 6, -6], rotateZ: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="relative mb-12 flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72"
      >
        {/* Argola locked to the same float as the mark */}
        <div className="pointer-events-none absolute inset-0 animate-spin-slow">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38BDF8]"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 36}deg) translateY(-112px)`,
              }}
            />
          ))}
        </div>

        {/* Soft circular halo — no hard box */}
        <div className="pointer-events-none absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.22)_0%,transparent_70%)] blur-xl" />

        <Image
          src={seal.image}
          alt={`Selo ${seal.title}`}
          width={280}
          height={280}
          quality={95}
          className="relative z-[1] h-[78%] w-[78%] object-contain drop-shadow-[0_0_36px_rgba(6,182,212,0.4)]"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 text-center mb-16">
        <p className="text-xs font-mono tracking-[0.3em] text-slate-500 uppercase mb-3">{seal.label}</p>
        <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white mb-4">{seal.title}</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">{seal.description}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {mission.values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center hover:border-cyan-500/30 transition-all"
          >
            <h4 className="font-[family-name:var(--font-space)] font-bold text-cyan-300 text-sm mb-2">{v.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="inline-flex items-center gap-4 bg-[#0B1020] border border-cyan-500/30 px-8 py-4 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <ShieldCheck className="w-6 h-6 text-cyan-400" />
        <div className="text-left">
          <div className="text-white font-bold text-sm">TRANSPARÊNCIA EM CADA ENTREGA</div>
          <div className="text-slate-500 text-xs font-mono tracking-wider">PADRÃO FATORQ ECOSYSTEM</div>
        </div>
      </div>
    </section>
  );
}
