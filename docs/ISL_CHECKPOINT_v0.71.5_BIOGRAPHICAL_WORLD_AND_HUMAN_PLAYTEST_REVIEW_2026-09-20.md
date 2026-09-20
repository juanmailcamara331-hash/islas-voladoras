# ISL_CHECKPOINT_v0.71.5_BIOGRAPHICAL_WORLD_AND_HUMAN_PLAYTEST_REVIEW_2026-09-20

## Scope
Two lines closed together:
1. Biographical World Kernel.
2. Human review layer for first Playtest cohort.

## Biographical World Kernel
Added:
- docs/ISL_BIOGRAPHICAL_WORLD_KERNEL_v0.1.md
- Google Doc ISL_BIOGRAPHICAL_WORLD_KERNEL_v0.1

Core pipeline:
REAL LIFE → EMOTIONAL CORE → ABSTRACTION → ISL TRANSLATION CANDIDATE → LAB_ONLY → PLAYTEST → HUMAN DECISION

Initial seeds include:
- ceramic bee / memorial for uncle
- missed ping-pong tournament
- old ping-pong friendships
- current freestyle friendships
- transformed private bodily anecdote
- father memorial seed
- friend memorial seed
- cousin memorial seed
- siblings relationship seed

No seed is CANON automatically.

## Privacy / dignity rules
- living person != consent to identifiable representation
- friendship/family relation != permission to expose private anecdotes
- memorial != automatic use of real name, image or voice
- intimate anecdote defaults to stronger fictional distance
- truth of feeling is more important than literal biography
- ISL must remain understandable to players who do not know the creator

## First Cohort Protocol
Added:
- docs/ISL_PLAYTEST_FIRST_COHORT_PROTOCOL_v0.1.md
- Google Doc ISL_PLAYTEST_FIRST_COHORT_PROTOCOL_v0.1

Target:
3–8 testers.

Flow:
PLAY → FEEDBACK → AGGREGATE EVIDENCE → HUMAN REVIEW

Human decisions:
KEEP
ADAPT
DISCARD
NEW_EXPERIMENT

## Human Review UI
Added:
portal/playtest-review.html

Purpose:
- read aggregate evidence from public safe endpoint
- show sessions, accuracy, reaction time and bugs
- expose cue/confusion/bug findings
- allow explicit human classification
- store review locally
- export/copy JSON package for Creation Process Ledger

Contract:
HUMAN_REVIEW_ONLY
NOT_CANON
NO_AUTO_PROMOTION

## Navigation / Regression
Internal global shell now links:
- Playtest Lab
- Playtest Evidence aggregate
- Playtest Review human decision surface

navigation-link-gate.py requires the human review surface and the four explicit decision states.

## Existing state preserved
R2 HUMAN OPEN.
Danzante-Aguja CANDIDATE / R1 / BLOCKED.
SPIELBERG boundary unchanged.
Netlify public Playtest v0.2 remains separate from internal Command Center.

## What is genuinely pending
Cannot fabricate human evidence.
Next external action:
share /playtest with 3–8 real people.

After 3–8 sessions:
1. open Playtest Review;
2. classify findings;
3. export review JSON;
4. add accepted lesson to Creation Process Ledger;
5. choose ONE next experiment: Ruta/Nav OR Gamefeel Tuner.

## Biographical next action
Do not ingest a giant autobiography all at once.
Add memories in small packets and transform them before review.

Recommended first real biographical experiment:
BIO-001 · Abeja de Barro.
Compare literal / fictionalized / symbolic versions without telling testers which is autobiographical.
