(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  ready(function(){
    fetch('ISL_PROJECT_STATE_CURRENT.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('state');return r.json()}).then(function(s){
      var main=document.querySelector('main');
      if(main&&!document.getElementById('islCurrentStateBanner')){
        var box=document.createElement('section');
        box.id='islCurrentStateBanner';
        box.className='panel';
        box.style.cssText='border-color:#4f7d86;background:linear-gradient(135deg,#102833,#171f24);margin:0 0 14px;box-shadow:0 16px 44px #0005';
        box.innerHTML='<div class="eyebrow">ESTADO ACTUAL · '+s.updated_at+'</div>'+
          '<div style="display:flex;gap:10px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap">'+
          '<div><h2 style="margin:3px 0 7px">'+s.phase+'</h2><div class="sub"><b>'+s.phase_status+'</b> · '+s.previous_phase+' — '+s.previous_phase_status+'</div></div>'+
          '<span class="status good" style="padding:7px 9px;border:1px solid #567a55;border-radius:999px">PROTO ACTIVO</span></div>'+
          '<div class="grid" style="margin-top:10px">'+
          '<div class="card"><div class="label">Candidato principal</div><b>'+s.wind_receiver.primary_candidate+'</b><div class="meta">'+s.wind_receiver.primary_reason+'</div></div>'+
          '<div class="card"><div class="label">Contraste</div><b>'+s.wind_receiver.contrast_candidate+'</b><div class="meta">'+s.wind_receiver.contrast_reason+'</div></div>'+
          '<div class="card"><div class="label">Bucle PROTO 01</div><b>'+s.proto_01.core_loop+'</b><div class="meta">Duración objetivo: '+s.proto_01.target_duration+'</div></div>'+
          '<div class="card"><div class="label">Regla del molino</div><b>'+s.mill.rule+'</b><div class="meta">'+s.mill.setting+'</div></div></div>';
        main.insertBefore(box,main.firstChild);
      }
      var islands=document.querySelectorAll('.roadmapMap .island');
      if(islands.length>1){
        var i0=islands[0],i1=islands[1];
        var st0=i0.querySelector('.status');if(st0){st0.textContent='INFRAESTRUCTURA';st0.className='status good'}
        var b1=i1.querySelector('b');if(b1)b1.textContent='PROTO 01 · Molino jugable';
        var st1=i1.querySelector('.status');if(st1){st1.textContent='EN CURSO';st1.className='status good'}
      }
      document.querySelectorAll('b').forEach(function(el){if(el.textContent.trim()==='Bake-off 3D')el.textContent='PROTO 01 · Molino jugable'});
    }).catch(function(){/* keep portal usable if state file is unavailable */});
  })
})();
