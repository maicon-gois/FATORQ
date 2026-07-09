'use client';

import { MessageCircle } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

export function StickyCta() {
  const { finalCta } = siteConfig;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-cyan-500/25 bg-[#0a0a0f]/95 backdrop-blur-xl px-5 py-4 shadow-[0_-8px_40px_rgba(0,0,0,0.5)]">
          <div className="hidden sm:block min-w-0">
            <p className="text-sm font-semibold text-white truncate">{finalCta.title}</p>
            <p className="text-xs text-slate-500 truncate">{finalCta.subtitle}</p>
          </div>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto shrink-0 text-sm py-3"
          >
            <MessageCircle className="w-4 h-4" />
            Agendar conversa
          </a>
        </div>
      </div>
    </div>
  );
}
