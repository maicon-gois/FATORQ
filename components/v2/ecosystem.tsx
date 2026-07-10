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
                  <MediaImage
                    src={product.image}
                    alt={`Visual do produto ${product.name}`}
                    sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                    className={`${product.name === 'D2 Labs' ? 'scale-[2.04] origin-bottom-left group-hover:scale-[2.1]' : 'group-hover:scale-[1.04]'} object-cover object-center transition-transform duration-700`}
                  />
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
