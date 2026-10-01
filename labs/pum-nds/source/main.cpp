#include <nds.h>
#include <stdio.h>
#include "semantic_input.h"
#include "save_state.h"
#include "save_journal.h"
#include "save_backend.h"
#include "save_fs_backend.h"
#include "gesture_trace.h"
#include "trace_buffer.h"
#include "tempo.h"
#include "object_biography.h"
#include "echo.h"
#include "screen_manager.h"
#include "sealed_game.h"
#include "game_render.h"
#include "audio_feedback.h"

static IslSave g_save;
static GestureTrace g_gesture;
static TraceBuffer g_trace;
static TempoState g_tempo;
static BiographyBook g_biography;
static EchoQueue g_echo;
static SealedGameState g_game;
static SaveJournal g_journal;
static int g_paused = 0;
static SaveBackend g_persist;
static int g_persist_ready = 0;

static uint32_t g_last_action_tick = 0;
static uint16_t g_event_seq = 1;
static const uint16_t TECH_ENTITY = 1;

static void push_trace(TraceKind kind, int16_t a, int16_t b, uint32_t value) {
  TraceEvent ev;
  ev.version = ISL_TRACE_VERSION;
  ev.kind = (uint16_t)kind;
  ev.tick = g_save.play_ticks;
  ev.a = a;
  ev.b = b;
  ev.value = value;
  trace_buffer_push(&g_trace, ev);
}

static void observe_action(TraceKind kind) {
  uint32_t dt = g_save.play_ticks - g_last_action_tick;
  if (dt > 0xFFFFu) dt = 0xFFFFu;
  tempo_observe_action(&g_tempo, (uint16_t)dt);
  g_last_action_tick = g_save.play_ticks;
  if (kind != TRACE_NONE) push_trace(kind, 0, 0, 0);
  push_trace(TRACE_TEMPO, (int16_t)tempo_band(&g_tempo), 0, g_tempo.sample_window);
}

static SemanticAction map_semantic(int down) {
  if (down & KEY_UP) return ACT_MOVE_UP;
  if (down & KEY_DOWN) return ACT_MOVE_DOWN;
  if (down & KEY_LEFT) return ACT_MOVE_LEFT;
  if (down & KEY_RIGHT) return ACT_MOVE_RIGHT;
  if (down & KEY_A) return ACT_PRIMARY;
  if (down & KEY_B) return ACT_SECONDARY;
  if (down & KEY_X) return ACT_CONTEXT_L1;
  if (down & KEY_Y) return ACT_CONTEXT_R1;
  if (down & KEY_SELECT) return ACT_PUM;
  if (down & KEY_START) return ACT_MENU;
  return ACT_NONE;
}

static GameAction game_action_from_semantic(SemanticAction action) {
  switch (action) {
    case ACT_MOVE_UP: return GAME_ACT_UP;
    case ACT_MOVE_DOWN: return GAME_ACT_DOWN;
    case ACT_MOVE_LEFT: return GAME_ACT_LEFT;
    case ACT_MOVE_RIGHT: return GAME_ACT_RIGHT;
    case ACT_PRIMARY: return GAME_ACT_PRIMARY;
    case ACT_SECONDARY: return GAME_ACT_SECONDARY;
    case ACT_PUM:
    case ACT_CONTEXT_L1:
    case ACT_CONTEXT_R1:
      return GAME_ACT_CONTEXT;
    default:
      return GAME_ACT_NONE;
  }
}

static TraceKind trace_kind_from_semantic(SemanticAction action) {
  if (action == ACT_PRIMARY) return TRACE_PRIMARY;
  if (action == ACT_SECONDARY) return TRACE_SECONDARY;
  if (action == ACT_PUM || action == ACT_CONTEXT_L1 || action == ACT_CONTEXT_R1) return TRACE_PUM;
  return TRACE_NONE;
}

static void render_game(void) {
  game_render_frame(&g_game);
}

static void sync_save_from_runtime(void) {
  g_save.game = g_game;
  const BiographyEntry* rel = biography_find(&g_biography, TECH_ENTITY);
  g_save.relation_entity_id = rel ? rel->entity_id : 0u;
  g_save.relation_redefinitions = rel ? rel->redefinitions : 0u;
  g_save.checksum = save_checksum(&g_save);
}

static void restore_biography_from_save(void) {
  biography_init(&g_biography);
  if (g_save.relation_entity_id == 0u) return;
  for (uint16_t i = 0; i < g_save.relation_redefinitions; ++i)
    biography_record_redefinition(&g_biography, g_save.relation_entity_id, g_save.play_ticks);
}

static int checkpoint_save(void) {
  sync_save_from_runtime();
  if (!save_journal_stage(&g_journal, &g_save)) return 0;
  if (!save_journal_commit(&g_journal)) return 0;
  if (g_persist_ready && !save_backend_store(&g_persist, &g_save)) return 0;
  return 1;
}

static int checkpoint_load(void) {
  IslSave restored;
  if (!save_journal_recover(&g_journal, &restored)) return 0;
  g_save = restored;
  g_game = g_save.game;
  restore_biography_from_save();
  return 1;
}

