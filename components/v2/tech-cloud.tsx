'use client';

import { motion } from 'motion/react';

const technologies = ['React', 'Node.js', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'OpenAI', 'WhatsApp API', 'TypeScript', 'TailwindCSS', 'Vercel', 'Prisma', 'Zabbix', 'Stripe', 'n8n', 'Evolution API'];

export function V2TechCloud() {
  return (
    <section className="py-24 relative bg-[#050508] overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-[family-name:var(--font-space)] text-3xl font-bold text-white mb-12">Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">Tecnológico</span></h2>
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech, i) => (
            <motion.span key={tech} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} whileHover={{ scale: 1.08, y: -4 }} className="px-5 py-2.5 rounded-full bg-[#0B1020] border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-slate-300 font-mono text-sm transition-all cursor-default">{tech}</motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
