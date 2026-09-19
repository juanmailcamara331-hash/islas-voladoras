# ISL Knowledge Graph & Recursive Audit CURRENT

Operational knowledge compression layer.

Node types: ENTITY, REQUIREMENT, REFERENCE, CONNECTOR, ASSET/PRECURSOR, PROTOTYPE, BUG, DECISION, TEST, HUMAN_EVIDENCE, DOCUMENT, COMMIT/BUILD/DEPLOY, HYPOTHESIS, CONTRADICTION, RISK, PLATFORM.

Edge types: DERIVES_FROM, DEPENDS_ON, CONTRADICTS, VALIDATES, VERIFIES, BLOCKS, REPLACES, DEGRADES_TO, EXPORTS_TO, IMPORTS_FROM, USES, OBSERVED_IN, CAUSED_BY, RESOLVED_BY, GENERALIZES_TO, EVIDENCED_BY, DECIDED_BY, COMPATIBLE_WITH, INCOMPATIBLE_WITH, FALLBACK_TO, AFFECTS.

Core dashboard metrics:
- provenance / destination-contract / accessibility / crossplay / evidence / regression / rollback coverage
- R0–R5 readiness distribution
- blocked-by-precursor ratio
- connector fragility
- bug recurrence
- orphan nodes
- graph centrality / bottlenecks
- contradiction density
- unverified-edge ratio
- evidence-before-decision ratio
- rework / export-failure / validation-failure rates

Rule: graph is a causal index, not a replacement for source documents. Every important edge must resolve to evidence.
