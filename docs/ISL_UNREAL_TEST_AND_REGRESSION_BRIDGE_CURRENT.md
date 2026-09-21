# ISL · UNREAL TEST & REGRESSION BRIDGE CURRENT
Fecha: 2026-09-21
Estado: ACTIVE PREPARATION

## OBJETIVO
Traducir ISL_BUILD_SCIENCE T0–T8 al futuro pipeline Unreal sin inventar una segunda metodología.

## MAPEO
T0 STATIC
- config/source guards
- naming/manifest/schema
- forbidden secrets
- dependency allowlist

T1 UNIT / PROPERTY
- C++ low-level tests cuando proceda
- save serializers
- deterministic helpers
- data transforms

T2 FEATURE
- Automation feature tests
- subsystem tests
- input mapping checks
- gameplay-tag/data-asset validity

T3 SMOKE
- editor boot
- packaged BootTest
- core map loads
- no fatal asset errors

T4 INTEGRATION
- Functional Tests
- interaction chains
- save/load roundtrip
- world-state transitions
- UI/input integration

T5 STRESS / PERF
- load maps/content
- compile/load Blueprints
- streaming stress
- CPU/GPU/memory/IO budgets

T6 VISUAL
- Screenshot Comparison
- key UI states
- lighting/world anchors
- regression baselines by tier where useful

T7 DEVICE / PACKAGED
- Gauntlet
- packaged PC
- packaged Android
- later console hardware only when partner/SDK gates exist
- install/boot/resume/save
- crash/log collection

T8 HUMAN / CQC
- comprehension
- feel
- comfort
- delight
- causal readability
- accessibility
- no automated PASS substitutes human gate

## TEST GROUPS FUTUROS
ISL.Smoke
ISL.Save
ISL.Input
ISL.World
ISL.UI
ISL.Assets
ISL.Performance
ISL.Device
ISL.GoldenPath

## FIRST UNREAL SCAFFOLD
Before feature migration:
1. project boots;
2. one empty map;
3. one PrimaryDataAsset;
4. one stable ISL_ID;
5. one Automation test;
6. one packaged BootTest;
7. one SaveGame version roundtrip;
8. one screenshot baseline;
9. one device run;
10. CI artifact archived.

## REGRESSION RULE
Known bug recurrence raises severity.
A failed guard is a process regression, not just a code bug.
Do not delete or mute a failing test without a Decision Record.

## GAUNTLET
Use for session/build/device orchestration and packaged smoke.
Do not use it as an excuse to automate taste.

## STOP RULE
Do not build a huge test farm before the first Unreal skeleton.
The bridge defines what must exist; implementation scales with evidence and milestone.
