#pragma once
#include <stddef.h>
#include <stdint.h>
#include "save_state.h"

#ifdef __cplusplus
extern "C" {
#endif

size_t save_encode(const IslSave* s, uint8_t* out, size_t cap);
int save_decode(IslSave* out, const uint8_t* data, size_t len);

#ifdef __cplusplus
}
#endif
