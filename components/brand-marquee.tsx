'use client';

import { siteConfig } from '@/lib/site-config';

export function BrandMarquee() {
  const { brandMarquee } = siteConfig;
  const items = [...brandMarquee.items, ...brandMarquee.items];

  return (
    <section className="py-10 border-y border-white/5 bg-[#080810] overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 mb-6 px-4">
        {brandMarquee.title}
      </p>
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className="marquee-item">
              <span className="marquee-dot" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
