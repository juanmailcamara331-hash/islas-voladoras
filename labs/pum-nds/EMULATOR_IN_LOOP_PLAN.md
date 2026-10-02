# ISL PUM · Emulator-in-the-loop Plan

Status: IMPLEMENTATION GATE · SPOILER-SAFE

## Why
Host tests prove logic. An NDS emulator proves more of the compiled ROM/runtime boundary.

## Candidate harnesses
- melonDS DS regression-test approach: pytest + libretro session.
- DeSmuME headless/CLI approach for deterministic boot/input/screenshot regression.

## First automated emulator milestone
1. Build ISL_PUM_PLAYER.nds.
2. Boot in emulator CI.
3. Run fixed neutral input script.
4. Capture a stable frame/checkpoint.
5. Compare expected technical marker or framebuffer hash.
6. Fail CI if boot/regression changes unexpectedly.

## Second milestone
Exercise save backend selected for the actual target emulator:
write -> exit -> relaunch -> read -> compare checksum.

## BIOS/firmware rule
Do not commit proprietary Nintendo BIOS/firmware.
Prefer legal HLE/direct-boot paths where supported.
If a test requires user-owned firmware, keep that gate private/local and mark it separately.

## Result labels
EMULATOR_GREEN_BOOT
EMULATOR_GREEN_INPUT
EMULATOR_GREEN_SAVE

None imply DEVICE_GREEN.


## Current evidence
- EMULATOR_GREEN_BOOT = PASS on the CI DeSmuME 0.9.11 build using legal direct/HLE boot.
- DeSmuME storage capability = UNAVAILABLE in the exact Ubuntu 24.04 binary used by CI: runtime help exposes no cflash option.
- EMULATOR_GREEN_INPUT = PASS.
- EMULATOR_GREEN_SAVE = PASS.
- MELONDS_GREEN_INPUT_SAVE_RELOAD = PASS.
- Evidence: workflow #224 (run 36955793933), commit 3748c211ba4eaca64ebd5572e49fd4f73668a622.
- First runtime save: play_ticks=349, relation_count=1.
- Relaunch save: play_ticks=571, relation_count=1.
- The second run produced a new primary save and preserved the prior generation in ISL_PUM_SAVE.bin.bak.
- Input targeting was confirmed against the melonDS client window; S and Z produced FAT image mutations during the driven sequence.
- Exact physical-device verification remains separate and pending.

A missing emulator feature is not a game failure. Do not weaken gates to convert infrastructure absence into PASS.
