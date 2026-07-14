import type { Metadata } from 'next';
import { V2Navbar } from '@/components/v2/navbar';
import { V2Footer } from '@/components/v2/footer';
import { SuporteContent } from '@/components/v2/suporte-content';

export const metadata: Metadata = {
  title: 'Suporte e FAQ | FatorQ',
  description: 'Central de ajuda FatorQ: FAQ sobre sites, projetos, suporte e privacidade.',
};

export default function SuportePage() {
  return (
    <>
      <V2Navbar />
      <main className="pt-24 pb-20">
        <SuporteContent />
      </main>
      <V2Footer />
    </>
  );
}
