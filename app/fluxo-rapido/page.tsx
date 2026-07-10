import type { Metadata } from 'next';
import { V2Navbar } from '@/components/v2/navbar';
import { V2Footer } from '@/components/v2/footer';
import { QuickSiteFlowBuilder } from '@/components/quick-site-flow-builder';

export const metadata: Metadata = {
  title: 'Fluxo Rápido | FatorQ Sites',
  description: 'Construtor de briefing e prompt para criação rápida de sites no padrão FatorQ.',
};

export default function FluxoRapidoPage() {
  return (
    <>
      <V2Navbar />
      <main className="min-h-screen px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <QuickSiteFlowBuilder />
        </div>
      </main>
      <V2Footer />
    </>
  );
}

