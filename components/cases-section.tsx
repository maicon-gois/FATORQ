import { siteConfig } from '@/lib/site-config';
import { SectionHeader } from '@/components/section-header';

export function CasesSection() {
  const { cases } = siteConfig;

  return (
    <section id="casos" className="py-20 lg:py-28 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label={cases.label} title={cases.title} />

        <div className="grid lg:grid-cols-3 gap-6">
          {cases.items.map((item) => (
            <article key={item.title} className="card-fq p-8 flex flex-col h-full">
              <p className="text-cyan-400 font-semibold text-sm mb-3">{item.metric}</p>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-4 leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-500 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
