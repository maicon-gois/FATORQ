'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

const deliverySteps = [
  { number: '01', title: 'Diagnóstico', description: 'Contexto, prioridades e critérios de sucesso.' },
  { number: '02', title: 'Execução', description: 'Sprints objetivas, documentação e visibilidade.' },
  { number: '03', title: 'Evolução', description: 'Suporte consultivo, métricas e melhoria contínua.' },
];

export function V2HumanProof() {
  const { humanProof } = siteConfig;

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#080b12] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(6,182,212,0.1),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(56,189,248,0.08),transparent_28%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(103,232,249,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.045)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
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
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group relative min-h-[440px] overflow-hidden rounded-3xl border border-white/10 bg-[#05090d] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-10">
            <div className="absolute -right-[14%] -top-[48%] h-[130%] w-[62%] rounded-full border border-cyan-200/10 shadow-[0_0_110px_rgba(34,211,238,0.08)] transition-transform duration-1000 group-hover:rotate-6" />
            <div className="relative flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">FatorQ delivery system</p>
                <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">Proximidade para entender. Método para entregar.</p>
              </div>
              <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-4 py-2 text-xs text-slate-300 sm:inline-flex">Operação transparente <ArrowUpRight className="h-4 w-4 text-cyan-300" /></span>
            </div>

            <div className="relative mt-10 grid gap-4 md:grid-cols-3">
              <div className="absolute left-[13%] right-[13%] top-5 hidden h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent md:block" />
              {deliverySteps.map((step, index) => (
                <motion.div key={step.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 + index * 0.1 }} className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-sm transition-colors hover:border-cyan-300/25">
                  <span className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/30 bg-[#07151c] font-mono text-xs text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">{step.number}</span>
                  <h3 className="mt-7 font-[family-name:var(--font-space)] text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="relative mt-7 grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-cyan-300/[0.025] py-4 text-center">
              <div><strong className="block text-sm font-semibold text-white">Escopo claro</strong><span className="mt-1 block text-[9px] uppercase tracking-[0.18em] text-slate-500">antes de construir</span></div>
              <div><strong className="block text-sm font-semibold text-white">Release governado</strong><span className="mt-1 block text-[9px] uppercase tracking-[0.18em] text-slate-500">durante a entrega</span></div>
              <div><strong className="block text-sm font-semibold text-white">Suporte real</strong><span className="mt-1 block text-[9px] uppercase tracking-[0.18em] text-slate-500">depois do deploy</span></div>
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#07131a,#05080c)] p-7 sm:p-9">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-cyan-200/10 shadow-[0_0_70px_rgba(34,211,238,0.08)]" />
            <div className="relative flex h-full min-h-[360px] flex-col">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">Governança aplicada</p>
              <div className="my-auto py-10">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/[0.045] shadow-[0_0_48px_rgba(34,211,238,0.12)]">
                  <CheckCircle2 className="h-10 w-10 text-cyan-200" strokeWidth={1.25} />
                </div>
                <h3 className="mt-7 font-[family-name:var(--font-space)] text-2xl font-semibold text-white">Acompanhamento próximo</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">Decisões registradas, riscos visíveis e responsabilidade sobre cada entrega.</p>
              </div>
              <div className="space-y-3 border-t border-white/10 pt-5 text-xs text-slate-300">
                {['Documentação desde o início', 'Validação em cada marco', 'Suporte pós-entrega'].map((item) => <div key={item} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.5)]" />{item}</div>)}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
