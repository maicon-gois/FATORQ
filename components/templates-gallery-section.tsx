'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, ExternalLink, Eye, ImageOff, MessageCircle, X } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';
import {
  buildTemplateQuoteMessage,
  formatPrice,
  type TemplateItem,
} from '@/lib/templates';
import { cn } from '@/lib/utils';

function PreviewImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_20%,rgba(6,182,212,0.18),transparent_48%),linear-gradient(145deg,#0b1020,#050508)] px-6 text-center',
          className
        )}
      >
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <ImageOff className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Prévia em preparação</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-top"
      onError={() => setFailed(true)}
      sizes="(max-width: 768px) 100vw, 400px"
    />
  );
}

function DemoModal({
  template,
  onClose,
}: {
  template: TemplateItem;
  onClose: () => void;
}) {
  const [tab, setTab] = useState(0);
  const tabs = template.demoTabs?.length ? template.demoTabs : [{ label: 'Preview', image: template.preview }];
  const active = tabs[tab] ?? tabs[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <p className="text-xs text-cyan-500 uppercase tracking-widest">Demonstração interativa</p>
            <h3 className="font-semibold text-white">{template.name}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-white" aria-label="Fechar">
            <X className="w-5 h-5" />
          </button>
        </div>

        {tabs.length > 1 && (
          <div className="flex gap-2 px-5 pt-4 overflow-x-auto scrollbar-hide">
            {tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setTab(i)}
                className={cn(
                  'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  tab === i
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 border border-white/10 hover:border-white/20'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <div className="p-5 flex-1 min-h-0">
          <div className="browser-frame h-full min-h-[320px] sm:min-h-[420px]">
            <div className="browser-bar">
              <span className="browser-dot bg-red-500/80" />
              <span className="browser-dot bg-amber-500/80" />
              <span className="browser-dot bg-emerald-500/80" />
              <span className="browser-url">demo.fatorq.com.br/{template.id}</span>
            </div>
            <div className="relative flex-1 min-h-[280px] bg-slate-900">
              <PreviewImage src={active.image} alt={`${template.name} — ${active.label}`} className="absolute inset-0" />
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappUrl(
              `Olá! Vi a demonstração do template *${template.name}* no site FatorQ e quero orçamento de ${formatPrice(template.priceCents)}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Quero este — {formatPrice(template.priceCents)}
          </a>
          {template.demoUrl && (
            <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 text-sm">
              <ExternalLink className="w-4 h-4" />
              Abrir demo ao vivo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function QuoteModal({
  template,
  onClose,
}: {
  template: TemplateItem;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [phone, setPhone] = useState('');

  const send = () => {
    const msg = buildTemplateQuoteMessage({
      template,
      name: name || 'Não informado',
      business,
      whatsapp: phone,
    });
    window.open(whatsappUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs text-cyan-500 uppercase tracking-widest">Orçamento automático</p>
            <h3 className="text-xl font-bold text-white mt-1">{template.name}</h3>
            <p className="text-2xl font-bold text-cyan-400 mt-2">{formatPrice(template.priceCents)}</p>
            <p className="text-xs text-slate-500">{template.deliveryDays} dias úteis · chancela FatorQ</p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="input-fq"
          />
          <input
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Nome do negócio (ex: Clínica Sorriso)"
            className="input-fq"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="WhatsApp"
            className="input-fq"
          />
        </div>

        <button type="button" onClick={send} className="btn-primary w-full">
          <MessageCircle className="w-4 h-4" />
          Enviar orçamento no WhatsApp
        </button>
      </div>
    </div>
  );
}

export function TemplatesGallerySection({ compact }: { compact?: boolean }) {
  const { templatesCatalog } = siteConfig;
  const [filter, setFilter] = useState<string>('all');
  const [demoTemplate, setDemoTemplate] = useState<TemplateItem | null>(null);
  const [quoteTemplate, setQuoteTemplate] = useState<TemplateItem | null>(null);

  const filtered =
    filter === 'all'
      ? templatesCatalog.items
      : templatesCatalog.items.filter((t) => t.category === filter);

  return (
    <>
      <section id="sites-prontos" className={cn('py-20 lg:py-28 bg-[#050508]', compact && 'py-16')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="section-label mb-4">{templatesCatalog.label}</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
              {templatesCatalog.title}
            </h2>
            <p className="text-slate-400">{templatesCatalog.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {templatesCatalog.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={cn(
                  'filter-chip px-4 py-2 rounded-full text-sm font-medium',
                  filter === cat.id
                    ? 'filter-chip-active bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 border border-white/10 hover:border-cyan-500/30 hover:text-slate-200'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template) => (
              <article key={template.id} className="card-fq overflow-hidden flex flex-col group">
                <div className="relative aspect-[16/10] bg-slate-900 border-b border-white/5 template-preview-wrap">
                  <PreviewImage src={template.preview} alt={template.name} className="absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setDemoTemplate(template)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm hover:bg-cyan-500/25 hover:border-cyan-400/40 hover:scale-105 transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                      Ver demo
                    </button>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{template.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-white">{template.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{template.deliveryDays} dias úteis</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 flex-1 mb-4">{template.pitch}</p>
                  <ul className="space-y-1.5 mb-5">
                    {template.includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                        <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between gap-3 mt-auto pt-4 border-t border-white/5">
                    <span className="text-2xl font-bold text-white">{formatPrice(template.priceCents)}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setDemoTemplate(template)}
                        className="btn-secondary text-xs py-2 px-3"
                      >
                        Demo
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuoteTemplate(template)}
                        className="btn-primary text-xs py-2 px-3"
                      >
                        Orçar
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!compact && (
            <p className="text-center text-sm text-slate-500 mt-10">
              Coloque seus prints em{' '}
              <code className="text-cyan-600/80">public/templates/previews/</code> — veja README na pasta.
            </p>
          )}
        </div>
      </section>

      {demoTemplate && <DemoModal template={demoTemplate} onClose={() => setDemoTemplate(null)} />}
      {quoteTemplate && <QuoteModal template={quoteTemplate} onClose={() => setQuoteTemplate(null)} />}
    </>
  );
}
