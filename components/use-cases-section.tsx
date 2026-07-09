import { siteConfig } from '@/lib/site-config';
import { SectionHeader } from '@/components/section-header';

export function UseCasesSection() {
  const { useCases } = siteConfig;

  return (
    <section id="casos-de-uso" className="py-20 lg:py-28 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label={useCases.label} title={useCases.title} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 hover:border-cyan-500/25 hover:bg-cyan-500/[0.03] transition-colors"
            >
              <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
