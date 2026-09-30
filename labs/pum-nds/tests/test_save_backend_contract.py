#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
h=(ROOT/"include/save_backend.h").read_text()
c=(ROOT/"source/save_backend.c").read_text()

assert "save_backend_store" in h and "save_backend_load" in h
assert "save_encode" in c and "save_decode" in c
assert "backend->write(blob, len) == (int)len" in c
assert "got != (int)sizeof(blob)" in c
assert "SAVE_BACKEND_NONE" in h
assert "SAVE_BACKEND_EMULATOR_BACKUP" in h
assert "SAVE_BACKEND_FILESYSTEM" in h
assert "SAVE_BACKEND_TEST_MEMORY" in h
print("save backend transport contract PASS")
