import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoVariant = 'showcase' | 'card';

const sizes: Record<LogoVariant, { width: number; height: number; className: string }> = {
  showcase: { width: 480, height: 300, className: 'w-full max-w-sm sm:max-w-md h-auto' },
  card: { width: 280, height: 175, className: 'w-full max-w-[220px] h-auto' },
};

type FatorLogoProps = {
  variant?: LogoVariant;
  className?: string;
};

/**
 * Logo oficial com fundo preto embutido na arte.
 * Só usar dentro de `.logo-frame` (fundo preto) — nunca sobre a capa ou fotos.
 */
export function FatorLogo({ variant = 'showcase', className }: FatorLogoProps) {
  const size = sizes[variant];

  return (
    <div className={cn('logo-frame', className)}>
      <Image
        src="/logo-fatorq.png"
        alt="FatorQ — A Product of FatorQ Ecosystem"
        width={size.width}
        height={size.height}
        className={cn(size.className, 'object-contain mx-auto')}
      />
    </div>
  );
}

/** Marca tipográfica para navbar, footer e sobreposições */
export function FatorLogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-[family-name:var(--font-display)] font-bold tracking-tight',
        className
      )}
    >
      <span className="text-slate-300">Fator</span>
      <span className="text-gradient-fq">Q</span>
    </span>
  );
}
