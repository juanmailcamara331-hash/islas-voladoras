(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  ready(function(){
    var rail=document.querySelector('.rail'),home=document.getElementById('home');if(!rail||!home)return;
    var st=document.createElement('style');st.textContent=
      '.rail .islSep{width:42px;height:1px;background:#294955;margin:2px 0 3px;flex:0 0 auto}'+
      '.rail button.islPrimary{border-color:#40606d;background:#142a35;color:#fff;box-shadow:0 0 0 1px #87efff12 inset}'+
      '.rail button.islPrimary[data-view="decisionStudio"]{border-color:#8c6b3d;color:#ffd67c}'+
      '.rail button.islPrimary[data-view="polls"]{border-color:#4d7461;color:#cfffba}'+
      '.rail button.islSecondary{opacity:.82;transform:scale(.92)}'+
      '.rail button.islUtility{opacity:.56;transform:scale(.84)}'+
      '#islCreativeHead{border:1px solid #496b77;background:linear-gradient(135deg,#102833,#111a20);box-shadow:0 18px 44px #0005;margin:0 0 14px;padding:14px;border-radius:16px}'+
      '#islCreativeHead .headGrid{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:10px;margin-top:10px}'+
      '#islCreativeHead .headBlock{border:1px solid #294955;border-radius:12px;background:#09171e;padding:11px}'+
      '#islCreativeHead .headBlock.gold{border-color:#8c6b3d;background:#1b170f}'+
      '#islCreativeHead .headBlock h3{font-size:9px;margin:0 0 5px;color:#87efff;letter-spacing:.12em}'+
      '#islCreativeHead .headMain{font-size:18px;font-weight:900;line-height:1.15}'+
      '#islCreativeHead .headText{font-size:11px;color:#bfd0d4;line-height:1.5;margin-top:6px}'+
      '#islCreativeHead .weight{font-size:8px;color:#ffc36e;letter-spacing:.1em;margin-top:7px}'+
      '#islCreativeHead .riskRow{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}'+
      '#islCreativeHead .riskChip{font-size:8px;border:1px solid #35525e;border-radius:999px;padding:4px 6px;color:#bcd0d4}'+
      '@media(max-width:900px){.rail .islSep{height:32px;width:1px;margin:0 3px}.rail button.islSecondary,.rail button.islUtility{transform:none;opacity:.75}#islCreativeHead .headGrid{grid-template-columns:1fr}}';
    document.head.appendChild(st);

    function byView(id){return rail.querySelector('button[data-view="'+id+'"]')}
    function arrange(){
      rail.querySelectorAll('.islSep').forEach(function(x){x.remove()});
      rail.querySelectorAll('button').forEach(function(b){b.classList.remove('islPrimary','islSecondary','islUtility')});
      var logo=rail.querySelector('.logo');
      var primary=['home','decisionStudio','lifecycleOS','polls'];
      var secondary=['gallery','roadmap','inspiration','registry'];
      var utility=['calendar','stats','sim','pipelines','controls'];
      var special=['spectacleBtn','settingsBtn','menuBtn'];
      primary.forEach(function(id){var b=byView(id);if(b){b.classList.add('islPrimary');rail.appendChild(b)}});
      var s1=document.createElement('div');s1.className='islSep';rail.appendChild(s1);
      secondary.forEach(function(id){var b=byView(id);if(b){b.classList.add('islSecondary');rail.appendChild(b)}});
      var s2=document.createElement('div');s2.className='islSep';rail.appendChild(s2);
      utility.forEach(function(id){var b=byView(id);if(b){b.classList.add('islUtility');rail.appendChild(b)}});
      special.forEach(function(id){var b=document.getElementById(id);if(b){b.classList.add('islUtility');rail.appendChild(b)}});
      if(logo&&rail.firstElementChild!==logo)rail.insertBefore(logo,rail.firstChild);
    }
    arrange();

    Promise.all([
      fetch('ISL_PROJECT_STATE_CURRENT.json?ts='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}),
      fetch('ISL_STRESS_AUDIT_CURRENT.json?ts='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}),
      fetch('ISL_DECISION_CATALOG_CURRENT.json?ts='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()})
    ]).then(function(res){
      var state=res[0],audit=res[1],cat=res[2];
      var focus=(audit.current_focus||[]).slice(0,3);
      var prod=(cat.current_decisions||[]).filter(function(d){return ['READY_UNREAL','PRODUCCION','VALIDACION','CANON'].indexOf(d.state)>=0});
      var reval=(audit.items||[]).filter(function(x){return /REVALIDAR|RETEST|REUSAR/.test(String(x.stress))}).length;
      var stop=(audit.scenarios||[]).filter(function(x){return /STOP_SHIP|BLOCK|MIGRATION_REQUIRED/.test(String(x.result))}).length;
      var box=document.createElement('section');box.id='islCreativeHead';
      box.innerHTML=
        '<div class="eyebrow">CABEZA CREATIVA · JERARQUÍA ACTUAL</div><div class="topbar" style="margin:4px 0 0"><div><h2 style="margin:0">Ahora importa esto.</h2><div class="sub">El panel prioriza intención, bloqueos y producción. Las utilidades quedan en segundo plano.</div></div><span class="status good">'+esc(audit.overall_status||'')+'</span></div>'+
        '<div class="headGrid">'+
          '<div class="headBlock gold"><h3>01 · AHORA</h3><div class="headMain">'+esc(state.phase||'')+'</div><div class="headText">'+esc((state.next||[])[0]||'')+'</div><div class="weight">PESO 100 · CABEZA DEL PROYECTO</div></div>'+
          '<div class="headBlock"><h3>02 · BLOQUEO PRINCIPAL</h3><div class="headMain">'+esc((focus[1]&&focus[1].id)||'DECISION-STUDIO')+'</div><div class="headText">'+esc((focus[1]&&focus[1].why)||'')+'</div><div class="weight">NO PRODUCIR SIN GATES</div></div>'+
          '<div class="headBlock"><h3>03 · PRODUCTION LANE</h3><div class="headMain">'+prod.length+' listo(s)</div><div class="headText">'+(prod.length?'Hay elementos formalmente en producción.':'Vacía por diseño: todavía estamos decidiendo y validando.')+'</div><div class="weight">DORADO = PRODUCCIÓN REAL</div></div>'+
        '</div>'+
        '<div class="riskRow"><span class="riskChip">'+reval+' elementos a revalidar</span><span class="riskChip">'+stop+' escenarios críticos cubiertos</span><span class="riskChip">'+(audit.scenarios||[]).length+' stress scenarios</span><span class="riskChip">'+(cat.domains||[]).length+' pilares gobernados</span></div>';
      var current=document.getElementById('islCurrentStateBanner');
      if(current&&current.parentNode===home)home.insertBefore(box,current);
      else home.insertBefore(box,home.firstChild);
    }).catch(function(){});
  })
})();