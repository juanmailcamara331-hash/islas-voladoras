# ISL · SPIELBERG Creative Gameverse External Research Bridge v0.1

## Boundary
SPIELBERG Creative Gameverse is a separate project. ISL may receive only abstract, transferable systemic discoveries produced during play or experimentation.

Never import directly: visual assets, characters, lore, world names, aesthetic identity, music, code, repositories, UI, accounts, branding, concrete narrative decisions, or project-specific visual references.

## Canonical route
DISCOVERY_EXTERNAL
→ ABSTRACTION
→ ISL_TRANSLATION
→ COMPATIBILITY_CHECK
→ ISOLATED_CHEAP_EXPERIMENT
→ PLAYTEST
→ COMPARISON
→ HUMAN_DECISION
→ POSSIBLE_ISL_INTEGRATION

No automation may skip HUMAN_DECISION.

## Intake label
Every imported item starts as:
- EXTERNAL_RESEARCH_CANDIDATE
- LAB_ONLY
- NOT_CANON
- NOT_PRODUCTION
- NOT_READY_UNREAL

## Source packet
Expected type: SPIELBERG_TO_ISL_CREATIVE_TRANSFER_PACKET

Required fields:
source, session_id, date, origin_world, origin_experiment, player_action,
initial_state, changed_entity, changed_variable, causal_chain,
emergent_mechanic, systemic_principle, dialectical_tension, gamefeel_effect,
level_design_effect, ai_system_effect, accessibility_implication,
possible_transfer_domains, unexpected_consequence, why_it_is_interesting,
confidence, maturity, provenance, contains_spielberg_specific_expression.

Hard reject when:
- source != SPIELBERG_CREATIVE_GAMEVERSE
- provenance != generated_during_play
- contains_spielberg_specific_expression != false
- package includes project-specific assets/code/lore/branding fields
- more than 5 seeds are bundled without curation

## ISL translation candidate
ISL creates only an abstract candidate:
- abstract_principle
- possible_isl_application
- affected_systems
- possible_new_mechanic
- possible_world_response
- possible_creature_response
- possible_navigation_effect
- possible_progression_effect
- compatibility_risks
- dependencies
- test_cost
- recommended_experiment
- status=LAB_ONLY

## Evaluation states
NUEVA
OBSERVAR
PROBAR EN LAB
ADAPTAR
DESCARTAR
PROMOVER A ISL

PROMOVER A ISL is not CANON. It means: eligible for the normal ISL decision path after evidence and explicit human approval.

## Ranking heuristic
Prioritize seeds that:
1. produce emergent behavior;
2. connect multiple systems;
3. increase agency;
4. improve gamefeel;
5. create new exploration forms;
6. create persistent consequences;
7. transfer across multiple contexts;
8. treat accessibility as creative possibility;
9. are technically plausible;
10. do not erode ISL identity.

## Automation levels
### Level 1 · Semi-automatic
A user-supplied packet is validated and shown in SPIELBERG LAB FEED. No persistence outside the ISL repository/feed without explicit action.

### Level 2 · Nearly automatic
A shared Drive folder may be polled by an authorized connector. New packets are ingested as LAB_ONLY candidates. User decides PROBAR / OBSERVAR / DESCARTAR.

### Level 3 · Automatic intake
An authenticated endpoint/webhook writes structured packets to external_research_feed. Intake is automatic; promotion never is.

## Reverse loop
ISL may return only abstract evidence:
- mechanic worked / failed
- confusion
- fun-generating combination
- accessibility opened a possibility
- causal relation worked / failed
- rule generated interesting consequences

Never return ISL lore, assets, aesthetics, identities, code, accounts, or concrete world expression.

## Human gate
This bridge does not change current R2 HUMAN gates. Danzante-Aguja and every existing External Lab candidate keep their own status and evidence requirements.
