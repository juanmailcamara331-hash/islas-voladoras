# ISL — NOTIFICATION OS v0.72
Fecha: 2026-09-20
Estado: ARQUITECTURA MAESTRA / IMPLEMENTACIÓN POR CAPAS

## 0. PROPÓSITO

Que ISL recuerde lo importante sin convertirse en ruido.

El sistema cubre:
- procesos pasados que quedaron pendientes;
- trabajo actual;
- siguiente acción real;
- bloqueos;
- decisiones humanas;
- playtests;
- encuestas;
- builds;
- regresiones;
- assets;
- campañas;
- comunidad;
- publicación;
- mantenimiento;
- recordatorios creativos vagos;
- revisiones periódicas de deuda / flecos.

Principio:
AVISAR MENOS, PERO AVISAR MEJOR.

Nunca usar notificaciones para:
- ansiedad artificial;
- rachas punitivas;
- dark patterns;
- “vuelve porque sí”;
- spam de cada commit;
- convertir actividad en productividad ficticia;
- sustituir decisión humana.

Nada promociona CANON automáticamente.

---

## 1. ESTADO EXISTENTE

Ya existe:
- PWA manifest;
- service worker;
- Centro de Avisos;
- feed versionado;
- notificación nativa web de prueba bajo interacción;
- capa conceptual de ChatGPT Automations;
- posibilidad de Calendar;
- APK Android WebView.

Limitaciones actuales:
- el PWA no garantiza avisos con la app cerrada sin push/backend;
- el APK aún no declara POST_NOTIFICATIONS ni canales nativos;
- no hay motor de prioridades/cooldowns;
- no hay preferencias finas por categoría;
- no hay quiet hours;
- no existe reconciliación automática entre estado del proyecto y avisos;
- los avisos actuales son estáticos;
- no hay ledger de entrega/ack/dismiss;
- no existe digest de deuda/flecos.

---

## 2. MODELO DE CAPAS

### N0 — IN-APP FEED
Coste operativo casi cero.
Siempre disponible.
Fuente: isl-notices-current.json + estado local.

Uso:
- siguiente acción;
- pendientes;
- novedades suaves;
- avisos no urgentes.

### N1 — LOCAL APK
Notificaciones generadas en el dispositivo.
Sin backend.
Sin consumo Netlify para cada recordatorio.

Uso:
- recordatorios vagos;
- revisión semanal;
- “hay una decisión esperando” cuando ya se conoce localmente;
- recordatorio de retomar una tarea;
- digest de flecos.

Implementación Android recomendada:
- POST_NOTIFICATIONS Android 13+;
- NotificationChannel;
- WorkManager para recordatorios flexibles;
- AlarmManager sólo si en el futuro existe un requisito realmente exacto.

### N2 — CHATGPT AUTOMATIONS
Capa del creador, no de los jugadores.
Ideal para:
- revisar encuestas;
- comprobar builds;
- recordar pruebas físicas;
- auditorías periódicas;
- revisar backlog/deuda;
- brief diario/semanal.

Regla:
no gastar infraestructura ISL para recordatorios personales del creador si una automatización externa ya resuelve el caso.

### N3 — CALENDAR
Sólo eventos reales con fecha/hora:
- reunión;
- publicación;
- deadline;
- playtest concertado;
- revisión de campaña;
- submission de store;
- evento comunitario.

No meter tareas vagas en Calendar.

### N4 — REMOTE PUSH
Añadir sólo cuando haya eventos remotos que merezcan despertar la app.
Candidatos:
- build READY importante;
- playtest publicado;
- nuevas respuestas suficientes para revisión;
- error crítico;
- lanzamiento;
- evento comunitario explícitamente seguido.

Preferencia técnica futura:
FCM / Web Push.
No polling agresivo.

### N5 — STORE / PLATFORM NATIVE
Steam / consola / Google Play / futuro ecosistema.
Usar capacidades nativas de cada plataforma cuando corresponda.
No duplicar una notificación de Steam con tres pushes propios.

---

## 3. CANALES

### A. AHORA
Importancia DEFAULT.
Eventos:
- blocker real;
- tarea humana necesaria para desbloquear pipeline;
- build lista para prueba física.

### B. DECISIONES
Importancia DEFAULT.
Eventos:
- HUMAN_DECISION_REQUIRED;
- síntesis de encuestas lista;
- CQC terminado esperando autor;
- candidato esperando KEEP / ADAPT / DISCARD.

### C. PRUEBAS
Importancia DEFAULT.
Eventos:
- playtest listo;
- 3–8 respuestas suficientes para revisión;
- prueba física Android pendiente;
- regresión que debe revalidarse.

### D. RITMO
Importancia LOW.
Eventos:
- recordatorio vago;
- volver a una tarea abandonada;
- una sola sugerencia de “siguiente cosa pequeña”;
- resumen semanal de flecos.

### E. MUNDO / CREATIVIDAD
Importancia LOW.
Eventos opcionales:
- cápsula;
- Recreo;
- música;
- idea archivada que merece revisión;
- semilla biográfica pendiente de abstracción.

