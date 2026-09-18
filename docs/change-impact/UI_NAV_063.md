# ISL — CHANGE IMPACT CARD · NAV CLEAN v0.63
FECHA: 2026-09-18
CHANGE_ID: UI-NAV-063

## INTENCIÓN
Qué mejora:
- una sola navegación pública;
- menú siempre en una línea;
- jerarquía clara;
- bienvenida moderna antes del Centro;
- herramientas secundarias en drawer flotante.

Qué NO debe cambiar:
- PRE50;
- save/localStorage;
- Brújula/Huellas;
- rutas de contenido;
- perfil RPG;
- assets;
- comportamiento de Pages/Android coherente.

Criterio de éxito:
- no hay dos barras;
- bienvenida moderna visible en primer arranque de sesión;
- ENTRAR EN ISL abre Centro;
- Centro / Perfil / Ruta / Aventura / Música / Más responden;
- “Más” abre drawer;
- nav nunca hace wrap.

Criterio de fallo:
- overlay bloquea;
- rail legacy visible;
- nav en dos líneas;
- bienvenida no aparece;
- botones muertos.

## IMPACTO
Entidades:
APP_SHELL, NAVIGATION, UI_LAYOUT, INPUT, VIEWPORT, ANDROID_WRAPPER, WEB_PWA, DEPLOYMENT
Blast radius: ALTO

## RIESGO
Categorías:
B NAVIGATION
I VISUAL_RENDER
J INPUT_INTERACTION
L CACHE_VERSIONING
O PLATFORM_COMPAT
T PLAYER_EXPERIENCE_CLARITY

Regresiones:
ERR-ANDROID-001
ERR-UI-004
navegación duplicada móvil

## TEST PLAN
T0: marcadores v063, single-line CSS, moreNavBtn.
T2: go(home/calendar), drawer Más.
T3: welcome → Centro.
T4: native app → Pages → shell.
T6: portrait mobile.
T7: Android real.
T8: claridad humana.

## INVARIANTES
- rail técnica no puede competir con nav pública.
- navegación primaria no hace wrap.
- herramientas secundarias van a drawer.
- bienvenida no se resuelve con opacity-only si bloquea input.

## ROLLBACK
Volver a v0.62 sin tocar saves.

## RESULTADO
Código aplicado. Pages deploy final pendiente de green al crear esta ficha.
