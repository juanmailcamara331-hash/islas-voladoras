# ISL PUM · Sealed Game Readiness Gate

Status: SPOILER-SAFE · PLAYER-PACKAGE BLOCKER

The current ROM is a technical vertical, not yet a complete long-form RPG.

Do NOT label or package as PLAYER READY until all are true:

## CORE PLAY
- exploration loop exists
- turn-based combat loop exists
- progression exists
- recovery/failure loop exists
- at least one complete beginning -> development -> closure path exists

## EXPERIENCE
- readable square-safe presentation
- game-first single-screen mode
- auxiliary screen contextual only
- coherent sound/feedback layer
- onboarding through play
- no developer/debug text in player build

## LENGTH
Target for first sealed player build:
- meaningful first-run duration, not a five-minute technical demo
- enough variation that replay is materially different
- exact duration measured by automated run estimates + later HUMAN GREEN

No fabricated hour count before measured play.

## SYSTEMS
- Tempo integrated invisibly
- Biography integrated invisibly
- Echo integrated causally
- Redefinition contributes to play
- Playtrace records without exposing spoilers

## INTEGRITY
- build/pass
- fault/pass
- emulator gate
- save/load gate
- no spoiler leakage

## PACKAGE RULE
Only when this file's requirements are evidenced may CI publish an artifact named:
ISL_PUM_PLAYER_READY

Until then artifacts must be named:
ISL_PUM_TECH_PREVIEW

Human/device validation still remains separate.
