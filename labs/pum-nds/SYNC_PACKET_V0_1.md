# ISL PUM · Neutral Sync Packet v0.1

Status: TECHNICAL · SPOILER-SAFE · TRANSPORT-AGNOSTIC

Purpose: carry one validated save between R36 and tablet without embedding Wi-Fi, emulator, filesystem, or narrative meaning in gameplay data.

Identity:
- generation
- save checksum
- source owner
- target owner

Rules:
- packet must contain a schema-valid, checksum-valid save;
- source and target must be different recognized owners;
- same identity is idempotent;
- same generation with a different checksum is a conflict, never an overwrite;
- transport is replaceable: folder sync, local HTTP, Syncthing-class daemon, or future companion app;
- packet contains no platform path and no sealed narrative names.

This packet does not prove network transport. Device validation remains required.
