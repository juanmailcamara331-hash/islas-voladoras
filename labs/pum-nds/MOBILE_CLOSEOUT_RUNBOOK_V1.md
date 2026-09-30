# ISL PUM · MOBILE CLOSEOUT RUNBOOK v1

Status: LAB ONLY · MOBILE/TABLET FIRST · SPOILER-SAFE

Purpose:
Make the remaining work executable from tablet/mobile with minimum friction.

## PHASE 1 — CLAUDE SECOND OPINION
Human:
1. Open Claude Web on tablet.
2. Open connected GitHub project.
3. Select repository: juanmailcamara331-hash/islas-voladoras
4. Select branch: lab/pum-nds
5. Send:
   "Read labs/pum-nds/CLAUDE_SECOND_OPINION_REVIEW_PROMPT_V1.md and execute it against the current repository. Keep story/gameplay spoilers hidden from me. Save the result into labs/pum-nds/CLAUDE_SECOND_OPINION_REVIEW_RESULT_V1.md."

Claude:
- reviews code/docs/tests
- writes result file
- does not redesign architecture
- does not expose sealed content

Done when:
CLAUDE_SECOND_OPINION_REVIEW_RESULT_V1.md exists in repo.

## PHASE 2 — RECONCILE
ChatGPT:
- reads Claude result
- checks evidence against repo
- accepts only evidence-backed findings
- fixes blockers
- adds regression tests
- reruns CI

Done when:
no unresolved S3/S4 issue blocks emulator.

## PHASE 3 — EMULATOR GREEN
Automated:
- boot ROM
- scripted input
- checkpoint reach
- restart/reopen
- save/recovery
- screen-layout smoke
- no spoiler leak in logs

Done when:
EMULATOR_GREEN is evidenced.

## PHASE 4 — DEVICE PROFILE
Human:
- put package on microSD using Galaxy tablet
- boot R36
- report only visible problems
- no need to inspect files manually unless asked

ChatGPT:
- records actual button/hotkey profile
- resolves screen-swap/touch/emulator mappings
- tests save persistence/suspend/resume

Done when:
DEVICE_GREEN evidence exists.

## PHASE 5 — PRODUCTION ASSET FAMILY
Do not mass-generate first.

Pick one representative family.
Prepare:
- resolution
- palette/material law
- animation states
- hitbox/interaction
- feedback/effects
- memory/VRAM budget

Human:
approves prompt/bullet.

Only after PUM:
generate candidates.

Test:
in-engine -> device -> human.

Then scale family.

## PHASE 6 — AUDIO / MUSIC
Create:
- action SFX language
- exploration layer
- RPG combat layer
- ship combat layer
- tension/anomaly
- recovery/return
- cinematic crescendo

Adaptive pacing may use observable play/drawing/voice patterns.
No psychological diagnosis.

## PHASE 7 — CINEMATIC / EFFECTS
Brief -> keyframe -> animatic -> generation -> integration -> device -> human gate.

Do not spend heavily before timing/style/function are locked.

## PHASE 8 — BLIND PASSES 2/3
SYNTHESIS:
merge only useful surviving systems.

ADVERSARIAL:
attack boredom, clutter, repetition, bad controls, broken save, weak art/audio.

## PHASE 9 — PLAYER PACKAGE
Artifact becomes PLAYER_READY only if readiness gate is evidenced.

Package includes:
- ROM
- version
- checksum
- install instructions
- manifest
- recovery notes

## PHASE 10 — HUMAN PLAY
Human:
play normally.
When useful:
DRAW
SPEAK
GENERATE
ME FLIPA
PHOTO/VIDEO

System:
Playtrace + Favorite Capture + session ledger.

After session:
CSV / Google Sheet / PDF summary.

## PHASE 11 — POST-PLAY ROUTES
Only after HUMAN_GREEN:
- Unreal promotion
- Kickstarter
- SEO/marketing
- Twitch/community
- Shopify/commerce
- physical/digital collectors
- optional blockchain provenance

These are adapters, not game organs.

## MOBILE CONNECTION MAP

CHATGPT
-> GitHub
-> Google Drive/Sheets when needed
-> connected creative tools when available

CLAUDE WEB
-> GitHub
-> Context7 MCP if authorized

R36
-> microSD
-> tablet file manager
-> game package

TABLET
-> draw / voice / photo / generation
-> private capture/export
-> later Sheets/PDF

## VISUAL RANDOM REVIEW PAGE — OPTIONAL QA TOOL

Purpose:
randomly show one approved screenshot/asset candidate at a time without hierarchy/context bias.

Buttons:
KEEP
MUTATE
PARK
KILL
BUG
LOVE

Optional:
voice note / short note.

Records:
asset id
build
random order seed
decision
reason
timestamp

Use cases:
- detect visual inconsistency
- compare readability
- identify generic assets
- collect delight signals
- blind-review candidate art

Do NOT build until real production asset candidates exist.
It is QA tooling, not another game system.

## STOP RULE
At any point:
if the next step requires adding architecture rather than validating/producing,
STOP and return to the current gate.
