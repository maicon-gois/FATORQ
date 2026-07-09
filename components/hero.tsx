import Image from 'next/image';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

export function Hero() {
  const { hero, brand } = siteConfig;

  return (
    <section className="relative min-h-[92vh] flex items-center pt-20 pb-28 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero-cover.png"
          alt=""
          fill
          priority
          className="hero-bg-ken-burns object-cover object-[68%_42%] opacity-[0.62]"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/92 via-[#050508]/52 to-[#050508]/18" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/25 via-transparent to-[#050508]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,rgba(6,182,212,0.14),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(255,255,255,0.04),transparent_35%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <p className="inline-flex items-center gap-2 seal-badge seal-badge-glow mb-8 animate-fade-up">
            <Sparkles className="w-3 h-3" />
            {brand.ecosystem}
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-bold leading-[1.1] mb-6 animate-fade-up animation-delay-100">
            <span className="text-white">{hero.headline} </span>
            <span className="text-gradient-fq">{hero.headlineHighlight}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10 animate-fade-up animation-delay-200">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-up animation-delay-300">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary group">
              {hero.primaryCta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#servicos" className="btn-secondary">
              {hero.secondaryCta}
            </a>
          </div>

          <a
            href="#abordagem"
            className="link-hover inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400"
          >
            <ChevronDown className="w-4 h-4 animate-bounce" />
            Conheça nossa abordagem
          </a>
        </div>
      </div>
    </section>
  );
}
