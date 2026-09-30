#!/usr/bin/env python3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
mk=(ROOT/"Makefile").read_text()
h=(ROOT/"include/save_fs_backend.h").read_text()
c=(ROOT/"source/save_fs_backend.c").read_text()

assert "-lfat" in mk
assert "#include <fat.h>" in c
assert "fatInitDefault()" in c
assert 'SAVE_BACKEND_FILESYSTEM' in c
assert 'fopen(tmp, "wb")' in c
assert 'fflush(f)' in c
assert 'rename(g_path, bak)' in c
assert 'rename(tmp, g_path)' in c
assert 'rename(bak, g_path)' in c
assert "save_fs_backend_available" in h
print("filesystem persistence candidate contract PASS")
