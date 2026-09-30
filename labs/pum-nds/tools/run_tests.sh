#!/usr/bin/env sh
set -eu
python3 tests/test_save_schema.py
python3 tests/test_save_codec.py
python3 tests/test_gesture.py
