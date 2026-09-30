#pragma once
#include <stddef.h>
#include <stdint.h>

typedef enum {
  SAVE_BACKEND_NONE = 0,
  SAVE_BACKEND_EMULATOR_BACKUP = 1,
  SAVE_BACKEND_FILESYSTEM = 2,
  SAVE_BACKEND_TEST_MEMORY = 3
} SaveBackendKind;

typedef struct {
  SaveBackendKind kind;
  int (*read)(void* dst, size_t len);
  int (*write)(const void* src, size_t len);
} SaveBackend;
