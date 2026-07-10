'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

const links = [
  { href: '/#sites-prontos', label: 'Sites' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#demo-interativa', label: 'Demo' },
  { href: '/#portfolio', label: 'Ecossistema' },
  { href: '/#contato', label: 'Contato' },
];

export function V2Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#38BDF8] flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:scale-105 transition-transform">
            <span className="font-[family-name:var(--font-space)] font-black text-[#050508] text-lg">Q</span>
          </div>
          <span className="font-[family-name:var(--font-space)] font-bold text-white text-lg">{siteConfig.brand.name}</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-cyan-300 transition-colors">{link.label}</a>
          ))}
          <a href="/fluxo-rapido" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors">Fluxo rápido</a>
          <a href="/sites" className="text-sm text-cyan-400/90 hover:text-cyan-300">Catálogo →</a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl bg-white text-[#050508] text-sm font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            Agendar conversa
          </a>
        </div>
        <button type="button" className="lg:hidden p-2 text-slate-400" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden border-t border-white/5 bg-[#050508]/95 px-4 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-300 py-2" onClick={() => setOpen(false)}>{link.label}</a>
          ))}
          <a href="/fluxo-rapido" className="text-slate-300 py-2" onClick={() => setOpen(false)}>Fluxo rápido</a>
          <a href="/sites" className="text-cyan-400 py-2" onClick={() => setOpen(false)}>Catálogo</a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-2 text-center px-5 py-3 rounded-xl bg-white text-[#050508] font-semibold" onClick={() => setOpen(false)}>WhatsApp</a>
        </motion.nav>
      )}
    </header>
  );
}
