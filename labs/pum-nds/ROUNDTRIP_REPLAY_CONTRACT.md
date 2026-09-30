# ISL PUM · Roundtrip Replay Contract

Status: TECHNICAL · SPOILER-SAFE

## Purpose
Prove that one run can move:

R36 -> tablet -> R36

while preserving:
- save identity
- generation
- checksum
- semantic event order
- optional gesture/voice packets

## Host simulation
The CI must simulate:
1. R36 claims run.
2. R36 writes neutral state.
3. R36 releases with checksum A.
4. Tablet claims same run.
5. Tablet appends semantic input packets.
6. Tablet writes neutral state and releases with checksum B.
7. R36 claims again.
8. R36 observes checksum B and monotonically increasing generation.
9. Exporter replays all packets deterministically.
10. No packet contains sealed narrative names.

## Unreal rehearsal
The same semantic packet stream must be consumable without:
- NDS memory addresses
- emulator paths
- platform button names
- sealed content identifiers

Unreal should receive:
semantic action
+ normalized feature packet
+ state change
+ provenance

not raw platform implementation details.
