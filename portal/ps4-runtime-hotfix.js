(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  ready(function(){
    var audio=document.getElementById('ambience');
    var bar=document.getElementById('consoleBar');
    var audioState=document.getElementById('audioState');
    var menu=document.getElementById('menuPrincipal');
    var fsBtn=document.getElementById('fsBtn');
    var audioBtn=document.getElementById('audioBtn');

    try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}

    var st=document.createElement('style');
    st.id='isl-ps4-runtime-hotfix-style';
    st.textContent='\n#consoleBar{position:fixed!important;top:72px!important;left:50%!important;right:auto!important;bottom:auto!important;transform:translateX(-50%)!important;z-index:2147483000!important;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:center!important;gap:8px!important;padding:7px 9px!important;border:1px solid #35515d!important;border-radius:16px!important;background:rgba(5,14,20,.96)!important;box-shadow:0 10px 30px rgba(0,0,0,.48)!important;max-width:calc(100vw - 80px)!important}\n#consoleBar button{display:block!important;min-width:88px!important;width:auto!important;height:48px!important;padding:0 13px!important;border-radius:12px!important;font-size:14px!important;white-space:nowrap!important;border-color:#8defff!important}\n#audioBtn{background:#173640!important;color:#dfff7b!important}\n#audioState{display:block!important;min-width:150px!important;font-size:11px!important;padding:9px 10px!important;border-radius:10px!important;white-space:nowrap!important;color:#dfff7b!important}\n@media(max-width:900px){#consoleBar{top:60px!important;max-width:calc(100vw - 44px)!important}#consoleBar button{min-width:76px!important;padding:0 9px!important}#audioState{min-width:128px!important}}\n';
    document.head.appendChild(st);

    if(menu&&!document.getElementById('ps4DecisionEngine')){
      var a=document.createElement('a');
      a.id='ps4DecisionEngine';a.className='btn focusable navsave';a.href='decision-engine.html';a.textContent='DECISION ENGINE';
      menu.appendChild(a);
    }

    function isPlaying(){return !!(audio&&!audio.paused&&!audio.muted)}
    function paint(){
      if(!audio)return;
      var on=isPlaying();
      if(audioState){audioState.textContent=on?'SONIDO 100%':'PULSA X · SONIDO 100%';audioState.style.color=on?'#dfff7b':'#ffc36e'}
      if(audioBtn){audioBtn.textContent=on?'♫ 100%':'♫ ACTIVAR';audioBtn.setAttribute('aria-pressed','true')}
      if(fsBtn)fsBtn.textContent=(document.fullscreenElement||document.webkitFullscreenElement)?'✕ FULL':'⛶ FULL';
    }

    function normalizeAudio(){
      if(!audio)return;
      try{audio.volume=1}catch(e){}
      try{audio.muted=false}catch(e){}
      audio.autoplay=true;audio.loop=true;
      try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}
    }

    function forceAudio(){
      if(!audio)return false;
      normalizeAudio();
      try{
        var p=audio.play();
        if(p&&p.then)p.then(function(){normalizeAudio();paint()}).catch(function(){paint()});
        return true;
      }catch(e){paint();return false}
    }

    function burstAudio(){
      forceAudio();
      setTimeout(forceAudio,180);
      setTimeout(forceAudio,650);
    }

    function forceFs(){
      if(document.fullscreenElement||document.webkitFullscreenElement)return;
      var el=document.documentElement,fn=el.requestFullscreen||el.webkitRequestFullscreen;
      if(!fn)return;
      try{var p=fn.call(el);if(p&&p.catch)p.catch(function(){})}catch(e){}
    }

    if(audio){
      normalizeAudio();
      audio.addEventListener('loadedmetadata',function(){normalizeAudio();paint()});
      audio.addEventListener('canplay',function(){normalizeAudio();paint()});
      audio.addEventListener('play',function(){normalizeAudio();paint()});
      audio.addEventListener('volumechange',function(){if(audio.volume!==1||audio.muted){normalizeAudio()}paint()});
      audio.addEventListener('pause',function(){paint();if(!document.hidden){setTimeout(forceAudio,80);setTimeout(forceAudio,500)}});
      audio.addEventListener('ended',burstAudio);
    }

    if(audioBtn){audioBtn.onclick=function(e){e.preventDefault();e.stopPropagation();burstAudio();paint()}}
    if(fsBtn){fsBtn.onclick=function(e){e.preventDefault();burstAudio();forceFs();setTimeout(paint,120)}}

    function trusted(){burstAudio();forceFs()}
    document.addEventListener('keydown',trusted,true);
    document.addEventListener('click',trusted,true);
    document.addEventListener('pointerdown',trusted,true);
    document.addEventListener('touchstart',trusted,true);
    window.addEventListener('focus',burstAudio);
    window.addEventListener('pageshow',function(){burstAudio();paint()});
    document.addEventListener('visibilitychange',function(){if(!document.hidden)burstAudio()});
    document.addEventListener('fullscreenchange',paint);
    document.addEventListener('webkitfullscreenchange',paint);

    burstAudio();
    setTimeout(paint,900);
  });
})();
