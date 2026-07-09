import { Shield, TrendingUp, Users } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { SectionHeader } from '@/components/section-header';

const icons = [Shield, TrendingUp, Users];

export function ApproachSection() {
  const { approach } = siteConfig;

  return (
    <section id="abordagem" className="py-20 lg:py-28 bg-[#0a0a0f] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label={approach.label} title={approach.title} />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {approach.pillars.map((pillar, i) => {
            const Icon = icons[i] ?? Shield;
            return (
              <article key={pillar.title} className="card-fq p-8 lg:p-9 group">
                <div className="icon-box w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
