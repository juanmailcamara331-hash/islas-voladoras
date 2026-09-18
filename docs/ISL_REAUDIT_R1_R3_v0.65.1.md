# ISL — RE-AUDIT EXECUTION R1–R3 v0.65.1
Fecha: 2026-09-18
Estado: EN CURSO · no declarar GREEN hasta cerrar gates humanos/deploy

## Método aplicado
ISL_BUILD_SCIENCE v0.61:
INTENCIÓN → ENTIDADES → RIESGOS → TEST PLAN → CAMBIO → VERIFICACIÓN → REGRESIÓN → EVIDENCIA HUMANA → DOCUMENTACIÓN.

## Backup / rollback de esta pasada
- CODE known-good checkpoint: ef8250d0b6a3570e20f6c999f11a60627d9d714d (checkpoint v0.65).
- DEPLOY Netlify observado al iniciar auditoría: site islas-voladoras-isl, deploy 6aada7d9ad9db00008c5f7cd, state ready.
- DESIGN/CANON: Drive ISL_CHECKPOINT_MASTER_CURRENT v0.65 preservado.
- No se ha borrado save/localStorage ni se ha realizado migración destructiva.

## R1 · ARRANQUE / SHELL / DEPLOY
Entidades: APP_SHELL, CACHE_SW, VIEWPORT, BUILD_CI, ANDROID_WRAPPER, DEPLOYMENT.
Bugs cruzados: ERR-ANDROID-001, ERR-ANDROID-002, ERR-UI-004, ERR-DEPLOY-006.

Evidencia estática:
- native app desregistra service workers y limpia Cache Storage sin tocar localStorage.
- HOME/finalCommandCenter se fuerzan visibles en native.
- workflow Pages conserva CQC y diagnostics de fallo.
- workflow Android exige Pages completed/success antes de compilar.
- wrapper mantiene zoom/overview deshabilitados.

Estado: AMBER.
Pendiente para GREEN:
1. Pages run actual completed/success + SHA esperado.
2. APK run actual completed/success.
3. 3 cold starts físicos consecutivos: sin welcome legacy, HOME visible, navegación responde, sin canvas desktop.
4. back/resume smoke real.

## R2 · UI / NAVEGACIÓN / CLARIDAD
Entidades: NAVIGATION, UI_LAYOUT, INPUT, VIEWPORT, ACCESSIBILITY.
Evidencia estática:
- navegación principal única + drawer Más protegidos por CQC.
- flex-wrap:nowrap protegido por CQC.
- jerarquía de Inventario → Aventura → Recreo → Música → Centro protegida por CQC.
- overlays críticos usan hidden real / display rules según registro de errores.
- focus-visible y prefers-reduced-motion presentes.

Estado: AMBER.
Pendiente para GREEN:
1. mobile portrait real;
2. ningún item principal en dos líneas;
3. todos los destinos primarios responden al toque;
4. check humano de claridad (sin menú duplicado/competidor).

## R3 · ENCUESTAS / EVIDENCIA
Entidades: NETWORK, CONTENT_DATA, SECURITY_PRIVACY, DEPLOYMENT, PLAYER_EXPERIENCE_CLARITY.

Evidencia Netlify al iniciar auditoría:
- isl-pillars-01 detectado, honeypot=true, 0 submissions.
- isl-reference-friends-01 detectado, honeypot=true, 0 submissions.
- isl-molino-poll detectado, 17 submissions.
- Forms habilitado en el proyecto público.

Hallazgo:
- los dos formularios nuevos no exponían metadatos de cohorte, incumpliendo el gate R3.

Fix aplicado:
- cohort=friends-01
- survey_version=v0.65-r3
- survey_source=isl-native-netlify
- guards CI añadidos para ambos formularios.

Commits de fix:
- 556b7e35ae7bec30f2626e54a8a6bf4da3f99ce
- 61f2077e51c5dab88430beb183c8a555a8aba9eb
- 01a11c8331a3e9466bfcac89b10e3724b13f9061

Estado: AMBER.
Pendiente para GREEN:
1. deploy Netlify con los campos nuevos detectados;
2. 1 submission de prueba por formulario;
3. retrieval confirmado en Netlify;
4. metadata cohort/version/source presente en submission;
5. Jotform permanece sólo backup silencioso, no experiencia primaria.

## Decisión
NO abrir todavía 3 criaturas / NUDOS / CQC.
Sí se puede preparar material de envío a colegas, pero el envío real espera R1–R3 GREEN.

## Principio preservado
La auditoría no altera contenido creativo ni canon. Sólo añade trazabilidad, guardrails y evidencia.


## Addendum · force-deploy attempt
- Commit trigger creado: 28c72b94b186d84368ffda90a6f4d839f5b7d313
- Netlify current deploy permaneció en 6aada7d9ad9db00008c5f7cd (ready).
- GitHub no reportó workflow asociado al commit de trigger.
- Diagnóstico: el proyecto Netlify no está reaccionando automáticamente a pushes de main desde la conexión actual.
- Consecuencia: R3 sigue AMBER por deploy, no por código.
- Acción externa mínima restante: Netlify > islas-voladoras-isl > Deploys > Trigger deploy > Deploy site.
- Después del deploy: releer Forms y verificar cohort / survey_version / survey_source + 1 submission de prueba por formulario.

## R1/R2 static closeout
R1 static/CI: PASS provisional.
- cache/SW guards presentes;
- native wrapper sin zoom/overview;
- Pages coherence gate presente;
- known regressions cubiertas en registro.

R2 static/CI: PASS provisional.
- una sola navegación pública visible;
- legacy rail oculto;
- secondary tools concentradas en drawer;
- finalNav nowrap + horizontal overflow;
- focus-visible + reduced-motion presentes.

Ambos quedan AMBER únicamente por gates humanos/dispositivo exigidos por la metodología.


## R3 closure evidence · v0.65.2
Estado: GREEN.

Producción:
- Netlify deploy 6aadaaa8426764ffe5174cb3 = ready.
- commit_ref = ffd0ff33d8d65968336198883abaa5fad4c773b0.
- Pilares y Referencias publicadas en producción.

Validación de formularios:
- isl-pillars-01: 1 submission de prueba recuperada.
- isl-reference-friends-01: 1 submission de prueba recuperada.
- ambas contienen cohort=friends-01.
- ambas contienen survey_version=v0.65-r3.
- ambas contienen survey_source=isl-native-netlify.
- honeypot activo.
- Jotform permanece documentado como backup silencioso; Netlify Forms es backend primario.

Decisión:
R3 pasa a GREEN. No borrar las respuestas de prueba: sirven como evidencia de cierre técnico y deben excluirse de síntesis de colegas por estar marcadas como test humano interno.
