'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, LifeBuoy, MessageCircle, Mail, BookOpen } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const faqs = [
  {
    category: 'Sites e templates',
    items: [
      {
        q: 'Quanto tempo leva para entregar um site template?',
        a: 'Depende do modelo: Landing (~3 dias úteis), Odonto Pro (~5 dias) e Institucional (~7 dias), após alinhamento de textos, logo e cores.',
      },
      {
        q: 'O preço do catálogo já inclui personalização?',
        a: 'O valor base cobre o template homologado, personalização essencial (marca, textos, cores) e deploy. Escopos extras (páginas novas, integrações complexas) são orçados à parte.',
      },
      {
        q: 'Posso usar meu domínio?',
        a: 'Sim. Orientamos a pontuação DNS (ex.: Vercel) e publicamos no seu domínio após a liberação.',
      },
      {
        q: 'Os prints do catálogo são o site final?',
        a: 'São previews de referência. O site entregue usa sua identidade, conteúdos e ajustes combinados no briefing.',
      },
    ],
  },
  {
    category: 'Atendimento e projetos',
    items: [
      {
        q: 'Como agendo uma conversa?',
        a: 'Pelo WhatsApp comercial ou e-mail. Fazemos diagnóstico rápido, alinhamos escopo e enviamos proposta clara.',
      },
      {
        q: 'Vocês fazem só sites?',
        a: 'Não. A FatorQ também entrega SaaS (ex.: LIA CRM), sistemas custom (D2 Labs), automações e infraestrutura — sempre com validação de entrega.',
      },
      {
        q: 'Como funciona o suporte pós-entrega?',
        a: 'Após o go-live, oferecemos janela de ajustes e, se contratado, plano de manutenção/evolução. Detalhes ficam na proposta.',
      },
    ],
  },
  {
    category: 'Privacidade e dados',
    items: [
      {
        q: 'Como a FatorQ trata meus dados?',
        a: 'Conforme a Política de Privacidade e a página LGPD. Em resumo: finalidade clara, minimização e canais para exercer seus direitos.',
      },
      {
        q: 'Como solicito exclusão ou correção de dados?',
        a: 'Envie e-mail para o canal oficial com o assunto “LGPD — Direitos do titular” ou fale no WhatsApp. Respondemos no prazo legal.',
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-white text-sm sm:text-base">{q}</span>
        <ChevronDown className={cn('w-5 h-5 text-slate-500 shrink-0 transition-transform', open && 'rotate-180 text-cyan-400')} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">{a}</div>}
    </div>
  );
}

export function SuporteContent() {
  const { contact, brand } = siteConfig;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <Link href="/" className="inline-block text-cyan-400 text-sm hover:text-cyan-300 mb-8">
        ← Voltar ao início
      </Link>
      <p className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-4">Central de ajuda</p>
      <h1 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        Suporte e FAQ
      </h1>
      <p className="text-slate-400 text-lg mb-12 max-w-2xl">
        Respostas rápidas sobre sites, projetos e privacidade. Se não encontrar o que precisa, fale com a equipe {brand.name}.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-14">
        <a
          href={whatsappUrl('Olá! Preciso de suporte FatorQ.')}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-500/40 transition-all group"
        >
          <MessageCircle className="w-6 h-6 text-cyan-400 mb-3" />
          <h2 className="text-white font-semibold mb-1 group-hover:text-cyan-300">WhatsApp</h2>
          <p className="text-sm text-slate-500">Canal principal de atendimento comercial e suporte.</p>
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-500/40 transition-all group"
        >
          <Mail className="w-6 h-6 text-cyan-400 mb-3" />
          <h2 className="text-white font-semibold mb-1 group-hover:text-cyan-300">E-mail</h2>
          <p className="text-sm text-slate-500">{contact.email}</p>
        </a>
        <Link
          href="/fluxo-rapido"
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-500/40 transition-all group"
        >
          <BookOpen className="w-6 h-6 text-cyan-400 mb-3" />
          <h2 className="text-white font-semibold mb-1 group-hover:text-cyan-300">Fluxo rápido</h2>
          <p className="text-sm text-slate-500">Monte o briefing do seu site e gere o prompt.</p>
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <LifeBuoy className="w-5 h-5 text-cyan-400" />
        <h2 className="font-[family-name:var(--font-space)] text-2xl font-bold text-white">Perguntas frequentes</h2>
      </div>

      <div className="space-y-10">
        {faqs.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-4">{group.category}</h3>
            <div className="space-y-3">
              {group.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-white/10 bg-[#0B1020]/80 p-8 text-center">
        <h3 className="font-[family-name:var(--font-space)] text-xl font-bold text-white mb-2">Ainda precisa de ajuda?</h3>
        <p className="text-slate-400 text-sm mb-6">
          Horário comercial · {contact.city}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsappUrl('Olá! Não encontrei a resposta no FAQ e preciso de suporte.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#050508] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </a>
          <Link
            href="/privacidade"
            className="inline-flex items-center justify-center gap-2 border border-white/10 text-slate-300 px-6 py-3 rounded-xl hover:border-cyan-500/40 transition-all"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/lgpd"
            className="inline-flex items-center justify-center gap-2 border border-white/10 text-slate-300 px-6 py-3 rounded-xl hover:border-cyan-500/40 transition-all"
          >
            LGPD
          </Link>
        </div>
      </div>
    </div>
  );
}
