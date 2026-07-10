import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
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
      <body className="font-sans antialiased selection:bg-cyan-500/30" suppressHydrationWarning>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
