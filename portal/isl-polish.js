(function(){
  /* Runtime guardrails: never let compatibility CSS break the actual mobile UX. */
  var hotfix=document.getElementById('isl-mobile-entry-hotfix');
  if(hotfix)hotfix.remove();

  var style=document.createElement('style');
  style.id='isl-runtime-final-css';
  style.textContent=`
    html,body{overflow-x:hidden!important;overflow-y:auto!important;min-height:100%!important}
    .app{overflow:visible!important;min-height:100dvh!important}
    #track{display:none!important;visibility:hidden!important;pointer-events:none!important}
    #track audio{display:none!important}
    #lightbox{position:fixed!important;inset:0!important;width:100%!important;height:100dvh!important;z-index:12000!important;margin:0!important;transform:none!important}
    #lightbox.show{display:flex!important;align-items:center!important;justify-content:center!important}
    #lightbox figure{margin:0!important;max-width:100%!important;max-height:100dvh!important}
    #lbMedia{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;max-width:100%!important}
    #lbMedia img,#lbMedia video{display:block!important;max-width:100%!important;max-height:calc(100dvh - 72px)!important;object-fit:contain!important}
    html:fullscreen,html:-webkit-full-screen{overflow-x:hidden!important;overflow-y:auto!important}
    html:fullscreen body,html:-webkit-full-screen body{overflow-x:hidden!important;overflow-y:auto!important;min-height:100%!important}
    @media(orientation:landscape) and (max-height:700px){
      html,body,.app,main{overflow-y:auto!important;height:auto!important;min-height:100%!important}
      main{padding-bottom:72px!important}
      .hero{min-height:min(520px,calc(100dvh - 56px))!important;height:auto!important}
    }
    #islFsToggle{position:fixed;right:max(12px,env(safe-area-inset-right));bottom:max(12px,env(safe-area-inset-bottom));z-index:12500;width:44px;height:44px;border:1px solid #ffffff2b;border-radius:999px;background:#071018dd;color:#fff;display:grid;place-items:center;font-size:18px;box-shadow:0 10px 30px #0008;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
    button,.btn,a[role=button],.rail button{transition:transform .16s cubic-bezier(.2,.8,.2,1),box-shadow .16s ease,border-color .16s ease,background-color .16s ease!important;will-change:transform}
    button:active,.btn:active,a[role=button]:active,.rail button:active,.isl-pressed{transform:translateY(1px) scale(.965)!important}
    @media(prefers-reduced-motion:reduce){button,.btn,a[role=button],.rail button{transition:none!important}.isl-pressed{transform:none!important}}
  `;
  document.head.appendChild(style);

  try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
  if(!location.hash){requestAnimationFrame(function(){window.scrollTo(0,0)});setTimeout(function(){window.scrollTo(0,0)},80)}

  /* Restore the designed welcome screen on phones; previous emergency CSS hid it. */
  var welcome=document.getElementById('welcome');
  if(welcome&&window.matchMedia&&window.matchMedia('(orientation: portrait)').matches){
    welcome.classList.remove('hidden');
    welcome.style.display='flex';welcome.style.visibility='visible';welcome.style.opacity='1';welcome.style.pointerEvents='auto';
  }

  /* Keep the media viewer under body so fixed positioning is truly viewport-fixed. */
  var lb=document.getElementById('lightbox');
  if(lb&&lb.parentNode!==document.body)document.body.appendChild(lb);

  /* Invisible audio player: icon is the entire UI. */
  var track=document.getElementById('track');
  var audio=track&&track.querySelector('audio');
  var musicBtn=document.getElementById('musicBtn');
  var userMuted=false,audioOn=false;
  if(track)track.classList.remove('show');
  function paintAudio(on){audioOn=!!on;if(!musicBtn)return;musicBtn.textContent=on?'♫':'♩';musicBtn.setAttribute('aria-pressed',on?'true':'false');musicBtn.title=on?'Música activada':'Música desactivada'}
  function playAudio(){if(!audio||userMuted)return Promise.resolve(false);audio.volume=.48;var p;try{p=audio.play()}catch(e){paintAudio(false);return Promise.resolve(false)}return p&&p.then?p.then(function(){paintAudio(true);return true}).catch(function(){paintAudio(false);return false}):Promise.resolve(true)}
  function stopAudio(){if(audio){audio.pause()}paintAudio(false)}
  if(musicBtn){
    musicBtn.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}if(audioOn){userMuted=true;stopAudio()}else{userMuted=false;playAudio()}if(track)track.classList.remove('show')};
    paintAudio(audio&&!audio.paused);
  }

  /* Best-effort fullscreen on the first genuine user gesture. Browsers may still deny it. */
  var fsSuppressed=false;
  function fsEl(){return document.fullscreenElement||document.webkitFullscreenElement}
  function requestFs(){if(fsSuppressed||fsEl())return;var root=document.documentElement;var fn=root.requestFullscreen||root.webkitRequestFullscreen;if(!fn)return;try{var p=fn.call(root);if(p&&p.catch)p.catch(function(){})}catch(e){}}
  function exitFs(){var fn=document.exitFullscreen||document.webkitExitFullscreen;if(!fn)return;try{var p=fn.call(document);if(p&&p.catch)p.catch(function(){})}catch(e){}}
  var fsButton=document.createElement('button');fsButton.id='islFsToggle';fsButton.type='button';fsButton.setAttribute('aria-label','Alternar pantalla completa');document.body.appendChild(fsButton);
  function paintFs(){fsButton.textContent=fsEl()?'⤢':'⛶';fsButton.title=fsEl()?'Salir de pantalla completa':'Pantalla completa'}
  fsButton.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(fsEl()){fsSuppressed=true;exitFs()}else{fsSuppressed=false;requestFs();playAudio()}});
  document.addEventListener('fullscreenchange',paintFs);document.addEventListener('webkitfullscreenchange',paintFs);paintFs();

  var booted=false;
  function gestureBootstrap(){
    playAudio();
    if(!fsEl()&&!fsSuppressed)requestFs();
    booted=audioOn&&!!fsEl();
  }
  ['pointerdown','touchstart','keydown'].forEach(function(type){document.addEventListener(type,gestureBootstrap,{capture:true,passive:type!=='keydown'})});

  /* Tiny tactile feedback even where :active is too brief to perceive. */
  document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('button,.btn,.rail button,a[role="button"]');if(!el)return;el.classList.add('isl-pressed');setTimeout(function(){el.classList.remove('isl-pressed')},145)},true);

  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced)return;

  /* microscopic suspended particles */
  var canvas=document.createElement('canvas');canvas.id='islAmbientParticles';canvas.setAttribute('aria-hidden','true');document.body.insertBefore(canvas,document.body.firstChild);
  var ctx=canvas.getContext('2d',{alpha:true});var dpr=Math.min(window.devicePixelRatio||1,2),w=0,h=0,parts=[],last=0;
  function seed(){var count=Math.max(14,Math.min(38,Math.round((innerWidth*innerHeight)/52000)));parts=[];for(var i=0;i<count;i++)parts.push({x:Math.random()*w,y:Math.random()*h,r:(.45+Math.random()*1.15)*dpr,vx:(Math.random()-.5)*.018*dpr,vy:(-.012-Math.random()*.035)*dpr,a:.05+Math.random()*.16,t:Math.random()*6.28})}
  function resize(){dpr=Math.min(window.devicePixelRatio||1,2);w=Math.max(1,innerWidth*dpr);h=Math.max(1,innerHeight*dpr);canvas.width=w;canvas.height=h;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';seed()}
  function draw(ts){if(ts-last<28){requestAnimationFrame(draw);return}last=ts;ctx.clearRect(0,0,w,h);for(var i=0;i<parts.length;i++){var p=parts[i];p.x+=p.vx;p.y+=p.vy;p.t+=.01;if(p.y<-8){p.y=h+8;p.x=Math.random()*w}if(p.x<-8)p.x=w+8;if(p.x>w+8)p.x=-8;var alpha=p.a*(.72+.28*Math.sin(p.t));ctx.beginPath();ctx.fillStyle='rgba(135,239,255,'+alpha.toFixed(3)+')';ctx.shadowBlur=7*dpr;ctx.shadowColor='rgba(135,239,255,.16)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}
  resize();window.addEventListener('resize',resize,{passive:true});requestAnimationFrame(draw);

  /* very subtle hero parallax, pointer devices only */
  var hero=document.querySelector('.hero'),heroImg=hero&&hero.querySelector('img'),heroText=hero&&hero.querySelector('.heroText');
  if(hero&&heroImg&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){var tx=0,ty=0,cx=0,cy=0,heroRaf=0;function render(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;heroImg.style.transform='scale(1.035) translate3d('+(cx*-5).toFixed(2)+'px,'+(cy*-4).toFixed(2)+'px,0)';if(heroText)heroText.style.transform='translate3d('+(cx*2.2).toFixed(2)+'px,'+(cy*1.6).toFixed(2)+'px,0)';if(Math.abs(tx-cx)>.01||Math.abs(ty-cy)>.01)heroRaf=requestAnimationFrame(render);else heroRaf=0}hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2;if(!heroRaf)heroRaf=requestAnimationFrame(render)},{passive:true});hero.addEventListener('pointerleave',function(){tx=ty=0;if(!heroRaf)heroRaf=requestAnimationFrame(render)},{passive:true})}
})();
