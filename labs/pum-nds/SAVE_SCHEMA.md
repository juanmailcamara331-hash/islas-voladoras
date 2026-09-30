# ISL_SAVE_SCHEMA_V1

Canonical authority: in-game save data, not emulator savestates.

Header:
- magic
- schema
- flags
- checksum
- world_seed
- play_ticks
- event_count
- relation_count

Current implementation is intentionally minimal.
Future extensions must preserve backward migration support.

No sealed-content identifiers should appear in player-facing diagnostics.
