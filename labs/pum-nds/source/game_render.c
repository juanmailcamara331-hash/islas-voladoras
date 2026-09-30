#include "game_render.h"
#include <nds.h>

static u16* fb = 0;

static inline u16 C(int r,int g,int b){ return RGB15(r,g,b) | BIT(15); }

static void px(int x,int y,u16 c){
  if(!fb || x<0 || x>=256 || y<0 || y>=192) return;
  fb[y*256+x]=c;
}

static void rect(int x,int y,int w,int h,u16 c){
  for(int yy=0;yy<h;yy++) for(int xx=0;xx<w;xx++) px(x+xx,y+yy,c);
}

static void frame(int x,int y,int w,int h,u16 c){
  rect(x,y,w,1,c); rect(x,y+h-1,w,1,c); rect(x,y,1,h,c); rect(x+w-1,y,1,h,c);
}

static void clear_bg(void){
  const u16 bg=C(1,4,5);
  for(int i=0;i<256*192;i++) fb[i]=bg;
  // quiet material grain / vertical rails outside 192x192 safe square
  for(int y=0;y<192;y+=3){
    px(19+(y%9),y,C(2,6,7));
    px(236-(y%7),y,C(2,6,7));
  }
  frame(32,0,192,192,C(4,10,11));
}

static void bars(const SealedGameState* g){
  int hpw = g->hp_max ? (int)(64u*g->hp/g->hp_max) : 0;
  int fow = g->focus_max ? (int)(36u*g->focus/g->focus_max) : 0;
  rect(42,10,68,5,C(2,5,6));
  rect(44,12,hpw,1,C(24,18,6));
  rect(42,18,40,4,C(2,5,6));
  rect(44,19,fow,1,C(7,19,18));
}

static void draw_player(int x,int y){
  const u16 gold=C(28,21,7);
  rect(x+3,y,2,8,gold);
  rect(x,y+3,8,2,gold);
  px(x+3,y+3,C(31,29,19));
  px(x+4,y+4,C(31,29,19));
}

static void draw_map(const SealedGameState* g){
  const int ox=56, oy=32, cs=12;
  const u16 cell0=C(2,7,8);
  const u16 cell1=C(3,10,10);
  const u16 edge=C(5,13,13);
  const u16 spark=C(27,20,6);

  for(int y=0;y<12;y++){
    for(int x=0;x<12;x++){
      unsigned v=(x*17u+y*31u+g->seed)%23u;
      u16 col = v<4 ? cell1 : cell0;
      rect(ox+x*cs,oy+y*cs,cs-1,cs-1,col);
      if(v==0u){
        px(ox+x*cs+5,oy+y*cs+4,spark);
        px(ox+x*cs+6,oy+y*cs+5,spark);
      }
      if(((x+y)&7)==0) px(ox+x*cs+1,oy+y*cs+10,edge);
    }
  }
  draw_player(ox+g->x*cs+2,oy+g->y*cs+2);
}

static void draw_combat(const SealedGameState* g){
  const u16 dim=C(2,7,8);
  const u16 edge=C(7,18,17);
  const u16 hot=C(26,7,7);
  const u16 gold=C(27,20,6);

  for(int y=34;y<156;y+=10)
    rect(54+(y%20),y,148-(y%20),1,dim);

  int cx=128, cy=88;
  for(int r=46;r>8;r-=7){
    u16 cc=(r%14)?edge:dim;
    frame(cx-r/2,cy-r/3,r,r*2/3,cc);
  }
  rect(cx-3,cy-3,6,6,hot);

  int ehp=g->enemy_hp>24?24:g->enemy_hp;
  rect(92,145,72,5,C(2,5,6));
  rect(94,147,ehp*68/24,1,hot);

  // three non-text action marks
  frame(82,164,20,16,gold);
  frame(118,164,20,16,edge);
  frame(154,164,20,16,C(16,8,18));
}

static void draw_recover(void){
  const u16 fog=C(3,8,9), pale=C(17,23,21);
  for(int i=0;i<14;i++){
    int w=20+i*8;
    frame(128-w/2,92-i*3,w,1,fog);
  }
  rect(126,88,4,10,pale);
  rect(123,91,10,4,pale);
}

static void draw_complete(void){
  const u16 gold=C(29,21,7), pale=C(20,25,22);
  for(int r=12;r<120;r+=12) frame(128-r/2,96-r/2,r,r,(r%24)?gold:pale);
  rect(126,70,4,52,C(31,27,16));
}

void game_render_init(void){
  lcdMainOnTop();
  videoSetMode(MODE_5_2D | DISPLAY_BG3_ACTIVE);
  vramSetBankA(VRAM_A_MAIN_BG);
  int bg3=bgInit(3,BgType_Bmp16,BgSize_B16_256x256,0,0);
  fb=(u16*)bgGetGfxPtr(bg3);
  bgSetPriority(bg3,3);
}

void game_render_frame(const SealedGameState* g){
  if(!g || !fb) return;
  clear_bg();
  bars(g);
  if(g->mode==GAME_EXPLORE) draw_map(g);
  else if(g->mode==GAME_COMBAT) draw_combat(g);
  else if(g->mode==GAME_RECOVER) draw_recover();
  else draw_complete();
}
