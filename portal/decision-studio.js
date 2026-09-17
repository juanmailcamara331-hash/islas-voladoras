(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  ready(function(){
    var rail=document.querySelector('.rail'),main=document.querySelector('main');if(!rail||!main)return;
    var st=document.createElement('style');st.textContent=
      '#decisionStudio .dsPipeline{display:flex;gap:6px;overflow:auto;padding:4px 0 10px;scrollbar-width:thin}'+
      '#decisionStudio .dsStep{min-width:132px;border:1px solid #314e59;border-radius:12px;background:#0b1820;padding:9px}'+
      '#decisionStudio .dsStep b{display:block;font-size:10px;color:#dff4f7}.dsStep span{display:block;font-size:9px;color:var(--muted);margin-top:4px;line-height:1.35}'+
      '#decisionStudio .prodLane{border:1px solid #b88a3a;background:linear-gradient(135deg,#211b0e,#111a1f);box-shadow:0 0 0 1px #ffc85a22 inset,0 10px 28px #0005;border-radius:15px;padding:12px;margin-bottom:12px}'+
      '#decisionStudio .prodTitle{display:flex;align-items:center;gap:8px;justify-content:space-between}.prodTitle h3{margin:0;color:#ffd67c}.prodBadge{font-size:9px;color:#ffd67c;border:1px solid #a37a32;border-radius:999px;padding:5px 8px}'+
      '#decisionStudio .prodCard{border:1px solid #b88a3a!important;background:linear-gradient(135deg,#17180f,#0b171d)!important;box-shadow:0 0 22px #d5a84a18}'+
      '#decisionStudio .prodCard h3{color:#ffe09a}'+
      '#decisionStudio .dsGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}'+
      '#decisionStudio .dsCard{border:1px solid var(--line);border-radius:14px;background:#0a171e;padding:12px;min-width:0}'+
      '#decisionStudio .dsHead{display:flex;gap:8px;align-items:flex-start;justify-content:space-between}'+
      '#decisionStudio .dsTag{font-size:9px;border:1px solid #35525e;border-radius:999px;padding:4px 7px;color:#9fcbd2;white-space:nowrap}'+
      '#decisionStudio .dsMeta{font-size:10px;color:var(--muted);line-height:1.45;margin-top:7px}'+
      '#decisionStudio .dsBtns{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}'+
      '#decisionStudio .dsBtns button,#decisionStudio .dsBtns a{font-size:10px;padding:7px 9px;border:1px solid #35525e;border-radius:9px;background:#10232c;color:#eef7f4;text-decoration:none}'+
      '#decisionStudio .dsBtns .gold{border-color:#b88a3a;background:#2b210f;color:#ffe09a}'+
      '#decisionStudio .dsFilters{display:flex;gap:6px;overflow:auto;padding-bottom:8px;margin-bottom:9px}'+
      '#decisionStudio .dsFilters button{white-space:nowrap;border:1px solid #35525e;border-radius:999px;padding:6px 9px;background:#0c1a21;color:#d7e7ea}'+
      '#decisionStudio .gates{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.gate{font-size:8px;border-radius:999px;padding:4px 6px;border:1px solid #314e59;color:#8ea8ae}.gate.ok{border-color:#557f5b;color:#9bd8a4}.gate.no{opacity:.55}'+
      '@media(max-width:560px){#decisionStudio .dsStep{min-width:118px}#decisionStudio .dsGrid{grid-template-columns:1fr}}';
    document.head.appendChild(st);

    var btn=document.createElement('button');btn.setAttribute('data-view','decisionStudio');btn.title='Decision Studio';btn.textContent='◆';rail.appendChild(btn);
    var view=document.createElement('section');view.id='decisionStudio';view.className='view';main.appendChild(view);
    function open(){document.querySelectorAll('.view,.rail button[data-view]').forEach(function(x){x.classList.remove('active')});view.classList.add('active');btn.classList.add('active');window.scrollTo(0,0)}
    btn.onclick=open;
    function draftKey(id){return 'isl_decision_draft_'+id}
    function isProdState(s){return ['READY_UNREAL','PRODUCCION','VALIDACION','CANON'].indexOf(String(s||''))>=0}
    function gateHtml(d,cat){
      var g=d.gates||{};return (cat.production_gates||[]).map(function(k){return '<span class="gate '+(g[k]?'ok':'no')+'">'+esc(k.replaceAll('_',' '))+'</span>'}).join('')
    }
    function buildDraft(cat){
      var rows=[];(cat.current_decisions||[]).forEach(function(d){var c=localStorage.getItem(draftKey(d.id))||d.author_choice;if(c)rows.push({decision_id:d.id,domain:d.domain,title:d.title,choice:c,state:d.state,gates:d.gates||{},unreal_ready:!!d.unreal_ready})});
      return {schema:'ISL_UNREAL_HANDOFF_DRAFT_V2',generated_at:new Date().toISOString(),warning:'BORRADOR DE TRABAJO. No autoriza producción.',decisions:rows}
    }
    function buildProduction(cat){
      var rows=[];(cat.current_decisions||[]).forEach(function(d){var c=d.author_choice;var g=d.gates||{};if(isProdState(d.state)&&g.author_confirmed===true&&c){rows.push({decision_id:d.id,domain:d.domain,title:d.title,choice:c,state:d.state,targets:(cat.domains.find(function(x){return x.id===d.domain})||{}).unreal_targets||[],gates:g})}});
      return {schema:'ISL_UNREAL_PRODUCTION_MANIFEST_V1',generated_at:new Date().toISOString(),rule:'Sólo Production Lane + confirmación humana.',decisions:rows}
    }
    function download(obj,name){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}
    fetch('ISL_DECISION_CATALOG_CURRENT.json?ts='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(cat){
      var groups=['TODAS'].concat(Array.from(new Set((cat.domains||[]).map(function(d){return d.group}))));
      var current='TODAS';
      function decisionHtml(d){
        var local=localStorage.getItem(draftKey(d.id));var choice=local||d.author_choice||'PENDIENTE';
        var prod=isProdState(d.state);
        return '<div class="dsMeta"><b>'+esc(d.title)+'</b><br>Estado: <b>'+esc(d.state)+'</b> · elección: '+esc(choice)+(d.reason?'<br>'+esc(d.reason):'')+'</div>'+
          '<div class="gates">'+gateHtml(d,cat)+'</div>'+
          '<div class="dsBtns"><button data-pick="'+esc(d.id)+'">BORRADOR/VARIANTE</button>'+(prod?'<span class="prodBadge">PRODUCTION LANE</span>':'')+'</div>'
      }
      function domainCard(d,forceProd){
        var dec=(cat.current_decisions||[]).filter(function(x){return x.domain===d.id});
        var decHtml=dec.length?dec.map(decisionHtml).join(''):'<div class="dsMeta">Sin decisión abierta todavía · listo para crear variantes.</div>';
        return '<article class="dsCard '+(forceProd?'prodCard':'')+'"><div class="dsHead"><div><div class="label">'+esc(d.id)+' · '+esc(d.group)+'</div><h3>'+esc(d.name)+'</h3></div><span class="dsTag">'+esc(d.automation)+'</span></div><div class="dsMeta">Prioridad '+esc(d.priority)+' · encuesta '+(d.pollable?'sí':'no')+'<br>Unreal: '+esc((d.unreal_targets||[]).join(' · '))+'</div>'+decHtml+'</article>'
      }
      function render(){
        var domains=(cat.domains||[]).filter(function(d){return current==='TODAS'||d.group===current});
        var prodDec=(cat.current_decisions||[]).filter(function(d){return isProdState(d.state)});
        var prodDomains=[];var seen={};prodDec.forEach(function(dec){var d=(cat.domains||[]).find(function(x){return x.id===dec.domain});if(d&&!seen[d.id]){seen[d.id]=1;prodDomains.push(d)}});

        var pipeline=(cat.pipeline||[]).map(function(p){return '<div class="dsStep"><b>'+p.step+' · '+esc(p.label)+'</b><span>'+esc(p.gate)+'</span></div>'}).join('');
        var prodInner=prodDomains.length?'<div class="dsGrid">'+prodDomains.map(function(d){return domainCard(d,true)}).join('')+'</div>':'<div class="dsMeta">Vacía por diseño: nada entra aquí hasta superar CQC, confirmación humana y gates de Unreal.</div>';
        view.innerHTML=
          '<div class="topbar"><div><div class="eyebrow">ISL · PIPELINE MAESTRO DE PRODUCCIÓN</div><h2>Decision Studio</h2><div class="sub">Idea → variantes → CQC → encuesta opcional → confirmación autor → READY UNREAL → producción → validación → canon</div></div><span class="status good">'+(cat.domains||[]).length+' PILARES</span></div>'+
          '<div class="panel"><div class="label">PIPELINE — NO SALTAR GATES</div><div class="dsPipeline">'+pipeline+'</div></div>'+
          '<section class="prodLane"><div class="prodTitle"><h3>★ PRODUCTION LANE</h3><span class="prodBadge">'+prodDec.length+' DECISIONES</span></div><div class="dsMeta" style="margin:5px 0 10px">Sólo elementos explícitamente preparados para Unreal. Esta zona prevalece sobre candidatos, encuestas y borradores.</div>'+prodInner+'</section>'+
          '<div class="panel"><div class="label">EXPLORACIÓN / DECISIONES EN CURSO</div><div class="dsFilters">'+groups.map(function(g){return '<button data-g="'+esc(g)+'">'+esc(g)+'</button>'}).join('')+'</div><div class="dsGrid">'+domains.map(function(d){return domainCard(d,false)}).join('')+'</div>'+
          '<div class="dsBtns" style="margin-top:14px"><a href="poll/index.html">CENTRO DE ENCUESTAS</a><button id="dsDraft">EXPORTAR BORRADOR</button><button class="gold" id="dsProd">EXPORTAR MANIFIESTO PRODUCCIÓN</button></div><div class="sub" style="margin-top:8px">El manifiesto de producción ignora borradores y votos: sólo exporta Production Lane con confirmación humana.</div></div>';

        view.querySelectorAll('[data-g]').forEach(function(b){b.onclick=function(){current=b.getAttribute('data-g');render()}});
        view.querySelectorAll('[data-pick]').forEach(function(b){b.onclick=function(){var id=b.getAttribute('data-pick');var val=prompt('Borrador/variante para '+id+' (no autoriza producción):',localStorage.getItem(draftKey(id))||'');if(val!==null){val=val.trim();if(val)localStorage.setItem(draftKey(id),val);else localStorage.removeItem(draftKey(id));render()}}});
        var dr=document.getElementById('dsDraft');if(dr)dr.onclick=function(){download(buildDraft(cat),'ISL_UNREAL_HANDOFF_DRAFT.json')};
        var pr=document.getElementById('dsProd');if(pr)pr.onclick=function(){download(buildProduction(cat),'ISL_UNREAL_PRODUCTION_MANIFEST.json')};
      }
      render();
    }).catch(function(){view.innerHTML='<div class="panel"><h2>Decision Studio</h2><div class="sub">No se pudo cargar el catálogo.</div></div>'});
  })
})();