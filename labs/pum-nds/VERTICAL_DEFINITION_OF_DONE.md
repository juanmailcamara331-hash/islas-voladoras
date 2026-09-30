# ISL PUM · Vertical Definition of Done v0.2

A build is NOT player-ready because it compiles.

## Required green gates

### INPUT
- R36 semantic controls work.
- DS pointer fallback works.
- touch/native path works in compatible emulator/device.
- optional microphone absence never blocks progress.

### RPG
- movement readable.
- turn loop stable.
- combat resolves.
- no mandatory softlock.
- menu can always exit/cancel safely.

### REDEFINITION
- one encounter-based relation can be created.
- relation survives save/load.
- delayed consequence path exists.
- no spoiler text required to understand interaction.

### SAVE
- versioned schema.
- checksum.
- invalid/corrupt save handled on copy/fallback.
- autosave boundaries verified.

### TRACE
- relation creation recorded.
- player action summarized.
- event ledger bounded.
- export decoder round-trip tested.

### SYNC
- handoff metadata present.
- conflict preserves both copies.
- no silent overwrite.

### UNREAL HANDOFF
- at least one exported neutral relation validates against schema.
- no NDS-only pointer leaks into neutral data.

### SPOILER SAFETY
- player docs contain zero sealed names.
- CI logs contain no sealed event descriptions.
- filenames neutral.

## Final player gate
Only emit PLAYER_BUILD after all above are green.
