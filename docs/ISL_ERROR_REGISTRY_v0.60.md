# ISL — REGISTRO DE ERRORES RECURRENTES Y PREVENCIÓN v0.60
Fecha: 2026-09-18
Estado: ACTIVO · cruzado con metodología / CQC

## Propósito
No volver a redescubrir fallos ya resueltos. Cada error recurrente debe registrar:
- síntoma visible;
- causa raíz conocida o probable;
- solución que funcionó;
- riesgo de regresión;
- prueba automática o manual asociada;
- relación con metodología/CQC.

## ERR-ANDROID-001 · bienvenida vieja → fondo oscuro / shell sin UI
Síntoma:
- al abrir APK aparece brevemente una bienvenida antigua;
- después queda fondo/hero oscuro con líneas o arte, pero sin interfaz útil.

Historial:
- 2026-09-16: una bienvenida invisible seguía por encima e interceptaba;
- solución efectiva: eliminarla realmente con display:none / pointer-events / z-index limpio.
- 2026-09-17: regresión de arranque/render; se forzó HOME visible y scroll 0,0; los parches agresivos de viewport se revirtieron al pipeline estable.
- 2026-09-18: reaparece en wrapper Android tras cambios de entrada/viewport.

Causas a comprobar EN ESTE ORDEN:
1. service worker / shell cache obsoleto;
2. welcome legacy presente o montándose antes del shell actual;
3. HOME o finalCommandCenter no activo/visible al cerrar welcome;
4. modo spectacle u otro estado visual persistente;
5. viewport/overview mode del WebView.

Receta preferida:
- APK usa query nativa versionada (?app=1&native=...);
- no registrar service worker en modo native;
- desregistrar workers/caches heredados al entrar en native;
- retirar físicamente #welcome del DOM en native;
- forzar #home + #finalCommandCenter visibles;
- scroll 0,0;
- invalidar CACHE del SW cuando cambia shell crítico.

Regresión prohibida:
- arreglarlo sólo con opacity:0;
- añadir otro overlay encima;
- tocar diez breakpoints antes de descartar caché / capas.

Prueba humana:
- arranque en frío;
- no se ve bienvenida antigua ni un frame;
- en <=2 s aparece UI navegable;
- matar app y repetir 3 veces.

## ERR-ANDROID-002 · zoom-out muestra “lienzo desktop” comprimido
Síntoma:
- pellizcar hacia fuera revela una maqueta gigantesca o mucho vacío lateral.

Causa conocida:
- WebView con wideViewport + loadWithOverviewMode + zoom libre.

Receta:
- native Android: wideViewport=false, overview=false, supportZoom=false, builtInZoom=false.
- navegador/PWA conserva accesibilidad y zoom normal.

Prueba:
- APK no permite alejar hasta exponer canvas de escritorio.
- layout móvil sigue legible en portrait.

## ERR-WEB-003 · cambios nuevos no aparecen
Síntoma:
- web/APK parece conservar versión anterior aunque repo cambió.

Causa recurrente:
- service worker o assets cacheados.

Receta:
- navigation network-first;
- route/state críticos no-store;
- bump explícito de CACHE tras shell changes;
- query/version nueva en wrapper cuando cambia entrada crítica.

## ERR-UI-004 · capa invisible intercepta toques
Síntoma:
- interfaz “se ve” pero botones no responden o queda bloqueada.

Causa conocida:
- overlay/welcome/lightbox oculto sólo visualmente.

Receta:
- hidden real: display:none o retirada del DOM;
- pointer-events:none como refuerzo, no como única garantía;
- revisar z-index y position:fixed.

## ERR-MEDIA-005 · fullscreen/lightbox descolocado
Historial:
- #lightbox pasó accidentalmente de position:fixed a relative.

Receta:
- lightbox siempre fixed al viewport;
- controles close/fullscreen en safe-area;
- CI visual/manual de fullscreen.

## Integración metodológica
Todo bug crítico nuevo pasa:
1. OBSERVAR — captura/síntoma exacto.
2. REPRODUCIR — condición mínima.
3. HIPÓTESIS — causa falsable.
4. DESCARTAR CONOCIDOS — consultar este registro antes de inventar solución.
5. PARCHE MÍNIMO.
6. REGRESIÓN — añadir guard CI/manual.
7. DOCUMENTAR — causa + receta.
8. PROMOVER sólo tras prueba humana cuando afecte arranque, save o navegación.

