# ISL NETLIFY COST OS v0.31
Fecha: 2026-09-18
Estado: ACTIVO / REGLA OPERATIVA

## OBJETIVO
Que Netlify sea una superficie de producción estable, no un laboratorio de iteración.

## COSTES DE REFERENCIA (Netlify credit-based, 2026-09)
- Production deploy: 15 créditos.
- Deploy Preview / branch deploy: 0 créditos de deploy.
- Web bandwidth: 20 créditos / GB.
- Web requests: 2 créditos / 10.000.
- Compute: 10 créditos / GB-h.
- Forms: sin coste de créditos.

Fuente operativa: documentación oficial de Netlify verificada 2026-09-18.

## REGLAS DURAS
1. GitHub Pages = preview diario principal.
2. Netlify production = sólo release explícita.
3. El archivo NETLIFY_DEPLOY_v0.7.2.md funciona como airlock: si no cambia, no hay deploy.
4. Nunca desplegar para:
   - cambios de texto;
   - CSS menor;
   - una imagen;
   - un bug no bloqueante;
   - documentación;
   - experimentos D3-REF;
   - ajustes de inventario/crafting/boss aún no validados.
5. Agrupar cambios en una release candidata y publicar sólo tras CQC.
6. Rollback antes que redeploy cuando la versión anterior era correcta: rollback no consume créditos de production deploy.
7. Assets grandes:
   - música pública → YouTube / plataforma musical;
   - APK/ZIP/binarios → GitHub Releases/artifacts;
   - Netlify no debe convertirse en servidor de descargas pesadas.
8. Vídeo no crítico → YouTube/embed/enlace, no MP4 servido desde Netlify.
9. Imágenes:
   - priorizar WebP/AVIF cuando exista pipeline;
   - evitar PNG gigantes para fondos;
   - no duplicar variantes innecesarias.
10. Service Worker/PWA debe cachear assets reutilizados para evitar descargas repetidas.
11. Functions sólo donde existe estado real imprescindible.
12. No polling periódico. Event-driven o carga bajo demanda.
13. Responses GET de functions compartibles deben usar Netlify durable cache + s-maxage + stale-while-revalidate.
14. POST debe evitar lecturas redundantes.
15. Forms simples → Netlify Forms/Jotform antes que Functions propias cuando no se necesita lógica de servidor.

## PRESUPUESTO OPERATIVO
Modo AHORRO:
- objetivo: 1 production release por semana o por hito real, lo que ocurra más tarde.
- máximo recomendado: 4-5 releases de producción/mes salvo hotfix S0/S1.
- cada release debe agrupar varios cambios ya vistos en Pages.

Modo HOTFIX:
- sólo S0/S1;
- si basta rollback, rollback;
- deploy nuevo sólo si rollback no resuelve.

## PREVIEW FLOW
commit → GitHub Pages → revisar móvil/escritorio → CQC → acumular → release candidate → production airlock → Netlify.

## POLL / FUNCTIONS
Cambio v0.31:
- GET /api/poll-state cacheado en CDN 60 s.
- stale-while-revalidate 300 s.
- durable cache habilitada.
- eliminado cache-busting timestamp.
- POST ya no relee toda la colección para devolver el estado.
Resultado esperado: muchas visitas comparten una misma respuesta cacheada y se reducen invocaciones.

## ANTI-BANDWIDTH
- No hospedar las 6 canciones como descarga en Netlify.
- No hospedar paquetes ZIP/APK grandes en Netlify.
- Evitar auto-play de vídeo pesado.
- Audio RPG: mantener una sola pista ligera o loop optimizado; no precargar discografía.
- lazy-load para galerías/cápsulas visuales.
- usar width/height/srcset cuando se genere pipeline responsive.

## MÉTRICA DE CONTROL
Antes de production:
- número de releases del mes;
- GB servidos;
- function compute;
- request count;
- assets >1 MB;
- archivos duplicados;
- cambios acumulados desde última release.

## GATE DE RELEASE
Una release Netlify sólo pasa si:
- Pages verde;
- CQC básico verde;
- no existe regresión S0/S1;
- los cambios justifican 15 créditos;
- no hay otra release prevista en las próximas horas que pueda agruparse.

## PRINCIPIO
Netlify cobra por producción y tráfico. ISL debe gastar créditos en jugadores, no en nuestra iteración interna.
