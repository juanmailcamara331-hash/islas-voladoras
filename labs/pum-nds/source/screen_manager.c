#include "screen_manager.h"
#include <stdio.h>

static IslScreenMode g_mode = SCREEN_GAMEPLAY_ONLY;
static PrintConsole g_main_console;
static PrintConsole g_aux_console;
static int g_aux_initialized = 0;

void screen_manager_init(void) {
  // Main gameplay/display engine is always the top DS screen.
  lcdMainOnTop();

  videoSetMode(MODE_0_2D);
  vramSetBankA(VRAM_A_MAIN_BG);
  consoleInit(&g_main_console, 3, BgType_Text4bpp, BgSize_T_256x256, 31, 0, true, true);
  consoleSelect(&g_main_console);

  // Keep the auxiliary/touch screen visually quiet until explicitly needed.
  videoSetModeSub(MODE_0_2D);
  vramSetBankC(VRAM_C_SUB_BG);

  g_mode = SCREEN_GAMEPLAY_ONLY;
}

void screen_manager_set(IslScreenMode mode) {
  if (mode == g_mode) return;

  if (mode == SCREEN_AUX_REQUIRED) {
    if (!g_aux_initialized) {
      consoleInit(&g_aux_console, 3, BgType_Text4bpp, BgSize_T_256x256, 31, 0, false, true);
      g_aux_initialized = 1;
    }
    consoleSelect(&g_aux_console);
    consoleClear();
    iprintf("AUX ACTIVE\n");
    consoleSelect(&g_main_console);
  } else if (g_aux_initialized) {
    consoleSelect(&g_aux_console);
    consoleClear();
    consoleSelect(&g_main_console);
  }

  g_mode = mode;
}

IslScreenMode screen_manager_mode(void) {
  return g_mode;
}
