import { getStore, getDeployStore } from "@netlify/blobs";
import type { Context, Config } from "@netlify/functions";

const SEED = {
  pillars: [{
    que_es:"exploracion",
    tiron:["tripulacion"],
    vibra:"humor-extraño",
    preocupacion:"no-entender",
    no_quitar:"",
    recortar:"",
    created_at:"2026-09-19T18:09:02.859Z"
  }],
  references: [{
    tipo_ref:"visual",
    fantasma_funcion:["presencia-espectral"],
    entrada_isl:"recurrente",
    no_copiar:"",
    referencia_nombre:"",
    referencia_funcion:"",
    created_at:"2026-09-19T18:09:20.598Z"
  }]
} as const;

function storeForContext(){
  const n=(globalThis as any).Netlify;
  return n?.context?.deploy?.context === "production"
    ? getStore("isl-survey-lite",{consistency:"strong"})
    : getDeployStore("isl-survey-lite");
}
function clean(v:unknown,max=180){
  return String(v??"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"").replace(/\s+/g," ").trim().slice(0,max);
}
function list(v:unknown,max=2){
  return String(v??"").split(",").map(x=>clean(x,64)).filter(Boolean).slice(0,max);
}
function sameOrigin(req:Request){
  const u=new URL(req.url),o=req.headers.get("origin"),r=req.headers.get("referer");
  if(o) return o===u.origin;
  return !!r && r.startsWith(u.origin+"/");
}
async function read(prefix:string){
  const store=storeForContext(); const found=await store.list({prefix});
  const rows:any[]=[];
  for(const b of found.blobs){const v=await store.get(b.key,{type:"json"});if(v)rows.push(v);}
  return rows;
}
function inc(dst:Record<string,number>,k:string){if(k in dst)dst[k]++;}
function summarize(p:any[],r:any[]){
  const pillars=[...SEED.pillars,...p], refs=[...SEED.references,...r];
  const P={
    que_es:{"reencuentro":0,"exploracion":0,"barco":0,"mezcla":0,"no-claro":0},
    tiron:{"tripulacion":0,"islas":0,"huellas":0,"barco-hogar":0,"reliquias":0,"tono":0},
    vibra:{"aventura-poetica":0,"raro-encanto":0,"humor-extraño":0,"misterio-belleza":0,"mezcla":0},
    preocupacion:{"demasiadas-cosas":0,"no-entender":0,"idea-poco-juego":0,"tono-mezclado":0,"nada":0}
  } as any;
  for(const x of pillars){inc(P.que_es,x.que_es);for(const v of x.tiron||[])inc(P.tiron,v);inc(P.vibra,x.vibra);inc(P.preocupacion,x.preocupacion);}
  const R={
    tipo_ref:{"jugabilidad":0,"narrativa":0,"visual":0,"musica":0,"humor":0,"rareza":0},
    fantasma_funcion:{"presencia-espectral":0,"humor-absurdo":0,"amenaza-comedia":0,"niebla-umbral":0,"barco-maldito":0,"reglas-propias":0},
    entrada_isl:{"pincelada":0,"recurrente":0,"regla":0,"tono":0,"fuera":0}
  } as any;
  for(const x of refs){inc(R.tipo_ref,x.tipo_ref);for(const v of x.fantasma_funcion||[])inc(R.fantasma_funcion,v);inc(R.entrada_isl,x.entrada_isl);}
  return {
    updated_at:new Date().toISOString(),
    pillars:{count:pillars.length,counts:P,no_quitar:pillars.map(x=>x.no_quitar).filter(Boolean),recortar:pillars.map(x=>x.recortar).filter(Boolean)},
    references:{count:refs.length,counts:R,no_copiar:refs.map(x=>x.no_copiar).filter(Boolean),reference_seeds:refs.filter(x=>x.referencia_nombre||x.referencia_funcion).map(x=>({nombre:x.referencia_nombre,funcion:x.referencia_funcion}))}
  };
}
export default async (req:Request,_context:Context)=>{
  const headers={"X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer"};
  if(req.method==="GET") return Response.json(summarize(await read("pillars/"),await read("references/")),{headers:{...headers,"Cache-Control":"no-store"}});
  if(req.method!=="POST") return new Response("Method not allowed",{status:405,headers:{...headers,"Allow":"GET, POST"}});
  if(!sameOrigin(req)) return Response.json({ok:false,error:"forbidden"},{status:403,headers});
  if(Number(req.headers.get("content-length")||"0")>4096) return Response.json({ok:false,error:"payload_too_large"},{status:413,headers});
  const body:any=await req.json().catch(()=>null); const kind=clean(body?.kind,16);
  const created_at=new Date().toISOString(); const id=crypto.randomUUID(); const store=storeForContext();
  if(kind==="pillars"){
    const row={que_es:clean(body.que_es,64),tiron:list(body.tiron,2),vibra:clean(body.vibra,64),preocupacion:clean(body.preocupacion,64),no_quitar:clean(body.no_quitar),recortar:clean(body.recortar),created_at};
    await store.setJSON(`pillars/${created_at}-${id}`,row); return Response.json({ok:true},{headers:{...headers,"Cache-Control":"no-store"}});
  }
  if(kind==="references"){
    const row={tipo_ref:clean(body.tipo_ref,64),fantasma_funcion:list(body.fantasma_funcion,2),entrada_isl:clean(body.entrada_isl,64),no_copiar:clean(body.no_copiar),referencia_nombre:clean(body.referencia_nombre,120),referencia_funcion:clean(body.referencia_funcion),created_at};
    await store.setJSON(`references/${created_at}-${id}`,row); return Response.json({ok:true},{headers:{...headers,"Cache-Control":"no-store"}});
  }
  return Response.json({ok:false,error:"invalid_kind"},{status:400,headers});
};
export const config:Config={path:"/api/survey-lite-state",rateLimit:{windowLimit:30,windowSize:60,aggregateBy:["ip","domain"]}};
