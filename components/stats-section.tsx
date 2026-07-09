import { siteConfig } from '@/lib/site-config';
import { SectionHeader } from '@/components/section-header';

export function StatsSection() {
  const { stats } = siteConfig;

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#050508] to-[#0a1628] border-y border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label={stats.label} title={stats.title} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.items.map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-fq mb-2">
                {item.value}
              </p>
              <p className="text-sm text-slate-400 leading-snug max-w-[140px] mx-auto">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
