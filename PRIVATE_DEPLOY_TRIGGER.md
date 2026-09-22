# ISL PRIVATE DEPLOY TRIGGER
version=v0.89
date=2026-09-22
target=islas-voladoras-isl-private-i1oq
site_id=6182a9ad-e228-41b9-816a-1cf7d750e7e7
reason=first authenticated Command Center private deployment

retry=explicit-netlify-site-link

retry=hard-linked-state-json

strategy=sso-protected-alias-on-authorized-project

trigger=deploy-v0.89-rumbo-carrillo-velaria
