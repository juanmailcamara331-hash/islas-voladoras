# ISL PUM · Final System Assurance Matrix v1

Status: LAB ONLY · ARCHITECTURE FREEZE · SPOILER-SAFE

This is the last transversal pass.
No new layer is added unless a measured failure requires it.

## 1 INTEGRITY / SAFETY — BLOCKER
Evidence:
- dual-slot A/B transactional journal
- checksum/schema validation
- rollback to last valid generation
- fault injection
- conflicting copy preservation
- power-loss simulation
- bug/recovery ledger

Green:
LOGIC_GREEN + FAULT_GREEN + EMULATOR_SAVE_GREEN + DEVICE_SAVE_GREEN

## 2 PERFORMANCE — BLOCKER
Budgets:
- stable input handling at DS frame cadence
- bounded trace/echo/biography storage
- no unbounded allocations in play loop
- effects budgeted by scene
- auxiliary analysis/generation stays off-device/tablet/cloud
- saving occurs only at safe checkpoints, never per-frame

Tests:
- long deterministic run
- trace saturation
- repeated encounter loop
- worst-case input burst
- emulator frame/run smoke
- target device observation

## 3 ERGONOMICS — BLOCKER
Rules:
- single-screen first
- 192x192 safe composition
- few semantic inputs
- contextual controls
- progressive disclosure
- no critical mechanic bound to uncertain R36 emulator hotkey
- readable states REST/FOCUS/PRESS/HOLD/RELEASE/DISABLED

Green:
DEVICE_GREEN + HUMAN_GREEN

## 4 PLAYABILITY / FUN — BLOCKER
Evidence:
- exploration loop
- turn combat
- ship-combat lane before PLAYER_READY
- recovery/failure
- beginning/development/closure
- blind passes 0-3
- human delight capture
- boredom/repetition audit

Fun cannot be proven by simulation.
HUMAN_GREEN required.

## 5 ART / AUDIO QUALITY — BLOCKER FOR PLAYER_READY
- concept assets never auto-promote
- production asset contract
- state-complete controls/assets
- device-scale readability
- coherent SFX language
- music/cinematic candidates pass human gate
- effects confirm actions; they do not replace affordances

## 6 OBSERVABILITY / BUG SOLUTION — BLOCKER
- build/version embedded
- checksums/manifests
- bug packet
- regression test for S3/S4
- Playtrace window around failure
- recovery code
- no sealed content in public CI logs

## 7 COST / RENTABILITY — NON-BLOCKING EARLY
Measure:
- generation credits per accepted asset
- discarded candidate rate
- time-to-KEEP
- storage/build cost
- external API spend

Rule:
cheap preview -> gate -> expensive refine.
Do not optimize monetization before fun/device validation.

## 8 SYNERGY / CREATIVE SYSTEM — GUARDED
Tempo + Biography + Echo + Redefinition + Orchestrator.
Serendipity is a multiplier, never an excuse for incoherence.
No auto-canon.

## 9 UNREAL PREPARATION — PROMOTION GATE
Only approved functions/data/evidence move.
Epic Automation/Functional Testing lanes map to:
- unit/low-level
- feature
- smoke
- content stress
- screenshot comparison

Use asynchronous SaveGame where appropriate in future Unreal production to avoid save hitches.
NDS implementation code is not imported directly.

## 10 DISTRIBUTION / SEO / TWITCH / KICKSTARTER — POST-PLAY ROUTES
These are pillar adapters, not game organs.

SEO/Google:
approved public facts/assets only.

Twitch:
future OAuth/EventSub/API adapter for clips, markers, streams or community interaction only after public-ready gate.

Kickstarter:
requires playable proof, budget, fulfillment/risk model, approved visuals.

Commerce:
approved physical/digital products only.

Blockchain:
optional Human Gate; provenance/collector experiments only until legal/security review.

## 11 TABLET COMPANION
During play:
DRAW
SPEAK
GENERATE
ME FLIPA

All return to game quickly.
Photos/voice/results become provenance-rich capture packets, not mandatory forms.

## 12 ASSURANCE LABELS
STATIC_GREEN
LOGIC_GREEN
FAULT_GREEN
EMULATOR_GREEN
DEVICE_GREEN
HUMAN_GREEN

Never promote a lower label into a higher one.

## Final law
IF IT IS NOT TESTED, MEASURED OR HUMAN-VALIDATED,
IT IS NOT GREEN.
