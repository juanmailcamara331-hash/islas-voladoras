#pragma once
#include <stdint.h>

typedef enum {
  OWNER_NONE = 0,
  OWNER_R36 = 1,
  OWNER_TABLET = 2
} RunOwner;

typedef enum {
  HANDOFF_OK = 0,
  HANDOFF_BUSY = 1,
  HANDOFF_STALE = 2,
  HANDOFF_CONFLICT = 3
} HandoffResult;

typedef struct {
  uint32_t generation;
  uint32_t save_checksum;
  uint32_t lease_until;
  uint8_t owner;
  uint8_t pending_target;
  uint16_t flags;
} HandoffState;

#ifdef __cplusplus
extern "C" {
#endif

void handoff_init(HandoffState* h);
HandoffResult handoff_claim(HandoffState* h, RunOwner who, uint32_t now, uint32_t ttl);
HandoffResult handoff_release(HandoffState* h, RunOwner who, uint32_t checksum);
int handoff_can_write(const HandoffState* h, RunOwner who, uint32_t now);

#ifdef __cplusplus
}
#endif
