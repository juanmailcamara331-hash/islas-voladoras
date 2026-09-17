(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  ready(function(){
    /* Decision Engine stays internal to the Command Center; no public portal link. */

    /* Final fullscreen/media control separation: media close stays left, app fullscreen toggle stays right. */
    var controlStyle=document.createElement('style');
    controlStyle.id='isl-fullscreen-controls-hotfix';
    controlStyle.textContent=`
      body.isl-media-open #lbClose{
        position:fixed!important;
        top:max(10px,env(safe-area-inset-top))!important;
        left:max(10px,env(safe-area-inset-left))!important;
        right:auto!important;
        bottom:auto!important;
        z-index:2147483647!important;
      }
      body.isl-media-open #islFsToggle{
        position:fixed!important;
        top:max(10px,env(safe-area-inset-top))!important;
        right:max(10px,env(safe-area-inset-right))!important;
        left:auto!important;
        bottom:auto!important;
        z-index:2147483646!important;
      }
      body.isl-media-open #lbClose,
      body.isl-media-open #islFsToggle{
        width:42px!important;
        height:42px!important;
        min-width:42px!important;
        min-height:42px!important;
        margin:0!important;
        transform:none!important;
      }
      @media (orientation:landscape) and (max-height:760px){
        body.isl-media-open #lbClose{left:max(10px,env(safe-area-inset-left))!important;right:auto!important;}
        body.isl-media-open #islFsToggle{right:max(10px,env(safe-area-inset-right))!important;left:auto!important;}
      }
      #polls .pollVoteGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:10px}
      #polls .pollVote{padding:12px;border:1px solid var(--line);border-radius:12px;background:#0b1820}
      #polls .pollVote b{display:block;font-size:26px;margin-top:3px}
      #polls .pollActions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
      @media(max-width:560px){#polls .pollVoteGrid{grid-template-columns:1fr 1fr 1fr}#polls .pollVote{padding:9px}#polls .pollVote b{font-size:22px}}
    `;
    document.head.appendChild(controlStyle);

    var lightbox=document.getElementById('lightbox');
    function syncMediaOpen(){document.body.classList.toggle('isl-media-open',!!(lightbox&&lightbox.classList.contains('show')))}
    if(lightbox){syncMediaOpen();new MutationObserver(syncMediaOpen).observe(lightbox,{attributes:true,attributeFilter:['class']});}
    document.addEventListener('fullscreenchange',syncMediaOpen);
    document.addEventListener('webkitfullscreenchange',syncMediaOpen);

    function openView(id){
      if(typeof window.go==='function'){window.go(id);return;}
      document.querySelectorAll('.view,.rail button[data-view]').forEach(function(x){x.classList.remove('active')});
      var v=document.getElementById(id);if(v)v.classList.add('active');
      var b=document.querySelector('.rail button[data-view="'+id+'"]');if(b)b.classList.add('active');
      window.scrollTo(0,0);
    }

    function installPollsModule(p){
      var rail=document.querySelector('.rail');
      var main=document.querySelector('main');
      if(!rail||!main||document.getElementById('polls'))return;

      var btn=document.createElement('button');
      btn.setAttribute('data-view','polls');
      btn.setAttribute('title','Encuestas');
      btn.setAttribute('data-help','Encuestas activas, resultados y confirmación de autor.');
      btn.textContent='☑';
      btn.onclick=function(){openView('polls')};
      rail.appendChild(btn);

      var view=document.createElement('section');
      view.id='polls';
      view.className='view';
      var d=p.distribution||{A:0,B:0,C:0};
      view.innerHTML=
        '<div class="topbar"><div><div class="eyebrow">CENTRO DE MANDOS · SOLO AUTOR</div><h2>Encuestas</h2></div><span class="status good">R1 ACTIVA</span></div>'+
        '<div class="panel"><div class="label">'+(p.poll_id||'POLL')+' · '+(p.round||'')+'</div><h2 style="margin:4px 0 7px">'+(p.question||p.title||'Encuesta')+'</h2><div class="sub">'+(p.valid_votes||0)+' votos públicos válidos · '+(p.technical_tests_excluded||0)+' prueba técnica excluida</div>'+
        '<div class="pollVoteGrid"><div class="pollVote"><span class="label">A · Velas del Origen</span><b>'+d.A+'</b></div><div class="pollVote"><span class="label">B · Pétalos Celestes</span><b>'+d.B+'</b></div><div class="pollVote"><span class="label">C · Espiral del Horizonte</span><b>'+d.C+'</b></div></div>'+
        '<div class="callout" style="margin-top:11px"><b>Más votada ahora:</b> '+(p.top_option||'—')+' · '+(p.top_option_label||'pendiente')+'<br><b>CONFIRMACIÓN AUTOR:</b> '+(p.author_confirmation||'PENDIENTE')+' → '+(p.promotion_target||'PRODUCCION_O_ESPERA_O_REJECTED_LEARNED')+'<br><span style="color:var(--muted)">'+(p.note||'')+'</span></div>'+
        '<div class="pollActions"><a class="btn primary" href="'+(p.url||'poll/molino.html')+'">ABRIR ENCUESTA</a><a class="btn" href="reel.html">VER REEL PÚBLICO</a></div></div>';
      main.appendChild(view);
    }

    fetch('ISL_POLL_STATUS_CURRENT.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('poll');return r.json()}).then(installPollsModule).catch(function(){});

    fetch('ISL_PROJECT_STATE_CURRENT.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('state');return r.json()}).then(function(s){
      var main=document.querySelector('main');
      if(main&&!document.getElementById('islCurrentStateBanner')){
        var box=document.createElement('section');
        box.id='islCurrentStateBanner';box.className='panel';
        box.style.cssText='border-color:#4f7d86;background:linear-gradient(135deg,#102833,#171f24);margin:0 0 14px;box-shadow:0 16px 44px #0005';
        var phase=s.phase||'ESTADO ACTUAL';
        var phaseStatus=s.phase_status||'EN CURSO';
        var previous=s.previous_phase||'';
        var previousStatus=s.previous_phase_status||'';
        box.innerHTML='<div class="eyebrow">ESTADO ACTUAL · '+(s.updated_at||'')+'</div>'+
          '<div style="display:flex;gap:10px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap">'+
          '<div><h2 style="margin:3px 0 7px">'+phase+'</h2><div class="sub"><b>'+phaseStatus+'</b>'+(previous?' · '+previous+' — '+previousStatus:'')+'</div></div>'+
          '<span class="status good" style="padding:7px 9px;border:1px solid #567a55;border-radius:999px">ACTIVO</span></div>';
        main.insertBefore(box,main.firstChild);
      }
    }).catch(function(){/* keep portal usable if state file is unavailable */});
  })
})();
