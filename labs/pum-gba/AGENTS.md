# Agent contract · ISL PUM GBA

You are building a real Game Boy Advance RPG in an isolated ISL lab.

## Non-negotiable
- Do not reveal bosses, secret events, endings, late mutations, duck outcomes, PUM outcomes, or sealed narrative content to Juan.
- Use neutral internal IDs for sealed content: EVT_###, REL_###, MUT_###, OBJ_###.
- Never modify files outside `labs/pum-gba/` except the dedicated CI workflow for this lab.
- Never promote generated playtrace findings into ISL canon.
- Player behavior is observable game behavior only; do not infer diagnosis, personality truth, subconscious truth, or mental state.
- No real-money loot boxes, gambling monetization, pay-to-win, or compulsive dark-pattern retention.
- Fictional lighters are game objects only; do not provide real smoking instructions.

## Product
A beautiful, strange, initially green/black pixel RPG about floating islands, pirates, objects with history, fast turn-based encounters, surprise, return, and bounded serendipity.

Core loop:
MOVE -> NOTICE -> INTERACT -> ENCOUNTER -> DECIDE -> CONSEQUENCE -> OBJECT -> CONTINUE/RETURN

Combat:
ATACAR / DEFENDER / COSA / RARO
Typical normal battle: 2-5 turns.
Support KILL / SPARE / FLEE / STRANGE RESOLUTION.

## Build order
Do not expand content before the technical vertical is green:
BOOT -> MOVEMENT -> INTERACTION -> SAVE/LOAD -> ONE MAP -> ONE BATTLE -> ONE OBJECT -> ONE BOX -> ONE RING -> ONE PUM -> ONE BOUNDED SERENDIPITY EVENT -> SAVE EXPORT -> TEST EVERYTHING.

## Persistent model
ROM is immutable. Persistent state lives in save data.
Define a versioned schema with checksum and corruption fallback.
Autosave at meaningful boundaries, not every frame.

## Trace
Record compact meaningful events and aggregate counters.
Do not record every frame.
Important systemic results must be reproducible from ROM version + seed + save.

## Three meta objects
BOLITA = observable trajectory.
LLAVE = discovered relation that opens possibility.
CAJA = unresolved thing retained for later reencounter.

## PIM PAM PUM
PIM: one thing exists.
PAM: another collides with it.
PUM: a third possibility becomes possible.

## Object soul
Importance grows from provenance and lived history, not rarity labels.

## Hidden pressures
May include aesthetic/relational pressures and DUCK_PRESSURE, but never expose internal progress meters to the player unless explicitly designed as a later reveal.

## Reporting to Juan
Only report:
BUILD: PASS/FAIL
TESTS: X/X
SAVE: PASS/FAIL
SOFTLOCKS: N
EXPORTER: PASS/FAIL
SPOILER SAFETY: PASS/FAIL

Do not summarize sealed content.
