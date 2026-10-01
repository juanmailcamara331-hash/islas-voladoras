# ISL PUM · Playtrace Wire v0.1

Status: TECHNICAL · SPOILER-SAFE

Playtrace export is now an explicit little-endian byte format, not a raw C struct dump.

Header:
- magic ITW1
- schema
- event count
- dropped count

Each event:
- version
- neutral trace kind
- tick
- two signed compact values
- neutral value

Decoder rejects:
- wrong magic/schema;
- more than the bounded trace capacity;
- event-version mismatch;
- truncation;
- trailing bytes.

No NDS pointer, platform path, raw button name, or sealed narrative identifier is serialized.
