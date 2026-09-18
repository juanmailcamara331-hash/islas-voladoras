# ISL — INCIDENT LOG · ERR-ANDROID-001 recurrence 3
Fecha: 2026-09-18
Estado: DEPLOY RESTORED · HUMAN DEVICE RECHECK REQUIRED

## Síntoma
- APK nueva compila e instala.
- Al abrir, aparece un flash de bienvenida legacy.
- Después queda shell/fondo oscuro sin UI útil.

## Clasificación
- error_id: ERR-ANDROID-001
- entity: APP_SHELL / CACHE_SW / ANDROID_WRAPPER / DEPLOYMENT / BUILD_CI
- category: A CRASH_BOOT + I VISUAL_RENDER + L CACHE_VERSIONING + M BUILD_PACKAGING
- platform: Android WebView + GitHub Pages
- severity: S0 BLOCKER
- recurrence_count: 3

## Evidencia encontrada
1. APK build 514:
   - build success
   - validate APK success
   - artifact upload success
2. GitHub Pages:
   - varios runs previos fallaban en CQC y no desplegaban.
   - por tanto, APK nueva podía seguir consumiendo una web vieja.
3. Run Pages 432:
   - CQC portal: SUCCESS
   - Upload Pages artifact: SUCCESS
   - Deploy: SUCCESS
   - pages_build_version: e10aebfd631d3ac25aa696a072600f5b97c3379f
   - deployment reported success
   - environment URL:
     https://juanmailcamara331-hash.github.io/islas-voladoras/

## Causa raíz operativa
No era válido interpretar “APK verde” como “app actualizada”.
El wrapper depende de una web remota viva.
Cuando Pages está rojo, el APK puede ser nuevo pero mostrar una versión anterior del portal.

## Correcciones aplicadas
- Native entry versionada.
- Native mode no registra Service Worker.
- Desregistro de workers heredados.
- Limpieza de Cache Storage sin tocar localStorage/save.
- #welcome eliminado físicamente en native.
- #home + #finalCommandCenter forzados visibles.
- SW generation bump.
- CQC del Pages endurecido y autodiagnóstico.
- Pages redeploy exitoso.

## Nueva invariancia
NO declarar APK válida sólo porque build-android-apk pasa.
Para wrapper remoto se exige:
APK_GREEN && PAGES_GREEN && PAGE_BUILD_VERSION_EXPECTED

## Gate humano pendiente
Instalar/abrir APK después del Pages deploy verde.
Hacer 3 cold starts:
1. cero flash legacy;
2. HOME visible;
3. navegación responde;
4. no canvas desktop por zoom-out;
5. progreso local preservado.

## Prevención
Añadir a release checklist:
- comprobar último Pages run;
- registrar pages_build_version;
- comprobar APK build SHA;
- verificar que ambos pertenecen al mismo release window;
- no entregar APK si Pages está rojo.
