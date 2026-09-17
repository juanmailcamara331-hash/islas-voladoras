(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  ready(function(){
    var rail=document.querySelector('.rail'),main=document.querySelector('main');if(!rail||!main)return;
    var st=document.createElement('style');st.textContent=
      '#decisionStudio .dsGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}'+
      '#decisionStudio .dsCard{border:1px solid var(--line);border-radius:14px;background:#0a171e;padding:12px;min-width:0}'+
      '#decisionStudio .dsHead{display:flex;gap:8px;align-items:flex-start;justify-content:space-between}'+
      '#decisionStudio .dsTag{font-size:9px;border:1px solid #35525e;border-radius:999px;padding:4px 7px;color:#9fcbd2;white-space:nowrap}'+
      '#decisionStudio .dsMeta{font-size:10px;color:var(--muted);line-height:1.45;margin-top:7px}'+
      '#decisionStudio .dsBtns{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}'+
      '#decisionStudio .dsBtns button,#decisionStudio .dsBtns a{font-size:10px;padding:7px 9px;border:1px solid #35525e;border-radius:9px;background:#10232c;color:#eef7f4;text-decoration:none}'+
      '#decisionStudio .dsFilters{display:flex;gap:6px;overflow:auto;padding-bottom:8px;margin-bottom:9px}'+
      '#decisionStudio .dsFilters button{white-space:nowrap;border:1px solid #35525e;border-radius:999px;padding:6px 9px;background:#0c1a21;color:#d7e7ea}';
    document.head.appendChild(st);
    var btn=document.createElement('button');btn.setAttribute('data-view','decisionStudio');btn.title='Decision Studio';btn.textContent='◆';rail.appendChild(btn);
    var view=document.createElement('section');view.id='decisionStudio';view.className='view';main.appendChild(view);
    function open(){document.querySelectorAll('.view,.rail button[data-view]').forEach(function(x){x.classList.remove('active')});view.classList.add('active');btn.classList.add('active');window.scrollTo(0,0)}
    btn.onclick=open;
    function draftKey(id){return 'isl_decision_draft_'+id}
    function buildManifest(cat){
      var approved=[];
      (cat.current_decisions||[]).forEach(function(d){
        var local=localStorage.getItem(draftKey(d.id));
        var choice=local||d.author_choice;
        if(choice)approved.push({decision_id:d.id,domain:d.domain,title:d.title,choice:choice,state:d.state,unreal_ready:!!d.unreal_ready});
      });
      return {schema:'ISL_UNREAL_HANDOFF_DRAFT_V1',generated_at:new Date().toISOString(),warning:'BORRADOR. No implica CANON ni PRODUCCION sin confirmación humana.',decisions:approved};
    }
    function download(obj,name){
      var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500);
    }
    fetch('ISL_DECISION_CATALOG_CURRENT.json?ts='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(cat){
      var groups=['TODAS'].concat(Array.from(new Set((cat.domains||[]).map(function(d){return d.group}))));
      var current='TODAS';
      function render(){
        var domains=(cat.domains||[]).filter(function(d){return current==='TODAS'||d.group===current});
        var decisions=cat.current_decisions||[];
        view.innerHTML='<div class="topbar"><div><div class="eyebrow">ISL · PIPELINE DE DECISIÓN</div><h2>Decision Studio</h2><div class="sub">Variantes → CQC → encuesta opcional → confirmación autor → handoff Unreal</div></div><span class="status good">'+domains.length+' SISTEMAS</span></div>'+
        '<div class="panel"><div class="dsFilters">'+groups.map(function(g){return '<button data-g="'+esc(g)+'">'+esc(g)+'</button>'}).join('')+'</div><div class="dsGrid">'+domains.map(function(d){
          var dec=decisions.filter(function(x){return x.domain===d.id});
          var decHtml=dec.length?dec.map(function(x){var local=localStorage.getItem(draftKey(x.id));var c=local||x.author_choice||'PENDIENTE';return '<div class="dsMeta"><b>'+esc(x.title)+'</b><br>Estado: '+esc(x.state)+' · elección: '+esc(c)+'</div><div class="dsBtns"><button data-pick="'+esc(x.id)+'">ELEGIR/BORRADOR</button></div>'}).join(''):'<div class="dsMeta">Sin decisión abierta todavía · listo para crear variantes.</div>';
          return '<article class="dsCard"><div class="dsHead"><div><div class="label">'+esc(d.id)+' · '+esc(d.group)+'</div><h3>'+esc(d.name)+'</h3></div><span class="dsTag">'+esc(d.automation)+'</span></div><div class="dsMeta">Prioridad '+esc(d.priority)+' · encuesta '+(d.pollable?'sí':'no')+'<br>Unreal: '+esc((d.unreal_targets||[]).join(' · '))+'</div>'+decHtml+'</article>'
        }).join('')+'</div><div class="dsBtns" style="margin-top:14px"><a href="poll/index.html">CENTRO DE ENCUESTAS</a><button id="dsExport">GENERAR HANDOFF UNREAL</button></div><div class="sub" style="margin-top:8px">El handoff generado es borrador: no promueve nada a CANON automáticamente.</div></div>';
        view.querySelectorAll('[data-g]').forEach(function(b){b.onclick=function(){current=b.getAttribute('data-g');render()}});
        view.querySelectorAll('[data-pick]').forEach(function(b){b.onclick=function(){var id=b.getAttribute('data-pick');var val=prompt('Elección/borrador para '+id+' (A, B, C o nombre corto):',localStorage.getItem(draftKey(id))||'');if(val!==null){val=val.trim();if(val)localStorage.setItem(draftKey(id),val);else localStorage.removeItem(draftKey(id));render()}}});
        var ex=document.getElementById('dsExport');if(ex)ex.onclick=function(){download(buildManifest(cat),'ISL_UNREAL_HANDOFF_DRAFT.json')};
      }
      render();
    }).catch(function(){view.innerHTML='<div class="panel"><h2>Decision Studio</h2><div class="sub">No se pudo cargar el catálogo.</div></div>'});
  })
})();