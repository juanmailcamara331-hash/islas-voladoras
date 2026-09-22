# ISL · METHOD TRIGGER ENGINE · CURRENT
Fecha: 2026-09-22
Estado: ACTIVE · TRANSVERSAL · ISL ONLY

## OBJETIVO
Hacer que la metodología salte por evento y por importancia, sin depender de que el usuario la recuerde.

## PRINCIPIO
NO REMEMBER-DRIVEN.
EVENT-DRIVEN + WEIGHTED REVIEW.

## FUENTES OBSERVADAS
- GitHub: commits, CURRENT, cambios de build, assets, scripts, workflows.
- Google Drive: checkpoints, docs, assets, colaboración, provenance.
- Gmail: proveedores, respuestas, colaboración, press/outreach.
- Automations: heartbeats y condition watches.
- Web externo: sólo cuando reduce incertidumbre real.
- Calendar: sólo hitos humanos fechados.

## SCORE
Cada evento recibe un score de 0–100.

### P0 / 90–100
- conflicto de SOURCE_OF_TRUTH;
- pérdida/corrupción de datos;
- credencial/secreto expuesto;
- claim legal/IP;
- cambio irreversible;
- release con riesgo legal/seguridad;
- producción física sin proof/sample.

Acción:
notificar + bloquear la acción riesgosa + una corrección inmediata si es reversible.

### P1 / 65–89
- HUMAN gate bloqueando PRIMARY;
- proveedor responde con decisión necesaria;
- CURRENT/checkpoint stale tras cambio material;
- provenance/rights faltante en asset próximo a publicación;
- build/playtest state no reflejado;
- decisión creativa grande sin contraste/evidencia.

Acción:
una síntesis + una acción mínima de desbloqueo.

### P2 / 35–64
- asset sin registry;
- linkage incompleto;
- automatización redundante;
- SEO/marketing metadata pendiente;
- oportunidad clara de reutilización multicapa;
- docs dispersos pero no peligrosos.

Acción:
corregir silenciosamente si es pequeño y reversible; si requiere usuario, agrupar en próximo briefing.

### P3 / 0–34
- idea bonita;
- mejora cosmética;
- posible regalo;
- optimización no urgente.

Acción:
no interrumpir. Alimentar Buenos días/Buenas noches/making-of si merece la pena.

## PESOS
Riesgo irreversible x 1.5
Bloqueo de PRIMARY x 1.4
Legal/security x 1.4
Human gate x 1.3
Rights/provenance x 1.25
Build/runtime x 1.2
Valor reutilizable x 1.1
Recencia x 0.8
Estética pura x 0.5

## TRIGGERS
- NEW_ASSET
- HUMAN_TRACE
- BUILD_CHANGE
- PLAYTEST_RESULT
- SUPPLIER_REPLY
- SOURCE_OF_TRUTH_CHANGE
- CHECKPOINT_CHANGE
- COLLABORATOR_ENTRY
- EXTERNAL_LICENSED_ASSET
- PUBLICATION_CANDIDATE
- MARKETING_ASSET
- RELEASE_CANDIDATE
- LEGAL_CLAIM
- SECURITY_EVENT
- AUTOMATION_DRIFT

## METODOLOGÍA INVOCADA SEGÚN EVENTO
NEW_ASSET:
Quality + Randomizer + Rights/Provenance + Event Reflex

PLAYTEST_RESULT:
PC-30 + Human Evidence + Regression

SUPPLIER_REPLY:
Physical + Legal/IP + Cost/Proof Gate

PUBLICATION_CANDIDATE:
Legal/IP + SEO/metadata + Provenance + Human Gate

SOURCE_OF_TRUTH_CHANGE:
Context Hygiene + Anti-Dup + Commit Hook + Checkpoint

MARKETING_ASSET:
Quality + Brand + SEO + Rights + Distribution

## HEARTBEAT
El Inconsciente ISL ejecuta revisión horaria.
No debe notificar por existir trabajo.
Sólo cuando:
- score >=65; o
- existe correo proveedor relevante; o
- existe P0; o
- una corrección P2 pequeña se puede cerrar sin molestar.

## ANTI-NOISE
Máximo una notificación accionable por ciclo.
P2/P3 se agrupan.
No crear recordatorios nuevos si un hook existente puede absorberlo.

## EXTERNAL TRICKS
Preferir:
- GitHub CI gates en cambios reales;
- webhook cuando el proveedor lo permita;
- Gmail event/reply trigger cuando disponible;
- Drive/GitHub version history como evidence;
- Search Console/Steam traffic como datos de marketing;
- Calendar sólo para hitos humanos.

No añadir Slack/Discord/servicios por coleccionismo de conectores.

## STOP RULE
Si el trigger engine genera más trabajo que el que ahorra, simplificar.
