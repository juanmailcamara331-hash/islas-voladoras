# ISL PUM · R36 DEVICE VERIFICATION RUNBOOK

Status: LAB ONLY · NO CANON · HUMAN DEVICE GATE
Artifact: ISL_PUM_TECH_PREVIEW

## Goal

Verify only the physical persistence boundary on the real R36 Ultra:
boot -> input -> checkpoint -> power-cycle/relaunch -> persisted state -> backup generation.

This is NOT a gameplay-quality test and NOT a tablet round-trip yet.

## Before launch

- Keep the existing microSD contents backed up.
- Do not delete or rename any existing ISL_PUM_SAVE.bin or ISL_PUM_SAVE.bin.bak.
- Copy the packaged ROM as ISL_PUM.nds into the normal NDS ROM folder.
- Use the R36's normal NDS launcher/emulator.
- Do not use savestate-only workflows as evidence for persistence.

## Run A

1. Launch ISL_PUM.nds.
2. Move briefly.
3. Trigger CONTEXT once.
4. Open pause with START.
5. Trigger checkpoint with A.
6. Return to the launcher normally.
7. Do not use savestate as the only exit path.

Expected filesystem evidence when DLDI/FAT is exposed:
- ISL_PUM_SAVE.bin exists.
- A later checkpoint may create ISL_PUM_SAVE.bin.bak.

If neither file exists, mark DEVICE SAVE BACKEND = NOT VERIFIED. Do not fabricate or rename emulator .dsv files as proof.

## Run B

1. Relaunch the ROM from the launcher.
2. Confirm the run resumes with persistent state rather than a fresh reset.
3. Move briefly.
4. START -> A to checkpoint again.
5. Exit normally.

Expected:
- primary save changes;
- .bak preserves the previous valid generation;
- no crash/corruption;
- relation state survives relaunch.

## Evidence to collect

Copy, do not move:
- ISL_PUM_SAVE.bin
- ISL_PUM_SAVE.bin.bak if present
- emulator/launcher name and version if visible
- VERSION.txt from package
- short note: RESUMED / FRESH / CRASHED / UNKNOWN

Never overwrite originals while collecting evidence.

## Result labels

R36_BOOT_GREEN = PASS only if the ROM launches on the physical R36.
R36_INPUT_GREEN = PASS only if controls respond on the physical R36.
R36_SAVE_GREEN = PASS only if the filesystem save persists across relaunch.
HUMAN_DEVICE_GREEN remains PENDING until all required physical-device gates are actually observed.

A physical PASS does not imply tablet round-trip PASS.
