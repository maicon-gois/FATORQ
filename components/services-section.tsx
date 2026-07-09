import { Palette, Code2, Brain, Cloud } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { SectionHeader, CtaBanner } from '@/components/section-header';

const icons = {
  design: Palette,
  code: Code2,
  ai: Brain,
  cloud: Cloud,
} as const;

export function ServicesSection() {
  const { servicesEndToEnd } = siteConfig;

  return (
    <section id="servicos" className="py-20 lg:py-28 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={servicesEndToEnd.label}
          title={servicesEndToEnd.title}
          subtitle={servicesEndToEnd.subtitle}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesEndToEnd.items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Code2;
            return (
              <article
                key={item.title}
                className="card-fq p-6 lg:p-7 flex flex-col h-full group"
              >
                <div className="icon-box w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-600/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <h3 className="font-semibold text-white text-base mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{item.description}</p>
              </article>
            );
          })}
        </div>

        <CtaBanner />
      </div>
    </section>
  );
}
