# ISL PUM · Favorite Capture / Session Documentation v0.1

Status: LAB ONLY · MOBILE-FIRST · SPOILER-SAFE
Role: REVIEW/CREATE mode inside the existing cockpit. NOT a new organ.

## Player action
One simple action from the tablet:

ME FLIPA

Optional immediately after:
- SPEAK: say what you liked
- PHOTO: capture what you are seeing / surrounding reference
- SKIP: save the moment with no explanation

No form filling during play.

## Automatic capture packet
Each capture records, when available:
- run_id
- build/version
- timestamp
- game_tick
- current semantic mode
- recent Playtrace window reference
- Tempo band (observable only)
- relevant Biography/Echo references
- capture source: tap / voice / photo / mixed
- voice transcript
- optional user words for WHY / WHAT / HOW
- photo/video asset reference + hash
- privacy state
- human KEEP/PARK status

Never infer diagnosis, intelligence, mental state, or hidden intent.

## Export ladder
CAPTURE
-> Playtrace
-> SESSION LEDGER
-> CSV
-> XLSX / Google Sheets
-> PDF SESSION SUMMARY
-> pillar router

Possible downstream routes:
- Unreal design notes
- asset backlog
- campaign/making-of
- creative prompt pack
- research notes
- QA / ergonomics
- PARK

## Spreadsheet columns
capture_id
run_id
build_sha
timestamp
game_tick
context
source
what_i_liked
why_i_liked
how_it_felt_user_words
voice_transcript
photo_ref
asset_hash
tempo_band
biography_refs
echo_refs
route
human_status
privacy
notes

## PDF session summary
Generate after a session, not during play:
1. session header
2. strongest liked moments
3. voice quotes/paraphrases from user
4. image thumbnails/references where approved
5. recurring patterns
6. candidate design implications
7. what NOT to change
8. possible Unreal / asset / campaign routes
9. unresolved questions
10. provenance appendix

## UX law
During play:
ME FLIPA
-> optional HABLA / FOTO
-> RETURN TO GAME

Maximum interruption target: a few seconds.

## Automation
When tablet integration is available:
- create capture packet automatically;
- append row to session ledger;
- sync to Drive/Sheets;
- generate PDF at session end;
- never publish externally without Human Gate.

## Closeout principle
The player documents delight, not bureaucracy.
