# ISL PUM NDS · Agent Contract

Build a real .nds ROM. Keep all player-facing narrative surprises sealed.

## Public vs sealed
PUBLIC_DEV:
- build, controls, save, tests, performance, architecture.

SEALED_CONTENT:
- bosses, rare events, later mutations, endings, hidden PUM outcomes, hidden duck outcomes, secret genre shifts.

Use neutral IDs: EVT_###, REL_###, MUT_###, OBJ_###.
Never leak spoilers in filenames, commits, issue summaries, PR titles, CI logs, or player docs.

## Native DS input
Use:
- buttons for core movement/combat;
- touch for drawing, tracing, gestures, map marks, object interactions and bounded minigames;
- microphone only for optional acoustic mechanics.

Do not require microphone for mandatory progression.
Do not classify "true emotions" from voice.
If voice features are used, derive explicit acoustic/game features such as:
- loudness/energy,
- pitch range,
- sustained tone,
- rhythm/pulse,
- silence duration,
- coarse timbral descriptors.
Treat these as gameplay inputs, never psychological truth.

## R36 compatibility
The R36-class target may not have a physical touchscreen.
Provide a compatibility input abstraction:
TOUCH_NATIVE / TOUCH_POINTER_EMULATED / BUTTON_FALLBACK.
No required section may become impossible on pointer-emulated input.

## Core loop
MOVE -> NOTICE -> INTERACT -> DRAW/TOUCH/VOICE OPTIONAL -> ENCOUNTER -> DECIDE -> CONSEQUENCE -> OBJECT -> RETURN/CONTINUE

## Battle
Fast turn-based RPG:
ATACAR / DEFENDER / COSA / RARO
Support KILL / SPARE / FLEE / STRANGE RESOLUTION.

## Build order
BOOT
-> INPUT ABSTRACTION
-> TOUCH TEST
-> MIC TEST/FALLBACK
-> MOVEMENT
-> INTERACTION
-> SAVE/LOAD
-> ONE MAP
-> ONE TURN BATTLE
-> ONE DRAWING MECHANIC
-> ONE OBJECT
-> ONE BOX
-> ONE RING
-> ONE PUM
-> ONE BOUNDED SERENDIPITY EVENT
-> PLAYTRACE EXPORT
-> TEST EVERYTHING

Do not expand content before this is green.

## Save/playtrace
ROM immutable.
Versioned save schema + checksum + fallback snapshot when feasible.
Log compact meaningful events only.
Important systemic results reproducible from ROM version + world seed + save state.

## Safety of interpretation
Observable behavior only.
No diagnosis, subconscious claims, mental-state inference, or truth claims about emotion.

## Reporting to Juan
Only:
BUILD PASS/FAIL
TESTS X/X
SAVE PASS/FAIL
TOUCH PASS/FAIL
MIC FALLBACK PASS/FAIL
SOFTLOCKS N
EXPORTER PASS/FAIL
SPOILER SAFETY PASS/FAIL
