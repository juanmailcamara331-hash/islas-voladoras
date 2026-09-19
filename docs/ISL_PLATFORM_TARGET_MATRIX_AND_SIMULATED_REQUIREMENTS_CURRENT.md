# ISL Platform Target Matrix & Simulated Requirements CURRENT

Version: v0.1 · 2026-09-19 · ISL only.

## Evidence states
- VERIFIED PUBLIC FACT
- SIMULATED TARGET
- MEASURED
- PRIVATE SDK / UNKNOWN
- HUMAN DECISION

## Performance ladder
- T0 SURVIVAL: 20 FPS stress test, never shipping target.
- T1 MINIMUM: provisional 30 FPS stable fallback with aggressive LOD/VFX/material degradation.
- T2 STANDARD: target 60 FPS where hardware permits.
- T3 ENHANCED: 60 FPS + premium fidelity, never gameplay-exclusive.

## Platform references
- Android: frame pacing + average/P90/P99 stability; dynamic refresh and thermal/battery awareness.
- iPhone/iPad: capability-driven Metal tiering and device-specific quality, not one fixed “iPhone minimum” guessed in advance.
- PS4/PS4 Pro: public hardware used as generation-old budget reference; certification/SDK requirements remain PRIVATE/UNKNOWN until authorized access.
- Xbox One/One S: public hardware used as generation-old CPU/memory/bandwidth reference; certification/SDK private.
- PC/web: low/standard/high tiers with scalable shaders, textures, VFX, streaming and input.
- Android handhelds: classify by actual capability/input/runtime; no marketing-spec whitelist.

## Weight model (simulated; revisable)
Gameplay 30%
Phenomenology/legibility 20%
Accessibility 15%
Compatibility 15%
Performance 10%
Production/maintainability 10%

## Rule
Same game rules, different fidelity. No critical information may exist only in premium particles, color, audio or high-end shaders.

Full matrix lives in Drive: ISL_PLATFORM_TARGET_MATRIX_AND_SIMULATED_REQUIREMENTS_CURRENT.
