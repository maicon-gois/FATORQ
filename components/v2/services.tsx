'use client';

import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';
import { serviceIcons } from '@/lib/v2-icons';
import { MediaImage } from '@/components/v2/media-image';

const mediaOrigins: Record<string, string> = {
  design: 'origin-top-left',
  development: 'origin-top-right',
  ai: 'origin-bottom-left',
  cloud: 'origin-bottom-right',
};

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
                <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#0B1020]">
                  <MediaImage
                    src={item.image}
                    alt={`Ambiente de ${item.title}`}
                    sizes="(max-width:768px) 100vw, 50vw"
                    className={`object-cover scale-[2.04] transition-transform duration-700 group-hover:scale-[2.1] ${mediaOrigins[item.mediaCrop] ?? 'origin-center'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-transparent to-black/10" />
                  <div className="absolute bottom-5 left-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-[#050508]/85 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all group-hover:border-cyan-400/70 group-hover:shadow-[0_0_24px_rgba(6,182,212,0.22)]">
                    <Icon className="w-6 h-6 text-cyan-300" strokeWidth={1.5} />
                  </div>
                </div>
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