### F. COMUNIDAD / CAMPAÑA
Importancia LOW/DEFAULT según opt-in.
Eventos:
- encuesta abierta;
- playtest público;
- campaña activa;
- publicación;
- crowdfunding/supporter update.

### G. RELEASE / CRITICAL
Importancia HIGH sólo para:
- fallo crítico que rompe release;
- deadline elegido por el usuario;
- publicación/lanzamiento explícitamente seguido.

HIGH nunca para marketing ordinario.

---

## 4. MATRIZ DE EVENTOS

Cada evento notificable tiene:
- id;
- category;
- source;
- created_at;
- state;
- relevance;
- urgency;
- human_action_required;
- expires_at;
- dedupe_key;
- cooldown;
- deep_link;
- copy_family;
- visibility;
- provenance;
- notification_state.

Estados:
NEW
QUEUED
SHOWN_IN_APP
NOTIFIED
OPENED
ACKNOWLEDGED
SNOOZED
DISMISSED
EXPIRED
RESOLVED

---

## 5. TRIGGERS DEL PROYECTO

### METODOLOGÍA / DOCUMENTACIÓN
Notificar sólo:
- checkpoint crítico;
- contradicción entre CURRENT y checkpoint;
- documento CURRENT obsoleto;
- dependencia olvidada que bloquea una acción.

No:
- cada doc nuevo.

### GITHUB / BUILDS
Notificar:
- build release candidata READY;
- CI crítico falla repetidamente;
- deploy SHA no coincide;
- regresión histórica reaparece;
- APK nueva necesita prueba física.

Digest:
fallos secundarios agrupados.

### NETLIFY
Notificar:
- deploy productivo fallido;
- endpoint crítico roto;
- Forms deja de aceptar respuestas;
- nueva evidencia suficiente para revisión.

No:
- cada request;
- cada deploy de laboratorio sin impacto.

### ENCUESTAS
Evento:
SURVEY_NEW_EVIDENCE.

Sólo push si:
- hay respuestas nuevas Y
- cambia snapshot o se alcanza umbral de revisión.

Flujo:
datos → snapshot → síntesis provisional → HUMAN_REVIEW_REQUIRED.

### PLAYTEST
Eventos:
PLAYTEST_READY
PLAYTEST_COHORT_REACHED
PLAYTEST_BLOCKER
PLAYTEST_REVIEW_PENDING

### CQC
Evento:
CQC_HUMAN_GATE.

### ARTE / ASSETS
Notificar:
- asset requiere decisión;
- rights/provenance bloqueado;
- asset real listo para CQC;
- variante seleccionada necesita validación.

No notificar cada generación IA.

### BIOGRAPHICAL WORLD
Sólo avisos privados del creador.
Nunca push público con contenido biográfico privado.

### CAMPAÑAS / FUNDING
Notificar:
- campaña entra en etapa que requiere aprobación;
- derechos incompletos;
- asset público necesita validación;
- deadline real;
- nueva señal agregada relevante.

### STEAM / STORE
Tratar wishlist/store notifications como canal externo propio.
Evitar duplicación.
Recordar hitos internos:
- page readiness;
- capsule;
- demo;
- festival submission;
- launch checklist.

### UNREAL FUTURO
Mantener misma ontología.
Mapear:
ISL event → Unreal local notification / platform integration.
No diseñar sistema paralelo.

---

## 6. RECORDATORIOS VAGOS “MAGISTRALES”

Objetivo:
evitar que el creador deje hilos importantes olvidados sin imponer horario rígido.

Ejemplos:
- “Hay una cosa pequeña que puede desbloquear bastante cielo.”
- “Algo quedó esperando una mirada humana.”
- “No hace falta construir nada nuevo: hay un fleco que cerrar.”
- “La nave tiene memoria. Hay una prueba física pendiente.”
- “Una idea sobrevivió varios días sin convertirse en ruido. Quizá merece volver.”

Reglas:
- máximo sugerido base: 1 recordatorio blando/día;
- si se ignora, no escalar agresivamente;
- tras 2 descartes/snoozes, bajar frecuencia;
- no enviar de noche por defecto;
- permitir QUIETO / NORMAL / ACTIVO;
- prioridad a pendientes que desbloquean otras cosas;
- mezclar mantenimiento + creatividad, no sólo productividad;
- nunca usar culpa.

---

## 7. DIGEST DE FLECOS

Semanal o bajo demanda.

Secciones:
- BLOQUEA;
- ESPERA TU DECISIÓN;
- PRUEBA FÍSICA;
- EVIDENCIA NUEVA;
- DEUDA TÉCNICA;
- DEUDA DOCUMENTAL;
- RIGHTS / PRIVACIDAD;
- ASSETS;
- CAMPAÑA;
- COSAS BONITAS QUE NO URGEN;
- PARKING que lleva demasiado tiempo;
- cosas resueltas que pueden archivarse.

