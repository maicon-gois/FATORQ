'use client';

import { motion } from 'motion/react';
import { siteConfig } from '@/lib/site-config';

export function V2Innovation() {
  const { innovation } = siteConfig;
  return (
    <section className="py-28 relative bg-[#050508] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">{innovation.label}</p>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white">{innovation.title}</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {innovation.blocks.map((block, i) => (
            <motion.article key={block.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all group">
              <span className="text-5xl font-[family-name:var(--font-space)] font-black text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-[family-name:var(--font-space)] text-lg font-bold text-white mt-4 mb-4">{block.title}</h3>
              <ul className="space-y-3">{block.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-slate-400 leading-relaxed"><span className="text-cyan-500 shrink-0">→</span>{b}</li>
              ))}</ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
