# Prompt Mestre - FatorQ Impacto Orbital V16

Voce e um diretor de arte digital senior e engenheiro WebGL especialista em experiencias corporativas premium, identidade visual, React Three Fiber, Three.js, Motion, cinematografia 3D e performance em navegadores.

## Contexto

A hero da FatorQ ja possui uma base aprovada que nao deve ser redesenhada: esfera prata inicial, atmosfera ciano escura, particulas em orbita, logo 3D local, tres aneis orbitais, texto a esquerda e interacao por proximidade, drag e pressao. O video `Gravacao de Tela 2026-07-13 070349.mp4` confirma que a melhor direcao anterior foi a expansao dos aneis para a tela, combinada com particulas quadradas, expressoes matematicas e a composicao tipografica `TECNOLOGIA QUE MOVE`.

## Objetivo

Reconstruir apenas a narrativa de primeiro contato da hero, preservando o que ja funciona e removendo os aspectos rejeitados: linha magnetica rigida, aneis excessivamente espelhados, esfera residual sobre a logo, estado final vazio e texto fora de sincronia. A experiencia deve ter causa e efeito imediatos, marca legivel e impacto comercial.

## Regra de escopo

- Nao alterar as secoes abaixo da hero.
- Nao alterar textos comerciais, links, telefone, navegacao ou configuracao do site.
- Nao substituir a esfera inicial nem remover suas particulas e halos.
- Nao mudar o centro visual da cena.
- Modificar somente ignicao, revelacao, materiais dos aneis, ativacao e ambiente final.

## Ato 1 - Espera magnetica

- Mostrar imediatamente a esfera prata atual no mesmo enquadramento.
- Manter particulas e halos girando ao redor dela.
- Nao mostrar titulo, descricao, CTA, aneis ou logo antes da aproximacao.
- Preservar o movimento ambiental continuo e leve.

## Ato 2 - Choque e revelacao

- Substituir o filamento reto por um raio eletrico segmentado, vivo e irregular.
- O raio deve nascer na direcao do cursor e descarregar na superficie da esfera.
- Adicionar ponto de contato e pulso curto de energia no instante de ignicao.
- Quando a proximidade atingir o limiar, revelar em conjunto os tres aneis e a logo 3D.
- Fazer a esfera prata desaparecer por completo durante a revelacao, sem deixar bolha, pelicula ou disco sobre a marca.
- Usar materiais acetinados nos aneis: baixo espelhamento, ciano petroleo, branco frio e emissao controlada.
- Preservar movimento orbital 360 graus real e resposta direcional ao mouse.
- Manter a logo frontal, centralizada no nucleo, legivel e com profundidade.

## Ato 3 - Tipografia sincronizada

- Revelar titulo, descricao e CTA somente quando o sistema orbital estiver formado.
- Usar mascara vertical, blur curto e easing suave.
- Nao antecipar o texto durante a ignicao.
- Preservar a composicao de texto a esquerda e o objeto a direita.

## Ato 4 - Impacto por pressao

- Ao pressionar o nucleo, responder visualmente desde o primeiro instante.
- Ao completar a carga, acelerar e expandir os tres aneis para fora do quadro, como no melhor teste anterior.
- Fazer particulas quadradas atravessarem o espaco em diferentes profundidades.
- Introduzir expressoes matematicas, simbolos de computacao e referencias FatorQ em camadas com parallax.
- Recuperar `TECNOLOGIA / QUE / MOVE` como tipografia ambiental de fundo, nao como mensagem final isolada.
- Fazer cada plano tipografico reagir ao cursor com amplitudes diferentes para criar profundidade.
- Manter uma versao limpa da logo 3D no nucleo, sem esfera, bolha ou membrana opaca.
- Fazer a logo acompanhar o mouse com movimento curto e elegante.
- Preservar drag com inercia e retorno frontal.
- Manter a cena sempre viva depois da ativacao; nunca deixar apenas um fundo azul vazio.

## Direcao visual

- Fundo preto azulado profundo.
- Ciano eletrico apenas em energia e recortes.
- Branco frio nos highlights da marca.
- Aneis acetinados, sem cromado exagerado.
- Logo com cor preservada, contraste alto e reflexo controlado.
- Particulas pequenas e quadradas, com distribuicao assimetrica e profundidade real.
- Simbolos em baixa opacidade, sem poluir a leitura da marca.
- Tipografia ambiental grande, fina, recortada e integrada ao espaco.

## Performance obrigatoria

- Reutilizar `/models/logo-3d-model-realtime.glb`.
- Manter Canvas em DPR 1 e `powerPreference: high-performance`.
- Nao criar geometrias, vetores, texturas ou objetos dentro de `useFrame`.
- Reutilizar buffers do raio e das particulas.
- Usar CSS/Motion para glifos e tipografia, evitando texturas Canvas adicionais.
- Pausar a cena fora da viewport.
- Preservar fallback e `prefers-reduced-motion`.
- Nao adicionar dependencias externas.

## Validacao

1. F5 apresenta esfera e particulas sem quadro vazio.
2. Aproximacao produz raio eletrico, nao linha reta.
3. Logo, aneis e texto entram na ordem correta.
4. A esfera desaparece integralmente quando a marca e revelada.
5. Aneis nao parecem espelhos e mantem leitura 3D.
6. Pressao expande os aneis e ativa particulas quadradas, simbolos e `TECNOLOGIA QUE MOVE`.
7. Logo final permanece limpa, centralizada e reativa ao mouse.
8. Drag e teclado continuam funcionais.
9. Console sem erros, TypeScript e lint aprovados.
10. Stack disponivel em `http://127.0.0.1:3001/` para avaliacao.

## Criterio de qualidade

O primeiro contato deve parecer uma abertura de marca criada por um estudio digital premium: poucos elementos, causalidade clara, movimento rapido, profundidade real, tipografia precisa e identidade FatorQ imediatamente reconhecivel.
