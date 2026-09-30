# ISL PUM · Display Law v0.1

Status: LAB ONLY · SPOILER-SAFE

## Player-facing law
THE GAME IS ONE SCREEN.

The second Nintendo DS screen is contextual equipment, not permanent layout.

## Main view
- gameplay owns the primary DS display;
- design all critical framing inside a centered 192x192 SAFE_SQUARE;
- the outer 32 px rails on each side are non-critical atmosphere / framing / optional decoration;
- no critical text, HP, targets or interaction affordance lives outside SAFE_SQUARE.

Why:
A 192x192 safe composition can later be cropped/zoomed to a square display such as R36 without redesigning the game.

## Auxiliary screen
Normally:
BLACK / QUIET / UNUSED.

Only activate for a bounded task that materially benefits from:
- touch
- drawing
- companion/tablet handoff
- compact contextual creative panel

Then return immediately to gameplay-only mode.

## R36 emulator target
Preferred presentation:
SINGLE MAIN SCREEN
-> preserve/crop to SAFE_SQUARE if emulator profile supports it
-> auxiliary screen reachable by one mapped screen-layout action only when requested

Do not stretch gameplay non-uniformly just to fill 720x720.

If exact crop is unavailable on the target emulator:
- maximize single main screen while preserving aspect;
- use the 192x192 safe composition so side rails remain visually expendable.

## Tablet / DS-capable emulator
Normal play:
main screen dominant.

Aux task:
temporarily expose touch screen.
On completion:
collapse back to main.

## Input rule
Opening/closing AUX is contextual.
It does NOT become another permanent gameplay control.

## Unreal transfer
SAFE_SQUARE becomes a composition constraint candidate, not an engine limitation.
Unreal may expand beyond it while keeping important action inside the central safe region.

## Gate
This law is verified in software now.
Exact R36 crop/hotkey behavior is DEVICE_GREEN only after testing the installed emulator.
