(function(){
  'use strict';

  var lb=document.getElementById('lightbox');
  var med=document.getElementById('lbMedia');
  var fs=document.getElementById('islFsToggle');
  if(!lb||!med)return;

  var pointers=new Map();
  var scale=1,minScale=1,maxScale=5,tx=0,ty=0;
  var startDist=0,startScale=1,startCx=0,startCy=0,startTx=0,startTy=0;
  var dragging=false,dragId=null,dragStartX=0,dragStartY=0,dragStartTx=0,dragStartTy=0;

  function target(){return med.querySelector('img,video')}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  function distance(a,b){var dx=a.x-b.x,dy=a.y-b.y;return Math.hypot(dx,dy)}
  function center(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}}
  function reset(){scale=1;tx=0;ty=0;pointers.clear();dragging=false;apply()}
  function apply(){
    var el=target();if(!el)return;
    el.style.setProperty('transform-origin','50% 50%','important');
    el.style.setProperty('transform','translate3d('+tx+'px,'+ty+'px,0) scale('+scale+')','important');
    el.style.setProperty('will-change',scale>1?'transform':'auto','important');
    el.style.setProperty('touch-action','none','important');
    el.style.cursor=scale>1?'grab':'default';
  }
  function bounds(){
    var el=target();if(!el)return{x:0,y:0};
    var baseW=el.offsetWidth||el.getBoundingClientRect().width;
    var baseH=el.offsetHeight||el.getBoundingClientRect().height;
    return{x:Math.max(0,(baseW*(scale-1))/2),y:Math.max(0,(baseH*(scale-1))/2)};
  }
  function constrain(){var b=bounds();tx=clamp(tx,-b.x,b.x);ty=clamp(ty,-b.y,b.y)}

  med.style.setProperty('touch-action','none','important');
  med.style.setProperty('overscroll-behavior','contain','important');

  function begin(id,x,y){
    pointers.set(id,{x:x,y:y});
    if(pointers.size===2){
      var p=Array.from(pointers.values());startDist=distance(p[0],p[1]);startScale=scale;
      var c=center(p[0],p[1]);startCx=c.x;startCy=c.y;startTx=tx;startTy=ty;dragging=false;
    }else if(pointers.size===1&&scale>1){
      dragging=true;dragId=id;dragStartX=x;dragStartY=y;dragStartTx=tx;dragStartTy=ty;
    }
  }
  function move(id,x,y){
    if(!pointers.has(id))return;
    pointers.set(id,{x:x,y:y});
    if(pointers.size>=2){
      var p=Array.from(pointers.values()).slice(0,2),d=distance(p[0],p[1]);
      if(startDist>0){
        scale=clamp(startScale*(d/startDist),minScale,maxScale);
        var c=center(p[0],p[1]);tx=startTx+(c.x-startCx);ty=startTy+(c.y-startCy);constrain();apply();
      }
    }else if(dragging&&id===dragId&&scale>1){
      tx=dragStartTx+(x-dragStartX);ty=dragStartTy+(y-dragStartY);constrain();apply();
    }
  }
  function end(id){pointers.delete(id);if(pointers.size<2)startDist=0;if(id===dragId){dragging=false;dragId=null}if(scale<1.02)reset()}

  if(window.PointerEvent){
    med.addEventListener('pointerdown',function(e){if(!lb.classList.contains('show'))return;e.preventDefault();try{med.setPointerCapture(e.pointerId)}catch(_){}begin(e.pointerId,e.clientX,e.clientY)},{passive:false});
    med.addEventListener('pointermove',function(e){if(!pointers.has(e.pointerId))return;e.preventDefault();move(e.pointerId,e.clientX,e.clientY)},{passive:false});
    med.addEventListener('pointerup',function(e){end(e.pointerId)},{passive:true});
    med.addEventListener('pointercancel',function(e){end(e.pointerId)},{passive:true});
  }else{
    med.addEventListener('touchstart',function(e){if(!lb.classList.contains('show'))return;if(e.touches.length){e.preventDefault();pointers.clear();for(var i=0;i<e.touches.length;i++)begin(e.touches[i].identifier,e.touches[i].clientX,e.touches[i].clientY)}},{passive:false});
    med.addEventListener('touchmove',function(e){if(!e.touches.length)return;e.preventDefault();for(var i=0;i<e.touches.length;i++)move(e.touches[i].identifier,e.touches[i].clientX,e.touches[i].clientY)},{passive:false});
    med.addEventListener('touchend',function(e){var live={};for(var i=0;i<e.touches.length;i++)live[e.touches[i].identifier]=true;Array.from(pointers.keys()).forEach(function(id){if(!live[id])end(id)})},{passive:true});
  }

  med.addEventListener('dblclick',function(e){if(!lb.classList.contains('show'))return;e.preventDefault();reset()});
  var lastTap=0;
  med.addEventListener('touchend',function(){var now=Date.now();if(now-lastTap<280)reset();lastTap=now},{passive:true});

  var observer=new MutationObserver(function(){reset();requestAnimationFrame(placeFs)});
  observer.observe(med,{childList:true,subtree:false});

  function placeFs(){
    fs=document.getElementById('islFsToggle');if(!fs)return;
    var landscape=innerWidth>innerHeight;
    var mediaOpen=lb.classList.contains('show');
    fs.style.width=mediaOpen?'34px':'46px';fs.style.height=mediaOpen?'34px':'46px';
    fs.style.fontSize=mediaOpen?'14px':'19px';fs.style.opacity=mediaOpen?'.72':'1';
    fs.style.top='auto';fs.style.bottom='auto';fs.style.left='auto';fs.style.right='auto';
    if(mediaOpen){
      if(landscape){fs.style.left='max(50px, calc(env(safe-area-inset-left) + 44px))';fs.style.top='max(8px, env(safe-area-inset-top))'}
      else{fs.style.right='max(50px, calc(env(safe-area-inset-right) + 44px))';fs.style.top='max(8px, env(safe-area-inset-top))'}
    }else if(landscape){fs.style.right='max(70px, calc(env(safe-area-inset-right) + 64px))';fs.style.bottom='max(12px, env(safe-area-inset-bottom))'}
    else{fs.style.right='max(12px, env(safe-area-inset-right))';fs.style.bottom='max(76px, calc(env(safe-area-inset-bottom) + 70px))'}
  }

  new MutationObserver(placeFs).observe(lb,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',placeFs,{passive:true});
  window.addEventListener('orientationchange',function(){setTimeout(placeFs,80)},{passive:true});
  document.addEventListener('fullscreenchange',function(){setTimeout(placeFs,0)});
  document.addEventListener('webkitfullscreenchange',function(){setTimeout(placeFs,0)});
  placeFs();
})();
