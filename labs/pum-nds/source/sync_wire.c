#include "sync_wire.h"
#include "save_codec.h"
#include <string.h>

static void w16(uint8_t* p, uint16_t v){ p[0]=(uint8_t)v; p[1]=(uint8_t)(v>>8); }
static void w32(uint8_t* p, uint32_t v){ p[0]=(uint8_t)v; p[1]=(uint8_t)(v>>8); p[2]=(uint8_t)(v>>16); p[3]=(uint8_t)(v>>24); }
static uint16_t r16(const uint8_t* p){ return (uint16_t)p[0] | ((uint16_t)p[1]<<8); }
static uint32_t r32(const uint8_t* p){ return (uint32_t)p[0] | ((uint32_t)p[1]<<8) | ((uint32_t)p[2]<<16) | ((uint32_t)p[3]<<24); }

static uint32_t fnv1a(const uint8_t* p, size_t n){
  uint32_t h=2166136261u;
  for(size_t i=0;i<n;i++){ h^=p[i]; h*=16777619u; }
  return h;
}

size_t sync_wire_encode(const SyncPacket* packet, uint8_t* out, size_t cap){
  IslSave checked;
  uint8_t save_blob[sizeof(IslSave)];
  if(!packet || !out) return 0;
  if(!sync_packet_unpack(packet,&checked)) return 0;
  const size_t payload_len=save_encode(&checked,save_blob,sizeof(save_blob));
  const size_t total=ISL_SYNC_WIRE_HEADER+payload_len;
  if(payload_len!=sizeof(IslSave) || cap<total) return 0;

  memset(out,0,total);
  w32(out+0,ISL_SYNC_WIRE_MAGIC);
  w16(out+4,ISL_SYNC_WIRE_SCHEMA);
  w16(out+6,(uint16_t)packet->flags);
  w32(out+8,packet->generation);
  w32(out+12,packet->save_checksum);
  out[16]=packet->from_owner;
  out[17]=packet->to_owner;
  w16(out+18,(uint16_t)payload_len);
  memcpy(out+ISL_SYNC_WIRE_HEADER,save_blob,payload_len);
  w32(out+20,fnv1a(out+ISL_SYNC_WIRE_HEADER,payload_len));
  return total;
}

int sync_wire_decode(SyncPacket* out,const uint8_t* data,size_t len){
  if(!out || !data || len<ISL_SYNC_WIRE_HEADER) return 0;
  if(r32(data+0)!=ISL_SYNC_WIRE_MAGIC || r16(data+4)!=ISL_SYNC_WIRE_SCHEMA) return 0;
  const uint16_t payload_len=r16(data+18);
  if(payload_len!=sizeof(IslSave) || len!=ISL_SYNC_WIRE_HEADER+(size_t)payload_len) return 0;
  if(r32(data+20)!=fnv1a(data+ISL_SYNC_WIRE_HEADER,payload_len)) return 0;

  IslSave save;
  if(!save_decode(&save,data+ISL_SYNC_WIRE_HEADER,payload_len)) return 0;
  return sync_packet_pack(out,&save,r32(data+8),(RunOwner)data[16],(RunOwner)data[17]) &&
         out->save_checksum==r32(data+12);
}
