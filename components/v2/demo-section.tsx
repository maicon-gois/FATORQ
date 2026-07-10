'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { MediaImage } from '@/components/v2/media-image';

export function V2DemoSection() {
  const featured = siteConfig.templatesCatalog.items[0];
  const tabs = featured.demoTabs?.length ? featured.demoTabs : [{ label: 'Preview', image: featured.preview }];
  const [tab, setTab] = useState(0);
  const active = tabs[tab] ?? tabs[0];
  return (
    <section id="demo-interativa" className="py-28 bg-[#0B1020] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-3">Demonstração interativa</p>
            <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold text-white mb-5">Veja como ficam os sites FatorQ na prática</h2>
            <p className="text-slate-400 leading-relaxed mb-6">Clique nas abas e explore o layout — preview real antes de fechar. Personalizamos cores, textos e logo em poucos dias.</p>
            <div className="flex items-center gap-2 text-sm text-slate-500"><Play className="w-4 h-4 text-cyan-500" />{featured.name} · {featured.emoji}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} whileHover={{ y: -4 }} className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A14]/80 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.5),0_0_40px_rgba(6,182,212,0.1)]">
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" /><span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="flex-1 text-center text-[10px] font-mono text-slate-500">demo.fatorq.com.br</span>
            </div>
            {tabs.length > 1 && (
              <div className="flex gap-1 px-3 py-2 border-b border-white/5 overflow-x-auto">
                {tabs.map((t, i) => (
                  <button key={t.label} type="button" onClick={() => setTab(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === i ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}>{t.label}</button>
                ))}
              </div>
            )}
            <div className="relative aspect-[16/10] bg-slate-900">
              <MediaImage src={active.image} alt={`${featured.name} — ${active.label}`} className="object-cover object-top" quality={95} sizes="(max-width:768px) 100vw, 600px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
