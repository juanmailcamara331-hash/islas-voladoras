# ISL PUM NDS · Wi-Fi Save Sync Contract

Status: LAB ONLY · NO CANON

## Goal
R36 Ultra and Android tablet share ONE canonical game save without routine USB transfers.

## Preferred transport
Use Wi-Fi synchronization on the local network.

Recommended implementation layer:
- Syncthing or equivalent folder-sync daemon on R36 Linux.
- Syncthing Android (or compatible client) on tablet.
- Sync ONLY the ISL PUM save folder, never the whole ROM library.

R36 Ultra has built-in 2.4 GHz Wi-Fi, so no external Wi-Fi dongle should be required on this model.

## Canonical shared folder
R36:
  /roms/nds/backup/ISL_PUM_SYNC/

Tablet:
  /storage/emulated/0/ISL_PUM_SYNC/

The exact emulator save path may vary; deployment tooling must discover/copy to canonical sync folder rather than overwrite arbitrary emulator folders.

## Authority
Canonical game state:
  ISL_PUM_SYNC/CURRENT/

Files:
  run.meta
  ISL_PUM.sav
  save.sha256
  lock.json

Optional:
  gesture_packets/
  voice_packets/
  drawings/
  tablet_events/

## Conflict safety
Never let two devices write the save simultaneously.

Protocol:
1. launching on R36 sets owner=R36 and writes lease timestamp;
2. launching tablet extension checks lease;
3. if R36 lease active, tablet opens companion-only mode, not save-writing mode;
4. "handoff" writes safe checkpoint, releases lease, syncs;
5. next device claims lease and continues.

If conflict:
- preserve both saves;
- never silently overwrite;
- choose newest valid save only after checksum/schema validation.

## User experience
Normal R36 play:
- no manual sync action.

When game needs/benefits from touch or microphone:
- game shows simple handoff code/screen.
- player opens companion on tablet.
- sync waits for latest save.
- tablet resumes same run in touch/voice extension.
- after completion, tablet writes event packet + updated save.
- R36 receives it over Wi-Fi.

No USB required during normal use.

## Offline mode
If no Wi-Fi:
- game remains playable;
- touch/mic sections always have button/pointer fallbacks;
- pending tablet events synchronize later.

## Privacy
No cloud server required.
Local LAN peer-to-peer preferred.
No behavioral data leaves devices unless user explicitly uploads run export.
