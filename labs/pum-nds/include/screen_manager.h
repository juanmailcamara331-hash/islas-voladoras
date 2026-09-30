#pragma once
#include <nds.h>

typedef enum {
  SCREEN_GAMEPLAY_ONLY = 0,
  SCREEN_AUX_REQUIRED = 1
} IslScreenMode;

#ifdef __cplusplus
extern "C" {
#endif

void screen_manager_init(void);
void screen_manager_set(IslScreenMode mode);
IslScreenMode screen_manager_mode(void);

#ifdef __cplusplus
}
#endif
