# ISL PUM · Encounter Redefinition Mechanic v0.1

Status: LAB ONLY · SEALED-CONTENT COMPATIBLE · HUMAN-GATED

## Goal
Turn:
"¿Qué puede hacer esto ahora que ha conocido a aquello?"
into a playable system without exposing sealed content.

## Runtime model

Each eligible entity may expose:
- current_function
- latent_tags
- history_flags
- relation_memory
- compatibility_ports

When two entities meet in a valid context:

A
+
B
+
CONTEXT
+
PLAYER_ACTION
+
HISTORY
=
RELATION_CANDIDATE

The game must not immediately explain every candidate.

Possible states:
DORMANT
TESTABLE
ACTIVE
PARKED
RETURNED
REDEFINED

## Player-facing rule
The player experiences:
ENCOUNTER
-> tries something
-> receives consequence
-> may understand much later.

No explicit "creativity score".

## Serendipity
Candidate generation uses bounded authored tables and deterministic seeds.

Avoid:
- random soup
- arbitrary mutation
- instant reward for every combination

Prefer:
- delayed consequence
- remanence
- reversible branches
- later recontextualization

## Gesture / touch
A redefinition can optionally accept:
- line
- circle
- direction
- speed band
- repetition count
- region touched
- ordering

Do not require precise handwriting recognition.

## Voice
Optional acoustic token may contribute:
- energy band
- duration
- rhythm class
- pitch-band change
- silence pattern

No emotion diagnosis.

## Save
Persist:
relation_id
entity_a
entity_b
context_id
input_summary
state
first_seen
last_touched
consequence_flags
redefinition_version

## Unreal
Export approved relations as neutral records.
Do not export NDS implementation details.

## Quality gate
The mechanic passes only if:
1. understandable through play;
2. produces at least one memorable delayed consequence;
3. does not require tutorial text dump;
4. is reversible;
5. save/reload preserves relation state;
6. can be represented in Unreal as data + state machine.
