'use client';

import { motion } from 'motion/react';
import { siteConfig } from '@/lib/site-config';

export function V2Stats() {
  const { stats } = siteConfig;
  return (
    <section className="py-24 relative bg-[#0a0a0f] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">{stats.label}</p>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white">{stats.title}</h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.items.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 mb-2">{item.value}</div>
              <p className="text-sm text-slate-400">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
