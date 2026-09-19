# ISL Connector / Integration Research & Bug Ledger

Status: CURRENT · 2026-09-19 · ISL only.

## Operating loop
DOCS/PAPERS/WEB → HYPOTHESIS → CHEAP TEST → BUG/RESULT → ROOT CAUSE → FIX → REGRESSION → REUSABLE PATTERN → UPDATE ENTITY/DESTINATION CONTRACT → CHECKPOINT.

## Current verified practices
- **Netlify:** repo state is not deployment state. Production gate must compare deployed `commit_ref` with expected Git SHA. Forms are detected at build/deploy time; changed forms require redeploy.
- **GitHub:** retain workflow run, artifact id, commit SHA and SHA256/digest for important build outputs. Add artifact attestations when release hardening starts.
- **Android:** build success does not prove launcher appearance. Treat adaptive-icon layers/safe area and physical-device render as separate gates.
- **Accessibility:** critical actions must remain available across supported input modalities; avoid single-channel cues and provide reduced-motion/fallback paths.
- **3D:** keep authoring source plus an interoperable runtime export. Record axes, units, scale, material conventions and extensions. AI-assisted 3D requires a consistent multiview precursor when the downstream service expects volume.

## Bugs feeding the method
### BUG-GHOST-001
Original Drive file named .png but actual bytes JPEG; previous repo crop did not match approved reference.
**Pattern:** verify magic bytes, decode, dimensions, hash and source match before publish.

### BUG-NETLIFY-001
GitHub main advanced beyond Netlify production.
**Pattern:** never say “deployed” until deployed `commit_ref == expected SHA` and endpoint/asset are checked.

### BUG-APK-ICON-001
APK build succeeds and contains the ISL launcher asset, but physical launcher rendering remains a human/device gate. The packaged `isl_launcher_final.png` currently contains JPEG bytes despite the .png name.
**Pattern:** MIME/extension consistency + adaptive icon contract + mask previews + real-device check.

### BUG-ASSET-NAMING-001
Extension is not evidence of format.
**Pattern:** binary validation for critical assets.

## Required bug record
Symptom · reproducibility · version/commit · root cause · fix · regression test · related entities/connectors · generalized lesson · protocol update · rollback.

## Current deployment state
Exact ghost asset is in GitHub main and Referencias Lite v2 is versioned `v0.69.7-ghost-exact`.
Netlify production must still be checked against the new Git SHA before marking the mobile production gate closed.
