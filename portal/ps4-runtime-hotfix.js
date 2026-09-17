(function(){
  function ready(fn){if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn)}else{fn()}}
  ready(function(){
    var oldAudio=document.getElementById('ambience');
    var audioState=document.getElementById('audioState');
    var menu=document.getElementById('menuPrincipal');
    var fsBtn=document.getElementById('fsBtn');
    var audioBtn=document.getElementById('audioBtn');
    var bootBtn=document.getElementById('bootBtn');
    var VIDEO_URL='assets/airships-last-waltz-ps4.mp4';
    var unlocked=false,lastError='';

    try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}
    if(oldAudio){try{oldAudio.pause();oldAudio.muted=true}catch(e){}}

    var st=document.createElement('style');
    st.id='isl-ps4-runtime-hotfix-style';
    st.textContent='#consoleBar{position:fixed!important;top:16px!important;left:50%!important;right:auto!important;bottom:auto!important;transform:translateX(-50%)!important;z-index:2147483000!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:7px!important;padding:6px 8px!important;border:1px solid #35515d!important;border-radius:14px!important;background:rgba(5,14,20,.96)!important;box-shadow:0 10px 30px rgba(0,0,0,.45)!important;max-width:calc(100vw - 100px)!important}#consoleBar button{display:block!important;min-width:86px!important;width:auto!important;height:46px!important;padding:0 12px!important;border-radius:10px!important;font-size:13px!important;white-space:nowrap!important}#audioState{display:block!important;min-width:145px!important;max-width:220px!important;font-size:10px!important;line-height:1.15!important;padding:8px 9px!important;border-radius:9px!important;white-space:normal!important;text-align:center!important}#ps4AudioBridge{position:fixed!important;left:0!important;bottom:0!important;width:2px!important;height:2px!important;opacity:.01!important;pointer-events:none!important;z-index:-1!important}@media(max-width:900px){#consoleBar{top:10px!important;max-width:calc(100vw - 70px)!important}#consoleBar button{min-width:72px!important;padding:0 8px!important}#audioState{min-width:120px!important}}';
    document.head.appendChild(st);

    if(menu&&!document.getElementById('ps4DecisionEngine')){
      var a=document.createElement('a');a.id='ps4DecisionEngine';a.className='btn focusable navsave';a.href='decision-engine.html';a.textContent='DECISION ENGINE';menu.appendChild(a);
    }

    var player=document.createElement('video');
    player.id='ps4AudioBridge';
    player.setAttribute('playsinline','playsinline');
    player.setAttribute('webkit-playsinline','webkit-playsinline');
    player.setAttribute('preload','auto');
    player.loop=true;
    player.volume=1;
    player.muted=false;
    player.src=VIDEO_URL;
    document.body.appendChild(player);

    function status(t,c){if(audioState){audioState.textContent=t;audioState.style.color=c||'#ffc36e'}}
    function playing(){return player&&!player.paused&&!player.ended&&player.readyState>=2}
    function paint(){
      if(playing()){
        status('SONIDO 100% · PS4 AAC','#dfff7b');
        if(audioBtn)audioBtn.textContent='♫ 100%';
      }else if(lastError){
        status(lastError,'#ff9b82');
        if(audioBtn)audioBtn.textContent='♫ REINTENTAR';
      }else if(!unlocked){
        status('PULSA X · ACTIVAR SONIDO','#ffc36e');
        if(audioBtn)audioBtn.textContent='♫ ACTIVAR';
      }else{
        status('CARGANDO AAC…','#ffc36e');
        if(audioBtn)audioBtn.textContent='♫ 100%';
      }
      if(fsBtn)fsBtn.textContent=(document.fullscreenElement||document.webkitFullscreenElement)?'✕ FULL':'⛶ FULL';
    }

    function normalize(reload){
      try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}
      player.loop=true;player.volume=1;player.muted=false;
      if(reload){try{player.pause()}catch(e){};try{player.src=VIDEO_URL;player.load()}catch(e){}}
    }

    function start(fromGesture,reload){
      lastError='';
      if(fromGesture)unlocked=true;
      normalize(!!reload);
      try{
        var p=player.play();
        if(p&&p.then){
          p.then(function(){unlocked=true;lastError='';player.volume=1;player.muted=false;paint()})
           .catch(function(err){lastError=(err&&err.name==='NotAllowedError')?'PULSA X PARA SONIDO':'ERROR VIDEO/AAC';paint()});
        }else{
          setTimeout(function(){if(playing()){unlocked=true;lastError=''}else if(fromGesture){lastError='NO ARRANCA VIDEO/AAC'}paint()},450);
        }
        return true;
      }catch(e){lastError='ERROR VIDEO/AAC';paint();return false}
    }

    function forceFs(){
      if(document.fullscreenElement||document.webkitFullscreenElement)return;
      var el=document.documentElement,fn=el.requestFullscreen||el.webkitRequestFullscreen;
      if(!fn)return;
      try{var p=fn.call(el);if(p&&p.catch)p.catch(function(){})}catch(e){}
    }

    player.addEventListener('loadedmetadata',function(){player.volume=1;player.muted=false;paint()});
    player.addEventListener('canplay',function(){player.volume=1;player.muted=false;if(unlocked&&player.paused)start(false,false);paint()});
    player.addEventListener('playing',function(){unlocked=true;lastError='';player.volume=1;player.muted=false;paint()});
    player.addEventListener('ended',function(){try{player.currentTime=0}catch(e){}start(false,false)});
    player.addEventListener('error',function(){var c=player.error&&player.error.code;lastError=c===4?'MP4/AAC NO SOPORTADO':c===3?'ERROR DECODIFICANDO':c===2?'ERROR DE RED':'ERROR VIDEO/AAC';paint()});
    player.addEventListener('stalled',function(){status('RECARGANDO AAC…','#ffc36e')});

    if(audioBtn){audioBtn.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}unlocked=true;lastError='';start(true,true);return false}};
    if(fsBtn){fsBtn.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}start(true,false);forceFs();setTimeout(paint,120);return false}};

    if(bootBtn){
      var oldBoot=bootBtn.onclick;
      bootBtn.onclick=function(e){start(true,true);if(oldBoot){oldBoot.call(bootBtn,e)}return false};
    }

    document.addEventListener('keydown',function(){start(true,false)},true);
    document.addEventListener('click',function(e){if(e.target!==audioBtn&&e.target!==fsBtn&&e.target!==bootBtn)start(true,false)},true);
    window.addEventListener('pageshow',function(){normalize(false);if(unlocked)start(false,false);paint()});
    window.addEventListener('focus',function(){if(unlocked)start(false,false)});
    document.addEventListener('visibilitychange',function(){if(!document.hidden&&unlocked)start(false,false)});
    document.addEventListener('fullscreenchange',paint);
    document.addEventListener('webkitfullscreenchange',paint);

    setInterval(function(){normalize(false);if(unlocked&&player.paused&&!lastError)start(false,false)},1800);

    normalize(true);
    setTimeout(paint,300);
  });
})();