## CQC técnico mínimo antes de dar APK
- COLD START: 3 arranques consecutivos.
- ENTRY: sin welcome legacy en native.
- HOME: #home visible.
- NAV: navegación principal responde.
- VIEWPORT: no canvas desktop por zoom-out.
- CACHE: shell/version coherente.
- SAVE: no borrar localStorage de progreso para arreglar caché.
- BACK: botón atrás no deja app en estado muerto.

## Regla magistral
Un bug conocido que reaparece es una regresión de proceso, no “mala suerte”.
La solución no termina cuando se arregla: termina cuando queda registrada y protegida.


## ERR-DEPLOY-006 · APK verde pero Pages viejo por CQC obsoleto
Síntoma:
- APK nueva compila y valida correctamente;
- la app sigue mostrando comportamiento viejo;
- cambios web recientes no aparecen.

Contexto:
- 2026-09-18, builds Android 513/514 verdes.
- Workflow GitHub Pages fallaba en CQC antes de Upload Pages artifact.
- El wrapper Android cargaba por tanto la última publicación vieja.

Entidad:
- BUILD_CI
- DEPLOYMENT
- WEB_PWA
- ANDROID_WRAPPER

Categoría:
- M BUILD_PACKAGING
- L CACHE_VERSIONING
- T PLAYER_EXPERIENCE_CLARITY

Severidad:
- S0 BLOCKER para validación humana de APK, porque invalida la correspondencia build↔web publicada.

Causa raíz:
- guard textual obsoleto exigía la frase de Brújula en una sola cadena:
  No señala dónde ir. Señala de dónde vienes.
- el HTML real introducía <br><em> entre ambas frases;
- grep literal fallaba, bloqueando el deploy.

Fix:
- dividir el guard en dos comprobaciones semánticas;
- añadir trap de shell para imprimir línea/comando exactos del próximo fallo CQC.

Regression test:
- Pages build debe llegar a Upload Pages artifact + Deploy;
- Android build verde NO cuenta como release usable si Pages deploy correspondiente no está verde;
- antes de entregar APK wrapper, verificar par:
  APK_BUILD_GREEN + WEB_DEPLOY_GREEN.

first_seen: 2026-09-18
last_seen: 2026-09-18
recurrence_count: 1
status: FIXED_VERIFIED


## RELEASE GATE añadido tras ERR-DEPLOY-006
Ninguna APK web-wrapper se considera entregable sólo porque Android compile.
Debe existir evidencia doble:
- APK_BUILD_GREEN
- WEB_DEPLOY_GREEN

Si una falla:
- no se entrega como “corregida”;
- se informa estado real;
- se conserva último artefacto válido;
- se corrige primero la desincronización.


## Addendum v0.62 — DEPLOY COHERENCE
ERR-ANDROID-001 recurrence_count: 3

Nueva causa operacional confirmada:
- APK build puede estar verde mientras GitHub Pages está rojo.
- En wrapper remoto, eso produce falsa sensación de actualización: APK nueva + shell web viejo.

Nueva invariancia de release:
APK_GREEN && PAGES_GREEN && EXPECTED_PAGE_BUILD

Nuevo guard:
- build-android-apk.yml consulta el último run de build-web-preview.yml.
- si Pages no está completed/success, el build APK falla antes de compilar.
- el log imprime PAGES_STATUS / PAGES_CONCLUSION / PAGES_BUILD_SHA.

Run restaurado:
- Pages run 432
- build/CQC: success
- deploy: success
- pages_build_version: e10aebfd631d3ac25aa696a072600f5b97c3379f
- URL: https://juanmailcamara331-hash.github.io/islas-voladoras/

Regla:
No entregar APK remota basándose sólo en el artefacto Android.


## ERR-UI-007 · drawer Más no se cierra al tocar fuera
Síntoma:
- en móvil el menú lateral permanece abierto al tocar fuera;
- obliga a buscar el mismo botón de apertura para cerrarlo.

Entidad:
- NAVIGATION
- INPUT
- UI_LAYOUT

Categoría:
- J INPUT
- T PLAYER_EXPERIENCE_CLARITY

Severidad:
- S2 MAJOR para claridad móvil.

Causa:
- el drawer sólo alternaba estado desde los botones de apertura;
- no existía outside-click/pointerdown ni cierre al seleccionar destino.

Fix:
- helper setDrawer(open);
- cierre por pointerdown fuera del drawer;
- cierre al seleccionar link/item;
- Escape cierra y aria-expanded vuelve a false.

