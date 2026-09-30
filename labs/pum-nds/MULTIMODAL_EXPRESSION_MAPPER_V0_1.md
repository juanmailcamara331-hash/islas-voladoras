# ISL PUM · Multimodal Expression Mapper v0.1

Status: LAB ONLY · MOBILE-FIRST · SPOILER-SAFE · NON-CLINICAL

## Purpose
Map expressive player input from tablet/microphone/drawing into reversible game signals.

Not a new organ.
Lives under EXPRESS -> ORCHESTRATE -> REDEFINE.

## Three-layer interpretation

### L1 SOURCE CLASSIFICATION
What observable sound/event is present?

Examples:
dog bark
speech
shout
whisper
wind
water
impact
engine
music
laughter

Preferred model family:
AudioSet/YAMNet-class event classifier.

Output:
top labels
confidence
timestamp
raw audio hash

### L2 EXPRESSIVE FEATURES
How was the input produced?

Voice:
duration
speech rate
pitch contour
energy/loudness envelope
pause density
rhythm
repetition

Drawing:
stroke count
stroke speed
acceleration
direction changes
curvature
occupied area
erasures
hesitation/pause time
pressure only if hardware provides it

These are observable features.
Do not label them as diagnosis or true emotion.

### L3 GAME CONTEXT
Why might it matter here?

Inputs:
current game mode
encounter context
ship state
Biography
Echo
Tempo
recent Playtrace
explicit player label
Favorite Capture

Context maps features to candidate responses.

## Example
Player is at a ship-acquisition moment.

Observed:
- smooth rhythmic drawing
- low revision count
- positive/beautiful spoken phrase
- calm speech cadence
- high confidence sound classification = speech

Candidate mapping:
ship presentation receives a smoother motion profile,
cleaner animation cadence,
more elegant audio transition,
or a specific temporary trait.

No permanent change without Human/quality gate.

## Adaptive music
Allowed:
If drawing cadence becomes very rapid or fragmented,
the game may reduce musical density / tempo / percussion,
or open a calmer sound layer.

Important:
This is ADAPTIVE PACING,
not an assertion that the player is anxious.

Alternative mappings can be inverted for play:
rapid drawing -> energetic music
smooth drawing -> sparse music
context decides.

## Voice as mechanic
Voice can influence:
- naming
- timing
- call-and-response
- ship-combat modifiers
- Echo seeds
- temporary presentation
- candidate dialogue/audio motifs

Sound classification can also create playful interpretation:
bark -> animal-class signal
whistle -> navigation signal
impact -> combat signal
laughter -> social signal

Never assume source class equals meaning.

## Confidence gates
HIGH CONFIDENCE:
may affect reversible presentation immediately.

MEDIUM:
store as candidate signal only.

LOW:
ignore or ask no question; preserve raw evidence if consented.

## Privacy / consent
Default:
C0 LOCAL or C1 PRIVATE PROJECT.

Raw microphone recordings should not leave device/project storage unless explicitly consented.

Derived features can be stored independently of raw audio.

## Unreal transfer
Export neutral record:
{
  "source_event": {},
  "expressive_features": {},
  "game_context": {},
  "confidence": {},
  "candidate_response": {},
  "human_status": "CANDIDATE"
}

In Unreal:
Gameplay Tags
Data Assets
audio parameter curves
animation parameter curves
state-machine inputs

## Safety
No mental-health diagnosis.
No intelligence inference.
No hidden-intent inference.
No irreversible gameplay punishment from uncertain classifier output.

## Design law
AI does not decide what the player feels.
AI notices patterns.
The game proposes a response.
The Orchestrator checks context.
Human play decides whether it was good.
