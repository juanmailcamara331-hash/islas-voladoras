# ISL PUM · Neutral Playtrace v0.1

Status: LAB ONLY · SPOILER SAFE

The runtime stores compact observable events, not interpretations.

Examples of neutral facts:
- action happened;
- gesture duration;
- gesture distance;
- direction-change count;
- relation state changed;
- timestamp/tick.

It must NOT encode claims such as:
- player is anxious;
- player is happy;
- player is highly creative;
- player has a diagnosis.

Interpretation happens later, versioned and reversible.

## Shared boundary
NDS / tablet / desktop / Unreal should converge on the same neutral vocabulary.

RAW INPUT
-> FEATURE SUMMARY
-> TRACE EVENT
-> later analysis
-> optional game adaptation
-> human review.

This keeps device-specific implementation below the game-design layer.
