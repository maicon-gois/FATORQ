import { siteConfig } from '@/lib/site-config';
import { FatorLogoMark } from '@/components/fator-logo';

export function Footer() {
  const { brand } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#030306] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <FatorLogoMark className="text-xl" />
            <p className="text-xs text-slate-600 mt-2">{brand.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm text-slate-500">
            <a href="#abordagem" className="hover:text-cyan-400 transition-colors">
              Abordagem
            </a>
            <a href="#servicos" className="hover:text-cyan-400 transition-colors">
              Serviços
            </a>
            <a href="#portfolio" className="hover:text-cyan-400 transition-colors">
              Ecossistema
            </a>
            <a href="#contato" className="hover:text-cyan-400 transition-colors">
              Contato
            </a>
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-slate-600">
          <p>
            © {year} {brand.name}. Todos os direitos reservados.
          </p>
          <p className="uppercase tracking-[0.15em]">{brand.ecosystem}</p>
        </div>
      </div>
    </footer>
  );
}
