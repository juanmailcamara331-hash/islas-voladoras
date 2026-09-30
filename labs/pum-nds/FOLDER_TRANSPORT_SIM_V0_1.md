# ISL PUM · Folder Transport Simulation v0.1

Status: TECHNICAL · SPOILER-SAFE · NOT DEVICE GREEN

Purpose:
Exercise the transport semantics expected from a local Wi-Fi folder-sync layer without coupling gameplay to Syncthing, HTTP, DraStic, Android paths, or any specific daemon.

Properties under test:
- write temporary file first;
- atomic promotion only after a complete write;
- interrupted copy leaves no complete packet;
- exact retry is idempotent;
- duplicate delivery does not reapply;
- divergent bytes are preserved in a conflict area;
- roundtrip R36 -> tablet -> R36 succeeds;
- no transport decision mutates CANON or sealed content.

The real transport may later be Syncthing-class folder replication or a local helper. This simulation validates behavior, not network connectivity.
