# ISL — UNREAL ENGINEERING SOURCE MAP v0.62
Fecha: 2026-09-18
Estado: PREPARADO PARA MIGRACIÓN FUTURA · NO ACTIVA GODOT

## Objetivo
Cuando ISL pase a Unreal, no empezar desde cero ni mezclar fuentes sin criterio.
Cada dominio tendrá:
- fuente primaria;
- fuente académica o independiente;
- práctica de industria/comunidad;
- riesgo de obsolescencia;
- tests mínimos;
- vínculo con ISL_BUILD_SCIENCE.

## A. TESTING / QA
### Primarias
Epic — Automation Test Framework
https://dev.epicgames.com/documentation/unreal-engine/automation-test-framework-in-unreal-engine

Epic — Configure Automation Tests
https://dev.epicgames.com/documentation/unreal-engine/configure-automation-tests-in-unreal-engine

Epic — Gauntlet
https://dev.epicgames.com/documentation/unreal-engine/running-gauntlet-tests-in-unreal-engine

Epic — Horde Automation Hub
https://dev.epicgames.com/documentation/unreal-engine/horde-automation-hub-for-unreal-engine

### ISL
- mapear T0–T8 a Automation/Gauntlet;
- packaged build obligatorio;
- screenshot regression;
- test groups por sistema;
- metadata por plataforma/configuración.

## B. BUILD / CI / ARTIFACTS
Epic — Horde Build Automation
https://dev.epicgames.com/documentation/unreal-engine/horde-build-automation-for-unreal-engine

Epic — Horde
https://dev.epicgames.com/documentation/unreal-engine/horde-in-unreal-engine

### ISL
- BuildGraph por nodos;
- artefactos versionados;
- build health;
- no promover build sin tests;
- logs estructurados.

## C. PROFILING / PERFORMANCE / MEMORY
Epic — Unreal Insights
https://dev.epicgames.com/documentation/unreal-engine/unreal-insights-in-unreal-engine

Epic — Memory Insights
https://dev.epicgames.com/documentation/unreal-engine/memory-insights-in-unreal-engine

### ISL
- CPU/GPU frame budgets por tier;
- memoria por escena;
- Android tracing;
- no sacrificar reglas por densidad visual.

## D. GAMEPLAY ARCHITECTURE
Epic — Gameplay Ability System / Gameplay Abilities
https://dev.epicgames.com/documentation/unreal-engine/gameplay-ability-system-for-unreal-engine
https://dev.epicgames.com/documentation/unreal-engine/using-gameplay-abilities-in-unreal-engine

### ISL
Evaluar para:
- reliquias;
- estados;
- costes;
- habilidades;
- tags;
- gameplay events.
No adoptarlo por moda: primero comparar complejidad/beneficio con sistemas propios.

## E. WORLD / STREAMING / SCALE
Epic — World Partition
https://dev.epicgames.com/documentation/unreal-engine/world-partition-in-unreal-engine

### ISL
- islas;
- streaming;
- data layers;
- navegación;
- HLOD;
- world-state persistente separado de densidad visual.

## F. NETWORKING
Epic — Networking and Multiplayer
https://dev.epicgames.com/documentation/unreal-engine/networking-and-multiplayer-in-unreal-engine

Epic — Iris
https://dev.epicgames.com/documentation/unreal-engine/introduction-to-iris-in-unreal-engine

### ISL
- autoridad de servidor;
- relevancia;
- prediction sólo donde aporte;
- Iris se considera con cautela si sigue experimental;
- crossplay no se activa antes de vertical slice y partner/SDK.

## G. AI / AGENTS / CROWDS
Epic — AI systems
https://dev.epicgames.com/documentation/unreal-engine/artificial-intelligence-in-unreal-engine

Epic — Mass Entity
https://dev.epicgames.com/documentation/unreal-engine/overview-of-mass-entity-in-unreal-engine

### ISL
- criaturas;
- crowds;
- comportamiento sistémico;
- usar Mass sólo si escala/beneficio lo justifica.

## H. ASSET / CONTENT PIPELINE
Epic — Asset Manager
https://dev.epicgames.com/documentation/unreal-engine/asset-management-in-unreal-engine

### ISL
- primary assets;
- soft refs;
- bundles;
- cook rules;
- validar assets rotos antes de build.

## I. SAVE / VERSIONING
Base:
- sistemas de SaveGame de Unreal;
- schema_version ISL;
- migraciones explícitas;
- nunca reescribir historia del jugador.

## J. PLATFORM / DEVICE
- Android packaged tests;
- PC packaged tests;
- consolas sólo tras SDK/partner;
- device-specific perf/inputs;
- SAME WORLD / SAME RULES / DIFFERENT CEILINGS.

## K. SECURITY / PRIVACY
- revisar plugins;
- secretos fuera de repo;
- permisos mínimos;
- datos locales/persistentes versionados;
- no introducir telemetría opaca.

## L. IA PARA DESARROLLO
### OpenAI
- eval-driven workflows;
- error taxonomies;
- agent/tool verification.

