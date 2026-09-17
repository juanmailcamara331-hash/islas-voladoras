# ISL · MASTER TEMPLATES & METHODS

Fecha: 2026-09-18

## 1. FEATURE BRIEF
- ID / dominio
- problema que resuelve
- promesa al jugador
- hipótesis falsable
- variantes
- dependencias
- sinergias
- conflictos
- targets Unreal
- contrato de datos
- criterios de aceptación
- presupuesto CPU/GPU/memoria/contenido
- impacto en SaveGame
- tests requeridos
- estado del pipeline

## 2. DECISION RECORD
- decisión
- alternativas consideradas
- evidencia: CQC / encuesta / playtest / telemetría / experto
- cohortes consultadas
- riesgos
- razón de la elección humana
- qué queda pendiente
- rollback/fallback
- fecha / versión / owner

## 3. BUG / REGRESSION
- severidad S0–S4
- build / plataforma
- pasos de reproducción
- esperado / observado
- frecuencia
- logs / captura / save
- sistema afectado
- regresión: sí/no + última build buena
- hipótesis
- fix
- tests añadidos
- verificación
- impacto colateral

## 4. TEST SPEC
- sistema
- precondiciones
- input
- resultado esperado
- casos normales
- límites
- fallo tolerable / bloqueante
- automatizable sí/no
- suite: unit / feature / smoke / functional / stress / screenshot / Gauntlet
- plataformas

## 5. RISK REGISTER
- riesgo
- probabilidad
- impacto
- exposición
- trigger
- owner
- mitigación
- fallback
- fecha de revisión

## 6. PLAYTEST
- build
- cohorte
- objetivo
- preguntas que NO se explican antes
- tareas
- observaciones
- telemetría
- fricciones
- momentos de placer
- comprensión
- abandono
- bugs
- preguntas posteriores
- decisión resultante

## 7. MILESTONE GATE
- alcance bloqueado
- features completas
- contenido
- bugs por severidad
- rendimiento
- saves/migraciones
- localización
- accesibilidad
- store promises
- build reproducible
- rollback
- GO / NO-GO humano

## 8. STORE / CAMPAIGN ASSET
- plataforma / canal
- tipo: capsule / screenshot / trailer / GIF / key art / copy
- build fuente
- feature real mostrada
- idioma
- safe areas / formatos
- claim verificable
- estado: DRAFT → REVIEW → APPROVED → STORE_READY → ARCHIVED
- expiración / reemplazo

## 9. KICKSTARTER CAMPAIGN
- promesa central
- prueba jugable existente
- objetivo financiero
- presupuesto y contingencia
- tiers / rewards
- coste real por reward
- fulfillment
- timeline
- stretch goals con coste
- riesgos y transparencia
- frecuencia de updates
- assets de campaña

## 10. RELEASE CANDIDATE
- commit / build ID
- changelist
- install/update/uninstall
- smoke
- golden path
- blockers 0
- save migration
- controller/input
- resolutions / device profiles
- localization
- performance budgets
- crash-free soak
- store build parity
- known issues
- rollback build
- GO/NO-GO

## 11. HOTFIX
- incidente
- impacto
- workaround
- cambio mínimo
- tests
- riesgo
- plataforma
- rollout
- rollback
- comunicación pública
- postmortem link

## 12. POSTMORTEM
- objetivos
- qué salió bien
- qué salió mal
- qué sorprendió
- métricas
- causas raíz
- decisiones acertadas/erróneas
- automatizaciones nuevas
- reglas que pasan a CANON de producción
- REJECTED-LEARNED
- siguiente iteración

## Métodos reconocidos integrados
- Risk-first prototyping
- Vertical Slice
- Stage-Gate / milestone gates
- Continuous Integration
- Automated regression / smoke tests
- Golden Path
- Severity-based bug triage
- Performance budgets
- Cohort playtesting
- Data-driven design
- Release Candidate + rollback
- Postmortem / lessons learned

## Fuentes oficiales relevantes
Epic:
- Automation Test Framework
- Gauntlet
- BuildGraph
- Data Validation
- Unreal Insights
- Asset Manager / Primary Data Assets
- Gameplay Tags / Gameplay Ability System
- World Partition / Data Layers / HLOD
- Localization / Crash Reporting / Scalability / OFPA

Steamworks:
- Store Presence
- Release Process / Review Process
- Steam Playtest

Kickstarter:
- Creator Handbook
- Rewards
- Fulfillment

Regla ISL: las herramientas aportan evidencia y reducen trabajo repetitivo; la decisión creativa final y la promoción a CANON permanecen humanas.
