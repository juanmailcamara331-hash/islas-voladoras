(function(){
  function ready(fn){if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn)}else{fn()}}
  ready(function(){
    var oldAudio=document.getElementById('ambience');
    var audioState=document.getElementById('audioState');
    var menu=document.getElementById('menuPrincipal');
    var fsBtn=document.getElementById('fsBtn');
    var audioBtn=document.getElementById('audioBtn');
    var bootBtn=document.getElementById('bootBtn');
    var SOURCES=['assets/airships-last-waltz-ps4.mp4','assets/isl-tv-reel-premium-1080p.mp4','assets/previs-premium-1080p-L41.mp4','assets/airships-last-waltz-master.mp3'];
    var sourceIndex=0,unlocked=false,lastError='';

    try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}
    if(oldAudio){try{oldAudio.pause();oldAudio.muted=true;oldAudio.removeAttribute('src');oldAudio.load()}catch(e){}}

    var st=document.createElement('style');
    st.id='isl-ps4-runtime-hotfix-style';
    st.textContent='#consoleBar{position:fixed!important;top:16px!important;left:50%!important;right:auto!important;bottom:auto!important;transform:translateX(-50%)!important;z-index:2147483000!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:7px!important;padding:6px 8px!important;border:1px solid #35515d!important;border-radius:14px!important;background:rgba(5,14,20,.96)!important;max-width:calc(100vw - 100px)!important}#consoleBar button{display:block!important;min-width:86px!important;width:auto!important;height:46px!important;padding:0 12px!important;border-radius:10px!important;font-size:13px!important;white-space:nowrap!important}#audioState{display:block!important;min-width:150px!important;max-width:230px!important;font-size:10px!important;line-height:1.15!important;padding:8px 9px!important;border-radius:9px!important;white-space:normal!important;text-align:center!important}#ps4AudioBridge{position:fixed!important;left:2px!important;bottom:2px!important;width:4px!important;height:4px!important;opacity:.01!important;pointer-events:none!important;z-index:1!important}#ps4DecisionSummary{margin-top:14px;border:2px solid #34515d;background:#0a161d;padding:15px}#ps4DecisionSummary .dsgrid{display:flex;flex-wrap:wrap;gap:10px}#ps4DecisionSummary .ds{flex:1 1 260px;border:1px solid #294955;background:#0c1a22;padding:12px}#ps4DecisionSummary .dsl{font-size:11px;letter-spacing:2px;color:#8defff}#ps4DecisionSummary .dsv{font-size:17px;font-weight:bold;color:#fff;margin-top:6px;line-height:1.35}#ps4DecisionSummary .pending{color:#ffc36e}@media(max-width:900px){#consoleBar{top:10px!important;max-width:calc(100vw - 70px)!important}#consoleBar button{min-width:72px!important;padding:0 8px!important}#audioState{min-width:120px!important}}';
    document.head.appendChild(st);

    if(menu&&!document.getElementById('ps4DecisionEngine')){
      var a=document.createElement('a');
      a.id='ps4DecisionEngine';
      a.className='btn focusable navsave';
      a.href='decision-engine.html';
      a.textContent='CENTRO DE DECISIONES · SOLO AUTOR';
      menu.appendChild(a);
    }

    if(menu&&!document.getElementById('ps4DecisionSummary')){
      var summary=document.createElement('div');
      summary.id='ps4DecisionSummary';
      summary.innerHTML='<div class="dsl">CENTRO DE DECISIONES · MOLINO R1</div><div class="dsgrid"><div class="ds"><div class="dsl">VOTOS</div><div id="ps4Votes" class="dsv pending">· ganador: pendiente</div></div><div class="ds"><div class="dsl">CONFIRMACIÓN AUTOR</div><div id="ps4Author" class="dsv pending">PENDIENTE → PRODUCCION_O_ESPERA_O_REJECTED_LEARNED</div></div></div>';
      menu.parentNode.insertBefore(summary,menu.nextSibling);
      fetch('ISL_DECISION_ENGINE_CURRENT.json',{cache:'no-store'}).then(function(r){return r.json()}).then(function(data){
        var p=data&&data.polls&&data.polls[0];if(!p)return;
        var votes=document.getElementById('ps4Votes'),author=document.getElementById('ps4Author');
        if(votes)votes.textContent=String((p.result&&p.result.total_votes)||0)+' · ganador: '+((p.result&&p.result.winner)||'pendiente');
        if(author)author.textContent=((p.author_confirmation&&p.author_confirmation.status)||'PENDIENTE')+' → '+(p.promotion_target||'PRODUCCION_O_ESPERA_O_REJECTED_LEARNED');
      }).catch(function(){});
    }

    var player=document.createElement('video');
    player.id='ps4AudioBridge';
    player.setAttribute('playsinline','playsinline');
    player.setAttribute('webkit-playsinline','webkit-playsinline');
    player.setAttribute('preload','none');
    player.loop=true;player.autoplay=false;player.controls=false;player.volume=1;player.muted=false;
    document.body.appendChild(player);

    function status(t,c){if(audioState){audioState.textContent=t;audioState.style.color=c||'#ffc36e'}}
    function isPlaying(){return player&&!player.paused&&!player.ended&&player.readyState>=2}
    function sourceName(){return sourceIndex===0?'AAC PS4':sourceIndex===1?'AAC REEL':sourceIndex===2?'AAC PREVIS':'MP3'}
    function paint(){
      if(isPlaying()){status('SONIDO 100% · '+sourceName(),'#dfff7b');if(audioBtn)audioBtn.textContent='♫ 100%'}
      else if(lastError){status(lastError,'#ff9b82');if(audioBtn)audioBtn.textContent='♫ REINTENTAR'}
      else if(!unlocked){status('PULSA X · SONIDO 100%','#ffc36e');if(audioBtn)audioBtn.textContent='♫ ACTIVAR'}
      else{status('CARGANDO '+sourceName()+'…','#ffc36e');if(audioBtn)audioBtn.textContent='♫ 100%'}
      if(fsBtn)fsBtn.textContent=(document.fullscreenElement||document.webkitFullscreenElement)?'✕ FULL':'⛶ FULL';
    }
    function loadSource(index){
      sourceIndex=index%SOURCES.length;lastError='';
      try{player.pause()}catch(e){}
      player.src=SOURCES[sourceIndex];player.loop=true;player.volume=1;player.muted=false;
      try{player.load()}catch(e){}
      paint();
    }
    function start(fromGesture,reload){
      if(fromGesture)unlocked=true;
      try{localStorage.setItem('isl_ps4_audio','on')}catch(e){}
      player.volume=1;player.muted=false;player.loop=true;
      if(reload||!player.src){loadSource(sourceIndex)}
      lastError='';
      try{
        var p=player.play();
        if(p&&p.then){p.then(function(){unlocked=true;lastError='';player.volume=1;player.muted=false;paint()}).catch(function(err){lastError=(err&&err.name==='NotAllowedError')?'PULSA X OTRA VEZ':'ERROR AL REPRODUCIR '+sourceName();paint()})}
        else{setTimeout(function(){if(isPlaying()){unlocked=true;lastError=''}else if(fromGesture){lastError='NO ARRANCA '+sourceName()}paint()},650)}
      }catch(e){lastError='ERROR AL REPRODUCIR '+sourceName();paint()}
    }
    function nextSource(){sourceIndex=(sourceIndex+1)%SOURCES.length;loadSource(sourceIndex)}
    function forceFs(){if(document.fullscreenElement||document.webkitFullscreenElement)return;var el=document.documentElement,fn=el.requestFullscreen||el.webkitRequestFullscreen;if(fn){try{fn.call(el)}catch(e){}}}

    player.addEventListener('loadedmetadata',function(){player.volume=1;player.muted=false;paint()});
    player.addEventListener('canplay',function(){player.volume=1;player.muted=false;if(unlocked&&player.paused)start(false,false);paint()});
    player.addEventListener('playing',function(){unlocked=true;lastError='';player.volume=1;player.muted=false;paint()});
    player.addEventListener('error',function(){var c=player.error&&player.error.code;lastError=(c===4?'FORMATO NO SOPORTADO':c===3?'ERROR DECODIFICANDO':c===2?'ERROR DE RED':'ERROR MEDIA')+' · '+sourceName();paint()});
    player.addEventListener('stalled',function(){status('RECARGANDO '+sourceName()+'…','#ffc36e')});

    if(audioBtn){audioBtn.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();if(lastError){nextSource()}start(true,false);return false},true)}
    if(fsBtn){fsBtn.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();start(true,false);forceFs();setTimeout(paint,120);return false},true)}
    if(bootBtn){bootBtn.addEventListener('click',function(){start(true,false)},true)}

    document.addEventListener('keydown',function(){if(!isPlaying())start(true,false)},true);
    document.addEventListener('click',function(e){if(e.target!==audioBtn&&e.target!==fsBtn&&!isPlaying())start(true,false)},true);
    window.addEventListener('pageshow',function(){try{localStorage.setItem('isl_ps4_audio','on')}catch(e){};if(unlocked&&!isPlaying())start(false,false);paint()});
    window.addEventListener('focus',function(){if(unlocked&&!isPlaying())start(false,false)});
    document.addEventListener('visibilitychange',function(){if(!document.hidden&&unlocked&&!isPlaying())start(false,false)});
    document.addEventListener('fullscreenchange',paint);document.addEventListener('webkitfullscreenchange',paint);

    setInterval(function(){try{localStorage.setItem('isl_ps4_audio','on')}catch(e){};player.volume=1;player.muted=false;if(unlocked&&player.paused&&!lastError)start(false,false)},1800);
    loadSource(0);setTimeout(paint,300);
  });
})();
