#pragma once
#include "save_backend.h"

#ifdef __cplusplus
extern "C" {
#endif

/* Optional FAT/DLDI transport. Failure means persistence is unavailable,
   never that gameplay must fail. */
int save_fs_backend_init(const char* path, SaveBackend* out_backend);
int save_fs_backend_available(void);
/* Load the primary save; if it is invalid, recover the validated .bak copy
   and restore it as primary. */
int save_fs_backend_load_recover(IslSave* out);

#ifdef __cplusplus
}
#endif