El digest debe deduplicar y ordenar por dependencia, no por fecha únicamente.

---

## 8. PRESUPUESTO DE INTERRUPCIÓN

Cada aviso consume ATTENTION_BUDGET.

Regla inicial:
- HIGH: excepcional;
- DEFAULT: máximo 1–2/día sólo durante rondas activas;
- LOW: agrupar en digest;
- marketing/comunidad: opt-in independiente.

No existe “engagement a cualquier coste”.

Métrica principal:
¿el aviso ayudó a cerrar o comprender algo?

Secundarias:
open;
ack;
snooze;
dismiss;
disable-channel;
time-to-action.

No optimizar sólo CTR.

---

## 9. TIMING

No usar una hora universal rígida.

Preferencia:
- local time;
- ventanas configurables;
- evitar noche;
- respetar quiet hours;
- usar contexto cuando exista;
- si no existe contexto suficiente, preferir digest.

Modo creador recomendado:
NORMAL:
- 1 digest diario o menos;
- aviso inmediato sólo si bloquea;
- revisión semanal completa.

Modo ACTIVO:
- hasta 2 avisos DEFAULT/día durante playtest/release.

Modo QUIETO:
- sólo blockers + digest semanal.

---

## 10. PERMISOS / PRIVACIDAD

Permiso sólo después de explicar valor.
No solicitar al primer frame.

Preferencias separadas:
- Blockers;
- Decisions;
- Playtests;
- Surveys;
- Builds;
- Creative nudges;
- Community/campaign;
- Releases.

Fácil apagar todo.
Fácil silenciar una categoría.

No incluir en push:
- nombres de personas privadas;
- historias familiares;
- datos sensibles;
- texto abierto de encuestas;
- secretos;
- credenciales;
- detalles privados del proyecto.

Push contiene enlace/estado mínimo; detalle se abre dentro del entorno autorizado.

---

## 11. COSTE / INFRAESTRUCTURA

Prioridad:
LOCAL FIRST.

Recordatorios del creador:
ChatGPT Automation / local APK / Calendar.

Push remoto:
event-driven.
No polling cada pocos minutos.

Encuestas:
consultar snapshot agregado y sólo reaccionar a cambios.

FCM puede ser capa futura de entrega; Netlify no debe convertirse en un cron que quema recursos sin necesidad.

---

## 12. ANDROID

Fase nativa:
1. target Android 13+ notification permission model;
2. POST_NOTIFICATIONS;
3. crear canales;
4. pedir permiso desde Centro de Avisos tras explicación;
5. WorkManager para flexible reminders;
6. deep links al destino ISL;
7. persistir preferences localmente;
8. reboot/update resilience;
9. batería / doze / OEM physical tests;
10. T7/T8 packaged-device + human CQC.

No usar exact alarms para recordatorios vagos.

---

## 13. WEB / PWA

Mantener:
- permission request sólo bajo gesto;
- HTTPS;
- ServiceWorker;
- notificationclick deep link.

Añadir más adelante:
- PushManager subscription;
- backend event-driven;
- VAPID/FCM;
- preferences;
- unsubscribe;
- dedupe;
- TTL.

No intentar simular background scheduler fiable sólo con timers web.

---

## 14. UNREAL MIGRATION CONTRACT

Cuando ISL migre:
NotificationEvent es independiente del frontend.

Adapter:
WEB_PWA
ANDROID_NATIVE
UNREAL_LOCAL
FCM_REMOTE
STEAM_PLATFORM
CALENDAR
CHATGPT_CREATOR

Un mismo evento puede tener múltiples adapters pero un dedupe_key común.

---

## 15. STEAM / DISTRIBUCIÓN

Steam wishlist/store ya notifica ciertos hitos.
ISL no debe duplicarlos de forma agresiva.

Separar:
PLAYER_PLATFORM_NOTIFICATION
CREATOR_PROJECT_REMINDER
COMMUNITY_OPT_IN.

---

## 16. TESTS

T0 schema policy JSON.
T1 priority/cooldown unit tests.
T2 event → channel mapping.
T3 in-app rendering.
T4 dedupe/integration.
T5 stress: 100 eventos → digest estable.
T6 visual accessibility.
T7 APK packaged notification tests.
T8 physical Android / OEM / permission / reboot / quiet-hours.

Regresiones:
- no tapar UI;
- no pedir permiso al inicio;
- no spam;
- deep link correcto;
- no notificar evento resuelto;
- no exponer datos privados;
- no repetir mismo aviso tras redeploy/cache;
- no perder categorías tras actualización.

---

## 17. CURRENT PRIORITY

N1 implementation candidate:
ISL_NOTIFICATION_OS_NATIVE_BASE_v0.72.1

Entregables:
- notification policy JSON;
- Preferences UI;
- native Android channels + runtime permission;
- WorkManager soft reminder;
- deep links;
- digest generator;
- survey change watcher outside Netlify polling;
- regression gate;
- physical Android CQC.

Human decision remains final.
