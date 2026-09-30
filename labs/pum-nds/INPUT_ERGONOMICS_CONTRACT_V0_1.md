# ISL PUM · Input / Ergonomics Contract v0.1

Status: LAB ONLY · NASA-STYLE VERIFICATION · SPOILER-SAFE

## Principle
Few semantic actions, many contextual meanings.
Do not add one permanent button per mechanic.

## Permanent semantic inputs
MOVE
PRIMARY
SECONDARY
CONTEXT
CANCEL/MENU
AUX/SCREEN at emulator layer only

## Contextual actions
Turn-based combat, ship combat, exploration, drawing/voice windows map onto the same semantic inputs.

## Progressive disclosure
No full control legend at boot.

Teach:
1. MOVE
2. PRIMARY
3. SECONDARY only when earned/needed
4. CONTEXT only when a meaningful situation introduces it
5. AUX/tablet only when a task requires it

## Affordance states
Every action exposed on-screen must support:
REST
FOCUS
PRESS
HOLD (only if used)
RELEASE
DISABLED
FEEDBACK

## R36 / DraStic reality
Physical emulator hotkeys vary by firmware/emulator build.
Therefore:
- game controls must not depend on a specific L2/R2/L3/R3 mapping;
- screen swap/touch hotkeys are DEVICE PROFILE;
- first device boot records actual mapping;
- collision with game actions is a blocker.

## Safety tests
- accidental double press
- held button
- rapid alternating inputs
- simultaneous directions
- screen-swap during combat
- emulator menu interruption
- suspend/resume mid-turn
- save during/after transition
- unavailable AUX device

## Human gate
DEVICE_GREEN requires:
- readable without explanation;
- no finger gymnastics;
- no critical action sharing an unreliable emulator hotkey;
- no action requiring precise timing unless intentionally designed.
