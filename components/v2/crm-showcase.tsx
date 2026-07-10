'use client';

import { motion } from 'motion/react';
import { Calendar, MessageCircle, Zap, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { MediaImage } from '@/components/v2/media-image';

const features = [
  { icon: MessageCircle, title: 'WhatsApp Integrado', desc: 'Atendimento 24/7 com respostas inteligentes' },
  { icon: Calendar, title: 'Agenda Inteligente', desc: 'Mais organização e menos faltas' },
  { icon: Zap, title: 'IA que Qualifica e Converte', desc: 'Mais eficiência, melhores resultados' },
];

export function V2CrmShowcase() {
  const liaCase = siteConfig.cases.items[0];
  const liaImage = ('image' in liaCase ? liaCase.image : undefined) ?? '/media/temp/products/lia-crm-dashboard.png';
  return (
    <section className="py-28 relative bg-[#0B1020] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06B6D410_1px,transparent_1px),linear-gradient(to_bottom,#06B6D410_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-4">
            <span className="text-4xl font-[family-name:var(--font-space)] font-black text-white">LIA<span className="text-cyan-400">CRM</span></span>
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-space)] font-bold text-white mt-4 mb-4 leading-tight">{liaCase.title}</h2>
            <p className="text-slate-400 text-lg mb-8 font-light leading-relaxed">{liaCase.description}</p>
            <div className="flex flex-col gap-5">{features.map((f, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#050508] border border-white/10 flex items-center justify-center shrink-0"><f.icon className="w-5 h-5 text-cyan-400" /></div>
                <div><h4 className="text-white font-medium mb-1">{f.title}</h4><p className="text-sm text-slate-500">{f.desc}</p></div>
              </div>
            ))}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A14]/80 shadow-[0_40px_100px_rgba(0,0,0,0.5),0_0_50px_rgba(6,182,212,0.08)] backdrop-blur-xl">
              <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-white/[0.025] px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="mx-auto rounded-md bg-black/20 px-16 py-1 text-[10px] font-mono text-slate-600">lia-crm.com/dashboard</span>
              </div>
              <div className="group relative aspect-[16/10] overflow-hidden bg-[#050914]">
                <MediaImage src={liaImage} alt="Dashboard do LIA CRM com agenda, leads e atendimento pelo WhatsApp" sizes="(max-width:1024px) 100vw, 66vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.012]" quality={95} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050508]/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-[#050508]/85 px-3 py-2 text-[10px] text-slate-300 shadow-xl backdrop-blur-md"><CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" /> Lead qualificado</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-[#050508]/85 px-3 py-2 text-[10px] text-slate-300 shadow-xl backdrop-blur-md"><CheckCircle2 className="h-3.5 w-3.5 text-sky-300" /> Agenda sincronizada</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
