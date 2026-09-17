(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  ready(function(){
    var audio=document.getElementById('ambience');
    var bar=document.getElementById('consoleBar');
    var audioState=document.getElementById('audioState');
    var menu=document.getElementById('menuPrincipal');
    var fsBtn=document.getElementById('fsBtn');
    var audioBtn=document.getElementById('audioBtn');
    var AUDIO_URL=(location.origin||'')+'/assets/airships-last-waltz-master.mp3';
    var unlocked=false,lastError='';

    try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}

    var st=document.createElement('style');
    st.id='isl-ps4-runtime-hotfix-style';
    st.textContent='\n#consoleBar{position:fixed!important;top:18px!important;left:50%!important;right:auto!important;bottom:auto!important;transform:translateX(-50%)!important;z-index:2147483000!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:7px!important;padding:6px 8px!important;border:1px solid #35515d!important;border-radius:14px!important;background:rgba(5,14,20,.96)!important;box-shadow:0 10px 30px rgba(0,0,0,.45)!important;max-width:calc(100vw - 90px)!important}\n#consoleBar button{display:block!important;min-width:86px!important;width:auto!important;height:46px!important;padding:0 12px!important;border-radius:10px!important;font-size:13px!important;white-space:nowrap!important}\n#audioState{display:block!important;min-width:132px!important;max-width:210px!important;font-size:10px!important;line-height:1.15!important;padding:8px 9px!important;border-radius:9px!important;white-space:normal!important;text-align:center!important}\n@media(max-width:900px){#consoleBar{top:12px!important;max-width:calc(100vw - 56px)!important}#consoleBar button{min-width:72px!important;padding:0 8px!important}#audioState{min-width:112px!important}}\n';
    document.head.appendChild(st);

    if(menu&&!document.getElementById('ps4DecisionEngine')){
      var a=document.createElement('a');
      a.id='ps4DecisionEngine';a.className='btn focusable navsave';a.href='decision-engine.html';a.textContent='DECISION ENGINE';
      menu.appendChild(a);
    }

    function setStatus(text,color){
      if(audioState){audioState.textContent=text;audioState.style.color=color||'#ffc36e'}
    }

    function paint(){
      if(!audio)return;
      var on=!audio.paused&&!audio.muted&&audio.readyState>=2;
      if(on){setStatus('SONIDO 100%','#dfff7b');if(audioBtn)audioBtn.textContent='♫ 100%';}
      else if(lastError){setStatus(lastError,'#ff9b82');if(audioBtn)audioBtn.textContent='♫ REINTENTAR';}
      else if(!unlocked){setStatus('PULSA X · SONIDO 100%','#ffc36e');if(audioBtn)audioBtn.textContent='♫ ACTIVAR';}
      else{setStatus('CARGANDO AUDIO…','#ffc36e');if(audioBtn)audioBtn.textContent='♫ 100%';}
      if(fsBtn)fsBtn.textContent=(document.fullscreenElement||document.webkitFullscreenElement)?'✕ FULL':'⛶ FULL';
    }

    function normalizeAudio(resetSource){
      if(!audio)return false;
      try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}
      audio.autoplay=false;
      audio.loop=true;
      audio.muted=false;
      audio.defaultMuted=false;
      audio.volume=1;
      if(resetSource || !audio.src || audio.src.indexOf('airships-last-waltz-master.mp3')<0){
        try{audio.pause()}catch(e){}
        audio.setAttribute('src',AUDIO_URL);
        try{audio.load()}catch(e){}
      }
      return true;
    }

    function probeSupport(){
      if(!audio||!audio.canPlayType)return true;
      try{
        var v=audio.canPlayType('audio/mpeg');
        if(v==='') {lastError='MP3 NO SOPORTADO';paint();return false;}
      }catch(e){}
      return true;
    }

    function startAudio(fromGesture,hardReset){
      if(!audio)return false;
      lastError='';
      if(!probeSupport())return false;
      normalizeAudio(!!hardReset);
      if(fromGesture)unlocked=true;
      try{
        var p=audio.play();
        if(p&&p.then){
          p.then(function(){unlocked=true;lastError='';audio.volume=1;audio.muted=false;paint();})
           .catch(function(err){lastError=(err&&err.name==='NotAllowedError')?'PULSA X PARA ACTIVAR':'ERROR DE AUDIO';paint();});
        }else{
          setTimeout(function(){if(!audio.paused){unlocked=true;lastError=''}paint()},250);
        }
        return true;
      }catch(e){lastError='ERROR DE AUDIO';paint();return false;}
    }

    function forceFs(){
      if(document.fullscreenElement||document.webkitFullscreenElement)return;
      var el=document.documentElement,fn=el.requestFullscreen||el.webkitRequestFullscreen;
      if(!fn)return;
      try{var p=fn.call(el);if(p&&p.catch)p.catch(function(){})}catch(e){}
    }

    function trustedGesture(e){
      try{localStorage.setItem('isl_ps4_audio','on')}catch(x){}
      startAudio(true,false);
      if(e&&e.target===fsBtn)forceFs();
    }

    if(audio){
      normalizeAudio(false);
      audio.addEventListener('loadstart',function(){lastError='';paint()});
      audio.addEventListener('loadedmetadata',function(){audio.volume=1;audio.muted=false;paint()});
      audio.addEventListener('canplay',function(){audio.volume=1;audio.muted=false;if(unlocked&&audio.paused)startAudio(false,false);paint()});
      audio.addEventListener('playing',function(){unlocked=true;lastError='';audio.volume=1;audio.muted=false;paint()});
      audio.addEventListener('pause',function(){try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}paint()});
      audio.addEventListener('error',function(){
        var code=audio.error&&audio.error.code;
        lastError=code===4?'FORMATO NO COMPATIBLE':code===3?'ERROR DECODIFICANDO':code===2?'ERROR DE RED':'ERROR DE AUDIO';
        paint();
      });
      audio.addEventListener('stalled',function(){setStatus('RECARGANDO AUDIO…','#ffc36e')});
    }

    if(audioBtn){
      audioBtn.onclick=function(e){
        if(e){e.preventDefault();e.stopPropagation()}
        unlocked=true;lastError='';
        startAudio(true,true);
        return false;
      };
    }
    if(fsBtn){fsBtn.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}startAudio(true,false);forceFs();setTimeout(paint,120);return false;}}

    document.addEventListener('keydown',function(e){trustedGesture(e)},true);
    document.addEventListener('click',function(e){if(e.target!==audioBtn&&e.target!==fsBtn)trustedGesture(e)},true);
    document.addEventListener('pointerdown',function(e){if(e.target!==audioBtn&&e.target!==fsBtn)trustedGesture(e)},true);
    document.addEventListener('touchstart',function(e){if(e.target!==audioBtn&&e.target!==fsBtn)trustedGesture(e)},true);
    window.addEventListener('focus',function(){startAudio(false,false)});
    window.addEventListener('pageshow',function(){try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}normalizeAudio(false);startAudio(false,false);paint()});
    document.addEventListener('visibilitychange',function(){if(!document.hidden){normalizeAudio(false);startAudio(false,false)}});
    document.addEventListener('fullscreenchange',paint);
    document.addEventListener('webkitfullscreenchange',paint);

    setInterval(function(){
      try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}
      if(audio){audio.volume=1;audio.muted=false;if(unlocked&&audio.paused&&!lastError)startAudio(false,false)}
    },1800);

    normalizeAudio(true);
    setTimeout(function(){startAudio(false,false)},150);
    setTimeout(paint,500);
  });
})();
