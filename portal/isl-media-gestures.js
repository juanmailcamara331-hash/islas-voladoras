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
  function reset(){scale=1;tx=0;ty=0;pointers.clear();dragging=false;apply()}
  function apply(){
    var el=target();if(!el)return;
    el.style.transformOrigin='50% 50%';
    el.style.transform='translate3d('+tx+'px,'+ty+'px,0) scale('+scale+')';
    el.style.willChange=scale>1?'transform':'auto';
    el.style.cursor=scale>1?'grab':'default';
  }
  function distance(a,b){var dx=a.x-b.x,dy=a.y-b.y;return Math.hypot(dx,dy)}
  function center(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}}
  function bounds(){
    var el=target();if(!el)return{x:0,y:0};
    var r=el.getBoundingClientRect();
    return{x:Math.max(0,(r.width*(scale-1))/2),y:Math.max(0,(r.height*(scale-1))/2)};
  }
  function constrain(){var b=bounds();tx=clamp(tx,-b.x,b.x);ty=clamp(ty,-b.y,b.y)}

  med.style.touchAction='none';
  med.style.overscrollBehavior='contain';

  med.addEventListener('pointerdown',function(e){
    if(!lb.classList.contains('show'))return;
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    try{med.setPointerCapture(e.pointerId)}catch(_){}
    if(pointers.size===2){
      var p=Array.from(pointers.values());startDist=distance(p[0],p[1]);startScale=scale;
      var c=center(p[0],p[1]);startCx=c.x;startCy=c.y;startTx=tx;startTy=ty;dragging=false;
    }else if(pointers.size===1&&scale>1){
      dragging=true;dragId=e.pointerId;dragStartX=e.clientX;dragStartY=e.clientY;dragStartTx=tx;dragStartTy=ty;
    }
  },{passive:true});

  med.addEventListener('pointermove',function(e){
    if(!pointers.has(e.pointerId))return;
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size>=2){
      e.preventDefault();
      var p=Array.from(pointers.values()).slice(0,2),d=distance(p[0],p[1]);
      if(startDist>0){
        var next=clamp(startScale*(d/startDist),minScale,maxScale),c=center(p[0],p[1]);
        scale=next;tx=startTx+(c.x-startCx);ty=startTy+(c.y-startCy);constrain();apply();
      }
    }else if(dragging&&e.pointerId===dragId&&scale>1){
      e.preventDefault();tx=dragStartTx+(e.clientX-dragStartX);ty=dragStartTy+(e.clientY-dragStartY);constrain();apply();
    }
  },{passive:false});

  function endPointer(e){
    pointers.delete(e.pointerId);
    if(pointers.size<2)startDist=0;
    if(e.pointerId===dragId){dragging=false;dragId=null}
    if(scale<1.02)reset();
  }
  med.addEventListener('pointerup',endPointer,{passive:true});
  med.addEventListener('pointercancel',endPointer,{passive:true});
  med.addEventListener('dblclick',function(e){if(!lb.classList.contains('show'))return;e.preventDefault();reset()});

  var observer=new MutationObserver(function(){reset();requestAnimationFrame(placeFs)});
  observer.observe(med,{childList:true,subtree:false});

  function placeFs(){
    fs=document.getElementById('islFsToggle');if(!fs)return;
    var landscape=innerWidth>innerHeight;
    var mediaOpen=lb.classList.contains('show');
    fs.style.width=mediaOpen?'38px':'46px';fs.style.height=mediaOpen?'38px':'46px';
    fs.style.fontSize=mediaOpen?'16px':'19px';
    fs.style.opacity=mediaOpen?'.78':'1';
    fs.style.top='auto';fs.style.bottom='auto';fs.style.left='auto';fs.style.right='auto';
    if(mediaOpen){
      if(landscape){
        fs.style.left='max(8px, env(safe-area-inset-left))';
        fs.style.top='max(8px, env(safe-area-inset-top))';
      }else{
        fs.style.right='max(8px, env(safe-area-inset-right))';
        fs.style.top='max(8px, env(safe-area-inset-top))';
      }
    }else if(landscape){
      fs.style.right='max(70px, calc(env(safe-area-inset-right) + 64px))';
      fs.style.bottom='max(12px, env(safe-area-inset-bottom))';
    }else{
      fs.style.right='max(12px, env(safe-area-inset-right))';
      fs.style.bottom='max(76px, calc(env(safe-area-inset-bottom) + 70px))';
    }
  }

  new MutationObserver(placeFs).observe(lb,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',placeFs,{passive:true});
  window.addEventListener('orientationchange',function(){setTimeout(placeFs,80)},{passive:true});
  document.addEventListener('fullscreenchange',function(){setTimeout(placeFs,0)});
  document.addEventListener('webkitfullscreenchange',function(){setTimeout(placeFs,0)});
  placeFs();
})();
