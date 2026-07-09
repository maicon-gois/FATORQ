# FatorQ — Site Institucional

Site oficial da **FatorQ**, holding de tecnologia, SaaS e soluções digitais para negócios, saúde e indústria.

## Rodar local

```bash
cd FATORQ
npm install
npm run dev
```

Abra **http://localhost:3010**

## Editar conteúdo

Todo texto, produtos, missão, roadmap e contatos estão em:

```
site.config.json
```

Altere JSON → salve → a página atualiza no dev.

## Estrutura

| Seção | Conteúdo |
|-------|----------|
| Hero | Capa oficial (`public/hero-cover.png`) |
| Sobre | Missão, visão, valores, chancela, segmentos |
| Soluções | FatorQ Creative + FatorQ Digital |
| Ecossistema | LIA CRM, D2 Labs, FIELD VALID, Sites, pipeline |
| Roadmap | Metas 2026 H1/H2 e 2027 |
| Contato | WhatsApp, e-mail, Meet |

## Deploy

Conecte o repo na [Vercel](https://vercel.com) — domínio sugerido: `fatorq.com.br`

## Antes de publicar

1. Atualizar `contact.whatsapp` em `site.config.json`
2. Confirmar e-mail `contato@fatorq.com.br`
3. Adicionar links dos produtos quando URLs estiverem prontas
