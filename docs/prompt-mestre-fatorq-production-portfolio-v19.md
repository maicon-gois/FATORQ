# PROMPT MESTRE - FatorQ Production Portfolio V19

Voce e um diretor de arte e engenheiro front-end senior especializado em experiencias corporativas premium, branding de tecnologia, WebGL, React Three Fiber, Motion, composicao responsiva e performance de producao.

## Contexto

O site FatorQ ja possui uma hero interativa com uma esfera 3D, ruptura controlada, sistema orbital, particulas e uma etapa cinematografica. Esta rodada deve finalizar a experiencia para producao sem reescrever a narrativa existente e sem introduzir novos assets pesados.

## Objetivo

Entregar uma versao profissional e estavel em que:

1. A esfera inicial nasce perfeitamente centralizada na viewport.
2. Durante a revelacao da marca, o nucleo migra suavemente para a direita para preservar o H1 a esquerda.
3. Ao pressionar e ativar o climax, tres banners retangulares aparecem lado a lado.
4. Os banners representam as tres areas principais da FatorQ: Software & Produtos, Data & IA e Cloud & Infra.
5. Cada banner preserva sua arte tecnica interna, com grafico, rede neural ou servidores, sem virar um simples bloco de texto.
6. Fotografias genericas e temporarias sao removidas das secoes comerciais.
7. Dashboards reais, previews de interfaces, templates e ativos de marca permanecem no site.

## Direcao visual do climax

- Os tres banners devem entrar com profundidade, perspectiva e stagger curto.
- O conjunto deve ocupar a largura central da hero sem encobrir a leitura do H1 antes da ativacao.
- Cada banner deve ter titulo, descriptor curto e uma visualizacao tecnica animada.
- A arte deve usar ciano, branco frio, azul profundo, linhas finas, reflexos discretos e grid holografico.
- Particulas e expressoes matematicas continuam criando profundidade ao redor dos banners.
- A composicao deve parecer uma demonstracao de capacidades, nao um dashboard generico.

## Remocao de fotos

- Remover a montagem fotografica usada nas quatro areas de servicos.
- Substituir cada foto por arte procedural/code-native coerente com o servico.
- Remover fotos temporarias de equipe e retrato.
- Substituir a prova humana por uma representacao visual de processo, governanca e acompanhamento.
- Remover a montagem fotografica do card D2 Labs e usar uma arte de laboratorio digital criada no front-end.
- Nao remover imagens reais de produtos, dashboards, cases, templates ou selos da marca.

## Requisitos tecnicos

- Stack: Next.js, React, TypeScript, Tailwind, Motion e React Three Fiber.
- Nao adicionar dependencia nova.
- Nao adicionar imagem pesada.
- Manter o canvas interativo e os fallbacks responsivos.
- Garantir layout correto em desktop e mobile.
- Preservar acessibilidade, foco de teclado e `prefers-reduced-motion` existentes.
- Validar com build de producao, teste visual local e verificacao de erros no navegador.

## Criterios de aceite

- Antes da interacao, esfera e fallback estao centralizados sem salto visual.
- A revelacao desloca a cena para a direita de forma continua, sem corte.
- A ativacao exibe exatamente tres banners lado a lado no desktop.
- Os tres banners mantem arte interna legivel durante toda a animacao.
- Nenhuma foto generica de banco aparece nas secoes de servicos, portifolio ou prova institucional.
- O site compila sem erros e permanece fluido.
- A versao aprovada e registrada no Git e publicada em producao no Vercel.
