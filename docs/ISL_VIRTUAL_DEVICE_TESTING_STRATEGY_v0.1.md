# ISL Virtual Device Testing Strategy v0.1

## Principle
Before paying the cost of repeated physical-device testing, classify each future test into:
1. SIMULATABLE
2. PARTIALLY_SIMULATABLE
3. PHYSICAL_ONLY

The goal is to front-load cheap automated evidence and reserve scarce human/device time for what simulation cannot prove.

## Layer A — Browser / layout simulation
Use Playwright or equivalent browser automation to test:
- common mobile widths/heights
- landscape/portrait
- touch-sized targets
- navigation flows
- back button behavior where web-simulatable
- loading failures
- broken links
- offline/slow network
- reduced motion
- dark/light browser environment if relevant
- accessibility tree basics
- screenshots for visual regression

Recommended matrix:
- 360x640 low-end Android-like
- 393x873 modern Android-like
- 412x915 large Android-like
- 768x1024 tablet portrait
- 1024x768 tablet landscape
- desktop 1366x768
- desktop 1920x1080

## Layer B — Android virtual devices
Prepare reusable Android Emulator profiles for:
- low RAM / small screen
- mid-range device
- recent Android
- older supported Android
- landscape tablet
- slow CPU/network scenario

Automate:
- install APK
- launch
- cold start
- navigation smoke test
- screenshot capture
- orientation change
- process recreation
- app relaunch
- WebView loading
- basic memory/crash observation

## Layer C — Network and failure simulation
Simulate:
- slow 3G/4G-like latency
- temporary offline
- failed asset
- stale cache
- 404
- API timeout
- malformed response
- old service worker
- interrupted reload

## Layer D — Physical-only gates
Virtualization does NOT fully replace:
- real launcher behavior across OEMs
- touch feel
- haptics
- real sensors
- camera/microphone behavior
- GPU quirks
- thermal throttling
- battery impact
- aggressive Android vendor process killing
- real accessibility services
- Bluetooth/NFC
- real-world brightness/audio
- install/update behavior on representative OEM devices

Physical gates should be fewer and intentional.

## Decision protocol for future tasks
Before executing any expensive validation:
- define what must be proven
- ask whether a virtual or synthetic environment can falsify the hypothesis first
- choose cheapest test with enough fidelity
- run automated matrix
- only then schedule human/device validation
- record residual uncertainty

## Reusable prepared environments
Create reusable CI presets instead of ad-hoc testing:
- WEB_LOW_END
- WEB_TABLET
- WEB_DESKTOP
- ANDROID_LOW
- ANDROID_MID
- ANDROID_RECENT
- ANDROID_TABLET
- NETWORK_BAD
- CACHE_STALE

## Output
Every virtual test should produce:
- build SHA
- environment profile
- pass/fail
- screenshots/logs
- reproducibility
- what remains unproven physically

## Rule
A virtual PASS reduces risk. It never automatically converts a PHYSICAL_ONLY gate into PASS.
