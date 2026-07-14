import Link from 'next/link';
import { V2Navbar } from '@/components/v2/navbar';
import { V2Footer } from '@/components/v2/footer';

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt?: string;
  children: React.ReactNode;
};

export function LegalPageShell({
  eyebrow,
  title,
  description,
  updatedAt = '10 de julho de 2026',
  children,
}: LegalPageShellProps) {
  return (
    <>
      <V2Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-block text-cyan-400 text-sm hover:text-cyan-300 mb-8">
            ← Voltar ao início
          </Link>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-cyan-400 mb-4">{eyebrow}</p>
          <h1 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-slate-400 text-lg mb-3">{description}</p>
          <p className="text-xs text-slate-600 mb-12">Última atualização: {updatedAt}</p>
          <div className="legal-prose space-y-8 text-slate-300 leading-relaxed">{children}</div>
        </div>
      </main>
      <V2Footer />
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-space)] text-xl font-bold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-slate-400">{children}</div>
    </section>
  );
}
