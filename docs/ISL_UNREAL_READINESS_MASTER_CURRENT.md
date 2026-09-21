# ISL · UNREAL READINESS MASTER CURRENT
Fecha: 2026-09-21
Estado: ACTIVE PREPARATION · NO UNREAL PRODUCTION · ISL ONLY

## PROPÓSITO
Preparar ISLAS VOLADORAS para una futura entrada en Unreal sin abrir producción Unreal antes de tiempo.
Este documento consolida la preparación técnica que antes estaba distribuida entre UNREAL_PRODUCTION_BLUEPRINT_CURRENT, ISL_UNREAL_ENGINEERING_SOURCE_MAP_v0.62, BUILD SCIENCE, TOOLCHAIN y plantillas.

## PRIMARY GUARD
- PRIMARY actual sigue siendo Velaria V2 P0.
- HUMAN_DEVICE_GREEN sigue siendo gate pendiente.
- Esta preparación es infraestructura silenciosa.
- No autoriza crear proyecto Unreal serio, migrar contenido masivo ni cambiar el roadmap.
- READY_UNREAL != CANON y != PRODUCCIÓN.

## PRINCIPIO
CREATE ONCE → DESCRIBE ONCE → TRANSLATE LATER.
Todo ente importante de ISL debe poder traducirse a Unreal sin depender de recordar conversaciones antiguas.

## PASAPORTE UNREAL MÍNIMO POR ENTE
Cada criatura, reliquia, isla, región, escena, interacción, UI, audio o asset relevante debe poder declarar:
- isl_id
- entity_type
- title
- canon_state
- source_authority
- gameplay_function
- dependencies
- synergies
- conflicts
- persistent_state
- platform_scope
- master_asset_refs
- runtime_asset_refs
- unreal_target
- gameplay_tags
- performance_class
- provenance
- tests
- rollback
- version

No es obligatorio rellenarlo todo durante exploración creativa. Se completa progresivamente al acercarse a READY_UNREAL.

## TRADUCCIÓN BASE
- datos de contenido → Data Assets / Primary Data Assets cuando proceda;
- identidad runtime y relaciones → Gameplay Tags + IDs estables;
- habilidades/costes/efectos → GAS sólo si el prototipo demuestra beneficio;
- input → Enhanced Input;
- regiones/islas grandes → World Partition;
- estados del mundo → Data Layers cuando encaje;
- paisaje distante → HLOD cuando aporte;
- poblamiento procedural → PCG sólo bajo dirección artística y evidencia;
- persistencia → SaveGame/versionado/migraciones;
- UI cross-device → UMG/CommonUI cuando se justifique;
- automatización → Data Validation + Automation + Functional + Screenshot + Gauntlet;
- profiling → Unreal Insights / Memory / GPU profiling;
- build → UAT/BuildGraph cuando producción real lo requiera.

## MASTER != RUNTIME
MASTER:
máxima calidad, editable, preserva fuente/procedencia.

RUNTIME:
optimizado para plataforma y contexto, con escala/pivot/colisión/materiales/LOD o Nanite cuando proceda, memoria estimada y test.

Nunca sustituir MASTER por RUNTIME.
Nunca promover un candidato visual IA directamente a runtime sin QA, procedencia y adaptación.

## REGLA C++ / BLUEPRINT / DATA
- DATA: configuración y contenido declarativo.
- C++/COMPONENTS: lógica reusable, crítica, testable o de coste/rendimiento relevante.
- BLUEPRINTS: ensamblaje, iteración, prototipo, secuencias e interacción legible.
- Evitar Blueprints-monstruo y singletons opacos.
- No convertir todo a C++ por dogma.

## WORLD READINESS
Pensar mundo ISL como:
WORLD → REGION → ISLAND → DISTRICT → CELL/STREAMING UNIT → ENCOUNTER/POI.
Separar siempre:
WORLD RULES != VISUAL DENSITY.
Esto protege SAME WORLD / SAME RULES / DIFFERENT CEILINGS.

## AUTOMATION LADDER
Mapeo ISL T0–T8:
T0 static/config/source guards
T1 low-level/unit/property
T2 feature
T3 smoke/boot
T4 integration/functional
T5 content/performance stress
T6 screenshot/visual regression
T7 packaged/device/Gauntlet
T8 human/CQC

## ENTRY GATE A UNREAL SERIO
No abrir producción Unreal hasta:
1. vertical slice estable;
2. tesis jugable superviviente a playtest;
3. HUMAN_DEVICE_GREEN correspondiente;
4. modelo de mundo/save documentado;
5. entidades críticas con ISL_ID;
6. asset contract vigente;
7. versión exacta de UE congelada y source map revalidado;
8. build skeleton reproducible;
9. BootTest packaged;
10. asset validation;
11. save migration test;
12. screenshot baseline;
13. rollback verificable;
14. presupuesto inicial por dispositivo;
15. GO humano.

## ENGINE VERSION RULE
La documentación oficial consultada en 2026-09-21 muestra UE 5.8.
Eso NO fija UE 5.8 para ISL.
Al abrir migración:
SOURCE MAP → ENGINE VERSION FREEZE → DEPRECATION AUDIT → PILOT → DECISION.

## PLUGIN RULE
Todo plugin entra como:
NEED → OFFICIAL/MATURE SOURCE → VERSION → PERMISSIONS → BUILD IMPACT → PLATFORM SUPPORT → TEST → ROLLBACK → ADOPT/PILOT/WATCH/REJECT.
No plugins “porque molan”.

## LAZY CREATIVE INTEGRATION
La preparación debe reducir trabajo futuro, no añadir burocracia.
Automatizar:
- IDs;
- manifests;
- naming checks;
- import validation;
- metadata;
- test selection;
- build logs;
- regression guards.
No automatizar:
- canon;
- gusto;
- consentimiento;
- irreversible production choices.

## CURRENT ACTION
Desde ahora, cuando se cierre una entidad importante, adjuntar su pasaporte Unreal mínimo sólo si aporta valor y sin retrasar PRIMARY.
La tanda física actual continúa separada.
Después: volver a Velaria HUMAN_DEVICE_GREEN.

## DOCUMENTOS RELACIONADOS
- docs/UNREAL_PRODUCTION_BLUEPRINT_CURRENT.md
- docs/ISL_UNREAL_ENGINEERING_SOURCE_MAP_v0.62.md
- docs/ISL_ENTITY_TO_UNREAL_MAPPING_CURRENT.json
- docs/ISL_UNREAL_ASSET_CONTRACT_CURRENT.md
- docs/ISL_UNREAL_IMPORT_MANIFEST_SCHEMA_CURRENT.json
- docs/ISL_UNREAL_TEST_AND_REGRESSION_BRIDGE_CURRENT.md
- docs/ISL_UNREAL_PLUGIN_AND_DEPENDENCY_ALLOWLIST_CURRENT.md
