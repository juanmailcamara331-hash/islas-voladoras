(function(){
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced)return;

  /* microscopic suspended particles */
  var canvas=document.createElement('canvas');
  canvas.id='islAmbientParticles';
  canvas.setAttribute('aria-hidden','true');
  document.body.insertBefore(canvas,document.body.firstChild);
  var ctx=canvas.getContext('2d',{alpha:true});
  var dpr=Math.min(window.devicePixelRatio||1,2),w=0,h=0,parts=[],raf=0,last=0;
  function seed(){
    var count=Math.max(14,Math.min(38,Math.round((innerWidth*innerHeight)/52000)));
    parts=[];
    for(var i=0;i<count;i++)parts.push({x:Math.random()*w,y:Math.random()*h,r:(.45+Math.random()*1.15)*dpr,vx:(Math.random()-.5)*.018*dpr,vy:(-.012-Math.random()*.035)*dpr,a:.05+Math.random()*.16,t:Math.random()*6.28});
  }
  function resize(){dpr=Math.min(window.devicePixelRatio||1,2);w=Math.max(1,innerWidth*dpr);h=Math.max(1,innerHeight*dpr);canvas.width=w;canvas.height=h;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';seed()}
  function draw(ts){
    if(ts-last<28){raf=requestAnimationFrame(draw);return}last=ts;ctx.clearRect(0,0,w,h);
    for(var i=0;i<parts.length;i++){
      var p=parts[i];p.x+=p.vx;p.y+=p.vy;p.t+=.01;
      if(p.y<-8){p.y=h+8;p.x=Math.random()*w}if(p.x<-8)p.x=w+8;if(p.x>w+8)p.x=-8;
      var alpha=p.a*(.72+.28*Math.sin(p.t));
      ctx.beginPath();ctx.fillStyle='rgba(135,239,255,'+alpha.toFixed(3)+')';ctx.shadowBlur=7*dpr;ctx.shadowColor='rgba(135,239,255,.16)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    }
    raf=requestAnimationFrame(draw)
  }
  resize();window.addEventListener('resize',resize,{passive:true});raf=requestAnimationFrame(draw);

  /* very subtle hero parallax, pointer devices only */
  var hero=document.querySelector('.hero'),heroImg=hero&&hero.querySelector('img'),heroText=hero&&hero.querySelector('.heroText');
  if(hero&&heroImg&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    var tx=0,ty=0,cx=0,cy=0,heroRaf=0;
    function render(){cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;heroImg.style.transform='scale(1.035) translate3d('+(cx*-5).toFixed(2)+'px,'+(cy*-4).toFixed(2)+'px,0)';if(heroText)heroText.style.transform='translate3d('+(cx*2.2).toFixed(2)+'px,'+(cy*1.6).toFixed(2)+'px,0)';if(Math.abs(tx-cx)>.01||Math.abs(ty-cy)>.01)heroRaf=requestAnimationFrame(render);else heroRaf=0}
    hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2;if(!heroRaf)heroRaf=requestAnimationFrame(render)},{passive:true});
    hero.addEventListener('pointerleave',function(){tx=ty=0;if(!heroRaf)heroRaf=requestAnimationFrame(render)},{passive:true});
  }
})();
