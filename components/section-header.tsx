import { ArrowRight } from 'lucide-react';
import { siteConfig, whatsappUrl } from '@/lib/site-config';

type SectionHeaderProps = {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
};

export function SectionHeader({ label, title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center max-w-3xl mx-auto mb-14' : 'max-w-3xl mb-14'}>
      <p className="section-label mb-4">{label}</p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-5">
        {title}
      </h2>
      {subtitle && <p className="text-slate-400 text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function CtaBanner({ text }: { text?: string }) {
  const cta = text ?? siteConfig.servicesEndToEnd.cta;
  return (
    <div className="flex justify-center mt-12">
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
        {cta}
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
