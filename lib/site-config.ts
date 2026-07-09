import raw from '@/site.config.json';

export type SiteConfig = typeof raw;

export const siteConfig = raw as SiteConfig;

export function whatsappUrl(message?: string) {
  const { whatsapp, whatsappMessage } = siteConfig.contact;
  const text = encodeURIComponent(message ?? whatsappMessage);
  return `https://wa.me/${whatsapp}?text=${text}`;
}
