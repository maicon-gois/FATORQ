'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { whatsappUrl } from '@/lib/site-config';

const links = [
  { href: '/#portfolio', label: 'Projetos' },
  { href: '/#servicos', label: 'Ecossistema' },
  { href: '/#contato', label: 'Contato' },
];

export function V2Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-[#020507]/95 via-[#020507]/65 to-transparent">
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-14 xl:px-20">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="FatorQ - inicio">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-100/25 bg-cyan-300/[0.07] font-[family-name:var(--font-space)] text-[11px] font-semibold text-cyan-100 transition-colors group-hover:border-cyan-100/60">
            Q
          </span>
          <span className="font-[family-name:var(--font-space)] text-sm font-semibold tracking-[0.04em] text-white">FatorQ</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegacao principal">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-[11px] uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden border-b border-white/25 pb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-cyan-200 hover:text-cyan-100 md:inline-flex"
        >
          Iniciar projeto
        </a>

        <button type="button" className="p-2 text-slate-300 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 flex flex-col gap-2 border border-white/10 bg-[#05090d]/95 px-5 py-5 backdrop-blur-2xl lg:hidden"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} className="py-2 text-sm text-slate-300" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-3 border-t border-white/10 pt-4 text-sm text-cyan-100" onClick={() => setOpen(false)}>
            Iniciar projeto
          </a>
        </motion.nav>
      )}
    </header>
  );
}
