# ISL PUM · Verification & Validation Matrix

Status: LAB ONLY · SPOILER-SAFE

## Gates

### G0 STATIC GREEN
- source compiles
- schemas parse
- forbidden platform/content leaks absent

### G1 LOGIC GREEN
- save codec
- trace
- handoff
- Tempo
- Biography
- Echo
- deterministic host tests

### G2 FAULT GREEN
Inject:
- truncated save
- flipped checksum
- stale lease
- conflicting generations
- duplicate packet
- reordered packet
- missing optional packet
- zero-length gesture
- long pause
- trace overflow

PASS:
- no silent overwrite
- corruption detected
- canonical raw evidence preserved
- deterministic recovery decision

### G3 EMULATOR GREEN
Automated emulator harness must prove:
- ROM boots
- deterministic input script runs
- expected checkpoint marker reached
- close/reopen path works where backend supports it
- screenshot/frame hash regression can be compared
- no sealed-content names appear in logs

This gate may use DeSmuME/melonDS/libretro-class tooling.
It is not DEVICE GREEN.

### G4 DEVICE GREEN
Physical R36 + actual emulator build:
- boot
- controls
- save persistence
- suspend/resume
- display readability
- physical roundtrip to tablet
- power-loss recovery

### G5 HUMAN GREEN
- fun
- intuitive
- comfortable
- surprise preserved
- handoff does not ruin flow

## Authority
G0-G3 can be automated.
G4 requires target hardware.
G5 requires a human.

Never relabel a lower gate as a higher one.
