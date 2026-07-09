import { siteConfig } from '@/lib/site-config';
import { SectionHeader } from '@/components/section-header';

export function TrustSection() {
  const { trust } = siteConfig;

  return (
    <section className="py-16 lg:py-20 bg-[#050508] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <SectionHeader label={trust.label} title={trust.title} subtitle={trust.subtitle} />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide max-w-7xl mx-auto">
        {trust.brands.map((brand) => (
          <div
            key={brand}
            className="snap-center shrink-0 min-w-[200px] sm:min-w-[240px] card-fq px-8 py-10 flex items-center justify-center"
          >
            <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-slate-300 whitespace-nowrap">
              {brand}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-slate-600 mt-6 uppercase tracking-widest">
        Deslize para ver mais →
      </p>
    </section>
  );
}
