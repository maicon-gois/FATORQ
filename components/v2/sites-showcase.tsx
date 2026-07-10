'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';
import { formatPrice } from '@/lib/templates';
import { MediaImage } from '@/components/v2/media-image';

export function V2SitesShowcase() {
  const { templatesCatalog } = siteConfig;
  const [paused, setPaused] = useState(false);
  const items = [...templatesCatalog.items, ...templatesCatalog.items];
  return (
    <section id="sites-prontos" className="py-28 relative bg-[#050508] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-14">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">{templatesCatalog.label}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{templatesCatalog.title}</motion.h2>
        <p className="text-slate-400 max-w-2xl mx-auto">{templatesCatalog.subtitle}</p>
      </div>
      <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10" />
        <motion.div className="flex gap-6 px-4 w-max" animate={paused ? undefined : { x: ['0%', '-50%'] }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}>
          {items.map((t, i) => (
            <div key={`${t.id}-${i}`} className="w-[380px] shrink-0 group/card rounded-2xl bg-[#0B1020] border border-white/10 overflow-hidden hover:border-cyan-500/40 transition-all hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]">
              <div className="h-9 bg-white/[0.03] flex items-center px-4 gap-2 border-b border-white/5"><span className="w-2 h-2 rounded-full bg-white/20" /><span className="w-2 h-2 rounded-full bg-white/20" /><span className="w-2 h-2 rounded-full bg-white/20" /></div>
              <div className="relative aspect-[16/10] bg-slate-900">
                <MediaImage src={t.preview} alt={`Prévia do template ${t.name}`} className="object-cover object-top group-hover/card:scale-105 transition-transform duration-700" quality={95} sizes="380px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20">{t.emoji} Ver demo</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2"><h3 className="font-[family-name:var(--font-space)] font-bold text-white">{t.name}</h3><span className="text-lg font-bold text-cyan-300">{formatPrice(t.priceCents)}</span></div>
                <p className="text-xs text-slate-500 mb-1">{t.deliveryDays} dias úteis</p>
                <p className="text-sm text-slate-400 line-clamp-2">{t.pitch}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14 px-4">
        <Link href="/sites" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#050508] font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.2)]">Ver catálogo completo <ExternalLink className="w-4 h-4" /></Link>
        <a href={whatsappUrl('Olá! Quero orçamento de site FatorQ.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.04] border border-white/10 text-white font-semibold hover:border-cyan-500/40 transition-all">Pedir orçamento no WhatsApp</a>
      </div>
    </section>
  );
}
