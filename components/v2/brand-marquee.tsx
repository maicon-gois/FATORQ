'use client';

import { siteConfig } from '@/lib/site-config';

export function V2BrandMarquee() {
  const { brandMarquee } = siteConfig;
  const items = [...brandMarquee.items, ...brandMarquee.items];
  return (
    <section className="relative z-10 overflow-hidden border-y border-white/5 bg-black/10 py-10 backdrop-blur-[1px]">
      <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-500 mb-6">{brandMarquee.title}</p>
      <div className="marquee-track"><div className="marquee-content">{items.map((item, i) => (
        <span key={`${item}-${i}`} className="marquee-item font-[family-name:var(--font-space)]"><span className="marquee-dot" aria-hidden />{item}</span>
      ))}</div></div>
    </section>
  );
}
