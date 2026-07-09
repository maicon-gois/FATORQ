import { Palette, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const icons = {
  palette: Palette,
  code: Code2,
} as const;

export function AreasSection() {
  const { areas } = siteConfig;

  return (
    <section id="areas" className="py-24 lg:py-32 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="section-label mb-4">Duas frentes, um padrão FatorQ</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Soluções para cada etapa do seu negócio digital
          </h2>
          <p className="text-slate-400 text-lg">
            Do logo à plataforma SaaS — design comercial e engenharia de produto sob o mesmo teto.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {areas.map((area, index) => {
            const Icon = icons[area.icon as keyof typeof icons] ?? Code2;
            const isCreative = area.id === 'creative';

            return (
              <div
                key={area.id}
                className={cn(
                  'card-fq p-8 lg:p-10 relative overflow-hidden group',
                  isCreative
                    ? 'lg:translate-y-0'
                    : 'lg:translate-y-4'
                )}
              >
                <div
                  className={cn(
                    'absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none',
                    isCreative ? 'bg-purple-500' : 'bg-cyan-500'
                  )}
                />

                <div className="relative">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center mb-6',
                      isCreative
                        ? 'bg-purple-500/15 border border-purple-500/25'
                        : 'bg-cyan-500/15 border border-cyan-500/25'
                    )}
                  >
                    <Icon
                      className={cn('w-7 h-7', isCreative ? 'text-purple-400' : 'text-cyan-400')}
                    />
                  </div>

                  <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                    {area.subtitle}
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold text-white mb-4">
                    {area.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6">{area.description}</p>

                  <ul className="space-y-3 mb-8">
                    {area.services.map((service) => (
                      <li key={service} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        {service}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-slate-500 mb-6 border-l-2 border-cyan-500/30 pl-3">
                    {area.audience}
                  </p>

                  <a
                    href={whatsappUrl(`Olá! Tenho interesse em ${area.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 font-medium text-sm hover:text-cyan-300 transition-colors group-hover:gap-3"
                  >
                    {area.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
