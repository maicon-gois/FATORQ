# Prompt Mestre - FatorQ Fracture Core V18.2

## Papel

Atue como diretor de experiencia 3D e engenheiro React Three Fiber senior, com dominio de branding corporativo, animacao procedural, composicao premium e performance WebGL.

## Asset aprovado para teste

- Origem: `fatorqesfera.glb`.
- Runtime: `/models/fatorq-sphere.glb`.
- Peso atual: 4,89 MB.
- Estrutura: 53 malhas independentes, aproximadamente 17,8 mil triangulos e materiais azuis fragmentados.
- O arquivo nao possui uma animacao interna aproveitavel; a direcao das pecas sera feita em runtime.

## Objetivo

Usar a esfera FatorQ como primeiro objeto real da hero. No estado ambiente, todas as partes formam um unico nucleo e giram lentamente. Ao aproximar o cursor, a esfera se parte de forma controlada e revela, no mesmo centro, a logo FatorQ com o sistema orbital que ja existe.

## Narrativa visual

1. F5 mostra imediatamente um poster WebP de 16,6 KB renderizado do proprio GLB.
2. Quando o GLB termina de carregar, ele assume a mesma posicao sem tela vazia.
3. O nucleo real respira e gira lentamente enquanto aguarda interacao.
4. A proximidade magnetica inicia a abertura em ondas.
5. As 53 partes se afastam radialmente com pequeno stagger, rotacao tridimensional e profundidade.
6. A logo cresce no centro enquanto os tres aneis orbitais entram em movimento.
7. As partes perdem opacidade sem explodir de maneira caotica.
8. Pressao, arraste, impulso e climax permanecem como na versao atual.

## Direcao de movimento

- Explosao controlada, simetrica e legivel.
- Afastamento curto no inicio e aceleracao suave no final.
- Variacao de atraso deterministica por peca, sem aleatoriedade a cada F5.
- Rotacao individual limitada para preservar a leitura de esfera se partindo.
- O centro de logo e aneis nao pode mudar de posicao durante a troca.
- O objeto completo mantem giro ambiente leve antes da abertura.

## Performance

- Reutilizar geometrias e texturas do cache `useGLTF`.
- Clonar somente materiais que precisam de fade.
- Nao usar fisica, colisao ou simulacao de particulas para a fragmentacao.
- Confirmar dois frames somente depois de o GLB estar montado.
- Manter DPR 1 e limitar delta a 30 FPS para estabilidade da simulacao.
- Precarregar esfera e logo no HTML.
- Usar o poster real para impedir troca perceptivel de geometria durante o carregamento.

## Criterios de aceite

1. Nenhum frame vazio entre fallback e modelo.
2. A esfera real aparece centralizada no mesmo ponto do sistema orbital.
3. Aproximar o cursor abre as pecas e revela logo e aneis.
4. As pecas nao tremem, teleportam ou trocam de direcao.
5. A logo permanece de frente e centralizada.
6. Pressionar continua ativando o climax existente.
7. TypeScript, ESLint e build passam.
8. Teste local em `127.0.0.1:3002` antes de qualquer deploy.
