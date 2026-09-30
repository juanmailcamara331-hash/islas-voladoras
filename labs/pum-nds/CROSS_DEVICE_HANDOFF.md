# ISL PUM · Cross-Device Handoff Manifest

Status: TECHNICAL · SPOILER-SAFE

## Goal
One run, two devices, zero routine USB.

## Shared logical state
RUN/
  CURRENT_SAVE
  HANDOFF_STATE
  CHECKSUM
  GENERATION
  DEVICE_OWNER
  OPTIONAL_INPUT_PACKETS/

## Rules
- only one device writes at a time;
- handoff happens at safe checkpoints;
- checksum before and after transfer;
- conflicting copies are preserved, never silently replaced;
- stale lease produces recovery flow, not overwrite;
- tablet-specific gesture/voice packets return beside the save;
- R36 can continue without tablet if network is unavailable.

## User-facing flow
R36 -> HANDOFF -> tablet -> HANDOFF -> R36

The transport may be:
- local Wi-Fi folder sync;
- local HTTP helper;
- Syncthing-class synchronization;
- later companion app.

Transport is replaceable. The handoff protocol is not.

## Device abstraction
R36:
buttons + pointer fallback

Tablet:
touch + microphone + optional richer sensors

Both write neutral semantic events.

## Unreal
The same semantic event packet can later be replayed in an Unreal prototype.
No platform-specific path or emulator identifier is allowed in gameplay meaning.
