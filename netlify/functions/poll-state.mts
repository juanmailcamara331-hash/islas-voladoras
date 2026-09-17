import { getStore, getDeployStore } from "@netlify/blobs";
import type { Context, Config } from "@netlify/functions";

const seed = [
  {option:"C",comment:"Jajaj",created_at:"2026-09-17T20:53:21.176Z"},
  {option:"B",comment:"Jwjwj",created_at:"2026-09-17T20:54:14.180Z"},
  {option:"C",comment:"Jejejejeje",created_at:"2026-09-17T21:06:55.430Z"},
  {option:"C",comment:"Lalala",created_at:"2026-09-17T21:09:29.089Z"},
  {option:"C",comment:"Esto es asi",created_at:"2026-09-17T22:04:33.102Z"},
  {option:"A",comment:"Jajajaa",created_at:"2026-09-17T22:07:35.465Z"}
];

function storeForContext(){
  const n=(globalThis as any).Netlify;
  return n?.context?.deploy?.context === "production"
    ? getStore("isl-polls",{consistency:"strong"})
    : getDeployStore("isl-polls");
}

function cleanText(v:unknown,max=180){
  return String(v??"")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"")
    .replace(/\s+/g," ")
    .trim()
    .slice(0,max);
}

function sameOrigin(req:Request){
  const url=new URL(req.url);
  const origin=req.headers.get("origin");
  if(origin) return origin===url.origin;
  const referer=req.headers.get("referer");
  return !!referer && referer.startsWith(url.origin+"/");
}

async function readLiveVotes(){
  const store=storeForContext();
  const listed=await store.list({prefix:"molino-r1/"});
  const votes=[] as any[];
  for(const b of listed.blobs){
    const v=await store.get(b.key,{type:"json"});
    if(v) votes.push(v);
  }
  return votes;
}

function summarize(votes:any[]){
  const all=[...seed,...votes];
  const distribution={A:0,B:0,C:0} as Record<string,number>;
  for(const v of all){ if(distribution[v.option]!==undefined) distribution[v.option]++; }
  const comments=all.filter(v=>v.comment).sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at)));
  const top=Object.entries(distribution).sort((a,b)=>b[1]-a[1])[0]?.[0]||null;
  const labels:any={A:"Velas del Origen",B:"Pétalos Celestes",C:"Espiral del Horizonte"};
  return {
    poll_id:"POLL-MOLINO-001",round:"PUBLICA_01",question:"¿Qué molino te convence más?",
    valid_votes:all.length,technical_tests_excluded:1,distribution,
    top_option:top,top_option_label:top?labels[top]:null,
    comments,author_confirmation:"PENDIENTE",
    promotion_target:"PRODUCCION_O_ESPERA_O_REJECTED_LEARNED",
    updated_at:new Date().toISOString()
  };
}

export default async (req:Request, _context:Context) => {
  const baseHeaders={
    "Cache-Control":"no-store",
    "X-Content-Type-Options":"nosniff",
    "Referrer-Policy":"no-referrer"
  };

  if(req.method==="GET"){
    return Response.json(summarize(await readLiveVotes()),{headers:baseHeaders});
  }

  if(req.method!=="POST"){
    return new Response("Method not allowed",{status:405,headers:{...baseHeaders,"Allow":"GET, POST"}});
  }

  if(!sameOrigin(req)){
    return Response.json({ok:false,error:"forbidden"},{status:403,headers:baseHeaders});
  }

  const len=Number(req.headers.get("content-length")||"0");
  if(len>2048){
    return Response.json({ok:false,error:"payload_too_large"},{status:413,headers:baseHeaders});
  }

  const type=(req.headers.get("content-type")||"").toLowerCase();
  if(!type.includes("application/json")){
    return Response.json({ok:false,error:"unsupported_media_type"},{status:415,headers:baseHeaders});
  }

  const body=await req.json().catch(()=>null) as any;
  const option=cleanText(body?.molino,1).toUpperCase();
  if(!["A","B","C"].includes(option)){
    return Response.json({ok:false,error:"invalid_option"},{status:400,headers:baseHeaders});
  }

  const comment=cleanText(body?.comentario,180);
  const created_at=new Date().toISOString();
  const id=crypto.randomUUID();
  const store=storeForContext();
  await store.setJSON(`molino-r1/${created_at}-${id}`,{option,comment,created_at});
  return Response.json({ok:true,state:summarize(await readLiveVotes())},{headers:baseHeaders});
};

export const config:Config={
  path:"/api/poll-state",
  rateLimit:{
    windowLimit:20,
    windowSize:60,
    aggregateBy:["ip","domain"]
  }
};
