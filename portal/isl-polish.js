(function(){
  var hotfix=document.getElementById('isl-mobile-entry-hotfix');if(hotfix)hotfix.remove();

  var style=document.createElement('style');
  style.id='isl-runtime-final-css';
  style.textContent=`
    html,body{overflow-x:hidden!important;overflow-y:auto!important;min-height:100%!important;height:auto!important}
    .app,main{overflow:visible!important;min-height:0!important}
    .view{position:relative!important;z-index:1!important}
    #welcome.hidden{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}

    /* Drawer must never peek out while closed. */
    .drawer{transform:translateX(calc(-100% - 96px))!important;visibility:hidden!important;pointer-events:none!important}
    .drawer.open{transform:translateX(0)!important;visibility:visible!important;pointer-events:auto!important}

    /* Audio is controlled only by the icon, never by a native player. */
    #track{display:none!important;visibility:hidden!important;pointer-events:none!important}
    #track audio{display:none!important}

    /* Media viewer remains attached to the visible viewport. */
    #lightbox{position:fixed!important;inset:0!important;width:100%!important;height:100dvh!important;z-index:12000!important;margin:0!important;transform:none!important}
    #lightbox.show{display:flex!important;align-items:center!important;justify-content:center!important}
    #lightbox figure{margin:0!important;max-width:100%!important;max-height:100dvh!important}
    #lbMedia{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;max-width:100%!important}
    #lbMedia img,#lbMedia video{display:block!important;max-width:100%!important;max-height:calc(100dvh - 72px)!important;object-fit:contain!important}

    /* Permanent fullscreen toggle / exit. */
    #islFsToggle{position:fixed;right:max(12px,env(safe-area-inset-right));bottom:max(78px,calc(env(safe-area-inset-bottom) + 72px));z-index:15000;width:46px;height:46px;border:1px solid #ffffff35;border-radius:999px;background:#071018e8;color:#fff;display:grid!important;place-items:center;font-size:19px;box-shadow:0 10px 30px #0009;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);pointer-events:auto!important;visibility:visible!important;opacity:1!important}
    html:fullscreen #islFsToggle,html:-webkit-full-screen #islFsToggle{display:grid!important;visibility:visible!important;opacity:1!important;z-index:2147483647!important;right:max(12px,env(safe-area-inset-right));top:max(12px,env(safe-area-inset-top));bottom:auto!important}

    /* Stable hit areas: visual feedback without moving geometry. */
    button,.btn,a[role=button],.rail button{position:relative!important;z-index:2!important;pointer-events:auto!important;touch-action:manipulation!important;transform:none!important;will-change:auto!important;transition:box-shadow .14s ease,border-color .14s ease,background-color .14s ease,filter .14s ease!important}
    button:active,.btn:active,a[role=button]:active,.rail button:active,.isl-pressed{transform:none!important;filter:brightness(1.12)!important;box-shadow:inset 0 0 0 1px #8defff55,0 0 0 2px #8defff16!important}

    /* Fine decorative breathing line at top. */
    #islTopBreath{position:fixed;left:0;right:0;top:0;height:2px;z-index:14500;pointer-events:none;background:linear-gradient(90deg,transparent 0,#87efff99 28%,#ffc36e88 50%,#87efff99 72%,transparent 100%);background-size:45% 100%;animation:islTopSweep 7s linear infinite;opacity:.48}
    @keyframes islTopSweep{from{background-position:-70vw 0}to{background-position:120vw 0}}

    /* Fullscreen must stay scrollable for dashboard content. */
    html:fullscreen,html:-webkit-full-screen{overflow-x:hidden!important;overflow-y:auto!important;height:auto!important;min-height:100%!important}
    html:fullscreen body,html:-webkit-full-screen body{overflow-x:hidden!important;overflow-y:auto!important;height:auto!important;min-height:100%!important}

    @media(max-width:900px){
      html,body{padding-bottom:max(66px,calc(env(safe-area-inset-bottom) + 58px))!important}
      .app{padding-bottom:0!important}
      main{padding-bottom:max(84px,calc(env(safe-area-inset-bottom) + 76px))!important}

      /* Navigation becomes a bottom dock. */
      .rail{position:fixed!important;left:0!important;right:0!important;bottom:0!important;top:auto!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:58px!important;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:4px!important;padding:6px max(6px,env(safe-area-inset-right)) max(6px,env(safe-area-inset-bottom)) max(6px,env(safe-area-inset-left))!important;overflow-x:auto!important;overflow-y:hidden!important;border-right:0!important;border-top:1px solid #294955!important;border-bottom:0!important;background:#071018f2!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;z-index:14000!important;scrollbar-width:none}
      .rail::-webkit-scrollbar{display:none}
      .logo{flex:0 0 auto!important;writing-mode:horizontal-tb!important;transform:none!important;margin:0 4px 0 0!important;font-size:10px!important}
      .rail button{flex:0 0 42px!important;min-width:42px!important;width:42px!important;height:42px!important;border-radius:12px!important;font-size:17px!important}

      /* Drawer grows upward from the bottom dock. */
      .drawer{left:0!important;right:auto!important;top:auto!important;bottom:max(58px,calc(env(safe-area-inset-bottom) + 54px))!important;width:min(360px,100%)!important;max-width:100%!important;max-height:calc(100dvh - 76px)!important;transform:translateX(calc(-100% - 24px))!important}
      .drawer.open{transform:translateX(0)!important}

      #islFsToggle{bottom:max(76px,calc(env(safe-area-inset-bottom) + 70px))!important}
    }

    /* Compact welcome in short landscape viewports: everything fits without clipping. */
    @media(orientation:landscape) and (max-height:700px){
      html,body,.app,main{overflow-y:auto!important;height:auto!important;min-height:0!important;touch-action:pan-y!important}
      main{padding-top:8px!important;padding-bottom:max(84px,calc(env(safe-area-inset-bottom) + 76px))!important}
      .hero{min-height:0!important;height:auto!important}.heroText{min-height:0!important}
      #welcome{padding:8px 18px max(72px,calc(env(safe-area-inset-bottom) + 64px))!important;overflow-y:auto!important;align-items:flex-start!important}
      .welcome-inner{width:min(1000px,96vw)!important;margin:auto!important;padding:4px 0!important}
      .isl-logo{width:104px!important;height:104px!important;margin:0 auto 8px!important}
      .isl-logo .ring{inset:8px!important}.isl-logo .ring.r2{inset:20px!important}.isl-logo .core{inset:29px!important}.isl-logo .core b{font-size:22px!important}
      .welcome-kicker{font-size:9px!important;letter-spacing:.18em!important;margin-top:2px!important}
      .welcome-title{font-size:clamp(32px,6vw,58px)!important;line-height:.95!important;margin:6px 0 8px!important}
      .welcome-quote{font-size:clamp(16px,2.5vw,24px)!important;line-height:1.15!important;margin:8px auto 12px!important;max-width:1000px!important}
      #welcome .actions{margin-top:8px!important;gap:6px!important;display:flex!important;flex-wrap:wrap!important;justify-content:center!important}
      #welcome .actions .btn{padding:7px 10px!important;font-size:11px!important;min-height:34px!important}
    }

    @media(prefers-reduced-motion:reduce){
      button,.btn,a[role=button],.rail button{transition:none!important}
      .isl-pressed{filter:none!important;box-shadow:none!important}
      #islTopBreath{animation:none!important;opacity:.28!important}
    }
  `;
  document.head.appendChild(style);

  var topBreath=document.createElement('div');topBreath.id='islTopBreath';topBreath.setAttribute('aria-hidden','true');document.body.appendChild(topBreath);

  try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
  if(!location.hash){requestAnimationFrame(function(){window.scrollTo(0,0)});setTimeout(function(){window.scrollTo(0,0)},80)}

  var lb=document.getElementById('lightbox');if(lb&&lb.parentNode!==document.body)document.body.appendChild(lb);

  /* Audio state is derived from the actual element, never from a forced-start guess. */
  var track=document.getElementById('track'),audio=track&&track.querySelector('audio'),musicBtn=document.getElementById('musicBtn');
  var userMuted=false;
  if(track)track.classList.remove('show');
  function paintAudio(){if(!musicBtn)return;var on=!!audio&&!audio.paused&&!audio.ended;musicBtn.textContent=on?'♫':'♩';musicBtn.setAttribute('aria-pressed',on?'true':'false');musicBtn.title=on?'Música activada':'Música desactivada'}
  function playAudio(){if(!audio||userMuted)return Promise.resolve(false);audio.volume=.48;var p;try{p=audio.play()}catch(e){paintAudio();return Promise.resolve(false)}return p&&p.then?p.then(function(){paintAudio();return true}).catch(function(){paintAudio();return false}):Promise.resolve(true)}
  function stopAudio(){if(audio)audio.pause();paintAudio()}
  if(audio){audio.addEventListener('play',paintAudio);audio.addEventListener('pause',paintAudio);audio.addEventListener('ended',paintAudio)}
  if(musicBtn){musicBtn.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}if(!audio)return;if(audio.paused||audio.ended){userMuted=false;playAudio()}else{userMuted=true;stopAudio()}if(track)track.classList.remove('show')};paintAudio()}

  /* Fullscreen: always leave a visible explicit exit control. */
  var fsSuppressed=false;
  function fsEl(){return document.fullscreenElement||document.webkitFullscreenElement}
  function requestFs(){if(fsSuppressed||fsEl())return;var root=document.documentElement,fn=root.requestFullscreen||root.webkitRequestFullscreen;if(!fn)return;try{var p=fn.call(root);if(p&&p.catch)p.catch(function(){})}catch(e){}}
  function exitFs(){var fn=document.exitFullscreen||document.webkitExitFullscreen;if(!fn)return;try{var p=fn.call(document);if(p&&p.catch)p.catch(function(){})}catch(e){}}
  var fsButton=document.createElement('button');fsButton.id='islFsToggle';fsButton.type='button';fsButton.setAttribute('aria-label','Alternar pantalla completa');document.body.appendChild(fsButton);
  function paintFs(){var on=!!fsEl();fsButton.textContent=on?'✕':'⛶';fsButton.title=on?'Salir de pantalla completa':'Pantalla completa';fsButton.setAttribute('aria-label',on?'Salir de pantalla completa':'Entrar en pantalla completa')}
  fsButton.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(fsEl()){fsSuppressed=true;exitFs()}else{fsSuppressed=false;requestFs();playAudio()}});
  document.addEventListener('fullscreenchange',paintFs);document.addEventListener('webkitfullscreenchange',paintFs);paintFs();

  function gestureBootstrap(){playAudio();if(!fsEl()&&!fsSuppressed)requestFs()}

  var welcome=document.getElementById('welcome'),enter=document.getElementById('enterISL');
  if(welcome){welcome.classList.remove('hidden');welcome.style.removeProperty('display');welcome.style.removeProperty('visibility');welcome.style.removeProperty('opacity');welcome.style.removeProperty('pointer-events')}
  function closeWelcome(){if(!welcome)return;welcome.classList.add('hidden');welcome.style.display='none';welcome.style.visibility='hidden';welcome.style.opacity='0';welcome.style.pointerEvents='none'}
  if(enter){enter.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();closeWelcome();gestureBootstrap();requestAnimationFrame(function(){window.scrollTo(0,0)})},true)}

  document.addEventListener('click',function(e){var nav=e.target.closest&&e.target.closest('.rail button[data-view]');if(nav)closeWelcome()},true);
  ['pointerdown','touchstart','keydown'].forEach(function(type){document.addEventListener(type,function(e){var t=e.target;if(enter&&(t===enter||enter.contains(t)))return;if(musicBtn&&(t===musicBtn||musicBtn.contains(t)))return;if(fsButton&&(t===fsButton||fsButton.contains(t)))return;gestureBootstrap()},{capture:true,passive:type!=='keydown'})});
  document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('button,.btn,.rail button,a[role="button"]');if(!el)return;el.classList.add('isl-pressed');setTimeout(function(){el.classList.remove('isl-pressed')},120)},true);

  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced)return;

  /* Microscopic suspended particles. */
  var canvas=document.createElement('canvas');canvas.id='islAmbientParticles';canvas.setAttribute('aria-hidden','true');document.body.insertBefore(canvas,document.body.firstChild);
  var ctx=canvas.getContext('2d',{alpha:true}),dpr=Math.min(window.devicePixelRatio||1,2),w=0,h=0,parts=[],last=0;
  function seed(){var count=Math.max(14,Math.min(38,Math.round((innerWidth*innerHeight)/52000)));parts=[];for(var i=0;i<count;i++)parts.push({x:Math.random()*w,y:Math.random()*h,r:(.45+Math.random()*1.15)*dpr,vx:(Math.random()-.5)*.018*dpr,vy:(-.012-Math.random()*.035)*dpr,a:.05+Math.random()*.16,t:Math.random()*6.28})}
  function resize(){dpr=Math.min(window.devicePixelRatio||1,2);w=Math.max(1,innerWidth*dpr);h=Math.max(1,innerHeight*dpr);canvas.width=w;canvas.height=h;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';seed()}
  function draw(ts){if(ts-last<28){requestAnimationFrame(draw);return}last=ts;ctx.clearRect(0,0,w,h);for(var i=0;i<parts.length;i++){var p=parts[i];p.x+=p.vx;p.y+=p.vy;p.t+=.01;if(p.y<-8){p.y=h+8;p.x=Math.random()*w}if(p.x<-8)p.x=w+8;if(p.x>w+8)p.x=-8;var a=p.a*(.72+.28*Math.sin(p.t));ctx.beginPath();ctx.fillStyle='rgba(135,239,255,'+a.toFixed(3)+')';ctx.shadowBlur=7*dpr;ctx.shadowColor='rgba(135,239,255,.16)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}
  resize();window.addEventListener('resize',resize,{passive:true});requestAnimationFrame(draw);

  /* Very subtle hero parallax for pointer devices only. */
  var hero=document.querySelector('.hero'),heroImg=hero&&hero.querySelector('img'),heroText=hero&&hero.querySelector('.heroText');
  if(hero&&heroImg&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){var tx=0,ty=0,cx=0,cy=0,heroRaf=0;function render(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;heroImg.style.transform='scale(1.035) translate3d('+(cx*-5).toFixed(2)+'px,'+(cy*-4).toFixed(2)+'px,0)';if(heroText)heroText.style.transform='translate3d('+(cx*2.2).toFixed(2)+'px,'+(cy*1.6).toFixed(2)+'px,0)';if(Math.abs(tx-cx)>.01||Math.abs(ty-cy)>.01)heroRaf=requestAnimationFrame(render);else heroRaf=0}hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2;if(!heroRaf)heroRaf=requestAnimationFrame(render)},{passive:true});hero.addEventListener('pointerleave',function(){tx=ty=0;if(!heroRaf)heroRaf=requestAnimationFrame(render)},{passive:true})}
})();
