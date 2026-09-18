(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  ready(function(){
    var controlStyle=document.createElement('style');
    controlStyle.id='isl-fullscreen-controls-hotfix';
    controlStyle.textContent=`
      body.isl-media-open #lbClose{position:fixed!important;top:max(10px,env(safe-area-inset-top))!important;left:max(10px,env(safe-area-inset-left))!important;right:auto!important;bottom:auto!important;z-index:2147483647!important}
      body.isl-media-open #islFsToggle{position:fixed!important;top:max(10px,env(safe-area-inset-top))!important;right:max(10px,env(safe-area-inset-right))!important;left:auto!important;bottom:auto!important;z-index:2147483646!important}
      body.isl-media-open #lbClose,body.isl-media-open #islFsToggle{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;margin:0!important;transform:none!important}
      #polls .pollVoteGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:10px}
      #polls .pollVote{padding:12px;border:1px solid var(--line);border-radius:12px;background:#0b1820}
      #polls .pollVote b{display:block;font-size:26px;margin-top:3px}
      #polls .pollActions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
      #polls .pollComments{display:grid;gap:8px;margin-top:12px}
      #polls .pollComment{border:1px solid #294955;border-radius:10px;background:#09151c;padding:10px 11px}
      #polls .pollComment .who{font-size:9px;color:var(--cyan);letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px}
      #polls .pollComment .txt{font-size:12px;line-height:1.45;color:#dce8eb;overflow-wrap:anywhere}
      #polls .pollSync{font-size:9px;color:var(--muted);margin-top:9px}
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

    function renderPolls(p){
      var view=document.getElementById('polls');
      if(!view)return;
      var d=p.distribution||{A:0,B:0,C:0};
      var comments=Array.isArray(p.comments)?p.comments:[];
      var commentsHtml=comments.length?comments.map(function(c){return '<div class="pollComment"><div class="who">'+esc(c.option||'—')+'</div><div class="txt">'+esc(c.comment||c.text||'')+'</div></div>'}).join(''):'<div class="pollComment"><div class="txt" style="color:var(--muted)">Todavía no hay comentarios.</div></div>';
      view.innerHTML=
        '<div class="topbar"><div><div class="eyebrow">CENTRO DE MANDOS · SOLO AUTOR</div><h2>Encuestas</h2></div><span class="status good">R1 ACTIVA</span></div>'+
        '<div class="panel"><div class="label">'+esc(p.poll_id||'POLL')+' · '+esc(p.round||'')+'</div><h2 style="margin:4px 0 7px">'+esc(p.question||p.title||'Encuesta')+'</h2><div class="sub">'+Number(p.valid_votes||0)+' votos públicos válidos · '+Number(p.technical_tests_excluded||0)+' prueba técnica excluida</div>'+
        '<div class="pollVoteGrid"><div class="pollVote"><span class="label">A · Velas del Origen</span><b>'+Number(d.A||0)+'</b></div><div class="pollVote"><span class="label">B · Pétalos Celestes</span><b>'+Number(d.B||0)+'</b></div><div class="pollVote"><span class="label">C · Espiral del Horizonte</span><b>'+Number(d.C||0)+'</b></div></div>'+
        '<div class="callout" style="margin-top:11px"><b>Más votada ahora:</b> '+esc(p.top_option||'—')+' · '+esc(p.top_option_label||'pendiente')+'<br><b>CONFIRMACIÓN AUTOR:</b> '+esc(p.author_confirmation||'PENDIENTE')+' → '+esc(p.promotion_target||'PRODUCCION_O_ESPERA_O_REJECTED_LEARNED')+'</div>'+
        '<div class="label" style="margin-top:14px">COMENTARIOS</div><div class="pollComments">'+commentsHtml+'</div>'+
        '<div class="pollSync">Actualizado: '+esc(p.updated_at||'')+'</div>'+
        '<div class="pollActions"><a class="btn primary" href="poll/molino.html">ABRIR ENCUESTA</a><a class="btn" href="reel.html">VER REEL PÚBLICO</a><button class="btn" id="refreshPoll" type="button">ACTUALIZAR</button></div></div>'+
        '<div class="panel" style="margin-top:12px;border-color:#6e5f85;background:linear-gradient(135deg,#171526,#101820)"><div class="label">FRIENDS_SAMPLE · REFERENCIAS</div><h2 style="margin:4px 0 7px">Referencias que dejan huella · Amigos 01</h2><div class="sub">No vota qué copiar: mide qué funciones, contrastes y sensaciones merecen pasar a prototipo + CQC.</div><div class="callout" style="margin-top:11px"><b>Candidato inicial:</b> fantasma marítimo absurdo / presencia espectral · peso provisional C/25.<br><b>Regla:</b> función &gt; personaje · anti-collage · decisión final humana.</div><div class="pollActions"><a class="btn primary" target="_blank" rel="noopener" href="poll/referencias-amigos.html">ABRIR ENCUESTA DE REFERENCIAS</a></div></div>';
      var rb=document.getElementById('refreshPoll');if(rb)rb.onclick=loadPollState;
    }

    function installPollsModule(){
      var rail=document.querySelector('.rail');
      var main=document.querySelector('main');
      if(!rail||!main)return;
      if(!document.querySelector('.rail button[data-view="polls"]')){
        var btn=document.createElement('button');
        btn.setAttribute('data-view','polls');btn.setAttribute('title','Encuestas');btn.setAttribute('data-help','Encuestas activas, resultados y confirmación de autor.');btn.textContent='☑';btn.onclick=function(){openView('polls')};rail.appendChild(btn);
      }
      if(!document.getElementById('polls')){var view=document.createElement('section');view.id='polls';view.className='view';main.appendChild(view);}
    }

    function loadPollState(){
      fetch('/api/poll-state').then(function(r){if(!r.ok)throw new Error('live');return r.json()}).then(renderPolls).catch(function(){
        fetch('ISL_POLL_STATUS_CURRENT.json').then(function(r){if(!r.ok)throw new Error('fallback');return r.json()}).then(renderPolls).catch(function(){});
      });
    }

    installPollsModule();
    loadPollState();
    // Cost-control: live poll state loads on page open and via the ACTUALIZAR button.
    // Avoid background polling so leaving the Command Center open does not create repeated function calls.

    fetch('ISL_PROJECT_STATE_CURRENT.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('state');return r.json()}).then(function(s){
      var main=document.querySelector('main');
      if(main&&!document.getElementById('islCurrentStateBanner')){
        var box=document.createElement('section');
        box.id='islCurrentStateBanner';box.className='panel';
        box.style.cssText='border-color:#4f7d86;background:linear-gradient(135deg,#102833,#171f24);margin:0 0 14px;box-shadow:0 16px 44px #0005';
        var phase=s.phase||'ESTADO ACTUAL';var phaseStatus=s.phase_status||'EN CURSO';var previous=s.previous_phase||'';var previousStatus=s.previous_phase_status||'';
        box.innerHTML='<div class="eyebrow">ESTADO ACTUAL · '+esc(s.updated_at||'')+'</div><div style="display:flex;gap:10px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap"><div><h2 style="margin:3px 0 7px">'+esc(phase)+'</h2><div class="sub"><b>'+esc(phaseStatus)+'</b>'+(previous?' · '+esc(previous)+' — '+esc(previousStatus):'')+'</div></div><span class="status good" style="padding:7px 9px;border:1px solid #567a55;border-radius:999px">ACTIVO</span></div>';
        main.insertBefore(box,main.firstChild);
      }
    }).catch(function(){});
  })
})();
