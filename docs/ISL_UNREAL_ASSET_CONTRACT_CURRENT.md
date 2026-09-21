# ISL · UNREAL ASSET CONTRACT CURRENT
Fecha: 2026-09-21
Estado: ACTIVE PREPARATION · NO MASS IMPORT

## OBJETIVO
Que cada asset aprobado llegue a Unreal con menos ambigüedad y sin perder master, procedencia ni intención.

## CONTRATO MÍNIMO
asset_id / isl_id
entity_type
source_type
canon_state
master_uri
runtime_candidate_uri
version
author/provenance
license_or_rights
dimensions_or_scale
units
axis_orientation
pivot
collision_policy
material_slots
texture_sets
alpha_policy
lod_policy
nanite_candidate
skeleton_or_rig
animation_set
audio_specs si aplica
platform_tier
memory_budget_class
streaming_class
dependencies
validation_tests
rollback_source

## 3D
MASTER conserva geometría/calidad máxima razonable.
RUNTIME define:
- centímetros Unreal;
- orientación acordada;
- pivot funcional;
- colisión simple/complex explícita;
- materiales nombrados;
- UV/lightmap cuando aplique;
- LOD/Nanite decidido por evidencia;
- sockets sólo con función;
- bounds revisados;
- asset validation PASS.

## TEXTURAS
Separar función:
BASECOLOR / NORMAL / ORM o esquema acordado / EMISSIVE / MASKS.
No hornear información destructivamente si después se necesita por separado.
Resolver compresión/sRGB por función, no por costumbre.

## 2D/UI
Mantener:
- source editable;
- safe areas;
- densidad objetivo;
- alpha real cuando aplique;
- variantes por ratio sólo si son necesarias;
- accesibilidad/contraste.

## AUDIO
MASTER sin pérdida cuando exista.
RUNTIME derivado según plataforma.
Registrar loop points, loudness target, función, licencia/provenance y test.

## NAMING
No congelar una convención gigantesca todavía.
Base recomendada:
<Prefix>_<ISLID>_<Descriptor>_<Variant>
Ejemplos:
SM_ISL_BIO001_Bee_Master
T_ISL_BIO001_Bee_BaseColor
DA_ISL_REL001_AnchorReturn
W_ISL_REG001_Velaria

El ISL_ID manda sobre nombres estéticos cambiantes.

## IMPORT PRE-FLIGHT
SOURCE → RIGHTS → MASTER HASH → MANIFEST → IMPORT CANDIDATE → DATA VALIDATION → VISUAL/PHYSICAL QA → PERF CHECK → ACCEPT/PARK.

## PROHIBIDO
- importar assets sin procedencia;
- perder MASTER al optimizar;
- colisión automática aceptada sin revisión;
- usar Nanite/LOD/PCG por moda;
- referencias duras masivas por comodidad;
- duplicar texturas/materiales sin dedupe;
- nombres sin ID estable en contenido crítico.

## PHYSICAL LANE
Los actuales assets físicos de Ancla/Pasaporte/Credencial/Gracias Máquina Rara son presentation/physical assets.
No se convierten automáticamente en gameplay assets Unreal.
Sólo sus símbolos/arte podrán reutilizarse si más adelante existe una entidad runtime aprobada.
