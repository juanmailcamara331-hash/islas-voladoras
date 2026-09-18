# ISL — RE-AUDIT GLOBAL v0.45
Fecha: 2026-09-18
Ámbito: todo lo consolidado hasta checkpoint v0.45
Métodos aplicados:
- metodología ISL existente;
- música apertura→crescendo;
- CAB-10..50 cabaret/entropía/eco histórico;
- P-00..P-100 crossplay/device ceilings;
- CQC / seguridad / backup / humano.

## VEREDICTO GENERAL
PASS CON BLOQUEOS EXPLÍCITOS.
No se requiere reset de Fase A/B. La nueva metodología modifica cómo se diseña y escala Fase C y la futura capa jugable/online.

## A/B — BRAND / CENTRO / PS4 / ANDROID
PASS.
- Icono y shell final siguen congelados.
- Sensualidad/cabaret NO justifica rebranding.
- Device scaling futuro: UI debe mantener legibilidad, focus y navegación.
- PS4 actual sigue siendo experiencia web/companion; no confundir con build nativa consola.

NEXT:
- revisar tamaños UI/TV-distance al entrar en builds consola reales;
- mantener reduced motion y text scale.

## MÚSICA
PASS / EXPAND.
- Mantener suavidad→apertura→aventura→riesgo→crescendo.
- Añadir capa cabaret sólo donde tenga función narrativa/social.
- No convertir soundtrack entero en music-hall.
- Trance/danza puede romper métrica como evento sistémico.

NEXT:
- etiquetar cues con intensity_state + region + cabaret_entropy_weight + gameplay_sync_role.

## BRÚJULA DE LAS HUELLAS
PASS / UPGRADE.
Invariantes:
- mismas huellas y consecuencias en todas las plataformas.
Scalable:
- partículas, reflections, shader detail, animation richness.
CAB:
- puede leer huellas de deseo/máscara/ritmo social sin inventar moral score.

NEXT:
- introducir primera huella performativa/histórica;
- conservar fallback low-spec con lectura clara.

## RELIQUIAS
PASS CON NUEVO ESQUEMA.
Cada reliquia debe declarar:
- gameplay_function;
- memory/history;
- dialectical_tension;
- cabaret_entropy_weight 0..3;
- scalable_visual_features;
- invariant_gameplay_features;
- save_version.

## ESCENAS
PASS CON NUEVO GATE.
Toda escena candidata debe separar:
- ANCLA: foco inercial/legible;
- CAMPO: entropía/contexto;
- ZONA NULA: respiración;
- TRIGGER: gesto/evento;
- PHASE CHANGE: cambio A/V o sistémico;
- CONSEQUENCE: huella persistente.
Crowd/VFX pueden escalar; blocking, pistas, decisiones y consecuencias no.

## ISLAS
PASS / DESIGN RULE.
Cada isla declara capability envelope:
- essential geometry/navigation;
- scalable foliage/crowd/weather/VFX;
- required audio cues;
- secrets invariant;
- historical/reference provenance;
- CAB presence optional, nunca obligatoria.

## CRIATURAS
PASS / FAIRNESS LOCK.
AI, telegraphs, hitboxes y timings de combate son invariantes.
Escala: fur, cloth, particles, secondary bones, shadows, reflections.
No ocultar señales por preset gráfico.

## DIALÉCTICA DEL MUNDO
PASS / EXPAND.
Añadir contradicciones:
- deseo/disciplina;
- espectáculo/verdad;
- intimidad/multitud;
- cuidado/explotación;
- orden/contagio.
Sin moral score binario.
Consecuencias idénticas por plataforma.

## CROSSPLAY
HOLD — ARQUITECTURA PREPARADA, NO IMPLEMENTADA.
- EOS/platform adapters: candidato.
- PS5/PS5 Pro: blocked partner/SDK/hardware/cert.
- Xbox Series X|S: blocked SDK/hardware/cert.
- PC/mobile online: no activar sólo para “probar” si aún no hay loop que lo necesite.
- Single-player core permanece prioritario.

## CROSS-PROGRESSION
HOLD.
Antes de backend:
1. schema version;
2. deterministic merge policy;
3. conflict UI;
4. rollback;
5. account unlinking;
6. privacy/erasure path.

## FAIRNESS
PASS COMO PRINCIPIO / HOLD COMO IMPLEMENTACIÓN.
- no ventaja por hardware;
- input-based assistance may differ if evidence supports it;
- network compensation must be mechanic-sensitive;
- test p50/p95/p99 latency + jitter + loss;
- no matchmaking skill inference from device.

## DEVICE CAPABILITY
PASS.
Series S / low mobile define stress cases.
PS5 Pro / high PC define enhancement ceiling.
No diseñar desde Ultra y amputar después: diseñar invariant core + optional layers desde inicio.

## ACCESSIBILITY
EXPAND.
Xbox Accessibility Guidelines adopted as public baseline:
- readable/scalable text;
- remappable/flexible input;
- predictable focus;
- motion controls/reduced motion;
- captions/subtitles;
- difficulty/assist options;
- public feature documentation.

## AUTOMATION
PASS.
Current automated assets:
- platform capability JSON;
- CI Platform Capability Gate;
- existing Security Baseline;
- CodeQL;
- existing Web/Android builds.

FUTURE PRIVATE JOBS WHEN SDK AVAILABLE:
- PS5 package/smoke/perf/cert lane;
- Xbox package/XR/smoke/perf lane;
- hardware capture matrix;
- crossplay session matrix;
- save migration/cross-progression tests.

## HISTORY / SOURCES
PASS WITH PROVENANCE RULE.
Reference intake hierarchy:
1. primary archive/museum;
2. peer-reviewed/history scholarship;
3. reputable historical journalism;
4. secondary explainers;
5. creative abstraction.
Archive.org items must be catalogued with date/source and never treated as proof solely because they are archived.

## ROADMAP
NOW:
- continue Phase C under new schemas;
- build first CAB/entropy micro-content inside existing shell;
- no console implementation claim.

LATER:
- platform partner applications when vertical slice has evidence;
- native builds only after core is worth porting;
- crossplay only when multiplayer feature earns its complexity.

## FINAL LOCK
The project now treats power, platform, network, sensuality, history, entropic A/V, music and accessibility as variables inside one methodology rather than separate decoration tracks.
