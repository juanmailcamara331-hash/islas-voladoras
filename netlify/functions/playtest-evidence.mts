import { getStore, getDeployStore } from "@netlify/blobs";
import type { Context, Config } from "@netlify/functions";

function storeForContext(){
  const n=(globalThis as any).Netlify;
  return n?.context?.deploy?.context === "production"
    ? getStore("isl-playtest-evidence",{consistency:"strong"})
    : getDeployStore("isl-playtest-evidence");
}
function clean(v:unknown,max=180){
  return String(v??"")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"")
    .replace(/\s+/g," ").trim().slice(0,max);
}
function sameOrigin(req:Request){
  const u=new URL(req.url),o=req.headers.get("origin"),r=req.headers.get("referer");
  if(o) return o===u.origin;
  return !!r && r.startsWith(u.origin+"/");
}
function clampInt(v:unknown,min:number,max:number){
  const n=Math.trunc(Number(v));
  return Number.isFinite(n)?Math.max(min,Math.min(max,n)):min;
}
function bool(v:unknown){ return v===true; }

async function readRows(){
  const store=storeForContext();
  const found=await store.list({prefix:"signal-v01/"});
  const rows:any[]=[];
  for(const b of found.blobs){
    const v=await store.get(b.key,{type:"json"});
    if(v) rows.push(v);
  }
  return rows;
}
function inc(dst:Record<string,number>,k:string){
  if(k) dst[k]=(dst[k]||0)+1;
}
function summarize(rows:any[]){
  const cueCorrect:Record<string,{attempts:number,correct:number}>={};
  const confused:Record<string,number>={}, understood:Record<string,number>={}, fun:Record<string,number>={};
  let totalScore=0,totalRounds=0,totalReaction=0,reactionN=0;
  for(const row of rows){
    totalScore+=Number(row.score||0); totalRounds+=Number(row.total||0);
    inc(confused,row.confused); inc(understood,row.understood); inc(fun,row.fun);
    for(const ev of row.events||[]){
      const cue=clean(ev.cue,32);
      cueCorrect[cue] ||= {attempts:0,correct:0};
      cueCorrect[cue].attempts++;
      if(ev.correct===true) cueCorrect[cue].correct++;
      const rt=Number(ev.reaction_ms);
      if(Number.isFinite(rt)&&rt>=0&&rt<=30000){totalReaction+=rt;reactionN++;}
    }
  }
  return {
    schema:"ISL_PLAYTEST_AGGREGATE_v0.1",
    experiment:"ISL_SIGNAL_TELEGRAPH_LAB_v0.1",
    status:"LAB_EVIDENCE_ONLY",
    automatic_canon_promotion:false,
    human_review_required:true,
    sessions:rows.length,
    overall_accuracy:totalRounds?Number((totalScore/totalRounds).toFixed(3)):null,
    mean_reaction_ms:reactionN?Math.round(totalReaction/reactionN):null,
    cue_performance:cueCorrect,
    feedback:{understood,confused,fun},
    updated_at:new Date().toISOString()
  };
}

export default async (req:Request,_context:Context)=>{
  const headers={"X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer"};
  if(req.method==="GET"){
    return Response.json(summarize(await readRows()),{headers:{...headers,"Cache-Control":"no-store"}});
  }
  if(req.method!=="POST") return new Response("Method not allowed",{status:405,headers:{...headers,"Allow":"GET, POST"}});
  if(!sameOrigin(req)) return Response.json({ok:false,error:"forbidden"},{status:403,headers});
  const len=Number(req.headers.get("content-length")||"0");
  if(len>12288) return Response.json({ok:false,error:"payload_too_large"},{status:413,headers});
  const type=(req.headers.get("content-type")||"").toLowerCase();
  if(!type.includes("application/json")) return Response.json({ok:false,error:"unsupported_media_type"},{status:415,headers});

  const body:any=await req.json().catch(()=>null);
  if(!body || clean(body.experiment,64)!=="ISL_SIGNAL_TELEGRAPH_LAB_v0.1")
    return Response.json({ok:false,error:"invalid_experiment"},{status:400,headers});
  if(clean(body.completion_marker,64)!=="SIGNAL_TELEGRAPH_V01_COMPLETED")
    return Response.json({ok:false,error:"incomplete_session"},{status:400,headers});

  const rawEvents=Array.isArray(body?.telemetry?.events)?body.telemetry.events.slice(0,6):[];
  const events=rawEvents.map((e:any)=>({
    round:clampInt(e?.round,1,6),
    cue:clean(e?.cue,32),
    choice:clampInt(e?.choice,0,2),
    target:clampInt(e?.target,0,2),
    correct:bool(e?.correct),
    reaction_ms:clampInt(e?.reaction_ms,0,30000)
  }));

  const row={
    experiment:"ISL_SIGNAL_TELEGRAPH_LAB_v0.1",
    status:"LAB_ONLY",
    not_canon:true,
    created_at:new Date().toISOString(),
    completion_marker:"SIGNAL_TELEGRAPH_V01_COMPLETED",
    score:clampInt(body?.telemetry?.score,0,6),
    total:6,
    events,
    viewport:{
      w:clampInt(body?.telemetry?.viewport?.w,240,4096),
      h:clampInt(body?.telemetry?.viewport?.h,240,4096)
    },
    reduced_motion:bool(body?.telemetry?.reduced_motion),
    sound_enabled:bool(body?.telemetry?.sound_enabled),
    understood:clean(body?.feedback?.understood,96),
    confused:clean(body?.feedback?.confused,96),
    fun:clean(body?.feedback?.fun,96),
    bug:clean(body?.feedback?.bug,240),
    note:clean(body?.feedback?.note,240)
  };

  const store=storeForContext(), id=crypto.randomUUID();
  await store.setJSON(`signal-v01/${row.created_at}-${id}`,row);
  return Response.json({ok:true,status:"LAB_EVIDENCE_ONLY",automatic_canon_promotion:false},{headers:{...headers,"Cache-Control":"no-store"}});
};

export const config:Config={
  path:"/api/playtest-evidence",
  rateLimit:{windowLimit:30,windowSize:60,aggregateBy:["ip","domain"]}
};
