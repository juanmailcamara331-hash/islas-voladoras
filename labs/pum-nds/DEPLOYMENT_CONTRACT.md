# ISL PUM NDS · End-to-End Deployment Contract

Status: LAB ONLY · NO CANON · BLIND PLAYER FLOW

## Player promise
The human should perform the fewest possible actions:

1. copy one prepared package to the R36 SD card;
2. boot handheld;
3. launch ISL PUM;
4. play naturally;
5. when finished, collect one RUN package and upload it to ChatGPT/ISL.

No emulator tuning should be required for normal play.

## Platform facts we design around
- NDS ROM location on current R36/dArkOSRE setups: /roms/nds.
- Advanced DraStic provides multiple screen layouts and a right-stick virtual stylus.
- Physical touch is not assumed on R36.
- Microphone is optional and never required for progression.
- Current R36 wrappers may use /roms/nds/backup and /roms/nds/savestates; some builds also use /opt/drastic/backup.
- Therefore the game must rely on ordinary NDS backup memory for canonical run state, not emulator savestates.

## Golden rule
ROM = immutable game build.
SAVE = canonical player run state.
SAVESTATE = convenience only, never authority.

## Player package
CI produces one ZIP:

ISL_PUM_R36_PLAYER_PACKAGE.zip

Contents:
R36_PACKAGE/
  roms/
    nds/
      ISL_PUM.nds
  ISL_PUM/
    VERSION.txt
    PLAYER_README.txt
    RUN_COLLECTION.txt

The user copies the CONTENTS of R36_PACKAGE to the root of the games SD card.

No BIOS replacement.
No DraStic binary replacement.
No global emulator configuration overwrite.
No main ISL files touched.

## Ergonomic default
The ROM itself must assume:
- square external display;
- large legible UI;
- close combat framing;
- no tiny inventory icons;
- virtual stylus available via right stick;
- mandatory actions always possible with buttons/pointer fallback.

The ROM may display its own first-run calibration page, but it must be short and skippable.

## Save contract
Game uses versioned NDS backup-memory save:
ISL_SAVE_SCHEMA_V1+

The run state includes:
- build/version;
- world seed;
- compact meaningful event ledger;
- object/relationship history;
- mutation state;
- compatibility flags;
- checksums;
- fallback snapshot metadata.

Never depend on emulator savestate for permanent progress.

## Run collection
After play, the only file family needed for ISL ingestion is the game's backup save.
Collector scripts may also copy optional emulator metadata, but analysis must treat the game save as authority.

Expected collector search order:
1. /roms/nds/backup/ISL_PUM*
2. /opt/drastic/backup/ISL_PUM*
3. ROM-adjacent backup files matching ISL_PUM*

Collector copies, never moves/deletes.

Output:
ISL_PUM_RUN_EXPORT/
  MANIFEST.txt
  ROM_VERSION.txt
  SAVE_ORIGINAL.*
  optional_savestate_metadata/

The original save remains untouched.

## ChatGPT / ISL ingestion
Upload RUN_EXPORT (or just the original game save if needed).

Pipeline:
ORIGINAL SAVE
-> hash
-> decode
-> PLAYTRACE
-> SERENDIPINATOR
-> ORCHESTRATOR
-> HUMAN REVIEW
-> KEEP / MUTATE / PARK / KILL

No automatic canon promotion.

## Failure policy
If save cannot be decoded:
- preserve original bytes;
- do not rewrite;
- attempt schema-compatible recovery on a copy;
- report technical failure without exposing sealed content.

If emulator configuration differs:
- adapt deployment package, not the player's global emulator setup.

## No-spoiler policy
Player-facing package contains zero:
- boss lists,
- endings,
- hidden pressures,
- secret object tables,
- mutation maps,
- sealed event names.
