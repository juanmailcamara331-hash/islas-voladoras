#!/usr/bin/env node
import fs from 'node:fs';

const checks = [];
const add=(level,code,message,ctx={})=>checks.push({level,code,message,...ctx});
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));

const mediaPath='portal/data/isl-external-lab-current.json';
const musicPath='portal/data/isl-music-current.json';
const healthPath='portal/data/isl-asset-health-current.json';

for (const p of [mediaPath,musicPath,healthPath]) {
  if (!fs.existsSync(p)) add('FAIL','FILE_MISSING',p);
}
if (checks.some(x=>x.level==='FAIL')) finish();

const media=load(mediaPath);
const music=load(musicPath);
const health=load(healthPath);

if (media.boundary!=='ISL_ONLY') add('FAIL','BOUNDARY_MEDIA','External Lab boundary must be ISL_ONLY');
if (music.boundary!=='ISL_ONLY') add('FAIL','BOUNDARY_MUSIC','Music boundary must be ISL_ONLY');

for (const a of media.assets||[]) {
  if (!a.id) add('FAIL','ASSET_ID_MISSING','Asset missing id');
  if (!a.status) add('FAIL','ASSET_STATUS_MISSING',a.id||'?');
  if (!a.surface?.length) add('WARN','ASSET_SURFACE_MISSING',a.id||'?');
  if (!a.drive_id && !a.runtime_src) add('WARN','ASSET_SOURCE_MISSING',a.id||'?');
  if (String(a.status).includes('CANON')) add('FAIL','AUTO_CANON_FORBIDDEN',a.id||'?');
  if (a.type==='video' && media.rules?.video_reference_image_first!==true)
    add('FAIL','VIDEO_REFERENCE_RULE_MISSING',a.id||'?');
}

for (const t of music.tracks||[]) {
  if (!t.id || !t.title) add('FAIL','TRACK_ID_TITLE_MISSING',t.id||'?');
  if (t.runtime_src && t.source_state!=='RUNTIME_AVAILABLE')
    add('WARN','RUNTIME_STATE_MISMATCH',t.id);
  if (!t.runtime_src && t.source_state==='RUNTIME_AVAILABLE')
    add('FAIL','RUNTIME_SRC_MISSING',t.id);
  if (!t.rights_state && t.runtime_src)
    add('WARN','RIGHTS_STATE_MISSING_FOR_RUNTIME',t.id);
  if (String(t.status).includes('CANON'))
    add('FAIL','AUTO_CANON_FORBIDDEN',t.id);
}

for (const a of health.assets||[]) {
  for (const req of ['asset_id','entity_id','state','human_gate','canon_state']) {
    if (a[req]===undefined || a[req]===null || a[req]==='')
      add('FAIL','HEALTH_FIELD_MISSING',`${a.asset_id||'?'}:${req}`);
  }
  if (a.master_required && !a.master_ref)
    add(a.binary_access==='BLOCKED'?'WARN':'FAIL','MASTER_REF_MISSING',a.asset_id);
  if (a.runtime_required && !a.runtime_ref)
    add('WARN','RUNTIME_REF_MISSING',a.asset_id);
  if (a.canon_state==='CANON' && a.human_gate!=='PASS')
    add('FAIL','CANON_WITHOUT_HUMAN_GATE',a.asset_id);
}

finish();

function finish(){
  const rank={PASS:0,WARN:1,FAIL:2};
  const worst=checks.reduce((m,x)=>Math.max(m,rank[x.level]??0),0);
  const summary={
    result: worst===2?'FAIL':worst===1?'WARN':'PASS',
    counts:{
      fail:checks.filter(x=>x.level==='FAIL').length,
      warn:checks.filter(x=>x.level==='WARN').length
    },
    checks
  };
  console.log(JSON.stringify(summary,null,2));
  process.exit(worst===2?1:0);
}
