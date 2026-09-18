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
netlify.private.toml

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


## Android SSO migration gate
The private host is identity-based, not network-based.

Expected behavior:
- authorized account + any Wi-Fi / mobile data => access;
- unauthorized account + known URL => blocked;
- network change alone must not revoke access.

Before changing Android HOME:
1. private site deployed;
2. access-probe.html reachable only after SSO;
3. open probe from a second Wi-Fi or mobile data;
4. test SSO in Android WebView;
5. verify cookies/session survive ordinary navigation;
6. BACK returns to Command Center without welcome flash;
7. app resume remains authenticated or fails closed with clear login;
8. keep current GitHub Pages HOME as rollback until two successful physical sessions.

Do not use IP allowlisting as the primary control.
Do not embed a password/token in APK, JS, query params, localStorage, or repository.
