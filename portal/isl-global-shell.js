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
 ['Jugar',href('rpg-home.html'),'igsP0','Aventura · recreo · mapa','JUGAR'],
 ['Crear',href('crear.html'),'igsP2','Criaturas · islas · reliquias · música · 3D','CREAR'],
 ['Ver',href('galeria.html'),'igsP1','Galería · vídeo · 3D · música','VER'],
 ['Decidir',href('decidir.html'),'igsLife','Una sola decisión humana','DECIDIR'],
 ['Huella',href('huellas.html'),'igsSecondary','Memoria · consecuencia · persistencia','HUELLA']
];
var shell=document.createElement('nav');shell.id='islGlobalShell';shell.setAttribute('aria-label','Navegación global ISL');
var row=document.createElement('div');row.className='igsRow';
items.forEach(function(it){
  var a=document.createElement('a');a.href=it[1];a.className=it[2]||'';a.textContent=it[0];a.title=it[3];
  if(it[4]){var sub=document.createElement('small');sub.className='igsSub';sub.textContent=it[4];a.appendChild(sub);}
  var active=(path==='rpg-home.html'&&it[0]==='Jugar')||
    (path==='crear.html'&&it[0]==='Crear')||
    (path==='galeria.html'&&it[0]==='Ver')||
    (path==='decidir.html'&&it[0]==='Decidir')||
    (path==='huellas.html'&&it[0]==='Huella');
  if(active)a.classList.add('active');
  row.appendChild(a)
});
var more=document.createElement('button');more.type='button';more.textContent='Más';more.setAttribute('aria-expanded','false');row.appendChild(more);shell.appendChild(row);document.body.appendChild(shell);
var panel=document.createElement('div');panel.id='islGlobalMore';panel.innerHTML='<a class="priority0" href="'+href('mission-map.html')+'">MISIONES <small>dependencias · bloqueos</small></a><a class="priority1" href="'+href('project-observatory.html')+'">OBSERVATORIO <small>tiempo · coste · riesgo</small></a><a class="priority2" href="'+href('crecimiento.html')+'">CRECER <small>making · campañas · financiación</small></a><a class="life" href="'+href('crew.html')+'">TRIPULACIÓN <small>vida · encuentros · semillas</small></a><a class="utility" href="'+href('avisos.html')+'">AVISOS</a><a class="utility" href="'+href('knowledge-health.html')+'">HEALTH</a><a class="utility" href="'+href('encuestas.html')+'">ENCUESTAS</a><a class="utility" href="'+href('playtest-lab.html')+'">PLAYTEST LAB</a><a class="utility" href="'+href('playtest-review.html')+'">PLAYTEST REVIEW</a><a class="utility" href="'+href('signal-telegraph-lab.html')+'">SIGNAL LAB</a><a class="utility" href="'+href('external-lab.html')+'">EXTERNAL LAB</a><a class="utility" href="'+href('spielberg-lab.html')+'">LAB FEED</a><a class="utility" href="'+href('capsulas-tv.html')+'">CÁPSULAS TV</a><a class="utility" href="'+href('ps4.html')+'">PS4</a><a class="utility" href="'+href('galeria.html','#music')+'">MÚSICA</a>';document.body.appendChild(panel);
more.onclick=function(e){e.stopPropagation();panel.classList.toggle('open');more.setAttribute('aria-expanded',panel.classList.contains('open')?'true':'false')};
document.addEventListener('pointerdown',function(e){if(!panel.classList.contains('open'))return;if(panel.contains(e.target)||more.contains(e.target))return;panel.classList.remove('open');more.setAttribute('aria-expanded','false')});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){panel.classList.remove('open');more.setAttribute('aria-expanded','false')}});
var pulse=document.createElement('div');pulse.id='islGlobalHomePulse';pulse.textContent='P0 AHORA · P1 DECIDE · P2 PARALELO · P3 CONTEXTO';document.body.appendChild(pulse);
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var u=a.getAttribute('href')||'';if(!/^(https?:|mailto:|tel:|#)/i.test(u)){try{sessionStorage.setItem('isl_return_to',location.href)}catch(err){}}},true);
})();