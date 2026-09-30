#include "gesture_trace.h"
#include <string.h>

static int iabs_i(int v) { return v < 0 ? -v : v; }
static int8_t sign_i(int v) { return (v > 0) - (v < 0); }

void gesture_reset(GestureTrace* g) {
  memset(g, 0, sizeof(*g));
}

void gesture_begin(GestureTrace* g, int x, int y) {
  gesture_reset(g);
  g->active = 1;
  g->samples = 1;
  g->min_x = g->max_x = (uint16_t)x;
  g->min_y = g->max_y = (uint16_t)y;
  g->last_x = (int16_t)x;
  g->last_y = (int16_t)y;
}

void gesture_sample(GestureTrace* g, int x, int y) {
  if (!g->active) {
    gesture_begin(g, x, y);
    return;
  }

  int dx = x - g->last_x;
  int dy = y - g->last_y;

  g->distance += (uint32_t)(iabs_i(dx) + iabs_i(dy));
  g->duration_frames++;
  g->samples++;

  if (x < g->min_x) g->min_x = (uint16_t)x;
  if (x > g->max_x) g->max_x = (uint16_t)x;
  if (y < g->min_y) g->min_y = (uint16_t)y;
  if (y > g->max_y) g->max_y = (uint16_t)y;

  int8_t sx = sign_i(dx);
  int8_t sy = sign_i(dy);
  if ((sx && g->last_dx_sign && sx != g->last_dx_sign) ||
      (sy && g->last_dy_sign && sy != g->last_dy_sign)) {
    g->direction_changes++;
  }

  if (sx) g->last_dx_sign = sx;
  if (sy) g->last_dy_sign = sy;
  g->last_x = (int16_t)x;
  g->last_y = (int16_t)y;
}

void gesture_end(GestureTrace* g) {
  g->active = 0;
}
