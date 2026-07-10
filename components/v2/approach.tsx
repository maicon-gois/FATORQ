'use client';

import { motion } from 'motion/react';
import { Shield, TrendingUp, Users } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

const icons = [Shield, TrendingUp, Users];

export function V2Approach() {
  const { approach } = siteConfig;
  return (
    <section id="abordagem" className="py-28 relative bg-[#0a0a0f] overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">{approach.label}</p>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white">{approach.title}</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {approach.pillars.map((pillar, i) => {
            const Icon = icons[i] ?? Shield;
            return (
              <motion.article key={pillar.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 backdrop-blur-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_24px_rgba(6,182,212,0.2)] transition-shadow"><Icon className="w-6 h-6 text-cyan-400" /></div>
                <h3 className="font-[family-name:var(--font-space)] text-lg font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
