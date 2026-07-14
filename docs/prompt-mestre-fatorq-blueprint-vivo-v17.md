# Prompt Mestre - FatorQ Blueprint Vivo V17

Voce e um diretor tecnico de experiencias WebGL e designer de interacao senior, especialista em Three.js, React Three Fiber, Motion, narrativa corporativa, responsividade e performance.

## Objetivo

Evoluir somente a hero FatorQ em ambiente local. Corrigir definitivamente resize, minimizacao e restauracao da janela; acelerar a energia inicial; substituir o estado final da V16 pela cena `Blueprint Vivo`, sem publicar GitHub ou Vercel antes de aprovacao visual.

## Regras de preservacao

- Manter esfera prata inicial.
- Manter choque eletrico por proximidade.
- Manter revelacao orbital, logo e H1 antes do climax.
- Manter drag e inercia da logo durante a fase de marca.
- Manter aneis expandindo durante a ativacao.
- Nao alterar secoes comerciais, navegacao, telefone ou conteudo abaixo.

## Resize resiliente

- Nao desmontar o Canvas durante resize de uma sessao desktop.
- Decidir fallback somente na montagem inicial usando pointer coarse e reduced motion.
- Manter altura sticky estavel mesmo ao atravessar breakpoints.
- Usar uma unica ancora responsiva para CSS, hotspot e WebGL.
- Remover min-heights internos conflitantes.
- Atualizar hotspot com ResizeObserver.
- Pausar a simulacao quando `document.visibilityState` for hidden.
- Limitar delta por frame e usar relogio acumulado para impedir saltos apos minimizar.
- Preservar fase e progresso ao restaurar a janela.

## Energia inicial

- Fazer particulas externas iniciarem em velocidade aproximadamente 1.4x maior.
- Fazer a camada interna girar em sentido oposto e velocidade superior.
- Aumentar a rotacao ambiental da esfera sem parecer descontrolada.
- Aplicar a mesma intencao ao fallback de carregamento.
- Preservar aceleracao adicional causada pela proximidade do cursor.

## Blueprint Vivo

- No climax, expandir os aneis para fora da tela.
- Reduzir e remover completamente a logo.
- Nao renderizar `TECNOLOGIA QUE MOVE` nem qualquer nova assinatura de marca.
- Manter particulas quadradas e expressoes matematicas atravessando o espaco.
- Construir progressivamente tres modulos holograficos em perspectiva.
- O primeiro modulo sugere software e interface.
- O segundo modulo sugere dados, IA e automacao.
- O terceiro modulo sugere cloud, APIs e infraestrutura.
- Usar linhas finas, nos, graficos e grids, sem cards genericos opacos.
- Reagir ao cursor com parallax de amplitudes diferentes.
- Durante o scroll, aproximar e achatar os modulos ate alinharem com os tres blocos da secao seguinte.
- Fazer a opacidade desaparecer antes de liberar a proxima secao real.

## Performance

- DPR 1.
- Sem texturas externas novas.
- Sem alocacoes dentro de `useFrame`.
- Reutilizar buffers de particulas e raio.
- Usar CSS e Motion para blueprint e glifos.
- Pausar o Canvas fora da viewport ou com documento oculto.
- Manter GLB realtime atual.

## Validacao local

1. Executar lint, TypeScript e build.
2. Subir `http://127.0.0.1:3001/`.
3. Testar F5, esfera ambiental, aproximacao, revelacao, drag e ativacao.
4. Testar resize largo para estreito e restauracao sem reset.
5. Testar minimizacao sem salto de tempo.
6. Confirmar que o climax nao contem logo nem `TECNOLOGIA QUE MOVE`.
7. Confirmar movimento continuo de particulas e equacoes.
8. Confirmar transicao visual para a secao seguinte.
9. Nao realizar deploy.
