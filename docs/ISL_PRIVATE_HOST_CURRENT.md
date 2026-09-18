# ISL PRIVATE HOST CURRENT
Fecha: 2026-09-19
Estado: PROVISIONADO · BUILD AÚN NO DESPLEGADO

## Netlify private project
Name:
islas-voladoras-isl-private-i1oq

Site ID:
6182a9ad-e228-41b9-816a-1cf7d750e7e7

Primary URL:
https://islas-voladoras-isl-private-i1oq.netlify.app

Team:
mayadebug

Access control observed at creation:
- requiresSSOTeamLogin: true
- applies to: all
- team members: 1
- current user role: Owner

## Build
Config:
netlify-private.toml

Command:
bash netlify-private-build.sh

Publish:
build/private

CI:
.github/workflows/private-build-audit.yml

## Security position
This is the intended future host for the Command Center / APK remote shell.
Do NOT switch Android HOME until:
1. private build deployed;
2. SSO protection confirmed from an unauthenticated browser;
3. private build audit GREEN;
4. physical Android cold start / back / resume passes;
5. rollback to current Pages URL remains available.

## Current APK
Still points to:
https://juanmailcamara331-hash.github.io/islas-voladoras/index.html?app=1&native=062&v=20260918-8

That URL remains operational but is not considered real private hosting.

## Migration target
PRIVATE_WEB_GREEN && PRIVATE_ACCESS_GREEN && APK_GREEN && HUMAN_DEVICE_GREEN
