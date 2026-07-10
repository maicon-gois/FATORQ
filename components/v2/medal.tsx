'use client';

import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { MediaImage } from '@/components/v2/media-image';

export function V2Medal() {
  const { seal, mission } = siteConfig;
  return (
    <section id="sobre" className="py-28 relative bg-[#050508] overflow-hidden flex flex-col items-center border-t border-white/5">
      <div className="relative mb-12 h-64 w-64 sm:h-72 sm:w-72">
        <div className="absolute inset-0 animate-spin-slow pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38BDF8]" style={{ top: '50%', left: '50%', transform: `rotate(${i * 45}deg) translateY(-148px)` }} />
          ))}
        </div>
        <motion.div animate={{ y: [-5, 5, -5], rotateZ: [-0.5, 0.5, -0.5] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300 via-cyan-600 to-blue-950 p-1 shadow-[0_0_55px_rgba(6,182,212,0.34)]">
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-cyan-300/20 bg-[#0B1020]">
              <MediaImage src={seal.image} alt="Selo Chancela FatorQ Ecosystem" sizes="288px" className="scale-[1.48] origin-top object-cover object-top" quality={95} />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_36%,transparent_45%,rgba(5,5,8,0.35)_78%)]" />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="max-w-5xl mx-auto px-4 text-center mb-16">
        <p className="text-xs font-mono tracking-[0.3em] text-slate-500 uppercase mb-3">Chancela</p>
        <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white mb-4">{seal.title}</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">{seal.description}</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {mission.values.map((v, i) => (
          <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center hover:border-cyan-500/30 transition-all">
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
