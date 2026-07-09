import { ExternalLink, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const statusLabels = {
  production: { label: 'Em produção', class: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  development: { label: 'Desenvolvimento', class: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  coming: { label: 'Em breve', class: 'bg-slate-500/15 text-slate-400 border-slate-500/30' },
} as const;

export function PortfolioSection() {
  const { portfolio } = siteConfig;

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-4">Portfólio</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
              {portfolio.title}
            </h2>
            <p className="text-slate-400 max-w-2xl">{portfolio.subtitle}</p>
          </div>
          <div className="seal-badge w-fit">
            <Sparkles className="w-3 h-3" />
            Chancela FatorQ
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {portfolio.products.map((product) => {
            const status = statusLabels[product.status as keyof typeof statusLabels];

            return (
              <article key={product.name} className="card-fq p-6 flex flex-col h-full group">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">{product.brand}</p>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                      {product.name}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border',
                      status.class
                    )}
                  >
                    {status.label}
                  </span>
                </div>

                <p className="text-xs text-cyan-500/80 font-medium mb-3">{product.category}</p>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-slate-500 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {product.url ? (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 mt-auto transition-transform group-hover:translate-x-1"
                  >
                    Ver produto
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-600 mt-auto">Demo sob consulta</span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
