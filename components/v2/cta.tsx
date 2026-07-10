'use client';

import { motion } from 'motion/react';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

export function V2Cta() {
  const { finalCta, contact } = siteConfig;
  return (
    <section id="contato" className="py-28 relative bg-[#050508] overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_60%)]" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0B1020]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl text-center">
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{finalCta.title}</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">{finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-[#050508] px-10 py-5 rounded-xl font-semibold hover:scale-105 transition-transform shadow-[0_0_24px_rgba(6,182,212,0.25)] text-lg">Agendar conversa com especialista</a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-white/[0.04] border border-white/10 text-white px-10 py-5 rounded-xl font-semibold hover:border-cyan-500/40 transition-all text-lg"><MessageCircle className="w-5 h-5 text-sky-400" />Falar no WhatsApp</a>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 justify-center"><MapPin className="w-4 h-4 text-cyan-500" />{contact.city}</span>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 justify-center hover:text-cyan-400 transition-colors"><Mail className="w-4 h-4 text-cyan-500" />{contact.email}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
