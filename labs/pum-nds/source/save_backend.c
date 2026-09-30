#include "save_backend.h"
#include "save_codec.h"

int save_backend_store(const SaveBackend* backend, const IslSave* save) {
  uint8_t blob[sizeof(IslSave)];
  if (!backend || !backend->write || !save) return 0;
  size_t len = save_encode(save, blob, sizeof(blob));
  if (len != sizeof(IslSave)) return 0;
  return backend->write(blob, len) == (int)len;
}

int save_backend_load(const SaveBackend* backend, IslSave* out) {
  uint8_t blob[sizeof(IslSave)];
  if (!backend || !backend->read || !out) return 0;
  int got = backend->read(blob, sizeof(blob));
  if (got != (int)sizeof(blob)) return 0;
  return save_decode(out, blob, sizeof(blob));
}
