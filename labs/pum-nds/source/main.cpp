#include <nds.h>
#include <stdio.h>
#include "semantic_input.h"
#include "save_state.h"
#include "gesture_trace.h"

static IslSave g_save;
static GestureTrace g_gesture;

static void init_video() {
  consoleDemoInit();
  iprintf("\x1b[2J");
  iprintf("ISL PUM NDS\n");
  iprintf("LAB ONLY / NO CANON\n\n");
  iprintf("TECH VERTICAL\n");
}

int main(void) {
  init_video();
  save_init(&g_save);
  gesture_reset(&g_gesture);

  int x = 12, y = 10;
  touchPosition touch;

  while (pmMainLoop()) {
    swiWaitForVBlank();
    scanKeys();

    const int down = keysDown();
    const int held = keysHeld();
    const int up = keysUp();

    if (held & KEY_UP) y--;
    if (held & KEY_DOWN) y++;
    if (held & KEY_LEFT) x--;
    if (held & KEY_RIGHT) x++;

    if (down & KEY_A) g_save.event_count++;
    if (down & KEY_B) g_save.event_count++;

    if (down & KEY_SELECT) {
      g_save.event_count++;
      g_save.relation_count++;
    }

    if (held & KEY_TOUCH) {
      touchRead(&touch);
      if (down & KEY_TOUCH) gesture_begin(&g_gesture, touch.px, touch.py);
      else gesture_sample(&g_gesture, touch.px, touch.py);
    }

    if (up & KEY_TOUCH) {
      gesture_end(&g_gesture);
      g_save.event_count++;
    }

    g_save.play_ticks++;
    g_save.checksum = save_checksum(&g_save);
  }

  return 0;
}
