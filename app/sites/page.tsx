import Link from 'next/link';
import { V2Navbar } from '@/components/v2/navbar';
import { V2BrandMarquee } from '@/components/v2/brand-marquee';
import { V2DemoSection } from '@/components/v2/demo-section';
import { TemplatesGallerySection } from '@/components/templates-gallery-section';
import { V2Cta } from '@/components/v2/cta';
import { V2Footer } from '@/components/v2/footer';

export const metadata = {
  title: 'Sites Prontos | FatorQ',
  description: 'Escolha um template homologado FatorQ, veja a demo interativa e peça orçamento automático.',
};

export default function SitesPage() {
  return (
    <>
      <V2Navbar />
      <main className="pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-8">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-4">FatorQ Agency</p>
          <h1 className="font-[family-name:var(--font-space)] text-4xl sm:text-5xl font-bold text-white mb-4">
            Sites prontos para o seu negócio
          </h1>
          <p className="text-slate-400 text-lg">
            Template homologado + personalização + deploy. Preço fechado, entrega rápida.
          </p>
          <Link href="/#demo-interativa" className="inline-block mt-6 text-cyan-400 text-sm hover:text-cyan-300">
            ← Voltar ao site institucional
          </Link>
        </div>

        <V2BrandMarquee />
        <V2DemoSection />
        <TemplatesGallerySection compact />
      </main>
      <V2Cta />
      <V2Footer />
    </>
  );
}