### Anthropic
- capability vs regression evals;
- property-based testing;
- long-running engineering discipline.

### Regla ISL
IA propone/ejecuta; CI y evidencia verifican.
Ningún agente puede borrar una prueba porque falle sin registrar por qué.

## M. PAPERS / INVESTIGACIÓN
- Game bug taxonomies.
- Regression testing in games.
- Automated game testing.
- Metamorphic/property-based testing.
- Tool-augmented agent failure taxonomies.

Cada fuente nueva debe registrar:
- fecha;
- dominio;
- autoridad;
- aplicabilidad ISL;
- riesgo;
- decisión: ADOPT / PILOT / WATCH / REJECT.

## N. COMUNIDAD / REDDIT / PRÁCTICA
Usar para:
- fallos emergentes;
- ergonomía de workflow;
- packaged build realities;
- edge cases.
Nunca como única fuente de verdad técnica.

## O. VERSIONADO DE FUENTES
Al entrar a Unreal:
1. congelar versión exacta de UE;
2. etiquetar documentación por versión;
3. no mezclar tutoriales de versiones antiguas sin comprobar API;
4. actualizar SOURCE MAP por release;
5. marcar experimental/deprecated;
6. generar migration notes al subir engine.

## P. PRIMERA TAREA AL MIGRAR
Crear:
- Unreal project skeleton;
- test group ISL.Smoke;
- BootTest packaged;
- asset validation;
- save migration test;
- screenshot baseline;
- Android packaged smoke;
- CI artifact;
- error registry bridge.

## Principio
La vanguardia no es acumular herramientas.
Es saber qué problema resuelve cada una, cómo se mide y cómo se revierte.


## L. SOURCE GOVERNANCE
Cada fuente técnica nueva se registra con:
- source_id
- dominio
- URL
- versión UE afectada
- fecha de revisión
- autoridad S/A/B/C
- pregunta que responde
- patrón adoptable
- riesgos / límites
- test ISL relacionado
- estado ACTIVE / WATCH / DEPRECATED

### Regla de autoridad
S — Epic oficial / especificaciones / papers peer-reviewed.
A — Epic/GDC talks, documentación de vendors, postmortems verificables.
B — OSS maduro, blogs técnicos de estudios/autores reconocidos.
C — Reddit, forums, Discord, issues: señal y edge cases, nunca única base de una decisión crítica.

### Regla de actualización
Antes de migrar a Unreal:
1. fijar versión exacta de UE;
2. revisar breaking changes/deprecations;
3. revalidar todas las fuentes ACTIVE;
4. degradar fuentes obsoletas a WATCH/DEPRECATED;
5. mapear cada subsistema ISL a fuente + patrón + test.

## M. DOMINIOS A COMPLETAR ANTES DE MIGRACIÓN
- C++ / UObject / reflection / GC
- Gameplay Framework
- Blueprints / Data Assets / Gameplay Tags
- Automation / Gauntlet / Horde
- UBT / UAT / BuildGraph / Cooking / Packaging
- Unreal Insights / Memory Insights / GPU profiling
- Lumen / Nanite / VSM / TSR / scalability
- World Partition / Data Layers / HLOD / streaming
- AI: Navigation / Behavior Trees / StateTree / EQS / Mass
- GAS / Enhanced Input
- MetaSounds / Audio Mixer / Soundscape
- Chaos / Control Rig / Animation Blueprints / Motion Matching
- replication / Iris / Online Services
- SaveGame / serialization / versioning / migrations
- UMG / CommonUI / accessibility / localization
- platform certification constraints
- source control / asset provenance / LFS or Perforce
- PCG / editor scripting / Python / commandlets
- security / privacy / trust boundaries
- agent-assisted engineering / evals

## N. FRONTIER LANE
Toda técnica “de vanguardia” debe pasar:
FUENTE → MADUREZ → BENEFICIO → COSTE → RIESGO → PROTOTIPO → PERF/EVIDENCIA → ADOPTAR/NO ADOPTAR

No usar:
- Lumen, Nanite, Mass, Iris, Motion Matching, PCG, GAS, agentes o cualquier novedad sólo porque exista.
Sí usar:
- cuando mejora experiencia, velocidad de autor, robustez o escalabilidad de ISL y lo demuestra un test.

## O. TEST MAPPING
Cada dominio Unreal debe mapear a ISL_BUILD_SCIENCE:
- arquitectura → T1/T4/T7
- UI/input → T2/T4/T6/T7/T8
- rendering → T5/T6/T7
- performance → T5/T7
- networking → T4/T5/T7
- save → T1/T4/T7 + rollback
- gameplay/AI → T2/T4/T5/T8
- build/deploy → T0/T3/T7
- experiencia → T8/CQC

## P. MIGRATION GATE
No migrar a Unreal hasta:
- vertical slice y tesis estables;
- save/world model documentado;
- source map actualizado a versión UE elegida;
- riesgo de migración estimado;
- automation scaffold elegido;
- packaged test funcionando;
- rollback/export de datos posible;
- SAME WORLD / SAME RULES preservado.
