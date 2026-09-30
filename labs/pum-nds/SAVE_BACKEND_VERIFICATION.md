# ISL PUM · Save Backend Verification Gate

Status: TECHNICAL · NO SPOILERS

The save FORMAT and the save TRANSPORT are separate concerns.

## Format
Already versioned and checksummed.

## Backends
Candidate backends:
1. emulator-managed NDS backup memory
2. filesystem/DLDI storage
3. host/test memory backend

Do not claim R36/DraStic persistence until the exact backend is verified in the target emulator.

## Required experiment
For each target:
- boot build;
- create known state;
- save;
- exit emulator;
- relaunch;
- load;
- verify checksum + counters;
- copy save to tablet emulator;
- load same state;
- mutate state;
- sync back;
- verify R36 resumes mutated state.

## Pass
Only after round-trip succeeds on:
- R36 DraStic
- Android tablet emulator

may automatic Wi-Fi sync be marked ready.
