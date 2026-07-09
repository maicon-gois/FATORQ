import { siteConfig } from '@/lib/site-config';

export type TemplateItem = (typeof siteConfig.templatesCatalog.items)[number];
export type TemplateCategory = TemplateItem['category'] | 'all';

export function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
}

export function buildTemplateQuoteMessage(params: {
  template: TemplateItem;
  name: string;
  business: string;
  whatsapp: string;
}) {
  const { template, name, business, whatsapp } = params;
  return [
    `Olá! Vim pelo site FatorQ e quero orçamento do template *${template.name}*.`,
    ``,
    `📋 Modelo: ${template.id}`,
    `💰 Valor base: ${formatPrice(template.priceCents)}`,
    `⏱ Entrega: ${template.deliveryDays} dias úteis`,
    ``,
    `Nome: ${name}`,
    business ? `Negócio: ${business}` : null,
    whatsapp ? `WhatsApp: ${whatsapp}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}
