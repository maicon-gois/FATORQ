# Fluxo Rápido FatorQ

Template padrão para coletar briefing de cliente e gerar, no Google AI Studio com Gemini, um prompt consistente para criação rápida de sites.

## 1. O que sempre precisamos perguntar ao cliente

Use este bloco como formulário de entrada. Se o cliente não souber responder algo, marque como `a definir`.

1. Qual é o nome da empresa, marca ou produto?
2. Qual é o objetivo principal do site?
   - Captar leads
   - Vender serviço
   - Vender produto
   - Apresentar empresa
   - Agendar contatos
   - Outro
3. Qual é o segmento do negócio?
4. Quem é o público-alvo?
5. Qual é a principal dor ou desejo do cliente final?
6. Quais serviços, produtos ou soluções devem aparecer no site?
7. Qual é a ação principal esperada do visitante?
   - WhatsApp
   - Formulário
   - Ligação
   - Agendamento
   - Compra
8. Existe identidade visual pronta?
   - Logo
   - Cores
   - Tipografia
   - Manual de marca
9. Quais referências visuais o cliente gosta?
10. Quais páginas ou seções são obrigatórias?
11. Quais diferenciais da empresa precisam ser destacados?
12. Há provas sociais disponíveis?
   - Depoimentos
   - Cases
   - Números
   - Logos de clientes
13. Há fotos, vídeos, artes, prints ou materiais que devem ser usados?
14. Qual cidade, região ou país o site deve atender?
15. Qual tom de voz deve ser adotado?
   - Institucional
   - Premium
   - Técnico
   - Comercial
   - Humano
16. Qual é o prazo desejado?
17. Há concorrentes ou sites de referência?
18. Qual CTA principal deve aparecer em todo o site?

## 2. Campos mínimos para montar o prompt

Se o cliente trouxer pouco conteúdo, ainda assim o prompt deve conter estes campos:

- `empresa`
- `segmento`
- `objetivo`
- `publico`
- `dor_principal`
- `oferta`
- `cta_principal`
- `tom_de_voz`
- `referencias_visuais`
- `secoes_obrigatorias`
- `materiais_enviados`
- `restricoes`
- `prazo`

## 3. Regras fixas do padrão FatorQ

Estas regras não mudam, mesmo quando o cliente mudar:

- Visual premium, moderno e corporativo.
- Não parecer template básico nem site genérico de agência.
- Priorizar acabamento de produto digital.
- Layout com bastante respiro, contraste e sensação de valor alto.
- Se o cliente permitir, usar animações suaves e microinterações.
- Evitar poluição visual e blocos apertados.
- O site deve parecer feito por uma empresa de tecnologia séria.
- Sempre pensar em conversão, clareza e confiança.
- Se fizer sentido, conectar o projeto ao ecossistema FatorQ:
  - LIA CRM
  - D2 Labs
  - FatorQ Sites
  - FatorQ Infra

## 4. Prompt mestre padrão

Use este prompt no Gemini e substitua apenas os campos entre colchetes.

```text
Você é um diretor de produto, UX writer e designer sênior especializado em sites premium para empresas brasileiras.

Sua missão é criar um site moderno, elegante e orientado à conversão para:

Empresa: [empresa]
Segmento: [segmento]
Objetivo principal: [objetivo]
Público-alvo: [publico]
Principal dor ou desejo do cliente final: [dor_principal]
Oferta principal: [oferta]
CTA principal: [cta_principal]
Tom de voz: [tom_de_voz]
Referências visuais: [referencias_visuais]
Seções obrigatórias: [secoes_obrigatorias]
Materiais enviados: [materiais_enviados]
Restrições: [restricoes]
Prazo: [prazo]

Direção criativa:
- O site não pode parecer simples demais.
- Deve parecer um produto digital premium, não um site básico.
- Visual com presença, confiança, tecnologia e acabamento de alto nível.
- Seções bem distribuídas, com respiro, hierarquia forte e leitura rápida.
- Animações sutis, transições suaves e sensação de movimento.
- Adaptar a identidade ao cliente sem perder o padrão premium FatorQ.

Regras obrigatórias:
- Não usar linguagem genérica de agência.
- Não simplificar demais o design.
- Não criar layout vazio ou sem personalidade.
- Não esquecer CTA forte acima da dobra.
- Não ignorar os materiais enviados.
- Não inventar informações que não foram fornecidas.
- Se faltar algo importante, sinalize como pendência no final.

Estrutura esperada:
1. Proposta de conceito visual
2. Arquitetura de seções
3. Copy principal de cada seção
4. Sugestão de componentes visuais e animações
5. Lista de assets necessários
6. Versão final do conteúdo pronta para implementação

Seção de marca:
- Preserve o padrão premium do ecossistema FatorQ.
- Se fizer sentido, faça o site conversar com o ecossistema FatorQ, LIA CRM e D2 Labs sem parecer institucional demais.

Agora entregue a solução completa com foco em:
- conversão
- sofisticação
- clareza
- velocidade de execução
- aderência ao briefing
```

## 5. Versão curta para uso rápido

Quando quiser algo mais direto, use esta versão resumida:

```text
Crie um site premium para [empresa], do segmento [segmento], com foco em [objetivo].

Público-alvo: [publico]
Dor principal: [dor_principal]
Oferta: [oferta]
CTA principal: [cta_principal]
Tom de voz: [tom_de_voz]
Referências: [referencias_visuais]
Seções obrigatórias: [secoes_obrigatorias]
Materiais enviados: [materiais_enviados]

O resultado precisa parecer uma empresa de tecnologia de alto nível, com padrão visual FatorQ: moderno, sofisticado, responsivo, animado e orientado à conversão.
Não faça um site simples demais.
```

## 6. Como usar no fluxo rápido

1. Copie as respostas do cliente para os campos mínimos.
2. Cole os materiais e links recebidos na seção `materiais_enviados`.
3. Ajuste o tom de voz e as referências visuais.
4. Escolha a versão longa ou curta do prompt.
5. Execute no Gemini.
6. Use o resultado para montar o site no padrão FatorQ.

