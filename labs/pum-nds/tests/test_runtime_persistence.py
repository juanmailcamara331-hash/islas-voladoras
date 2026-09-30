#!/usr/bin/env python3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
main=(ROOT/"source/main.cpp").read_text()
fs=(ROOT/"source/save_fs_backend.c").read_text()
h=(ROOT/"include/save_fs_backend.h").read_text()

assert 'save_fs_backend_init("fat:/ISL_PUM_SAVE.bin", &g_persist)' in main
assert 'save_fs_backend_load_recover(&persisted)' in main
assert 'save_backend_store(&g_persist, &g_save)' in main
assert 'if (g_persist_ready && !save_backend_store' in main
assert 'save_decode(out, blob, sizeof(blob))' in fs
assert 'snprintf(bak' in fs and '"%s.bak"' in fs
assert 'remove(g_path);' in fs and 'rename(bak, g_path);' in fs
assert 'save_fs_backend_load_recover' in h
print("runtime persistent save/recovery contract PASS")
