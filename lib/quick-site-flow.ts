export type PromptMode = 'complete' | 'short';

export type DeliveryMode = 'landing' | 'institutional' | 'multi-page' | 'catalog';

export type QuickSiteBriefing = {
  rawClientScript: string;
  companyName: string;
  siteType: DeliveryMode;
  segment: string;
  objective: string;
  audience: string;
  painPoint: string;
  offer: string;
  primaryCta: string;
  tone: string;
  visualReferences: string;
  requiredSections: string;
  differentials: string;
  socialProof: string;
  brandAssets: string;
  materials: string;
  location: string;
  competitors: string;
  restrictions: string;
  deadline: string;
  ecosystemLinks: string[];
};

export const quickSiteEcosystemOptions = [
  'FatorQ Sites',
  'LIA CRM',
  'D2 Labs',
  'FatorQ Infra',
] as const;

export const defaultQuickSiteBriefing: QuickSiteBriefing = {
  rawClientScript: '',
  companyName: '',
  siteType: 'landing',
  segment: '',
  objective: 'Captar leads qualificados e gerar conversas pelo WhatsApp',
  audience: '',
  painPoint: '',
  offer: '',
  primaryCta: 'Falar no WhatsApp',
  tone: 'Premium, claro, consultivo e comercial',
  visualReferences: 'Stripe, Linear, Framer, Vercel, Apple, OpenAI, com identidade brasileira',
  requiredSections: 'Hero, prova de valor, serviços, diferenciais, processo, provas sociais, FAQ e CTA final',
  differentials: '',
  socialProof: '',
  brandAssets: '',
  materials: '',
  location: '',
  competitors: '',
  restrictions: '',
  deadline: '',
  ecosystemLinks: ['FatorQ Sites'],
};

const SITE_TYPE_LABELS: Record<DeliveryMode, string> = {
  landing: 'Landing page de conversão',
  institutional: 'Site institucional',
  'multi-page': 'Site multipáginas',
  catalog: 'Catálogo ou vitrine comercial',
};

const requiredBriefingFields: Array<keyof QuickSiteBriefing> = [
  'companyName',
  'segment',
  'objective',
  'audience',
  'painPoint',
  'offer',
  'primaryCta',
  'tone',
  'visualReferences',
  'requiredSections',
];

function clean(value: string) {
  return value.trim().replace(/\n{3,}/g, '\n\n');
}

function fallback(value: string, empty = 'a definir') {
  return clean(value) || empty;
}

function listLine(label: string, value: string) {
  return `- ${label}: ${fallback(value)}`;
}

export function getQuickSiteCompletion(briefing: QuickSiteBriefing) {
  const filled = requiredBriefingFields.filter((field) => {
    const value = briefing[field];
    return typeof value === 'string' ? value.trim().length > 0 : true;
  }).length;

  return Math.round((filled / requiredBriefingFields.length) * 100);
}

export function buildQuickSiteJson(briefing: QuickSiteBriefing) {
  return {
    source: 'FatorQ Fluxo Rapido',
    version: 1,
    generatedAt: new Date().toISOString(),
    briefing: {
      ...briefing,
      siteTypeLabel: SITE_TYPE_LABELS[briefing.siteType],
    },
  };
}

