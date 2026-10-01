# ISL PUM · Neutral Relation Export v0.1

Status: TECHNICAL · SPOILER-SAFE · CANDIDATE ONLY

The runtime now exposes one relation snapshot from the validated save as a platform-neutral record. The export deliberately contains no NDS button names, filesystem paths, emulator identifiers, narrative names, or Unreal memory/class pointers.

Mapping:
- persisted relation entity -> neutral entity id;
- relation count/redefinition count -> evidence;
- play tick -> provenance;
- human status remains CANDIDATE until a person promotes it.

The JSON rehearsal is validated against schemas/neutral_relation.schema.json. Unreal consumes function + data + evidence, never NDS implementation memory.
