'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FatorLogoMark } from '@/components/fator-logo';
import { whatsappUrl } from '@/lib/site-config';

const links = [
  { href: '#sites-prontos', label: 'Sites prontos' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#demo-interativa', label: 'Demo' },
  { href: '#portfolio', label: 'Ecossistema' },
  { href: '#contato', label: 'Contato' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#050508]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2 shrink-0 group">
          <FatorLogoMark className="text-xl sm:text-2xl transition-opacity group-hover:opacity-90" />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/sites"
            className="hidden md:inline text-sm text-slate-400 hover:text-cyan-300 transition-colors"
          >
            Catálogo →
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5"
          >
            Agendar conversa
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-slate-400"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-white/5 bg-[#050508]/95 px-4 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-2 text-center"
            onClick={() => setOpen(false)}
          >
            Agendar conversa
          </a>
        </nav>
      )}
    </header>
  );
}
