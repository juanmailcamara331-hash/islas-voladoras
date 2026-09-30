#!/usr/bin/env sh
set -eu
python3 tests/test_save_schema.py
python3 tests/test_gesture.py
python3 tests/test_handoff.py
