'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import type { TemplateItem } from '@/lib/templates';

function BrowserDemo({ template }: { template: TemplateItem }) {
  const tabs = template.demoTabs?.length ? template.demoTabs : [{ label: 'Preview', image: template.preview }];
  const [tab, setTab] = useState(0);
  const active = tabs[tab] ?? tabs[0];

  return (
    <div className="browser-frame browser-frame-hover shadow-2xl shadow-cyan-500/10">
      <div className="browser-bar">
        <span className="browser-dot bg-red-500/80" />
        <span className="browser-dot bg-amber-500/80" />
        <span className="browser-dot bg-emerald-500/80" />
        <span className="browser-url">demo.fatorq.com.br</span>
      </div>
      {tabs.length > 1 && (
        <div className="flex gap-1 px-3 py-2 bg-[#12121a] border-b border-white/5 overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setTab(i)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                tab === i ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
      <div className="relative aspect-[16/10] bg-slate-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={active.image}
          alt={active.label}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    </div>
  );
}

export function InteractiveDemoSection() {
  const featured = siteConfig.templatesCatalog.items[0];

  return (
    <section id="demo-interativa" className="py-20 lg:py-28 bg-[#0a0a0f] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="section-label mb-4">Demonstração interativa</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-5">
              Veja como ficam os sites FatorQ na prática
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Clique nas abas e explore o layout — mesmo padrão Kamino: preview real antes de fechar.
              Personalizamos cores, textos e logo em poucos dias.
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Play className="w-4 h-4 text-cyan-500" />
              Toque nas abas ao lado para navegar
            </div>
          </div>
          <BrowserDemo template={featured} />
        </div>
      </div>
    </section>
  );
}
