'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ParticleBg } from '@/components/ui/particle-bg';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

export function V2Hero() {
  const { hero, brand } = siteConfig;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050508] pt-20">
      <ParticleBg />
      <div className="absolute inset-0">
        <Image src="/hero-cover.png" alt="" fill priority quality={95} className="object-cover object-[68%_42%] opacity-[0.58] hero-v2-ken-burns" sizes="100vw" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/95 via-[#050508]/55 to-[#050508]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(6,182,212,0.15),transparent_45%)]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#06B6D4]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              {brand.ecosystem}
            </p>
            <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl lg:text-6xl xl:text-[3.4rem] font-black tracking-tight text-white leading-[1.05] mb-6">
              {hero.headline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#38BDF8]">{hero.headlineHighlight}</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-xl mb-10 font-light leading-relaxed">{hero.subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-3 bg-white text-[#050508] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-[0_0_24px_rgba(6,182,212,0.3)]">
                {hero.primaryCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#servicos" className="inline-flex items-center justify-center gap-3 bg-white/[0.04] border border-white/10 text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-md hover:bg-white/10 hover:border-cyan-500/30 transition-all">
                {hero.secondaryCta}
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative hidden lg:block h-[560px] perspective-1000">
            <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-0 right-0 w-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.55)] bg-[#0A0A14]/70 backdrop-blur-xl">
              <div className="h-9 border-b border-white/10 flex items-center px-4 gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-auto text-[10px] text-slate-500 font-mono">fatorq.com.br</span>
              </div>
              <div className="relative aspect-[16/10]">
                <Image src="/hero-cover.png" alt="FatorQ" fill className="object-cover object-center" quality={95} sizes="420px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />
              </div>
            </motion.div>
            <motion.div animate={{ y: [10, -10, 10], rotate: [-1, 1, -1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-8 left-0 w-[260px] p-5 rounded-2xl bg-black border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
              <Image src="/logo-fatorq.png" alt="FatorQ Logo" width={220} height={138} className="w-full h-auto object-contain mx-auto" quality={95} />
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 text-center mt-3">{brand.ecosystem}</p>
            </motion.div>
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-24 left-8 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              SaaS · Sites · IA · Infra
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#06B6D4]/50 to-transparent" />
    </section>
  );
}
