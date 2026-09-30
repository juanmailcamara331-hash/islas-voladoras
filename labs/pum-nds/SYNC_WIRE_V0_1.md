# ISL PUM · Sync Wire v0.1

Status: TECHNICAL · SPOILER-SAFE

The cross-device transport MUST NOT memcpy a C SyncPacket struct.

Wire header is explicitly little-endian and versioned:
- magic
- wire schema
- flags
- generation
- save checksum
- source owner
- target owner
- payload length
- payload digest
- versioned save payload

A receiver rejects truncation, payload corruption, unknown wire schema, invalid save schema/checksum, and impossible owner direction.

The save payload remains an opaque versioned game-save blob to transport layers. Network/folder tooling must not reinterpret gameplay state.

This proves byte-format discipline, not network delivery or device compatibility.
