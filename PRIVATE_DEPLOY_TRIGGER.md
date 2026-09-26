# ISL PRIVATE DEPLOY TRIGGER
version=v0.95-creative-dna-human-first
date=2026-09-26
target=islas-voladoras-isl-private
site_id=f3cb9c63-9ff1-4de2-b6df-c8e6af403a4f
reason=retry human-first Creative DNA / Serendipity private surface after build-gate fix

strategy=sso-protected-alias-on-authorized-project

trigger=deploy-v0.95-creative-dna-human-first-retry-01

guardrails=PRIMARY_UNCHANGED · SAFE_HARBOR_UNCHANGED · NO_AUTO_CANON · NO_CROSS_PROJECT_ASSET_IMPORT

retry=creative-dna-human-first-build-verified-2026-09-26

retry=lightweight-create-decide-build-check-2026-09-26

retry=token-refresh-access-check-2026-09-26

retry=gallery-top-quality-head-sync-2026-09-26
expected_head=11f2677ecdd8736a80670b65a43e55b57b02f4e5
purpose=deploy current Gallery runtime assets for real-device verification
