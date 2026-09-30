# ISL PUM · Production Asset Contract v0.1

Status: LAB ONLY · SPOILER-SAFE · PLAYER-READY BLOCKER

The previously generated concept/sprite sheets are REFERENCE ONLY.
They are not production assets and must not be shipped automatically.

## Production rule
No final visual element enters the ROM without:
1. target resolution / safe area;
2. animation states;
3. collision / hitbox policy if interactive;
4. palette / material role;
5. readability at target device scale;
6. memory/VRAM budget;
7. input affordance test;
8. provenance;
9. human visual gate.

## Asset families
Minimum production set must cover:
- player states;
- ship states;
- combat action language;
- world tiles / atmosphere;
- interaction highlights;
- collection objects;
- UI affordances;
- effects / particles;
- transitions;
- recovery / failure;
- title / pause / save feedback.

## State completeness
Interactive assets require, as applicable:
IDLE
FOCUS
ACTIVE
DISABLED
PRESSED
HELD
RELEASED
COOLDOWN
SELECTED
ERROR/INVALID
TRANSITION

Do not assume one icon/sprite is enough for one control.

## Control-affordance law
A visual control must prove:
- visible at rest;
- legible when focused;
- state change when pressed;
- state change when held if hold exists;
- safe release;
- no overlap at target scale;
- no invisible active region mismatch;
- no action without feedback.

## Effects
Particles/light are accents, not affordance replacements.
Use them to confirm:
impact
magic/anomaly
selection
ship action
reward/echo

Do not make every interactable glow.
Priority remains perceptual hierarchy.

## Camera/readability
Critical combat and navigation silhouettes must survive:
- device crop;
- low brightness;
- motion;
- effects;
- one-screen mode.

## Promotion
CONCEPT -> MOCK -> IN-ENGINE TEST -> DEVICE TEST -> HUMAN KEEP -> PRODUCTION

No shortcut from CONCEPT to PRODUCTION.
