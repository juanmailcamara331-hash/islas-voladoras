#pragma once
#include <stddef.h>
#include <stdint.h>
#include "save_state.h"

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


#ifdef __cplusplus
extern "C" {
#endif

int save_backend_store(const SaveBackend* backend, const IslSave* save);
int save_backend_load(const SaveBackend* backend, IslSave* out);

#ifdef __cplusplus
}
#endif
