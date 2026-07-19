import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import { siteConfig } from '@/lib/site-config';
import { CursorGlow } from '@/components/ui/cursor-glow';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fatorq.vercel.app'),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  icons: {
    icon: '/logo-fatorq.png',
    apple: '/logo-fatorq.png',
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${space.variable}`}>
      <head>
        <link
          rel="preload"
          href="/media/quantum/fatorq-sphere-poster.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/models/fatorq-sphere.glb?v=18.3.1"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/models/logo-3d-model-realtime.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased selection:bg-cyan-500/30" suppressHydrationWarning>
        <Script id="fatorq-boot-intent" strategy="beforeInteractive">
          {`(() => {
            const markIntent = (event) => {
              const target = event.target;
              const overCore = target instanceof Element && Boolean(target.closest('[data-quantum-logo-hotspot]'));
              const earlyWheel = event.type === 'wheel' && window.scrollY < window.innerHeight * 1.2;
              if (!overCore && !earlyWheel) return;
              window.__fatorqBootIntent = true;
              document.documentElement.dataset.fatorqBootIntent = 'true';
            };
            window.addEventListener('pointerover', markIntent, { capture: true, passive: true });
            window.addEventListener('pointerdown', markIntent, { capture: true, passive: true });
            window.addEventListener('wheel', markIntent, { capture: true, passive: true });
          })();`}
        </Script>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
