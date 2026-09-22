(function(){
  'use strict';
  var MAX=80, KEY='isl_action_router_v01';
  var map=null;
  function now(){return new Date().toISOString()}
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
  function write(a){try{localStorage.setItem(KEY,JSON.stringify(a.slice(-MAX)))}catch(e){}}
  function classify(el){
    var explicit=el&&el.getAttribute&&el.getAttribute('data-isl-action');
    if(explicit)return explicit.toUpperCase();
    var href=(el&&el.getAttribute&&el.getAttribute('href')||'').toLowerCase();
    var text=(el&&el.textContent||'').trim().toUpperCase();
    if(/CANON|READY_UNREAL|PROMOVER|MASTER|APROBAR FINAL/.test(text))return 'PROMOTE';
    if(/PUBLICAR|LANZAR|CAMPAÑA|PRENSA|STORE|STEAM|COMMERCIAL/.test(text)||/commercial-health/.test(href))return 'PUBLISH';
    if(/PROVEEDOR|SAMPLE|MUESTRA|PRODUCCI/.test(text))return 'PHYSICAL';
    if(/KEEP|ADAPT|DISCARD|NEW_EXPERIMENT|DECIDIR|CONFIRM/.test(text))return 'DECIDE';
    if(/PLAYTEST|ENCUESTA|TEST/.test(text)||/playtest|encuestas/.test(href))return 'TEST';
    if(/CREAR|GENERAR|MESHY|MOCKUP|PROMPT/.test(text)||/crear\.html|external-lab|gym-3d-asset/.test(href))return 'CREATE';
    if(/mission-map|project-observatory|knowledge-health|avisos/.test(href))return 'SYSTEM';
    if(/galeria|reel|music|capsulas|crew|huellas/.test(href))return 'EXPLORE';
    return 'NAVIGATION';
  }
  function rule(cls){return map&&map.classes&&map.classes[cls]||{gate:'NONE',layers:[]}}
  function badge(cls,gate){
    if(cls==='NAVIGATION'||cls==='EXPLORE')return;
    var old=document.getElementById('islActionToast');if(old)old.remove();
    var d=document.createElement('div');d.id='islActionToast';
    d.textContent=cls+' · '+gate+' GATE · metodología conectada';
    d.style.cssText='position:fixed;left:50%;bottom:max(78px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:2147483000;background:#071018ee;color:#dff7f6;border:1px solid #4d7480;border-radius:999px;padding:8px 11px;font:800 8px system-ui;letter-spacing:.08em;box-shadow:0 10px 35px #0009;pointer-events:none';
    document.body.appendChild(d);setTimeout(function(){d.remove()},1800);
  }
  function record(el,cls){
    var rr=rule(cls), a=read();
    a.push({event_id:'UI-'+Date.now().toString(36),timestamp:now(),surface:location.pathname.split('/').pop()||'index',action_class:cls,label:(el.textContent||'').trim().slice(0,100),href:(el.getAttribute&&el.getAttribute('href')||''),gate:rr.gate,layers:rr.layers||[],status:'LOCAL_TRAIL_ONLY',not_canon:true});
    write(a);badge(cls,rr.gate);
  }
  function handle(e){
    var el=e.target&&e.target.closest&&e.target.closest('a,button,[data-isl-action]');if(!el)return;
    var cls=classify(el);record(el,cls);
    if(rule(cls).gate==='HARD'&&el.getAttribute('data-isl-hard-confirm')==='1'){
      if(!confirm('Esta acción cambia estado sensible. ¿Continuar con revisión humana?')){e.preventDefault();e.stopPropagation();}
    }
  }
  function load(){
    fetch('data/isl-command-action-map-current.json',{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){map=j}).catch(function(){});
    document.addEventListener('click',handle,true);
  }
  window.ISLActionRouter={classify:classify,trail:read,clear:function(){write([])},record:function(label,cls){record({textContent:label,getAttribute:function(){return''}},cls||'SYSTEM')}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load);else load();
})();