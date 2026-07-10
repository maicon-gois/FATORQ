import { siteConfig, whatsappUrl } from '@/lib/site-config';

export function V2Footer() {
  const { brand, portfolio, contact } = siteConfig;
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-b from-transparent to-[#0B1020]/60 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-sky-400 flex items-center justify-center"><span className="font-[family-name:var(--font-space)] font-black text-[#050508]">Q</span></div>
              <span className="font-[family-name:var(--font-space)] font-bold text-white text-lg">{brand.name}</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mb-4">{brand.tagline}. {brand.ecosystem}.</p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm hover:text-cyan-300">WhatsApp comercial →</a>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Ecossistema</h4>
            <ul className="flex flex-col gap-2">{portfolio.products.map((p) => <li key={p.name}><span className="text-slate-500 text-sm">{p.name}</span></li>)}</ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Contato</h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li>{contact.city}</li>
              <li><a href={`mailto:${contact.email}`} className="hover:text-cyan-400">{contact.email}</a></li>
              <li><a href="/fluxo-rapido" className="hover:text-cyan-400">Fluxo rápido</a></li>
              <li><a href="/sites" className="hover:text-cyan-400">Sites prontos</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-600">
          <p>© {year} {brand.name} Ecosystem. Todos os direitos reservados.</p>
          <p>{contact.city}</p>
        </div>
      </div>
    </footer>
  );
}
