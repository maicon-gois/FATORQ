import { Target, Eye, Gem } from 'lucide-react';
import { FatorLogo } from '@/components/fator-logo';
import { siteConfig } from '@/lib/site-config';

export function MissionSection() {
  const { mission, seal, industries, brand } = siteConfig;

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="section-label mb-4">{mission.title}</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-8">
              Quem faz os sistemas que impulsionam negócios
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Missão</h3>
                  <p className="text-slate-400 leading-relaxed">{mission.mission}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Visão</h3>
                  <p className="text-slate-400 leading-relaxed">{mission.vision}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card-fq p-8 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Gem className="w-5 h-5 text-cyan-400" />
                <h3 className="font-semibold text-white">{seal.title}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">{seal.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {mission.values.map((value) => (
                <div key={value.title} className="card-fq p-5">
                  <h4 className="font-semibold text-cyan-300 text-sm mb-2">{value.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-white/5">
          <div className="rounded-3xl border border-white/8 bg-[#030303] py-12 px-6 sm:px-14 flex flex-col items-center text-center group">
            <FatorLogo variant="showcase" className="mb-5" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-slate-500">
              {brand.ecosystem}
            </p>
          </div>

          <p className="section-label mb-8 text-center mt-16">{industries.title}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {industries.items.map((item) => (
              <div key={item.name} className="card-fq p-6 text-center group">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-3">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
