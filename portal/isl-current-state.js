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
    `;
    document.head.appendChild(controlStyle);

    var lightbox=document.getElementById('lightbox');
    function syncMediaOpen(){document.body.classList.toggle('isl-media-open',!!(lightbox&&lightbox.classList.contains('show')))}
    if(lightbox){syncMediaOpen();new MutationObserver(syncMediaOpen).observe(lightbox,{attributes:true,attributeFilter:['class']});}
    document.addEventListener('fullscreenchange',syncMediaOpen);
    document.addEventListener('webkitfullscreenchange',syncMediaOpen);

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
