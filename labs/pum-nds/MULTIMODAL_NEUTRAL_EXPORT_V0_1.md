# ISL PUM · Multimodal Neutral Export v0.1

Status: LAB ONLY · SPOILER-SAFE

Purpose:
Carry observable drawing/voice/audio features from tablet into Playtrace and later Unreal without coupling to a specific AI model.

## Record
{
  "event_id": "...",
  "game_tick": 0,
  "source": "DRAW|VOICE|AUDIO_EVENT",
  "source_class": "...",
  "source_confidence": 0.0,
  "features": {},
  "context_refs": [],
  "consent_tier": "C0_LOCAL",
  "candidate_response": {},
  "human_status": "UNSET"
}

## Model adapters
YAMNet/AudioSet-class classifier -> source_class + confidence.
Speech-to-text -> transcript.
Voice feature extractor -> rhythm/pitch/energy descriptors.
Drawing analyzer -> speed/curvature/stroke/revision descriptors.

Adapters may change. Record stays stable.

## Playtrace
Store only compact derived features by default.
Raw audio/image remains local/private unless consent explicitly permits upload.

## Unreal mapping
- Gameplay Tags for source/context labels
- Data Assets for response profiles
- curves for audio/animation modulation
- state-machine inputs for reversible presentation changes
- SaveGame only for approved persistent effects

## Fail-safe
If model unavailable:
- gameplay continues;
- event may be stored raw/local;
- no mechanic becomes blocked;
- no permanent penalty/reward depends on classifier availability.
