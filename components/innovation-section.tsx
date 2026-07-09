import { Check } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { SectionHeader } from '@/components/section-header';

export function InnovationSection() {
  const { innovation } = siteConfig;

  return (
    <section id="inovacao" className="py-20 lg:py-28 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label={innovation.label} title={innovation.title} />

        <div className="grid lg:grid-cols-3 gap-8">
          {innovation.blocks.map((block, index) => (
            <article key={block.title} className="relative">
              <span className="text-6xl font-bold text-cyan-500/10 absolute -top-4 -left-1 select-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="relative pt-8">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-5 leading-snug">
                  {block.title}
                </h3>
                <ul className="space-y-3">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                      <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
