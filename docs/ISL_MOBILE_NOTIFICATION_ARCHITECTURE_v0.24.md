# ISL — MOBILE APP / NOTIFICATION ARCHITECTURE v0.24
Fecha: 2026-09-18
Estado: SUPERSEDED BY v0.72 / BASE HISTÓRICA CONSERVADA

> Documento histórico. La arquitectura maestra vigente está en:
> `docs/ISL_NOTIFICATION_OS_v0.72.md`
> Política machine-readable:
> `portal/isl-notification-policy.json`

## HECHO
- PWA manifest ampliado;
- icono instalable;
- shortcuts a Recreo / Cápsulas TV / Playtest;
- service worker;
- shell offline;
- Centro de Avisos;
- feed de avisos versionado;
- notificación nativa de prueba bajo interacción.

## OBJETIVO
Que el usuario pueda tener ISL en Android como una app sin necesitar una APK nativa para:
- abrir Centro;
- jugar con cápsulas;
- escuchar/entrar en música;
- ver avisos;
- ir a playtests;
- entrar en modo Recreo.

## LIMITACIÓN WEB REAL
Un PWA sin push server/backend no puede garantizar avisos programados mientras la app está cerrada.

## CAPAS DE AVISO
1. IN-APP FEED — ya existe.
2. NATIVE TEST NOTIFICATION — ya existe.
3. CHATGPT AUTOMATIONS — ideal para recordatorios/briefs sin backend ISL.
4. GOOGLE CALENDAR — sólo para eventos con fecha/hora real.
5. WEB PUSH — futuro; añadir sólo si compensa infraestructura y permisos.

## FILTRO DE INTERRUPCIÓN
Sólo notificar:
- playtest listo;
- decisión humana real;
- build/prototype importante;
- cápsula/recreo opcional de baja frecuencia;
- checkpoint crítico;
- lanzamiento/publicación;
- error que bloquea.

Nunca:
- cada commit;
- cada documento;
- ruido operativo;
- tareas internas del asistente.

## TONO
Avisos deben sonar ISL:
"No hace falta arreglar el cielo. Hay una cápsula nueva."
"La nave recuerda algo. Hay un playtest esperando."
"Una canción ha sobrevivido al CQC."
No usar tono corporativo.

## EVOLUCIÓN
v0.72 convierte esta base en Notification OS con:
- canales;
- presupuestos de interrupción;
- quiet hours;
- dedupe;
- digest de flecos;
- recordatorios vagos;
- eventos de encuestas/playtests/builds;
- capa nativa Android;
- adaptadores futuros FCM / Unreal / Steam / Calendar / ChatGPT;
- privacidad y human gate.
