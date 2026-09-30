# ISL PUM · Bug / Recovery Ledger v0.1

Status: LAB ONLY · SPOILER-SAFE

## Purpose
Every meaningful defect leaves enough evidence to reproduce, classify, repair and prevent recurrence.

## Bug packet
- bug_id
- build_sha
- run_id
- device/emulator profile
- timestamp
- game_tick
- semantic mode
- last safe checkpoint
- last N Playtrace events
- save generation
- active save slot
- checksum status
- repro steps if known
- visible symptom
- severity
- recoverability
- fix commit
- regression test
- Human status

## Severity
S0 cosmetic
S1 friction / readability
S2 gameplay degradation
S3 progression/save interruption
S4 data loss / unrecoverable / crash loop

## Closure rule
S3/S4 may not be closed without:
1. root cause or bounded cause;
2. fix;
3. regression test;
4. recovery-path test;
5. evidence from the relevant gate.

## Player recovery
If a save/load fault occurs:
- never overwrite the last known-good generation;
- try committed slot;
- fall back to previous valid slot;
- preserve corrupt raw bytes for diagnosis;
- restore play from last valid checkpoint;
- report a minimal non-spoiler error code.

## Operations
Bug evidence routes to OPERATIONS pillar.
No public issue is created automatically if it could leak sealed content.