static void init_video() {
  screen_manager_init();
  game_render_init();
  audio_feedback_init();

  save_init(&g_save);
  g_persist_ready = save_fs_backend_init("ISL_PUM_SAVE.bin", &g_persist);
  if (g_persist_ready) {
    IslSave persisted;
    if (save_fs_backend_load_recover(&persisted)) g_save = persisted;
  }

  g_game = g_save.game;
  render_game();
}

int main(void) {
  init_video();
  gesture_reset(&g_gesture);
  trace_buffer_init(&g_trace);
  tempo_init(&g_tempo);
  restore_biography_from_save();
  echo_init(&g_echo);
  save_journal_init(&g_journal, &g_save);

  touchPosition touch;
  uint32_t decay_tick = 0;

  while (1) {
    swiWaitForVBlank();
    audio_feedback_tick();
    scanKeys();

    const int down = keysDown();
    const int held = keysHeld();
    const int up = keysUp();

    if (down & KEY_START) {
      g_paused = !g_paused;
      if (g_paused) game_render_pause(&g_game, 1);
      else render_game();
      audio_feedback_play(SFX_ACTION);
      continue;
    }

    if (g_paused) {
      if (down & KEY_A) {
        if (checkpoint_save()) audio_feedback_play(SFX_COMPLETE);
        else audio_feedback_play(SFX_IMPACT);
        game_render_pause(&g_game, 1);
      } else if (down & KEY_Y) {
        if (checkpoint_load()) audio_feedback_play(SFX_RECOVER);
        else audio_feedback_play(SFX_IMPACT);
        game_render_pause(&g_game, 1);
      } else if (down & KEY_B) {
        g_paused = 0;
        audio_feedback_play(SFX_ACTION);
        render_game();
      }
      continue;
    }

    SemanticAction semantic = map_semantic(down);
    GameAction action = game_action_from_semantic(semantic);
    if (action != GAME_ACT_NONE) {
      GameMode before = (GameMode)g_game.mode;
      sealed_game_step(&g_game, action);
      if (before != (GameMode)g_game.mode) {
        if (g_game.mode == GAME_COMBAT) audio_feedback_play(SFX_IMPACT);
        else if (g_game.mode == GAME_RECOVER) audio_feedback_play(SFX_IMPACT);
        else if (g_game.mode == GAME_COMPLETE) audio_feedback_play(SFX_COMPLETE);
        else audio_feedback_play(SFX_ACTION);
      } else if (action >= GAME_ACT_UP && action <= GAME_ACT_RIGHT) {
        audio_feedback_play(SFX_STEP);
      } else {
        audio_feedback_play(SFX_ACTION);
      }
      g_save.event_count++;
      observe_action(trace_kind_from_semantic(semantic));

      if (action == GAME_ACT_PRIMARY) {
        biography_record_use(&g_biography, TECH_ENTITY, g_save.play_ticks);
        push_trace(TRACE_BIOGRAPHY, TECH_ENTITY, 1, 0);
      }

      if (action == GAME_ACT_CONTEXT) {
        g_save.relation_count++;
        biography_record_redefinition(&g_biography, TECH_ENTITY, g_save.play_ticks);
        push_trace(TRACE_BIOGRAPHY, TECH_ENTITY, 2, 0);
        echo_schedule(&g_echo, g_event_seq++, (uint16_t)g_trace.count, TECH_ENTITY,
                      ECHO_RELATION, g_save.play_ticks + 180u, g_save.relation_count);
      }

      if (before != (GameMode)g_game.mode || action == GAME_ACT_CONTEXT)
        checkpoint_save();

      if (before != (GameMode)g_game.mode || action != GAME_ACT_NONE)
        render_game();
    }

    if (held & KEY_TOUCH) {
      touchRead(&touch);
      if (down & KEY_TOUCH) gesture_begin(&g_gesture, touch.px, touch.py);
      else gesture_sample(&g_gesture, touch.px, touch.py);
    }

    if (up & KEY_TOUCH) {
      gesture_end(&g_gesture);
      g_save.event_count++;
      tempo_observe_gesture(&g_tempo, g_gesture.distance, g_gesture.duration_frames, g_gesture.direction_changes);
      push_trace(TRACE_GESTURE, (int16_t)g_gesture.direction_changes,
                 (int16_t)g_gesture.duration_frames, g_gesture.distance);
      push_trace(TRACE_TEMPO, (int16_t)tempo_band(&g_tempo), 0, g_tempo.sample_window);
      echo_schedule(&g_echo, g_event_seq++, (uint16_t)g_trace.count, TECH_ENTITY,
                    ECHO_GESTURE, g_save.play_ticks + 120u, g_gesture.distance);
    }

    EchoEntry* echo = echo_poll(&g_echo, g_save.play_ticks);
    if (echo) {
      push_trace(TRACE_ECHO, (int16_t)echo->subject_id, (int16_t)echo->kind, echo->source_event);
      echo_mark_fired(echo);
    }

    g_save.game = g_game;
    g_save.play_ticks++;
    if (g_save.play_ticks - decay_tick >= 120u) {
      tempo_decay(&g_tempo);
      decay_tick = g_save.play_ticks;
    }
    g_save.checksum = save_checksum(&g_save);
  }

  return 0;
}
