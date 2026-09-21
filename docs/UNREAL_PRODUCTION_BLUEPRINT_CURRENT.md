# ISL · UNREAL PRODUCTION BLUEPRINT CURRENT

Fecha: 2026-09-18

## Objetivo
Convertir decisiones creativas aprobadas en producción Unreal con el mínimo de ambigüedad, manteniendo trazabilidad y evitando que encuestas, borradores o entusiasmo salten gates.

## Production Lane
Sólo entran decisiones con:
1. Confirmación humana explícita.
2. Elección bloqueada.
3. CQC superado.
4. Criterios de aceptación.
5. Targets Unreal definidos.
6. Dependencias declaradas.
7. Contrato de datos.
8. Pruebas de regresión.
9. Presupuesto de rendimiento.
10. Impacto en guardado/migraciones.

Estados:
BANCO → VARIANTES → CQC → ENCUESTA_OPCIONAL → CONFIRMACION_AUTOR → READY_UNREAL → PRODUCCION → VALIDACION → CANON.

## Arquitectura Unreal recomendada para ISL
- Gameplay Ability System para habilidades, técnicas, costes, efectos y ejecución asíncrona.
- Gameplay Tags como taxonomía runtime común entre sistemas.
- Asset Manager + Primary Data Assets para contenido data-driven y carga controlada.
- Enhanced Input para acciones, contextos y remapeo.
- Common UI para navegación cross-platform y capas de interfaz.
- World Partition + Data Layers + HLOD para mundo grande, estados del mundo y streaming.
- PCG para biomas, poblamiento y utilidades procedurales dirigidas por arte.
- SaveGame con versionado/migraciones para huella, relaciones, quests y estado persistente.
- Behavior Trees / StateTree / AI Perception / EQS / Smart Objects según tipo de IA.
- Motion Matching / Pose Search donde aporte fidelidad a locomoción sin inflar lógica manual.
- MetaSounds para audio reactivo y viento/magia procedural cuando tenga sentido.
- Data Validation + Automation Framework + Functional Tests + Screenshot Comparison como gates.
- Unreal Insights + budgets CPU/GPU/memoria/streaming antes de promover builds.
- BuildGraph + UAT BuildCookRun para CI, cook, package, tests y artefactos.
- Localization Dashboard / FText / String Tables desde producción temprana.
- Crash Reporter + símbolos + logs para builds jugables.
- Scalability + Device Profiles para objetivos de hardware.
- One File Per Actor con World Partition para trabajo paralelo.

## Regla de automatización
Automatizar preparación, validación, export, naming, checks, builds y manifests. No automatizar la decisión artística final ni la promoción a CANON.

## Manifiestos
- ISL_UNREAL_HANDOFF_DRAFT.json: trabajo y experimentación.
- ISL_UNREAL_PRODUCTION_MANIFEST.json: sólo Production Lane + confirmación humana.

## Fuentes oficiales Epic consultadas
- https://dev.epicgames.com/documentation/unreal-engine/gameplay-ability-system-for-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/using-gameplay-tags-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/asset-management-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/enhanced-input-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/common-ui-plugin-for-advanced-user-interfaces-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/world-partition-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/world-partition---data-layers-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/procedural-content-generation-framework-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/saving-and-loading-your-game-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/behavior-trees-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/ai-perception-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/motion-matching-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/data-validation-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/automation-test-framework-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/introduction-to-performance-profiling-and-configuration-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/buildgraph-for-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/build-operations-cooking-packaging-deploying-and-running-projects-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/localization-tools-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/crash-reporting-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/scalability-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/one-file-per-actor-in-unreal-engine
- https://dev.epicgames.com/documentation/unreal-engine/lyra-sample-game-in-unreal-engine


## READINESS LAYER CURRENT
La preparación Unreal ya no depende sólo de este blueprint.
Contratos activos:
- docs/ISL_UNREAL_READINESS_MASTER_CURRENT.md
- docs/ISL_ENTITY_TO_UNREAL_MAPPING_CURRENT.json
- docs/ISL_UNREAL_ASSET_CONTRACT_CURRENT.md
- docs/ISL_UNREAL_IMPORT_MANIFEST_SCHEMA_CURRENT.json
- docs/ISL_UNREAL_TEST_AND_REGRESSION_BRIDGE_CURRENT.md
- docs/ISL_UNREAL_PLUGIN_AND_DEPENDENCY_ALLOWLIST_CURRENT.md

Regla:
crear con IDs/contratos compatibles ahora, migrar sólo cuando el gate humano/técnico lo autorice.

Versión de motor:
UNFROZEN.
La documentación oficial revisada actualmente está en UE 5.8, pero ISL fijará versión exacta sólo al abrir migración y tras auditoría de deprecaciones/plugins/plataformas.
