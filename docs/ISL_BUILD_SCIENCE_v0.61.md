# ISL — BUILD SCIENCE / CREATIVE ENGINEERING METHOD v0.61
Fecha: 2026-09-18
Estado: ACTIVO · obligatorio para cambios significativos

## Tesis
ISL debe conservar ambición creativa brutal sin aceptar construcción reactiva.
Cada cambio entra como una hipótesis con impacto rastreable, no como parche aislado.

## Ciclo obligatorio
INTENCIÓN → ENTIDADES → RIESGOS → TEST PLAN → CAMBIO → VERIFICACIÓN → REGRESIÓN → EVIDENCIA HUMANA → DOCUMENTACIÓN

### 1. INTENCIÓN
Registrar:
- qué queremos mejorar;
- por qué importa;
- qué NO queremos cambiar;
- criterio de éxito/fallo.

### 2. ENTIDADES AFECTADAS
Toda modificación etiqueta una o más entidades:
- APP_SHELL
- NAVIGATION
- UI_LAYOUT
- INPUT
- VIEWPORT
- CACHE_SW
- BUILD_CI
- ANDROID_WRAPPER
- WEB_PWA
- SAVE_PERSISTENCE
- MIGRATION
- GAMEPLAY
- AI_CREATURE
- COMBAT
- WORLD_STATE
- BRUJULA_HUELLAS
- RELIC
- NUDO
- AUDIO
- MEDIA
- ART_ASSET
- PERFORMANCE
- NETWORK
- SECURITY_PRIVACY
- ACCESSIBILITY
- PLATFORM
- CONTENT_NARRATIVE
- TOOLING_AGENT
- DEPLOYMENT

## 3. TAXONOMÍA DE FALLOS
Cada riesgo/test se cruza con una categoría principal:
A. CRASH / BOOT
B. NAVIGATION
C. IMPLEMENTATION_RESPONSE
D. TEMPORAL / RACE / TIMING
E. NON_TEMPORAL_LOGIC
F. NETWORK
G. SOUND
H. GAME_BALANCE
I. VISUAL_RENDER
J. INPUT_INTERACTION
K. STATE_PERSISTENCE
L. CACHE_VERSIONING
M. BUILD_PACKAGING
N. PERFORMANCE_MEMORY
O. PLATFORM_COMPAT
P. ACCESSIBILITY
Q. SECURITY_PRIVACY
R. CONTENT_DATA
S. AI_AGENT_TOOLING
T. PLAYER_EXPERIENCE / CLARITY

Inspiración metodológica:
- taxonomías académicas de bugs de videojuegos;
- Unreal Automation: unit / feature / smoke / content stress / screenshot;
- Gauntlet/Horde: plataforma, configuración, logs, screenshots, callstacks;
- eval-driven development: definir éxito, medir en entorno real, aprender de errores;
- suites separadas de capacidad y regresión.

## 4. CAMBIO → IMPACT MAP
Antes de tocar código, crear un mini impacto:
CHANGE_ID:
INTENCIÓN:
ENTIDADES:
DEPENDENCIAS:
RIESGOS:
REGRESIONES CONOCIDAS:
TESTS REQUERIDOS:
HUMAN_GATE:
ROLLBACK:

No hace falta documento largo: puede ser un bloque de 8 líneas en el checkpoint/commit.

## 5. TEST PYRAMID ISL
### T0 · STATIC / CONTRACT
- archivo existe;
- claves esperadas;
- schema;
- selectors;
- strings críticas;
- rutas;
- manifest;
- build config.

### T1 · UNIT / PROPERTY
- funciones puras;
- parsers;
- scoring;
- migraciones;
- serialización;
- propiedades invariantes.

### T2 · FEATURE
- una función completa dentro de un sistema;
- ejemplo: Brújula escribe/lee huella;
- reliquia modifica affordance sin saltarse coste.

### T3 · SMOKE
Debe ser muy rápido:
- app arranca;
- HOME visible;
- navegación base;
- save accesible;
- escena crítica abre.

### T4 · INTEGRATION
- Android wrapper → web → state;
- escena → Brújula → persistencia;
- inventario → reliquia → consecuencia;
- encuesta → backend → resultado.

### T5 · CONTENT STRESS
- cargar todas las escenas/JSON/assets;
- comprobar enlaces rotos;
- estados vacíos;
- datos extremos;
- reabrir tras varias sesiones.

### T6 · VISUAL REGRESSION
- screenshot clave por viewport;
- mobile portrait;
- mobile landscape si aplica;
- desktop;
- high/low tier cuando exista.

