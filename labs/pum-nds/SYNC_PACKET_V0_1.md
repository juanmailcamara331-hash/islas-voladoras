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


## Portable wire representation
The in-memory C struct is NOT the network/file format.

`sync_wire` serializes every numeric field explicitly as little-endian bytes under its own wire schema and computes a checksum over the canonical payload. No compiler padding, pointer, raw memory address, or platform ABI is part of the exchange format.

On decode, the receiving platform reconstructs logical save fields and computes its own local runtime checksum. This keeps NDS storage implementation details out of tablet/Unreal transport semantics.
