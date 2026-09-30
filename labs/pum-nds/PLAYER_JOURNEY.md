# ISL PUM NDS · Blind Player Journey Simulation

This document describes operations, not sealed content.

## Phase 1 · Delivery
CI outputs:
- ISL_PUM_R36_PLAYER_PACKAGE.zip
- optional tablet emulator package notes
- checksums

Player action:
ONE COPY to games SD.

## Phase 2 · First boot
Expected:
- EmulationStation discovers /roms/nds/ISL_PUM.nds.
- Player launches game.
- ROM performs lightweight compatibility/calibration.
- No external account/network required.
- Game initializes versioned save.

Failure handling:
- missing writable save -> clear player-facing error, no progress started;
- incompatible input path -> button/pointer fallback;
- microphone absent -> silent fallback, never blocks progress.

## Phase 3 · Normal play
Game owns all meaningful progression.
Autosave occurs at safe boundaries.
Emulator savestates are optional convenience only.

The game internally records compact, observable play events.
No player analytics are sent anywhere during play.
No internet required.

## Phase 4 · Suspend / resume
Normal quit:
game has already committed recent safe autosave.

Unexpected power loss:
checksum + previous valid snapshot metadata allow recovery strategy.

Emulator savestate mismatch must never overwrite canonical game progression.

## Phase 5 · Full run
Player can finish without touching:
- GitHub,
- JSON,
- prompts,
- debug tools,
- Serendipinator,
- Orchestrator,
- developer documentation.

## Phase 6 · Collection
A collector copies original save bytes into one export folder.
Nothing is deleted or rewritten.

## Phase 7 · ISL ingestion
The run export is uploaded once.

Decoder verifies:
- hash,
- schema,
- build version,
- integrity.

Then produces non-authoritative derived artifacts:
PLAYTRACE
RELATION GRAPH
OBJECT HISTORY
MUTATION TIMELINE
SERENDIPITY CANDIDATES
QUALITY SIGNALS

## Phase 8 · Creative return
Derived data enters:
Serendipinator
-> Orchestrator
-> Creative Weight Map
-> candidate briefs
-> optional image/video/music/3D/Unreal handoff

All outputs remain candidates until Human Gate.

## Phase 9 · Preservation
Keep:
- exact ROM build hash;
- exact original save hash;
- decoder version;
- derived Playtrace;
- human decisions.

This makes every later creative mutation traceable back to an actual run.