export function buildQuickSitePrompt(briefing: QuickSiteBriefing, mode: PromptMode) {
  const ecosystem = briefing.ecosystemLinks.length
    ? briefing.ecosystemLinks.join(', ')
    : 'FatorQ Sites';

  if (mode === 'short') {
    return clean(`Crie um site premium para ${fallback(briefing.companyName, '[empresa]')}, do segmento ${fallback(briefing.segment, '[segmento]')}, com foco em ${fallback(briefing.objective, '[objetivo]')}.

Tipo de site: ${SITE_TYPE_LABELS[briefing.siteType]}
Público-alvo: ${fallback(briefing.audience, '[publico]')}
Dor principal: ${fallback(briefing.painPoint, '[dor_principal]')}
Oferta: ${fallback(briefing.offer, '[oferta]')}
CTA principal: ${fallback(briefing.primaryCta, '[cta_principal]')}
Tom de voz: ${fallback(briefing.tone, '[tom_de_voz]')}
Referências visuais: ${fallback(briefing.visualReferences, '[referencias_visuais]')}
Seções obrigatórias: ${fallback(briefing.requiredSections, '[secoes_obrigatorias]')}
Materiais enviados: ${fallback(briefing.materials || briefing.brandAssets, '[materiais_enviados]')}
Script bruto do cliente: ${fallback(briefing.rawClientScript, '[script_do_cliente]')}

O resultado precisa parecer uma empresa de tecnologia de alto nível, com padrão visual FatorQ: moderno, sofisticado, responsivo, animado e orientado à conversão.
Conexão de ecossistema quando fizer sentido: ${ecosystem}.
Não faça um site simples demais.`);
  }

  return clean(`PROMPT MESTRE - FLUXO RAPIDO FATORQ

Você é um diretor de produto, UX writer, designer sênior e engenheiro frontend especializado em sites premium para empresas brasileiras.

MISSÃO
Criar uma experiência web completa, moderna e orientada à conversão para o cliente abaixo. O site deve parecer um produto digital premium, com acabamento de empresa de tecnologia, e deve ficar pronto para implementação rápida no padrão FatorQ.

BRIEFING DO CLIENTE
${listLine('Empresa', briefing.companyName)}
${listLine('Tipo de site', SITE_TYPE_LABELS[briefing.siteType])}
${listLine('Segmento', briefing.segment)}
${listLine('Objetivo principal', briefing.objective)}
${listLine('Público-alvo', briefing.audience)}
${listLine('Principal dor ou desejo do cliente final', briefing.painPoint)}
${listLine('Oferta principal', briefing.offer)}
${listLine('CTA principal', briefing.primaryCta)}
${listLine('Tom de voz', briefing.tone)}
${listLine('Cidade, região ou mercado atendido', briefing.location)}
${listLine('Prazo desejado', briefing.deadline)}

CONTEÚDO E PROVAS
${listLine('Serviços, produtos ou soluções', briefing.offer)}
${listLine('Diferenciais', briefing.differentials)}
${listLine('Provas sociais', briefing.socialProof)}
${listLine('Concorrentes ou referências comerciais', briefing.competitors)}

IDENTIDADE E MATERIAIS
${listLine('Identidade visual disponível', briefing.brandAssets)}
${listLine('Referências visuais', briefing.visualReferences)}
${listLine('Materiais enviados', briefing.materials)}
${listLine('Restrições', briefing.restrictions)}

SCRIPT BRUTO DO CLIENTE
${fallback(briefing.rawClientScript)}

PADRÃO FATORQ
- Visual premium, moderno, responsivo e sofisticado.
- Não parecer template básico nem site genérico de agência.
- Priorizar acabamento de produto digital: hierarquia forte, grid limpo, microinterações e animações suaves.
- Usar bastante respiro, contraste e leitura rápida.
- Evitar blocos apertados, excesso de texto e elementos decorativos sem função.
- O site deve transmitir confiança, tecnologia e resultado comercial.
- Conectar ao ecossistema quando fizer sentido: ${ecosystem}.

DIREÇÃO CRIATIVA
- Use a identidade do cliente como base, mas eleve o padrão visual.
- Caso faltem assets, crie placeholders elegantes e liste exatamente o que precisa ser substituído.
- A primeira dobra precisa deixar claro quem é a empresa, o que ela oferece, para quem é e qual ação o visitante deve tomar.
- O CTA principal deve aparecer no hero, no meio da página e no final.
- Se houver WhatsApp, tratar como canal principal de conversão.

REQUISITOS DE ENTREGA
1. Proposta de conceito visual.
2. Arquitetura de seções.
3. Copy final de cada seção.
4. Sugestão de componentes visuais, estados e animações.
5. Lista de assets necessários.
6. Estrutura de implementação pronta para gerar o site.
7. Pendências do briefing, se houver.

IMPLEMENTAÇÃO ESPERADA
- Gere uma interface completa e responsiva.
- Use componentes bem organizados e nomes claros.
- Inclua estados de hover, foco, mobile e desktop.
- Não invente dados sensíveis, depoimentos, números ou certificações.
- Se uma informação não foi enviada, use texto provisório marcado como pendência.
- O resultado deve estar pronto para exportar como ZIP e continuar a finalização no Codex/FatorQ.

Agora entregue a solução completa com foco em conversão, sofisticação, clareza, velocidade de execução e aderência ao briefing.`);
}

