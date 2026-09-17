(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  ready(function(){
    var rail=document.querySelector('.rail'),main=document.querySelector('main');if(!rail||!main)return;
    var st=document.createElement('style');st.textContent=
      '#lifecycleOS .lifeGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}'+
      '#lifecycleOS .lifeCard{border:1px solid var(--line);border-radius:14px;background:#0a171e;padding:12px}'+
      '#lifecycleOS .lifeFlow{display:flex;gap:6px;overflow:auto;padding:4px 0 10px}'+
      '#lifecycleOS .lifeStep{min-width:125px;border:1px solid #31505c;border-radius:11px;padding:9px;background:#0b1820}'+
      '#lifecycleOS .lifeStep b{font-size:10px}.lifeStep div{font-size:9px;color:var(--muted);line-height:1.35;margin-top:4px}'+
      '#lifecycleOS .lifeList{font-size:10px;color:#c9dadd;line-height:1.55;margin-top:7px}'+
      '#lifecycleOS .lifeGold{border-color:#a37a32;background:linear-gradient(135deg,#211b0e,#0b171d)}'+
      '#lifecycleOS .lifeGold h3{color:#ffd67c}'+
      '#lifecycleOS .lifeActions{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}'+
      '#lifecycleOS .lifeActions button,#lifecycleOS .lifeActions a{font-size:10px;padding:8px 10px;border:1px solid #35525e;border-radius:9px;background:#10232c;color:#eef7f4;text-decoration:none}';
    document.head.appendChild(st);

    var btn=document.createElement('button');btn.setAttribute('data-view','lifecycleOS');btn.title='Lifecycle OS';btn.textContent='∞';rail.appendChild(btn);
    var view=document.createElement('section');view.id='lifecycleOS';view.className='view';main.appendChild(view);
    function open(){document.querySelectorAll('.view,.rail button[data-view]').forEach(function(x){x.classList.remove('active')});view.classList.add('active');btn.classList.add('active');window.scrollTo(0,0)}
    btn.onclick=open;
    function dl(obj,name){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}
    fetch('ISL_GAMEDEV_OS_CURRENT.json?ts='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(os){
      var flow=(os.recursive_loop||[]).map(function(x,i){return '<div class="lifeStep"><b>'+(i+1)+' · '+esc(x.replaceAll('_',' '))+'</b><div>Salida trazable → siguiente gate</div></div>'}).join('');
      var life=(os.lifecycle||[]).map(function(x){return '<article class="lifeCard"><div class="label">'+esc(x.id)+'</div><h3>'+esc(x.name)+'</h3><div class="lifeList">'+(x.exit||[]).map(function(y){return '✓ '+esc(y)}).join('<br>')+'</div></article>'}).join('');
      var tracks=(os.release_marketing&&os.release_marketing.tracks||[]).map(function(x){return '<article class="lifeCard lifeGold"><div class="label">'+esc(x.id)+'</div><h3>'+esc(x.id)+'</h3><div class="lifeList">'+(x.items||[]).map(esc).join(' · ')+'</div></article>'}).join('');
      var suites=(os.quality_gates&&os.quality_gates.required_suites||[]).map(function(x){return '<span class="gate ok">'+esc(x.replaceAll('_',' '))+'</span>'}).join('');
      var plays=(os.playtest_program||[]).map(function(x){return '<article class="lifeCard"><div class="label">'+esc(x.stage)+' · '+esc(x.sample)+'</div><h3>'+esc(x.audience)+'</h3><div class="lifeList">'+esc(x.goal)+'</div></article>'}).join('');
      view.innerHTML=
        '<div class="topbar"><div><div class="eyebrow">ISL · SISTEMA OPERATIVO RECURSIVO</div><h2>Lifecycle OS</h2><div class="sub">Diseño → producción → validación → lanzamiento → post-launch → aprendizaje → siguiente vuelta</div></div><span class="status good">V1.0</span></div>'+
        '<div class="panel"><div class="label">BUCLE RECURSIVO</div><div class="lifeFlow">'+flow+'</div><div class="sub">Una regresión devuelve el elemento al gate necesario. Nada se “da por hecho” porque ya haya pasado una vez.</div></div>'+
        '<div class="panel"><div class="label">HITOS DEL JUEGO</div><div class="lifeGrid">'+life+'</div></div>'+
        '<div class="panel"><div class="label">QA / CORRECCIÓN / PERFORMANCE</div><div class="gates">'+suites+'</div><div class="lifeList"><b>STOP-SHIP:</b> '+esc((os.quality_gates.stop_ship||[]).join(' · '))+'</div></div>'+
        '<div class="panel"><div class="label">PLAYTEST POR COHORTES</div><div class="lifeGrid">'+plays+'</div></div>'+
        '<div class="panel"><div class="label">STORE / PUBLICIDAD / CROWDFUNDING / COMUNIDAD</div><div class="lifeGrid">'+tracks+'</div><div class="lifeList">'+esc(os.release_marketing.asset_rule||'')+'<br>'+esc(os.release_marketing.reuse_rule||'')+'</div></div>'+
        '<div class="panel"><div class="label">COSTE Y EFICIENCIA</div><div class="lifeList">'+(os.economics.controls||[]).map(function(x){return '• '+esc(x.replaceAll('_',' '))}).join('<br>')+'<br><br>'+esc(os.economics.rule||'')+'</div>'+
        '<div class="lifeActions"><a href="poll/index.html">ENCUESTAS / COHORTES</a><button id="lifeExport">EXPORTAR PLAN OPERATIVO</button></div></div>';
      var ex=document.getElementById('lifeExport');if(ex)ex.onclick=function(){dl({schema:'ISL_GAMEDEV_OPERATIONS_PLAN_V1',generated_at:new Date().toISOString(),source_version:os.version,recursive_loop:os.recursive_loop,lifecycle:os.lifecycle,quality_gates:os.quality_gates,playtests:os.playtest_program,release_marketing:os.release_marketing,economics:os.economics},'ISL_GAMEDEV_OPERATIONS_PLAN.json')};
    }).catch(function(){view.innerHTML='<div class="panel"><h2>Lifecycle OS</h2><div class="sub">No se pudo cargar el sistema operativo.</div></div>'});
  })
})();