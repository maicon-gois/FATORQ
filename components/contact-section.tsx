import { ArrowRight, MessageCircle, Video } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

export function ContactSection() {
  const { contact, brand, finalCta } = siteConfig;

  return (
    <section id="contato" className="py-24 lg:py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="section-label mb-4">Contato</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            {finalCta.title}
          </h2>
          <p className="text-slate-400 text-lg">{finalCta.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card-fq p-8">
            <h3 className="font-semibold text-white mb-6">Canais diretos</h3>
            <div className="space-y-4 text-sm">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-cyan-500" />
                WhatsApp comercial
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {contact.email}
              </a>
              <p className="text-slate-500">{contact.city}</p>
              <p className="text-slate-500">{contact.meetLabel}</p>
            </div>
          </div>

          <div className="card-fq p-8 flex flex-col justify-center">
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Agende ao lado uma reunião com nossos especialistas — diagnóstico consultivo,
              proposta clara e caminho de execução com chancela {brand.name}.
            </p>
            <div className="space-y-3">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                <MessageCircle className="w-4 h-4" />
                Agendar conversa
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl('Olá! Gostaria de agendar uma reunião no Google Meet para falar sobre um projeto digital.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full"
              >
                <Video className="w-4 h-4" />
                Google Meet
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
