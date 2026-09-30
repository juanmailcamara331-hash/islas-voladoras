#include "save_fs_backend.h"
#include <fat.h>
#include <stdio.h>
#include <string.h>

#define ISL_SAVE_PATH_MAX 160

static char g_path[ISL_SAVE_PATH_MAX];
static int g_ready = 0;

static int fs_read(void* dst, size_t len) {
  if (!g_ready || !dst || !len) return -1;
  FILE* f = fopen(g_path, "rb");
  if (!f) return -1;
  size_t got = fread(dst, 1, len, f);
  int extra = fgetc(f);
  fclose(f);
  if (got != len || extra != EOF) return -1;
  return (int)got;
}

static int fs_write(const void* src, size_t len) {
  char tmp[ISL_SAVE_PATH_MAX + 5];
  char bak[ISL_SAVE_PATH_MAX + 5];
  if (!g_ready || !src || !len) return -1;
  if (snprintf(tmp, sizeof(tmp), "%s.tmp", g_path) >= (int)sizeof(tmp)) return -1;
  if (snprintf(bak, sizeof(bak), "%s.bak", g_path) >= (int)sizeof(bak)) return -1;

  FILE* f = fopen(tmp, "wb");
  if (!f) return -1;
  size_t wrote = fwrite(src, 1, len, f);
  int flush_ok = fflush(f) == 0;
  int close_ok = fclose(f) == 0;
  if (wrote != len || !flush_ok || !close_ok) {
    remove(tmp);
    return -1;
  }

  /* Preserve one known previous copy. Never delete the live save before
     the replacement is fully written. */
  remove(bak);
  if (rename(g_path, bak) != 0) {
    /* First save is allowed to have no previous generation. */
    FILE* existing = fopen(g_path, "rb");
    if (existing) {
      fclose(existing);
      remove(tmp);
      return -1;
    }
  }

  if (rename(tmp, g_path) != 0) {
    rename(bak, g_path);
    remove(tmp);
    return -1;
  }
  return (int)len;
}

int save_fs_backend_init(const char* path, SaveBackend* out_backend) {
  if (!path || !out_backend) return 0;
  size_t n = strlen(path);
  if (n == 0 || n >= sizeof(g_path)) return 0;
  if (!fatInitDefault()) return 0;
  memcpy(g_path, path, n + 1);
  out_backend->kind = SAVE_BACKEND_FILESYSTEM;
  out_backend->read = fs_read;
  out_backend->write = fs_write;
  g_ready = 1;
  return 1;
}

int save_fs_backend_available(void) {
  return g_ready;
}
