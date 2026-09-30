#pragma once
#include <stdint.h>

#define ECHO_CAPACITY 16u

typedef enum {
  ECHO_NONE = 0,
  ECHO_GESTURE = 1,
  ECHO_ENTITY = 2,
  ECHO_RELATION = 3,
  ECHO_RHYTHM = 4
} EchoKind;

typedef struct {
  uint16_t echo_id;
  uint16_t source_event;
  uint16_t subject_id;
  uint16_t kind;
  uint32_t earliest_tick;
  uint32_t value;
  uint8_t armed;
  uint8_t fired;
  uint16_t reserved;
} EchoEntry;

typedef struct {
  EchoEntry entries[ECHO_CAPACITY];
  uint16_t count;
  uint16_t dropped;
} EchoQueue;

#ifdef __cplusplus
extern "C" {
#endif

void echo_init(EchoQueue* q);
int echo_schedule(EchoQueue* q, uint16_t echo_id, uint16_t source_event, uint16_t subject_id, EchoKind kind, uint32_t earliest_tick, uint32_t value);
EchoEntry* echo_poll(EchoQueue* q, uint32_t tick);
void echo_mark_fired(EchoEntry* e);

#ifdef __cplusplus
}
#endif
