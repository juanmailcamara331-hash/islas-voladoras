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
 ['Centro',href('index.html?full=1','#home'),'','Centro'],
 ['Ruta',href('index.html?full=1','#calendar'),'','Ruta ISL'],
 ['Perfil',href('rpg-home.html'),'','Perfil RPG'],
 ['Encuestas',href('encuestas.html'),'','Encuestas y resultados'],
 ['Brújula',href('huellas.html'),'','Brújula'],
 ['Cápsulas',href('capsulas.html'),'','Cápsulas'],
 ['Recreo',href('recreo.html'),'','Recreo']
];
var shell=document.createElement('nav');shell.id='islGlobalShell';shell.setAttribute('aria-label','Navegación global ISL');
var row=document.createElement('div');row.className='igsRow';
items.forEach(function(it){var a=document.createElement('a');a.href=it[1];a.className=it[2]||'';a.textContent=it[0];a.title=it[3];if((path==='index.html'&&it[0]==='Centro')||(path==='rpg-home.html'&&it[0]==='Perfil')||(path==='survey-results.html'&&it[0]==='Encuestas')||(path==='encuestas.html'&&it[0]==='Encuestas')||(path==='huellas.html'&&it[0]==='Brújula')||(path==='capsulas.html'&&it[0]==='Cápsulas')||(path==='recreo.html'&&it[0]==='Recreo'))a.classList.add('active');row.appendChild(a)});
var more=document.createElement('button');more.type='button';more.textContent='Más';more.setAttribute('aria-expanded','false');row.appendChild(more);shell.appendChild(row);document.body.appendChild(shell);
var panel=document.createElement('div');panel.id='islGlobalMore';panel.innerHTML='<a href="'+href('external-lab.html')+'">External Lab · Gemini/MJ</a><a href="'+href('knowledge-health.html')+'">Knowledge Health · grafo</a><a href="'+href('encuestas.html')+'">Encuestas / resultados</a><a href="'+href('capsulas-tv.html')+'">Cápsulas TV</a><a href="'+href('ps4.html')+'">PS4</a><a href="'+href('musica.html')+'">Música</a><a href="'+href('salon-cortinas-rojas.html')+'">Salón Rojo</a><a href="'+href('isla-baile-inagotable.html')+'">Isla Baile</a><a href="'+href('index.html?full=1','#home')+'">Centro técnico</a>';document.body.appendChild(panel);
more.onclick=function(e){e.stopPropagation();panel.classList.toggle('open');more.setAttribute('aria-expanded',panel.classList.contains('open')?'true':'false')};
document.addEventListener('pointerdown',function(e){if(!panel.classList.contains('open'))return;if(panel.contains(e.target)||more.contains(e.target))return;panel.classList.remove('open');more.setAttribute('aria-expanded','false')});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){panel.classList.remove('open');more.setAttribute('aria-expanded','false')}});
var pulse=document.createElement('div');pulse.id='islGlobalHomePulse';pulse.textContent='MISMO CENTRO · ESTADO PERSISTENTE';document.body.appendChild(pulse);
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var u=a.getAttribute('href')||'';if(!/^(https?:|mailto:|tel:|#)/i.test(u)){try{sessionStorage.setItem('isl_return_to',location.href)}catch(err){}}},true);
})();