#include "echo.h"
#include <string.h>

void echo_init(EchoQueue* q) {
  memset(q, 0, sizeof(*q));
}

int echo_schedule(EchoQueue* q, uint16_t echo_id, uint16_t source_event, uint16_t subject_id, EchoKind kind, uint32_t earliest_tick, uint32_t value) {
  if (!q || q->count >= ECHO_CAPACITY) {
    if (q) q->dropped++;
    return 0;
  }
  EchoEntry* e = &q->entries[q->count++];
  memset(e, 0, sizeof(*e));
  e->echo_id = echo_id;
  e->source_event = source_event;
  e->subject_id = subject_id;
  e->kind = (uint16_t)kind;
  e->earliest_tick = earliest_tick;
  e->value = value;
  e->armed = 1;
  return 1;
}

EchoEntry* echo_poll(EchoQueue* q, uint32_t tick) {
  if (!q) return 0;
  for (uint16_t i = 0; i < q->count; ++i) {
    EchoEntry* e = &q->entries[i];
    if (e->armed && !e->fired && tick >= e->earliest_tick) return e;
  }
  return 0;
}

void echo_mark_fired(EchoEntry* e) {
  if (!e) return;
  e->fired = 1;
  e->armed = 0;
}
