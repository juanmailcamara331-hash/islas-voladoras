#include "trace_buffer.h"
#include <string.h>

void trace_buffer_init(TraceBuffer* b) {
  memset(b, 0, sizeof(*b));
}

void trace_buffer_push(TraceBuffer* b, TraceEvent ev) {
  if (b->count < TRACE_BUFFER_CAPACITY) {
    b->events[b->count++] = ev;
    return;
  }

  memmove(&b->events[0],
          &b->events[1],
          sizeof(TraceEvent) * (TRACE_BUFFER_CAPACITY - 1));
  b->events[TRACE_BUFFER_CAPACITY - 1] = ev;
  b->dropped++;
}
