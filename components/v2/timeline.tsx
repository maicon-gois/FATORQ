'use client';

import { motion } from 'motion/react';
import { Search, PenTool, LayoutTemplate, Terminal, Rocket, HeartHandshake } from 'lucide-react';

const steps = [
  { id: '01', title: 'Descoberta', icon: Search, desc: 'Diagnóstico no Meet — entendemos negócio e objetivos.' },
  { id: '02', title: 'UX', icon: PenTool, desc: 'Arquitetura de informação e jornadas do usuário.' },
  { id: '03', title: 'Design', icon: LayoutTemplate, desc: 'Identidade visual premium e interfaces.' },
  { id: '04', title: 'Código', icon: Terminal, desc: 'Desenvolvimento robusto com squads + IA.' },
  { id: '05', title: 'Deploy', icon: Rocket, desc: 'Homologação, documentação e deploy governado.' },
  { id: '06', title: 'Suporte', icon: HeartHandshake, desc: 'Acompanhamento consultivo pós-entrega.' },
];

export function V2Timeline() {
  return (
    <section className="py-28 relative bg-[#0B1020] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white mb-3">Como <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">Trabalhamos</span></h2>
          <p className="text-slate-500 font-mono text-xs tracking-[0.2em] uppercase">Processo ponta a ponta</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-white/10" />
          {steps.map((step, i) => (
            <motion.div key={step.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-row md:flex-col items-center md:text-center relative group">
              <div className="md:mx-auto w-16 h-16 rounded-full bg-[#050508] border border-white/10 flex items-center justify-center shrink-0 mb-0 md:mb-5 z-10 group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
                <step.icon className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="ml-5 md:ml-0">
                <div className="text-xs font-mono text-cyan-400 mb-1">{step.id}</div>
                <h4 className="text-base font-bold text-white mb-1">{step.title}</h4>
                <p className="text-xs text-slate-500 hidden md:block">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
