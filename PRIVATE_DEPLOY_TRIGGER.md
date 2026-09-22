# ISL PRIVATE DEPLOY TRIGGER
version=v0.90.1
date=2026-09-22
target=islas-voladoras-isl-private
site_id=f3cb9c63-9ff1-4de2-b6df-c8e6af403a4f
reason=recover canonical private deploy for Carrillo-Velaria human gate

retry=explicit-netlify-site-link

retry=hard-linked-state-json

strategy=sso-protected-alias-on-authorized-project

trigger=deploy-v0.89-rumbo-carrillo-velaria

trigger=deploy-v0.89-authorized-sso-alias

trigger=deploy-v0.90.1-canonical-private-recovery


- 2026-09-22T17:17+02:00 · deploy Prism World 001 + Mundos Prisma gallery

- 2026-09-22T17:45+02:00 · retry after explicit --site fix

- 2026-09-22T17:49+02:00 · temporary fallback deploy via private-i1oq for human test
