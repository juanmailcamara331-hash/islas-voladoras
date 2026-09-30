#include "handoff_state.h"
#include <string.h>

void handoff_init(HandoffState* h) {
  memset(h, 0, sizeof(*h));
}

int handoff_can_write(const HandoffState* h, RunOwner who, uint32_t now) {
  if (!h) return 0;
  if (h->owner == OWNER_NONE) return 0;
  if (h->owner != (uint8_t)who) return 0;
  if (h->lease_until && now > h->lease_until) return 0;
  return 1;
}

HandoffResult handoff_claim(HandoffState* h, RunOwner who, uint32_t now, uint32_t ttl) {
  if (!h || who == OWNER_NONE) return HANDOFF_CONFLICT;

  if (h->owner != OWNER_NONE && h->owner != (uint8_t)who) {
    if (h->lease_until && now <= h->lease_until) return HANDOFF_BUSY;
    h->flags |= 1u;
  }

  h->owner = (uint8_t)who;
  h->lease_until = now + ttl;
  h->generation++;
  return (h->flags & 1u) ? HANDOFF_STALE : HANDOFF_OK;
}

HandoffResult handoff_release(HandoffState* h, RunOwner who, uint32_t checksum) {
  if (!h || h->owner != (uint8_t)who) return HANDOFF_CONFLICT;
  h->save_checksum = checksum;
  h->owner = OWNER_NONE;
  h->lease_until = 0;
  h->pending_target = OWNER_NONE;
  return HANDOFF_OK;
}
