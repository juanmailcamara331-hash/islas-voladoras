#pragma once
#include <stdint.h>
#include "playtrace.h"

#define TRACE_BUFFER_CAPACITY 64u

typedef struct {
  TraceEvent events[TRACE_BUFFER_CAPACITY];
  uint16_t count;
  uint16_t dropped;
} TraceBuffer;

#ifdef __cplusplus
extern "C" {
#endif

void trace_buffer_init(TraceBuffer* b);
void trace_buffer_push(TraceBuffer* b, TraceEvent ev);

#ifdef __cplusplus
}
#endif
