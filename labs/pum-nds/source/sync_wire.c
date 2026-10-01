#include "sync_wire.h"
#include <string.h>

typedef struct {
  uint8_t* p;
  size_t cap;
  size_t n;
} Writer;

typedef struct {
  const uint8_t* p;
  size_t len;
  size_t n;
} Reader;

static int w8(Writer* w, uint8_t v){ if(w->n+1>w->cap)return 0; w->p[w->n++]=v; return 1; }
static int w16(Writer* w, uint16_t v){ return w8(w,(uint8_t)v)&&w8(w,(uint8_t)(v>>8)); }
static int w32(Writer* w, uint32_t v){ return w16(w,(uint16_t)v)&&w16(w,(uint16_t)(v>>16)); }
static int r8(Reader* r, uint8_t* v){ if(r->n+1>r->len)return 0; *v=r->p[r->n++]; return 1; }
static int r16(Reader* r, uint16_t* v){ uint8_t a,b; if(!r8(r,&a)||!r8(r,&b))return 0; *v=(uint16_t)a|((uint16_t)b<<8); return 1; }
static int r32(Reader* r, uint32_t* v){ uint16_t a,b; if(!r16(r,&a)||!r16(r,&b))return 0; *v=(uint32_t)a|((uint32_t)b<<16); return 1; }

uint32_t sync_wire_checksum(const uint8_t* data, size_t len){
  uint32_t h=2166136261u;
  if(!data)return 0u;
  for(size_t i=0;i<len;i++){ h^=data[i]; h*=16777619u; }
  return h;
}

static int write_game(Writer* w,const SealedGameState* g){
  return w32(w,g->seed)&&w32(w,g->rng)&&w32(w,g->turns)&&w32(w,g->steps)&&
    w16(w,g->x)&&w16(w,g->y)&&w16(w,g->hp)&&w16(w,g->hp_max)&&
    w16(w,g->focus)&&w16(w,g->focus_max)&&w16(w,g->rings_mask)&&
    w16(w,g->pens_mask)&&w16(w,g->lighters_mask)&&w8(w,g->ring_slot_a)&&
    w8(w,g->ring_slot_b)&&w8(w,g->active_pen)&&w8(w,g->active_lighter)&&
    w16(w,g->milestones)&&w16(w,g->encounters)&&w16(w,g->victories)&&
    w16(w,g->recoveries)&&w16(w,g->enemy_hp)&&w16(w,g->enemy_power)&&
    w16(w,g->combo)&&w16(w,g->route_flags)&&w8(w,g->mode)&&
    w8(w,g->closure_ready)&&w16(w,g->reserved);
}
static int read_game(Reader* r,SealedGameState* g){
  return r32(r,&g->seed)&&r32(r,&g->rng)&&r32(r,&g->turns)&&r32(r,&g->steps)&&
    r16(r,&g->x)&&r16(r,&g->y)&&r16(r,&g->hp)&&r16(r,&g->hp_max)&&
    r16(r,&g->focus)&&r16(r,&g->focus_max)&&r16(r,&g->rings_mask)&&
    r16(r,&g->pens_mask)&&r16(r,&g->lighters_mask)&&r8(r,&g->ring_slot_a)&&
    r8(r,&g->ring_slot_b)&&r8(r,&g->active_pen)&&r8(r,&g->active_lighter)&&
    r16(r,&g->milestones)&&r16(r,&g->encounters)&&r16(r,&g->victories)&&
    r16(r,&g->recoveries)&&r16(r,&g->enemy_hp)&&r16(r,&g->enemy_power)&&
    r16(r,&g->combo)&&r16(r,&g->route_flags)&&r8(r,&g->mode)&&
    r8(r,&g->closure_ready)&&r16(r,&g->reserved);
}

static int write_save(Writer* w,const IslSave* s){
  if(!w32(w,s->magic)||!w16(w,s->schema)||!w16(w,s->flags)||
     !w32(w,s->world_seed)||!w32(w,s->play_ticks)||!w32(w,s->event_count)||
     !w32(w,s->relation_count)||!w16(w,s->relation_entity_id)||
     !w16(w,s->relation_redefinitions)||!write_game(w,&s->game)) return 0;
  for(unsigned i=0;i<8;i++) if(!w32(w,s->reserved[i])) return 0;
  return 1;
}
static int read_save(Reader* r,IslSave* s){
  memset(s,0,sizeof(*s));
  if(!r32(r,&s->magic)||!r16(r,&s->schema)||!r16(r,&s->flags)||
     !r32(r,&s->world_seed)||!r32(r,&s->play_ticks)||!r32(r,&s->event_count)||
     !r32(r,&s->relation_count)||!r16(r,&s->relation_entity_id)||
     !r16(r,&s->relation_redefinitions)||!read_game(r,&s->game)) return 0;
  for(unsigned i=0;i<8;i++) if(!r32(r,&s->reserved[i])) return 0;
  s->checksum=save_checksum(s);
  return save_validate(s);
}

size_t sync_wire_encode(const SyncPacket* packet,uint8_t* out,size_t cap){
  IslSave tmp;
  if(!packet||!out||cap<ISL_SYNC_WIRE_MAX||!sync_packet_unpack(packet,&tmp)) return 0;
  Writer w={out,cap,0};
  if(!w32(&w,ISL_SYNC_WIRE_MAGIC)||!w16(&w,ISL_SYNC_WIRE_SCHEMA)||!w16(&w,0)||
     !w32(&w,packet->generation)||!w8(&w,packet->from_owner)||!w8(&w,packet->to_owner)||
     !w16(&w,0)) return 0;
  size_t checksum_pos=w.n;
  if(!w32(&w,0)||!write_save(&w,&packet->save)) return 0;
  uint32_t sum=sync_wire_checksum(out+checksum_pos+4,w.n-(checksum_pos+4));
  out[checksum_pos]=(uint8_t)sum; out[checksum_pos+1]=(uint8_t)(sum>>8);
  out[checksum_pos+2]=(uint8_t)(sum>>16); out[checksum_pos+3]=(uint8_t)(sum>>24);
  return w.n;
}

int sync_wire_decode(SyncPacket* out,const uint8_t* data,size_t len){
  if(!out||!data||len<24||len>ISL_SYNC_WIRE_MAX) return 0;
  Reader r={data,len,0};
  uint32_t magic,generation,wire_sum; uint16_t schema,flags,reserved; uint8_t from,to;
  if(!r32(&r,&magic)||!r16(&r,&schema)||!r16(&r,&flags)||!r32(&r,&generation)||
     !r8(&r,&from)||!r8(&r,&to)||!r16(&r,&reserved)||!r32(&r,&wire_sum)) return 0;
  if(magic!=ISL_SYNC_WIRE_MAGIC||schema!=ISL_SYNC_WIRE_SCHEMA) return 0;
  if(sync_wire_checksum(data+r.n,len-r.n)!=wire_sum) return 0;
  IslSave save;
  if(!read_save(&r,&save)||r.n!=len) return 0;
  return sync_packet_pack(out,&save,generation,(RunOwner)from,(RunOwner)to);
}
