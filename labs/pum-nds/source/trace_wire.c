#include "trace_wire.h"
#include <string.h>

static int put16(uint8_t* out,size_t cap,size_t* n,uint16_t v){
  if(*n+2>cap)return 0; out[(*n)++]=(uint8_t)v; out[(*n)++]=(uint8_t)(v>>8); return 1;
}
static int put32(uint8_t* out,size_t cap,size_t* n,uint32_t v){
  return put16(out,cap,n,(uint16_t)v)&&put16(out,cap,n,(uint16_t)(v>>16));
}
static int get16(const uint8_t* in,size_t len,size_t* n,uint16_t* v){
  if(*n+2>len)return 0; *v=(uint16_t)in[*n]|((uint16_t)in[*n+1]<<8); *n+=2; return 1;
}
static int get32(const uint8_t* in,size_t len,size_t* n,uint32_t* v){
  uint16_t a,b; if(!get16(in,len,n,&a)||!get16(in,len,n,&b))return 0;
  *v=(uint32_t)a|((uint32_t)b<<16); return 1;
}

size_t trace_wire_encode(const TraceBuffer* buffer,uint8_t* out,size_t cap){
  if(!buffer||!out||buffer->count>TRACE_BUFFER_CAPACITY)return 0;
  size_t n=0;
  if(!put32(out,cap,&n,ISL_TRACE_WIRE_MAGIC)||!put16(out,cap,&n,ISL_TRACE_WIRE_SCHEMA)||
     !put16(out,cap,&n,buffer->count)||!put16(out,cap,&n,buffer->dropped)||!put16(out,cap,&n,0)) return 0;
  for(uint16_t i=0;i<buffer->count;i++){
    const TraceEvent* e=&buffer->events[i];
    if(!put16(out,cap,&n,e->version)||!put16(out,cap,&n,e->kind)||!put32(out,cap,&n,e->tick)||
       !put16(out,cap,&n,(uint16_t)e->a)||!put16(out,cap,&n,(uint16_t)e->b)||!put32(out,cap,&n,e->value)) return 0;
  }
  return n;
}

int trace_wire_decode(TraceBuffer* out,const uint8_t* data,size_t len){
  if(!out||!data)return 0;
  size_t n=0; uint32_t magic; uint16_t schema,count,dropped,reserved;
  if(!get32(data,len,&n,&magic)||!get16(data,len,&n,&schema)||!get16(data,len,&n,&count)||
     !get16(data,len,&n,&dropped)||!get16(data,len,&n,&reserved)) return 0;
  if(magic!=ISL_TRACE_WIRE_MAGIC||schema!=ISL_TRACE_WIRE_SCHEMA||count>TRACE_BUFFER_CAPACITY)return 0;
  TraceBuffer tmp; memset(&tmp,0,sizeof(tmp)); tmp.count=count; tmp.dropped=dropped;
  for(uint16_t i=0;i<count;i++){
    TraceEvent* e=&tmp.events[i]; uint16_t a,b;
    if(!get16(data,len,&n,&e->version)||!get16(data,len,&n,&e->kind)||!get32(data,len,&n,&e->tick)||
       !get16(data,len,&n,&a)||!get16(data,len,&n,&b)||!get32(data,len,&n,&e->value)) return 0;
    e->a=(int16_t)a; e->b=(int16_t)b;
    if(e->version!=ISL_TRACE_VERSION) return 0;
  }
  if(n!=len)return 0;
  *out=tmp; return 1;
}