### T7 · DEVICE / PACKAGED
Nunca validar sólo editor/browser:
- APK real;
- cold start;
- back button;
- resume;
- orientation;
- offline/degraded network;
- low-memory conditions cuando sea viable.

### T8 · HUMAN / CQC
- comprensión;
- emoción;
- ritmo;
- claridad;
- diversión;
- contradicción;
- accesibilidad percibida;
- bugs emergentes.

## 6. DOS SUITES PERMANENTES
### CAPABILITY SUITE
Pregunta: ¿la nueva cosa hace lo que prometimos?
Puede empezar fallando y mejorar.

### REGRESSION SUITE
Pregunta: ¿rompimos algo que ya funcionaba?
No se edita/elimina una regresión para “hacer verde” el build sin justificarlo.

## 7. CHANGE-IMPACT TEST SELECTION
No correr todo siempre.
Seleccionar por:
- entidad tocada;
- dependencia;
- bug histórico;
- plataforma;
- criticidad;
- rareza;
- coste del test.

Ejemplo:
Cambio Android wrapper:
- APP_SHELL
- VIEWPORT
- CACHE_SW
- ANDROID_WRAPPER
- BUILD_CI
=> ejecutar cold start, home visibility, viewport, cache version, back/resume, build artifact.

## 8. ERROR REGISTRY
Todo error crítico entra en docs/ISL_ERROR_REGISTRY_v0.60.md con:
- ERR-ID;
- síntoma;
- contexto;
- entidad;
- categoría;
- plataforma;
- severidad;
- causa;
- fix;
- regression test;
- fecha última aparición;
- número de recurrencias.

Si reaparece:
- recurrence_count += 1
- elevar criticidad
- revisar por qué falló el guard anterior.

## 9. SEVERIDAD
S0 BLOCKER — arranque/save/corrupción/seguridad/no usable.
S1 CRITICAL — core loop roto o regresión visible grave.
S2 MAJOR — función importante degradada.
S3 MINOR — fallo acotado con workaround.
S4 POLISH — estética/microdetalle.

## 10. RIESGO = PROBABILIDAD × BLAST RADIUS
Adoptado para cambios y agentes:
- probabilidad de fallo;
- radio de daño;
- reversibilidad;
- detectabilidad.

Un cambio pequeño con blast radius alto exige más gate que uno grande pero aislado.

## 11. TEST ORACLE IMPERFECTO / METAMORPHIC TESTING
En sistemas creativos no siempre existe “respuesta correcta”.
Usar relaciones invariantes:
- misma decisión con densidad visual distinta => mismo estado de mundo;
- low/high tier => mismos secretos, hitboxes, consecuencias;
- repetir evento equivalente => no aumentar significancia indefinidamente;
- cambiar orden visual => no borrar save;
- reabrir app => estado persistente coherente.

## 12. AGENTES / IA
Toda tarea larga hecha por agente debe:
- leer CURRENT_WORK_POINTER;
- leer ERROR_REGISTRY;
- declarar impacto;
- no borrar pruebas para pasar;
- ejecutar test fundamental de integración antes de dar por final;
- dejar cambios comprometidos/documentados;
- registrar incertidumbre.

## 13. EVIDENCIA HUMANA
Automatización no sustituye playtest.
Para experiencia:
- automatización encuentra regresiones reproducibles;
- humanos encuentran confusión, ritmo, emoción, tono, affordances y problemas emergentes.

## 14. FUENTES / JUSTIFICACIÓN
- Epic Unreal Automation Framework: unit, feature, smoke, content stress, screenshot.
- Epic Gauntlet: sesiones, plataformas, logs, crashes, saved data.
- Epic Horde Automation Hub: metadata histórica filtrable por plataforma/configuración.
- OpenAI evals: especificar → medir → mejorar; análisis de errores → taxonomía y frecuencia.
- Anthropic evals: capability + regression suites; eval-driven development; mantenimiento como tests.
- Literatura game testing: taxonomías de bugs, automatización insuficiente, regresión específica para juegos.
- Property-based / metamorphic testing para propiedades invariantes y oráculos difíciles.

## Regla operativa
NO HAY CAMBIO SIGNIFICATIVO SIN:
- entidades;
- riesgos;
- test plan;
- regression lookup;
- evidencia de verificación;
- actualización del registro si aparece bug.

## Regla creativa
La metodología existe para proteger la rareza, no para normalizarla.
No convierte diseño en burocracia: evita gastar creatividad arreglando regresiones repetidas.