Regression guard:
- portal/index.html debe contener setDrawer(false) en outside-click y current drawer controls.

status: FIXED_PENDING_HUMAN
first_seen: 2026-09-18
recurrence_count: 1

## ERR-UX-008 · acciones temporales importantes no visibles
Síntoma:
- encuestas, pruebas humanas o siguiente acción existen pero quedan enterradas;
- el usuario no sabe qué debe hacer “ahora” desde el Centro de Mandos.

Entidad:
- UI_LAYOUT
- NAVIGATION
- PLAYER_EXPERIENCE_CLARITY

Severidad:
- S2 MAJOR para el Command Center como herramienta operativa.

Causa:
- navegación permanente y acciones temporales compartían la misma jerarquía;
- no existía un slot operativo de fase actual.

Fix:
- bloque reusable #currentActions encima del hero;
- etiqueta AHORA;
- copy de fase actual;
- enlaces temporales visibles sin convertirlos en navegación permanente.

Regla:
- currentActions cambia con la fase;
- no acumular tareas viejas;
- máximo 2–3 acciones de alta prioridad;
- lo permanente sigue en navegación/drawer.

status: FIXED_PENDING_HUMAN
first_seen: 2026-09-18
recurrence_count: 1


## ERR-ANDROID-009 · flash de bienvenida al volver atrás
Síntoma:
- tras abrir una encuesta u otra vista y usar Atrás, aparece durante un frame la bienvenida antes del Centro de Mandos.

Entidad:
- APP_SHELL
- NAVIGATION
- ANDROID_WRAPPER
- PLAYER_EXPERIENCE_CLARITY

Severidad:
- S2 MAJOR visual/navigation regression.

Causa:
- native-app se detectaba en <head>, pero el estado de sesión ya-entered se aplicaba a #welcome después de DOMContentLoaded/pageshow;
- el navegador podía pintar #welcome antes de stabilize().

Fix:
- leer isl_native_entered_v063 en <head>;
- añadir html.native-entered antes del primer render;
- CSS crítico oculta #welcome en native-entered con display:none;
- al pulsar ENTRAR, sincronizar native-entered inmediatamente;
- pageshow/stabilize mantiene la clase como fallback.

Regression guard:
- CI exige native-entered y CSS crítico de welcome.

status: FIXED_VERIFIED
first_seen: 2026-09-18
recurrence_count: 1
verified_on_physical_android: 2026-09-19


## ERR-FORM-010 · submit parece muerto cuando falta un required
Síntoma:
- usuario pulsa “Dejar tu huella” / “Dejar evidencia”;
- no ve transición ni confirmación;
- si falta un required fuera de viewport, el navegador puede bloquear submit sin feedback útil.

Severidad:
- S2 MAJOR para evidencia humana.

Causa:
- dependencia exclusiva de validación HTML nativa en formularios largos mobile-first.

Fix:
- feedback inline aria-live;
- resaltar primera pregunta inválida;
- scroll/focus a :invalid;
- estado “GUARDANDO…” durante submit válido;
- mismo patrón en Pilares y Referencias.

status: FIXED_PENDING_HUMAN
first_seen: 2026-09-19
recurrence_count: 1


## ERR-DEPLOY-011 · Netlify token cannot resolve deploy target
Síntoma:
- private/public build audits GREEN;
- NETLIFY_AUTH_TOKEN secret exists;
- CLI deploy reaches Netlify but returns Project not found / JSONHTTPError 404.

Evidence:
- run 35401769862: private site id -> Project not found.
- run 35401899060: hard-linked private site -> Project not found.
- run 35402175539: authorized public project alias -> JSONHTTPError: Not Found.

What is NOT broken:
- security gate;
- private build;
- PUBLIC/PRIVATE boundary;
- access headers;
- Netlify public production deploys via connected provider integration.

Likely cause:
- GitHub secret NETLIFY_AUTH_TOKEN is stale, scoped to a different identity/context, or otherwise cannot access current projects through Netlify CLI.

Decision:
- stop automatic retries;
- deploy-private workflow becomes manual-only until token is rotated/re-authorized;
- never embed token in repo or APK.

Severity:
- S2 MAJOR for private-host migration;
- does not block current public surveys or existing APK.

status: OPEN_EXTERNAL_CREDENTIAL
first_seen: 2026-09-19
recurrence_count: 3
