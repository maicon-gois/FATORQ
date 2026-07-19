# Prompt Mestre - FatorQ Fracture Core V18.3

## Papel

Atue como diretor de experiencia 3D, technical artist e engenheiro React Three Fiber senior, com foco simultaneo em impacto visual, leitura narrativa e performance WebGL real.

## Feedback transformado em acao

- A esfera demora para substituir o poster inicial.
- A ruptura atual acontece rapido demais para o observador compreender o efeito.
- O contato do mouse precisa iniciar uma cena, nao apenas trocar dois objetos.
- A logo orbital deve ser a conclusao legivel da ruptura.

## Diagnostico do asset

- Arquivo de origem: `fatorqesfera.glb`, com 4,89 MB.
- Arquivo otimizado de runtime: `/models/fatorq-sphere.glb`, com 1,66 MB.
- Estrutura: 53 malhas, 53 materiais, 106 texturas JPEG e aproximadamente 17,8 mil triangulos.
- A geometria e leve; o peso principal esta nas texturas incorporadas.
- As 53 malhas precisam permanecer independentes para a fragmentacao procedural.

## Objetivo tecnico

Gerar uma versao de runtime perceptualmente identica, com:

- texturas WebP em qualidade alta;
- geometria comprimida com Meshopt;
- nenhuma simplificacao geometrica;
- nenhum `join`, `flatten`, `instance` ou atlas que destrua as pecas;
- mesma hierarquia, materiais, UVs e quantidade de fragmentos;
- carregamento e decodificacao mais rapidos em navegadores modernos.

Resultado de compressao: reducao de 66,1%, 53 texturas removidas e nenhuma diferenca visual relevante na escala exibida na hero.

## Nova narrativa de contato

1. Estado ambiente: esfera inteira, giro lento, particulas e respiracao luminosa.
2. Contato: arco magnetico encosta na superficie e produz um pulso curto.
3. Preparacao: a esfera segura por alguns quadros, aumenta brilho nas fissuras e reduz levemente a rotacao.
4. Ruptura: as pecas externas se afastam em ondas durante aproximadamente 1,56 segundo.
5. Travessia: os fragmentos ganham profundidade e rotacao controlada, permanecendo visiveis tempo suficiente para leitura.
6. Revelacao: a logo surge somente depois de a esfera estar parcialmente aberta.
7. Orbital: os tres aneis entram em sequencia, nao todos ao mesmo tempo.
8. Conclusao: os fragmentos terminam o fade fora do nucleo e a marca orbital permanece limpa.

## Direcao temporal

- O primeiro feedback visual deve ser imediato ao contato.
- A ruptura nao deve comecar antes do pulso magnetico ser percebido.
- A logo nao pode competir com a esfera ainda fechada.
- A transicao completa deve durar aproximadamente 2,15 segundos.
- O movimento deve usar easing continuo, sem pausas artificiais ou saltos.
- O usuario deve conseguir acompanhar inicio, meio e fim em uma unica aproximacao.

## Performance

- Manter o poster real de 16,6 KB como primeiro quadro.
- Precarregar o GLB otimizado.
- Reutilizar geometrias e texturas do cache `useGLTF`.
- Clonar apenas materiais que precisam de opacidade independente.
- Nao adicionar fisica, pos-processamento pesado ou novas texturas.
- Manter DPR 1 e delta de simulacao limitado.

## Criterios de aceite

1. O arquivo reduz pelo menos 40% e preserva 53 malhas.
2. A esfera renderiza com a mesma identidade visual, cores e detalhes principais.
3. O contato do mouse gera resposta imediata.
4. A ruptura pode ser acompanhada visualmente.
5. Logo e aneis entram depois da abertura parcial.
6. Nenhum fragmento permanece poluindo a marca no final.
7. Nao ha tela vazia, erro de decoder ou regressao de interacao.
8. TypeScript, ESLint e build passam.
9. Aprovacao primeiro em `127.0.0.1:3002`, sem deploy automatico.
