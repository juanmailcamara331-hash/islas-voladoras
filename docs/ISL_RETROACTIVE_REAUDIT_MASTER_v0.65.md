# ISL — RETROACTIVE RE-AUDIT MASTER v0.65
Fecha: 2026-09-18
Estado: ACTIVO · obligatorio antes de ampliar sistemas mayores

## Objetivo
Revisar TODO lo ya construido con ISL_BUILD_SCIENCE, no sólo cambios futuros.

## Regla
Cada bloque existente recibe:
- entidad/es;
- dependencias;
- bugs conocidos;
- severidad;
- regresiones;
- tests T0–T8;
- backup/rollback;
- estado de evidencia humana;
- deuda técnica;
- decisión: KEEP / FIX / REFACTOR / HOLD / RETIRE.

## Lotes de re-auditoría

### R1 · ARRANQUE / SHELL / DEPLOY
Incluye:
- GitHub Pages
- Android wrapper
- service worker
- cache/versionado
- bienvenida
- Centro de Mandos
- navegación
- viewport
- deploy coherence
Bugs asociados:
ERR-ANDROID-001
ERR-ANDROID-002
ERR-UI-004
Gate:
3 cold starts + Pages green + APK green + expected page build.

### R2 · UI / NAVEGACIÓN / CLARIDAD
Incluye:
- v0.63 navegación única
- drawer Más
- jerarquía móvil
- botones/touch
- overlays
- accessibility
Gate:
mobile portrait + no wrap + all primary routes + human clarity check.

### R3 · ENCUESTAS / EVIDENCIA
Incluye:
- Molino
- Pilares
- Referencias
- cohort tagging
- backend persistence
- anti-spam
- backup backend
- synthesis flow
Gate:
visual ISL frontend + verified storage + submission retrieval + cohort metadata.

### R4 · BRÚJULA / HUELLAS
Incluye:
- v1 legacy compatibility
- v2 events
- modes
- anti-farming
- persistence
- significance
- omission trace
Gate:
property tests + reopen session + no invented intent + migration safety.

### R5 · RELIQUIAS
Incluye:
- Metrónomo
- Sello
- Media Máscara
Gate:
each effect writes intended trace only; no hidden morality score; no free cost bypass.

### R6 · SALÓN CORTINAS ROJAS
Gate:
CAB grammar complete;
1 main consequence + <=2 echoes;
omission meaningful;
relic integrations coherent;
persistent state reopens correctly.

### R7 · ISLA BAILE INAGOTABLE
Gate:
pulse/rest/burden persist;
secret unlock logic correct;
no moral binary;
Jardín Silencioso reproducible.

### R8 · RPG COMMAND CENTER / INVENTORY
Incluye:
- profile
- inventory
- map
- loot
- route
- music
- companion
Gate:
navigation, persistence, item affordances, mobile clarity, no dead controls.

### R9 · PUBLIC DECISION ENGINE / POLLS
Gate:
poll != canon;
cohort separation;
results traceable;
human confirmation required.

### R10 · BUILD / CI / SECURITY
Incluye:
- Pages workflow
- Android workflow
- Netlify airlock
- security gate
- platform capability gate
Gate:
no silent downgrade;
self-identifying failures;
rollback path;
logs retained.

### R11 · CREATIVE SYSTEMS / REFERENCES
Incluye:
- reference matrix
- color lane
- anti-collage
- CAB
- dialectical method
Gate:
reference has function;
weight/risk/source;
no literal copying;
no roadmap drift from cameo.

### R12 · FUTURE UNREAL MIGRATION
Incluye:
- source governance
- current UE version check
- architecture map
- tests mapping
- migration gate
Gate:
no migration until vertical slice + save/world model + automation scaffold + rollback.

## BACKUP POLICY

### A. CODE BACKUP
Primary:
- Git history / commits / tagged checkpoints.
Before high-blast-radius change:
- record known-good commit SHA.
Rollback:
- revert commit or restore file from known-good SHA.

### B. PLAYER STATE / SAVE BACKUP
Before schema-changing work:
- schema_version;
- migration function;
- export/backup current state where feasible;
- never clear localStorage/save as a cache fix;
- destructive migrations require explicit rollback.

### C. DESIGN / CANON BACKUP
Primary:
- Drive MASTER checkpoint
- CURRENT_WORK_POINTER
- docs source-of-truth
Rule:
no CANON/APPROVED removal without preserving previous decision context.

### D. DEPLOY BACKUP
Record:
- Pages build SHA;
- APK build SHA/run;
- Netlify deploy ID/commit;
- public URL;
- artifact digest where available.

### E. ASSET BACKUP
Record:
- filename
- provenance
- state CANON/PROVISIONAL/EXPERIMENT
- source/master relation
- no destructive overwrite without retained prior version.

## RE-AUDIT ORDER
1 R1 shell/deploy
2 R2 UI/navigation
3 R3 surveys/evidence
4 R4–R7 gameplay persistence blocks
5 R8 RPG command center
6 R9 decision engine
7 R10 CI/security
8 R11 creative system
9 R12 Unreal migration readiness

## Exit criterion
No major new system expansion until R1–R3 are GREEN.
R4–R11 may be audited in parallel with normal production if they do not block current human validation.

## Principle
Scientific rigor protects creative brutality.
The purpose of backup/testing is to preserve freedom to experiment without losing known-good states.
