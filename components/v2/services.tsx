'use client';

import { motion } from 'motion/react';
import { Code2, type LucideIcon } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';
import { serviceIcons } from '@/lib/v2-icons';

type ServiceVisualProps = {
  type: string;
  icon: LucideIcon;
  index: number;
};

function ServiceVisual({ type, icon: Icon, index }: ServiceVisualProps) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#071016]">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.08)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
      <div className="absolute -right-[12%] -top-[45%] h-[145%] w-[58%] rounded-full border border-cyan-200/15 shadow-[0_0_80px_rgba(34,211,238,0.08)] transition-transform duration-700 group-hover:rotate-6 group-hover:scale-105" />
      <div className="absolute left-6 top-5 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.24em] text-cyan-100/55">
        <span className="h-px w-8 bg-cyan-200/50" /> FQ capability / 0{index + 1}
      </div>

      {type === 'design' && (
        <div className="absolute inset-x-[18%] bottom-[13%] top-[25%] grid grid-cols-[1.1fr_.7fr] gap-3 transition-transform duration-700 group-hover:-translate-y-1">
          <div className="flex flex-col justify-between rounded-xl border border-cyan-100/20 bg-[#07131a]/90 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <span className="font-[family-name:var(--font-space)] text-4xl font-semibold text-white/90">Aa</span>
            <div className="space-y-2"><span className="block h-1 w-4/5 bg-cyan-100/45" /><span className="block h-1 w-1/2 bg-white/15" /></div>
          </div>
          <div className="grid grid-rows-3 gap-2">
            <span className="rounded-lg border border-cyan-100/15 bg-cyan-300/10" />
            <span className="rounded-lg border border-white/10 bg-white/[0.045]" />
            <span className="rounded-lg border border-sky-300/20 bg-sky-400/10" />
          </div>
        </div>
      )}

      {type === 'code' && (
        <div className="absolute inset-x-[15%] bottom-[13%] top-[25%] overflow-hidden rounded-xl border border-cyan-100/20 bg-[#050a0e]/95 shadow-[0_18px_50px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:-translate-y-1">
          <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-3"><i className="h-1.5 w-1.5 rounded-full bg-cyan-100/50" /><i className="h-1.5 w-1.5 rounded-full bg-cyan-100/25" /><i className="h-1.5 w-1.5 rounded-full bg-white/15" /></div>
          <div className="space-y-3 p-5">{[82, 48, 68, 36].map((width, line) => <span key={width} className="block h-1 rounded-full bg-gradient-to-r from-cyan-200/55 to-cyan-400/5" style={{ width: `${width}%`, marginLeft: `${line % 2 === 0 ? 0 : 12}%` }} />)}</div>
        </div>
      )}

      {type === 'ai' && (
        <div className="absolute inset-x-[18%] bottom-[12%] top-[22%] transition-transform duration-700 group-hover:scale-[1.04]">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xl border border-cyan-100/40 bg-cyan-300/10 shadow-[0_0_44px_rgba(34,211,238,0.16)]" />
          {[['12%', '16%'], ['76%', '14%'], ['9%', '76%'], ['79%', '72%']].map(([left, top], node) => <span key={left} className="absolute h-4 w-4 rounded-full border border-cyan-100/45 bg-[#071016] shadow-[0_0_16px_rgba(103,232,249,0.24)]" style={{ left, top, animationDelay: `${node * -0.25}s` }} />)}
          <span className="absolute left-[16%] top-[25%] h-px w-[69%] rotate-[17deg] bg-cyan-100/25" />
          <span className="absolute left-[15%] top-[67%] h-px w-[70%] -rotate-[15deg] bg-cyan-100/25" />
        </div>
      )}

      {type === 'cloud' && (
        <div className="absolute inset-x-[18%] bottom-[12%] top-[24%] grid grid-cols-[1fr_.55fr] gap-3 transition-transform duration-700 group-hover:-translate-y-1">
          <div className="space-y-2 rounded-xl border border-cyan-100/20 bg-[#061017]/90 p-4">{[0, 1, 2].map((server) => <div key={server} className="flex h-9 items-center gap-3 rounded-md border border-cyan-100/15 px-3"><i className="h-1.5 w-1.5 rounded-full bg-cyan-200/70" /><span className="h-px flex-1 bg-cyan-100/20" /><i className="h-1 w-5 bg-white/10" /></div>)}</div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-cyan-100/18 bg-cyan-300/[0.045]"><Icon className="h-10 w-10 text-cyan-200/70" strokeWidth={1.2} /><span className="mt-3 text-[8px] uppercase tracking-[0.2em] text-cyan-100/45">99.9% up</span></div>
        </div>
      )}

      <div className="absolute bottom-5 left-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-[#050508]/85 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all group-hover:border-cyan-400/70 group-hover:shadow-[0_0_24px_rgba(6,182,212,0.22)]">
        <Icon className="h-6 w-6 text-cyan-300" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#080b12]/80 via-transparent to-transparent" />
    </div>
  );
}

export function V2Services() {
  const { servicesEndToEnd } = siteConfig;
  return (
    <section id="servicos" className="py-28 relative bg-[#050508] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#0B1020] rounded-full blur-[150px] opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">{servicesEndToEnd.label}</p>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{servicesEndToEnd.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{servicesEndToEnd.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {servicesEndToEnd.items.map((item, i) => {
            const Icon = serviceIcons[item.icon] ?? Code2;
            return (
              <motion.article key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all hover:border-cyan-500/40 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-500" />
                <ServiceVisual type={item.icon} icon={Icon} index={i} />
                <div className="relative z-10 p-8 md:p-9">
                  <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex px-8 py-4 rounded-xl bg-white text-[#050508] font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.2)]">{servicesEndToEnd.cta}</a>
        </motion.div>
      </div>
    </section>
  );
}
