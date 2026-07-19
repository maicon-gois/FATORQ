'use client';

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { MediaImage } from '@/components/v2/media-image';

const statusMap = {
  production: { label: 'Em produção', class: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  development: { label: 'Desenvolvimento', class: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  coming: { label: 'Em breve', class: 'bg-slate-500/15 text-slate-400 border-slate-500/30' },
} as const;

function D2LabsVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#071016]">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(103,232,249,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-3xl border border-cyan-200/25 bg-cyan-300/[0.045] shadow-[0_0_60px_rgba(34,211,238,0.13)] transition-transform duration-700 group-hover:rotate-[52deg] group-hover:scale-105" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="font-[family-name:var(--font-space)] text-3xl font-semibold tracking-[-0.05em] text-white">D2</span>
        <span className="mt-1 text-[8px] uppercase tracking-[0.28em] text-cyan-200/70">Digital Labs</span>
      </div>
      <span className="absolute left-[13%] top-[24%] h-2 w-2 rounded-full border border-cyan-100/50 bg-[#071016] shadow-[0_0_14px_rgba(103,232,249,0.35)]" />
      <span className="absolute right-[12%] top-[30%] h-2 w-2 rounded-full border border-cyan-100/40 bg-[#071016] shadow-[0_0_14px_rgba(103,232,249,0.25)]" />
      <span className="absolute bottom-[18%] left-[23%] h-2 w-2 rounded-full border border-cyan-100/35 bg-[#071016]" />
      <span className="absolute bottom-[20%] right-[20%] h-2 w-2 rounded-full border border-cyan-100/45 bg-[#071016]" />
      <span className="absolute left-[14%] top-[28%] h-px w-[72%] rotate-[8deg] bg-gradient-to-r from-cyan-200/5 via-cyan-200/25 to-cyan-200/5" />
      <span className="absolute bottom-[25%] left-[20%] h-px w-[61%] -rotate-[13deg] bg-gradient-to-r from-cyan-200/5 via-cyan-200/20 to-cyan-200/5" />
    </div>
  );
}

export function V2Ecosystem() {
  const { portfolio } = siteConfig;
  return (
    <section id="portfolio" className="py-28 relative bg-[#050508] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">Portfólio</p>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white mb-4">{portfolio.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{portfolio.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {portfolio.products.map((product, i) => {
            const status = statusMap[product.status as keyof typeof statusMap] ?? statusMap.coming;
            return (
              <motion.article key={product.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all hover:border-cyan-500/40 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#0B1020]">
                  {product.name === 'D2 Labs' ? (
                    <D2LabsVisual />
                  ) : 'image' in product && product.image ? (
                    <MediaImage
                      src={product.image}
                      alt={`Visual do produto ${product.name}`}
                      sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/75 via-transparent to-black/10" />
                  <span className={`absolute right-4 top-4 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase backdrop-blur-md ${status.class}`}>{status.label}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4"><p className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">{product.brand}</p><h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-white">{product.name}</h3></div>
                  <p className="mb-2 text-xs text-cyan-500/80">{product.category}</p>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">{product.description}</p>
                  {product.url ? (
                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">Ver produto <ExternalLink className="w-3.5 h-3.5" /></a>
                  ) : (
                    <span className="mt-auto text-xs text-slate-600">Demo sob consulta</span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
