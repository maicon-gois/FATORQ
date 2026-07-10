'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { MediaImage } from '@/components/v2/media-image';

export function V2HumanProof() {
  const { humanProof } = siteConfig;

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#080b12] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(6,182,212,0.1),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(56,189,248,0.08),transparent_28%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="mb-3 text-xs font-mono uppercase tracking-[0.22em] text-cyan-400">{humanProof.label}</p>
            <h2 className="max-w-4xl font-[family-name:var(--font-space)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{humanProof.title}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="text-lg leading-relaxed text-slate-400">
            {humanProof.description}
          </motion.p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.65fr_.65fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[#050508] sm:min-h-[480px]">
            <MediaImage src={humanProof.teamImage} alt="Equipe reunida em um ambiente de tecnologia" sizes="(max-width:1024px) 100vw, 72vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Pessoas + processo</p>
                <p className="mt-2 max-w-xl text-xl font-semibold text-white sm:text-2xl">Proximidade para entender. Método para entregar.</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">Parceria consultiva <ArrowUpRight className="h-4 w-4 text-cyan-300" /></span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="relative min-h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-[#050508] lg:min-h-0">
            <MediaImage src={humanProof.portraitImage} alt="Profissional em um ambiente de desenvolvimento de software" sizes="(max-width:1024px) 100vw, 28vw" className="object-cover object-[50%_28%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <div className="flex items-center gap-2 text-sm font-semibold text-white"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Acompanhamento próximo</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Da primeira conversa ao suporte pós-entrega.</p>
            </div>
          </motion.div>
        </div>

        <p className="mt-5 text-right text-[11px] uppercase tracking-[0.16em] text-slate-600">{humanProof.disclaimer}</p>
      </div>
    </section>
  );
}
