# Prompt Mestre - FatorQ Instant Entry V18.1

## Papel

Atue como diretor de experiencia digital e engenheiro senior de performance WebGL, especializado em Next.js, React Three Fiber, Three.js, Motion e interfaces corporativas imersivas.

## Diagnostico validado em video

Ao atualizar a pagina, o nucleo CSS aparece rapidamente, mas permanece passivo enquanto o bundle 3D hidrata. A cena interativa substitui o fallback depois, o texto depende de um criterio de doze frames estaveis e qualquer cursor, clique ou scroll executado antes desse momento e perdido. O visitante interpreta essa espera como travamento e tenta interagir novamente, quebrando a narrativa.

O GLB de producao possui cerca de 417 KB. O gargalo principal nao e o modelo, mas a troca de arvore durante a hidratacao, a carga do runtime WebGL e o bloqueio artificial de prontidao.

## Objetivo da V18.1

Entregar uma entrada instantanea e responsiva mesmo antes do WebGL estar pronto. O carregamento deve fazer parte da narrativa, sem tela vazia, sem reinicio visual e sem exigir que o visitante repita um gesto.

## Arquitetura de entrada

- Renderizar um unico shell visual desde o HTML inicial ate a cena real assumir.
- Nao remontar o nucleo CSS ao detectar capacidades do dispositivo.
- Manter o hotspot de interacao disponivel no HTML inicial.
- Fazer cursor, clique e primeiro scroll gerarem resposta CSS imediata.
- Guardar a intencao do usuario enquanto o Canvas carrega.
- Reproduzir a intencao automaticamente quando o WebGL estiver pronto.
- Ocultar o fallback somente quando Canvas pronto e sistema orbital completamente revelado.

## Narrativa de carregamento

- O nucleo continua girando desde o primeiro frame.
- A aproximacao acelera a energia, amplia a orbita e cria um pulso magnetico em CSS.
- Um microstatus discreto comunica sincronizacao sem usar barra de loading generica.
- Se o usuario interagir cedo, o status muda para sinal capturado e o H1 entra em sincronia com a resposta CSS.
- Quando o WebGL assumir, a transicao deve ser imperceptivel e continuar o gesto ja realizado.

## Regras de performance

- Remover o criterio de doze frames acima de 35 FPS; dois frames renderizados confirmam prontidao.
- Nao bloquear a primeira resposta esperando reflexos, particulas de climax ou efeitos secundarios.
- Manter DPR 1 e limitar delta de simulacao.
- Nao adicionar imagens, videos ou modelos nesta rodada.
- Nao alterar a direcao visual da esfera nesta rodada.
- Validar em `next dev` e em build de producao local para separar compilacao de desenvolvimento da carga real.

## Criterios de aceite

1. F5 mostra o mesmo nucleo no primeiro frame e durante toda a hidratacao.
2. Aproximar, clicar ou rolar antes do Canvas pronto produz resposta imediata.
3. O gesto antecipado e executado pela cena assim que o WebGL fica pronto.
4. O H1 nao fica preso esperando FPS estavel e nao pisca entre estados.
5. O fallback nao desaparece antes de os aneis estarem visiveis.
6. Nao ha remount visual, tela vazia ou mudanca de enquadramento.
7. TypeScript, ESLint e build passam.
8. A versao permanece local ate aprovacao.
