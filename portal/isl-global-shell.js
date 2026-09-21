(function(){
/* Repair legacy shell injection artifacts before rendering navigation. */
try{Array.from(document.body.childNodes).forEach(function(n){if(n.nodeType===3&&n.nodeValue&&/^\\s*\\\\n\\s*$/.test(n.nodeValue))n.remove()})}catch(e){}
if(document.getElementById('islGlobalShell'))return;
try{sessionStorage.setItem('isl_native_entered_v063','1');sessionStorage.setItem('isl_center_entered','1')}catch(e){}
var path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
function href(file,hash){
  var native=/[?&]app=1(?:&|$)/.test(location.search)||sessionStorage.getItem('isl_native_shell')==='1';
  if(/[?&]app=1(?:&|$)/.test(location.search)){try{sessionStorage.setItem('isl_native_shell','1')}catch(e){}}
  var q='resume=1'+(native?'&app=1':'');
  return file+(file.indexOf('?')>=0?'&':'?')+q+(hash||'');
}
var items=[
 ['ISL',href('index.html?full=1','#home'),'igsBrand','Centro'],
 ['Jugar',href('jugar.html'),'igsP0','Arcade · aventura · minijuegos','JUGAR'],
 ['Crear',href('crear.html'),'igsP2','Criaturas · islas · reliquias · música · 3D','CREAR'],
 ['Ver',href('galeria.html'),'igsP1','Galería · vídeo · 3D · música','VER'],
 ['Decidir',href('decidir.html'),'igsLife','Una sola decisión humana','DECIDIR'],
];
var shell=document.createElement('nav');shell.id='islGlobalShell';shell.setAttribute('aria-label','Navegación global ISL');
var row=document.createElement('div');row.className='igsRow';
items.forEach(function(it){
  var a=document.createElement('a');a.href=it[1];a.className=it[2]||'';a.textContent=it[0];a.title=it[3];
  if(it[4]){var sub=document.createElement('small');sub.className='igsSub';sub.textContent=it[4];a.appendChild(sub);}
  var active=((path==='jugar.html'||path==='velaria-v2.html'||path==='rpg-home.html')&&it[0]==='Jugar')||
    (path==='crear.html'&&it[0]==='Crear')||
    (path==='galeria.html'&&it[0]==='Ver')||
    (path==='decidir.html'&&it[0]==='Decidir');
  if(active)a.classList.add('active');
  row.appendChild(a)
});
var more=document.createElement('button');more.type='button';more.textContent='Más';more.setAttribute('aria-expanded','false');row.appendChild(more);shell.appendChild(row);document.body.appendChild(shell);
var panel=document.createElement('div');panel.id='islGlobalMore';panel.innerHTML='<a class="igsWorldEscape" href="'+href('jugar.html')+'">← JUGAR</a><div class="igsGroup"><b>PROYECTO</b><a href="'+href('mission-map.html')+'">Misiones</a><a href="'+href('project-observatory.html')+'">Observatorio</a><a href="'+href('crecimiento.html')+'">Crecer</a><a href="'+href('crew.html')+'">Tripulación</a></div><div class="igsGroup"><b>MUNDO / LABS</b><a href="'+href('rpg-home.html')+'">Cabina / perfil</a><a href="'+href('huellas.html')+'">Huellas</a><a href="'+href('external-lab.html')+'">External Lab</a><a href="'+href('spielberg-lab.html')+'">Lab Feed</a><a href="'+href('signal-telegraph-lab.html')+'">Signal Lab</a><a href="'+href('capsulas-tv.html')+'">Cápsulas TV</a><a href="'+href('ps4.html')+'">PS4</a></div><div class="igsGroup"><b>EVIDENCIA</b><a href="'+href('playtest-lab.html')+'">Playtest</a><a href="'+href('playtest-review.html')+'">Review</a><a href="'+href('encuestas.html')+'">Encuestas</a><a href="'+href('galeria.html','#music')+'">Música</a></div><div class="igsGroup"><b>SISTEMA</b><a href="'+href('knowledge-health.html')+'">Health</a><a href="'+href('avisos.html')+'">Avisos</a><a href="'+href('index.html?full=1','#calendar')+'">Ruta / calendario</a></div>';document.body.appendChild(panel);
more.onclick=function(e){e.stopPropagation();panel.classList.toggle('open');more.setAttribute('aria-expanded',panel.classList.contains('open')?'true':'false')};
document.addEventListener('pointerdown',function(e){if(!panel.classList.contains('open'))return;if(panel.contains(e.target)||more.contains(e.target))return;panel.classList.remove('open');more.setAttribute('aria-expanded','false')});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){panel.classList.remove('open');more.setAttribute('aria-expanded','false')}});
var pulse=document.createElement('div');pulse.id='islGlobalHomePulse';pulse.textContent='JUGAR · CREAR · VER · DECIDIR · MÁS';document.body.appendChild(pulse);
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var u=a.getAttribute('href')||'';if(!/^(https?:|mailto:|tel:|#)/i.test(u)){try{sessionStorage.setItem('isl_return_to',location.href)}catch(err){}}},true);

// Stable back/forward navigation: preserve the exact place without automatic jumps.
(function(){
  var NAVKEY='isl_nav:'+location.pathname+location.search+location.hash;
  try{history.scrollRestoration='manual'}catch(e){}
  function savePos(){
    try{sessionStorage.setItem(NAVKEY,JSON.stringify({x:window.scrollX||0,y:window.scrollY||0}))}catch(e){}
  }
  function restorePos(){
    var s=null;try{s=JSON.parse(sessionStorage.getItem(NAVKEY)||'null')}catch(e){}
    if(!s)return;
    requestAnimationFrame(function(){requestAnimationFrame(function(){window.scrollTo(Number(s.x||0),Number(s.y||0))})});
  }
  window.addEventListener('pagehide',savePos,{capture:true});
  window.addEventListener('pageshow',function(e){
    var nav=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];
    if(e.persisted||(nav&&nav.type==='back_forward'))restorePos();
  });
  document.querySelectorAll('img').forEach(function(img){
    if(!img.closest('header,.hero,.lazyScene,.finalHero,.welcome')){if(!img.loading)img.loading='lazy';img.decoding='async'}
  });
})();
})();