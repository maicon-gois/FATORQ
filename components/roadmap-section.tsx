import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function RoadmapSection() {
  const { roadmap } = siteConfig;

  return (
    <section id="roadmap" className="py-24 lg:py-32 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="section-label mb-4">Transparência</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
            {roadmap.title}
          </h2>
          <p className="text-slate-400">{roadmap.subtitle}</p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {roadmap.milestones.map((milestone, index) => {
              const isCurrent = milestone.status === 'current';
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={milestone.period}
                  className={cn(
                    'relative md:grid md:grid-cols-2 md:gap-12',
                    isLeft ? '' : 'md:direction-rtl'
                  )}
                >
                  <div
                    className={cn(
                      'md:col-span-1',
                      isLeft ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'
                    )}
                  >
                    <div
                      className={cn(
                        'card-fq p-6 md:p-8 ml-10 md:ml-0',
                        isCurrent && 'border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.08)]'
                      )}
                    >
                      {isCurrent && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-3">
                          ● Agora
                        </span>
                      )}
                      <p className="text-cyan-500 font-mono text-sm mb-2">{milestone.period}</p>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-4">
                        {milestone.title}
                      </h3>
                      <ul className="space-y-2">
                        {milestone.items.map((item) => (
                          <li key={item} className="text-sm text-slate-400 flex gap-2 md:justify-end">
                            <span className="text-cyan-600 shrink-0">→</span>
                            <span className={isLeft ? 'md:text-right' : ''}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'hidden md:block absolute left-1/2 top-8 w-3 h-3 -translate-x-1/2 rounded-full border-2',
                      isCurrent
                        ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                        : 'bg-[#0a0a0f] border-slate-600'
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
