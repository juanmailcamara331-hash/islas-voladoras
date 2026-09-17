(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  ready(function(){
    var audio=document.getElementById('ambience');
    var bar=document.getElementById('consoleBar');
    var audioState=document.getElementById('audioState');
    var menu=document.getElementById('menuPrincipal');
    var fsBtn=document.getElementById('fsBtn');
    var audioBtn=document.getElementById('audioBtn');

    var st=document.createElement('style');
    st.id='isl-ps4-runtime-hotfix-style';
    st.textContent='\n#consoleBar{position:fixed!important;top:14px!important;left:50%!important;right:auto!important;bottom:auto!important;transform:translateX(-50%)!important;z-index:2147483000!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:8px!important;padding:7px 9px!important;border:1px solid #35515d!important;border-radius:16px!important;background:rgba(5,14,20,.94)!important;box-shadow:0 10px 30px rgba(0,0,0,.45)!important;max-width:calc(100vw - 48px)!important}\n#consoleBar button{display:block!important;min-width:74px!important;width:auto!important;height:48px!important;padding:0 13px!important;border-radius:12px!important;font-size:14px!important;white-space:nowrap!important}\n#audioState{display:block!important;min-width:104px!important;font-size:11px!important;padding:9px 10px!important;border-radius:10px!important;white-space:nowrap!important}\n@media(max-width:900px){#consoleBar{top:10px!important;max-width:calc(100vw - 28px)!important}#consoleBar button{min-width:62px!important;padding:0 9px!important}#audioState{min-width:92px!important}}\n';
    document.head.appendChild(st);

    if(menu&&!document.getElementById('ps4DecisionEngine')){
      var a=document.createElement('a');
      a.id='ps4DecisionEngine';a.className='btn focusable navsave';a.href='decision-engine.html';a.textContent='DECISION ENGINE';
      menu.appendChild(a);
    }

    function paint(){
      if(!audio)return;
      var on=!audio.paused&&!audio.muted;
      if(audioState){audioState.textContent=on?'SONIDO 100%':'SONIDO LISTO';audioState.style.color=on?'#dfff7b':'#ffc36e'}
      if(audioBtn)audioBtn.textContent=on?'♫ 100%':'♫ PLAY';
      if(fsBtn)fsBtn.textContent=(document.fullscreenElement||document.webkitFullscreenElement)?'✕ FULL':'⛶ FULL';
    }

    function forceAudio(){
      if(!audio)return;
      try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}
      audio.autoplay=true;audio.loop=true;audio.muted=false;audio.volume=1;
      try{var p=audio.play();if(p&&p.then)p.then(paint).catch(paint)}catch(e){paint()}
    }

    function forceFs(){
      if(document.fullscreenElement||document.webkitFullscreenElement)return;
      var el=document.documentElement,fn=el.requestFullscreen||el.webkitRequestFullscreen;
      if(!fn)return;
      try{var p=fn.call(el);if(p&&p.catch)p.catch(function(){})}catch(e){}
    }

    if(audio){
      audio.volume=1;audio.muted=false;audio.autoplay=true;
      audio.addEventListener('loadedmetadata',function(){audio.volume=1;audio.muted=false;paint()});
      audio.addEventListener('canplay',function(){audio.volume=1;audio.muted=false;paint()});
      audio.addEventListener('play',function(){audio.volume=1;audio.muted=false;paint()});
      audio.addEventListener('pause',paint);
    }

    if(audioBtn){audioBtn.onclick=function(e){e.preventDefault();forceAudio();paint()}}
    if(fsBtn){fsBtn.onclick=function(e){e.preventDefault();forceAudio();forceFs();setTimeout(paint,120)}}

    var trusted=function(){forceAudio();forceFs()};
    document.addEventListener('keydown',trusted,true);
    document.addEventListener('click',trusted,true);
    document.addEventListener('pointerdown',trusted,true);
    document.addEventListener('touchstart',trusted,true);
    window.addEventListener('focus',forceAudio);
    window.addEventListener('pageshow',function(){forceAudio();paint()});
    document.addEventListener('visibilitychange',function(){if(!document.hidden)forceAudio()});
    document.addEventListener('fullscreenchange',paint);
    document.addEventListener('webkitfullscreenchange',paint);

    setTimeout(forceAudio,150);
    setTimeout(forceAudio,700);
    setTimeout(paint,900);
  });
})();
