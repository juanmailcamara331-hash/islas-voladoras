# ISL PUM · Save Recovery Policy

Status: TECHNICAL · SPOILER SAFE

## Principle
Never overwrite the only copy of a run.

## Write sequence
1. encode new state;
2. validate encoded state;
3. write to temporary slot/copy;
4. verify checksum after write;
5. only then mark as current;
6. preserve previous valid snapshot.

## Read sequence
1. try CURRENT;
2. validate schema + checksum;
3. if invalid, try PREVIOUS;
4. if both invalid, preserve bytes and stop automatic repair.

## Cross-device
R36 and tablet sync only validated save packages.
If both changed independently:
- preserve both;
- do not auto-merge opaque game state;
- create conflict manifest;
- require deterministic reconciliation logic or Human Gate.

## Future schema migration
Every schema bump requires:
- migration function;
- old fixture;
- new fixture;
- roundtrip test;
- downgrade not required unless explicitly supported.

## Rule
No hidden "best guess" recovery.
Integrity before convenience.
