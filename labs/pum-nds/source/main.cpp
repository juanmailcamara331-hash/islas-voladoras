#include <nds.h>
#include <stdio.h>
#include "semantic_input.h"
#include "save_state.h"

static IslSave g_save;

static void init_video() {
  consoleDemoInit();
  iprintf("\x1b[2J");
  iprintf("ISL PUM NDS\n");
  iprintf("LAB ONLY / NO CANON\n\n");
  iprintf("A = primary\n");
  iprintf("B = secondary\n");
  iprintf("SELECT = PUM\n");
  iprintf("D-pad = move\n");
}

int main(void) {
  init_video();
  save_init(&g_save);

  int x = 12, y = 10;

  while (pmMainLoop()) {
    swiWaitForVBlank();
    scanKeys();

    const int down = keysDown();
    const int held = keysHeld();

    if (held & KEY_UP) y--;
    if (held & KEY_DOWN) y++;
    if (held & KEY_LEFT) x--;
    if (held & KEY_RIGHT) x++;

    if (down & KEY_A) {
      iprintf("\nPRIMARY @ %d,%d", x, y);
      g_save.event_count++;
    }

    if (down & KEY_B) {
      iprintf("\nSECONDARY");
      g_save.event_count++;
    }

    if (down & KEY_SELECT) {
      iprintf("\nPUM");
      g_save.event_count++;
      g_save.relation_count++;
    }

    g_save.play_ticks++;
    g_save.checksum = save_checksum(&g_save);
  }

  return 0;
}
