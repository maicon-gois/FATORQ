'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

type MediaImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  fallbackLabel?: string;
  priority?: boolean;
  quality?: number;
};

export function MediaImage({
  src,
  alt,
  sizes,
  className,
  fallbackLabel = 'Prévia em preparação',
  priority,
  quality = 90,
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_20%,rgba(6,182,212,0.18),transparent_48%),linear-gradient(145deg,#0b1020,#050508)] px-6 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <ImageOff className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      quality={quality}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
