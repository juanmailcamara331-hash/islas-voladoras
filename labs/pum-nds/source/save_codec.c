#include "save_codec.h"
#include <string.h>

size_t save_encode(const IslSave* s, uint8_t* out, size_t cap) {
  if (!s || !out || cap < sizeof(IslSave)) return 0;
  IslSave tmp = *s;
  tmp.checksum = save_checksum(&tmp);
  memcpy(out, &tmp, sizeof(tmp));
  return sizeof(tmp);
}

int save_decode(IslSave* out, const uint8_t* data, size_t len) {
  if (!out || !data || len < sizeof(IslSave)) return 0;
  IslSave tmp;
  memcpy(&tmp, data, sizeof(tmp));
  if (!save_validate(&tmp)) return 0;
  *out = tmp;
  return 1;
}
