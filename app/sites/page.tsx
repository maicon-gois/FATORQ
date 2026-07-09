import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { BrandMarquee } from '@/components/brand-marquee';
import { InteractiveDemoSection } from '@/components/interactive-demo-section';
import { TemplatesGallerySection } from '@/components/templates-gallery-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { StickyCta } from '@/components/sticky-cta';

export const metadata = {
  title: 'Sites Prontos | FatorQ',
  description: 'Escolha um template homologado FatorQ, veja a demo interativa e peça orçamento automático.',
};

export default function SitesPage() {
  return (
    <>
      <Navbar />
      <main className="pb-28 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-16 pb-8">
          <p className="section-label mb-4">FatorQ Agency</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-white mb-4">
            Sites prontos para o seu negócio
          </h1>
          <p className="text-slate-400 text-lg">
            Template homologado + personalização + deploy. Preço fechado, entrega rápida.
          </p>
          <Link href="/#demo-interativa" className="inline-block mt-6 text-cyan-400 text-sm hover:text-cyan-300">
            ← Voltar ao site institucional
          </Link>
        </div>

        <BrandMarquee />
        <InteractiveDemoSection />
        <TemplatesGallerySection compact />
      </main>
      <ContactSection />
      <StickyCta />
      <Footer />
    </>
  );
}
