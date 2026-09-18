(function(){
function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
ready(function(){
  var view=document.getElementById('calendar');
  if(!view||view.dataset.islRouteInstalled==='2')return;
  view.dataset.islRouteInstalled='2';

  var old=Array.prototype.slice.call(view.children);
  var dates=document.createElement('details');dates.className='routeDates';
  dates.innerHTML='<summary><b>▦ Calendario operativo</b><span>Fechas concretas sólo cuando importen</span></summary><div class="routeDatesInner"></div>';
  var holder=dates.querySelector('.routeDatesInner');old.forEach(function(n){holder.appendChild(n)});

  var style=document.createElement('style');style.id='isl-route-v2-css';style.textContent=`
  #calendar .routeV2{display:grid;gap:12px;max-width:980px;margin:0 auto}
  #calendar .routeHero{border:1px solid #355660;border-radius:18px;background:linear-gradient(135deg,#0b1c24,#07131a);padding:18px;box-shadow:0 18px 50px #0008}
  #calendar .routeEyebrow{font-size:9px;letter-spacing:.14em;color:#8defff;font-weight:900}
  #calendar .routeHero h2{font-size:clamp(34px,7vw,64px);line-height:.94;margin:6px 0 9px}
  #calendar .routeHero p{margin:0;color:#b9c9cc;line-height:1.5;max-width:720px}
  #calendar .routeFocus{display:grid;grid-template-columns:1.2fr .8fr;gap:10px}
  #calendar .routeCard{border:1px solid #2e4c56;border-radius:15px;background:#081820;padding:14px}
  #calendar .routeCard.now{border-color:#9a783e;background:linear-gradient(180deg,#1b180f,#0c1717)}
  #calendar .routeCard.next{border-color:#3e6b76}
  #calendar .routeLabel{font-size:8px;letter-spacing:.14em;color:#98adb2;font-weight:900}
  #calendar .routeCard.now .routeLabel{color:#ffc36e}
  #calendar .routeCard h3{margin:5px 0 6px;font-size:20px}
  #calendar .routeCard p{margin:0;color:#b7c7ca;font-size:11px;line-height:1.45}
  #calendar .routeStrip{display:grid;gap:7px}
  #calendar .routeStep{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:10px;align-items:center;border:1px solid #284650;border-radius:12px;background:#08151c;padding:10px 11px}
  #calendar .routeStep .sig{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;border:1px solid #42616a;color:#9db3b8}
  #calendar .routeStep.done .sig{color:#8fe1b0;border-color:#47725b}
  #calendar .routeStep.now{border-color:#9a783e;background:#16150f}
  #calendar .routeStep.now .sig{color:#ffc36e;border-color:#9a783e}
  #calendar .routeStep.next{border-color:#3c6671}
  #calendar .routeStep b{display:block;font-size:11px}
  #calendar .routeStep small{display:block;color:#91a5aa;font-size:9px;line-height:1.35;margin-top:2px}
  #calendar .routeStep em{font-style:normal;font-size:8px;color:#87999e;text-transform:uppercase}
  #calendar .routeActions{display:flex;gap:8px;flex-wrap:wrap}
  #calendar .routeActions a{border:1px solid #355660;border-radius:10px;background:#0a1b23;color:#fff;padding:10px 12px;text-decoration:none;font-size:9px;font-weight:900}
  #calendar .routeActions a.primary{border-color:#8b6b39;background:#2a2117;color:#ffe3aa}
  #calendar .routeDates{border:1px solid #294955;border-radius:14px;background:#08151c;overflow:hidden}
  #calendar .routeDates summary{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 13px;cursor:pointer}
  #calendar .routeDates summary span{font-size:9px;color:#91a5aa}
  #calendar .routeDatesInner{padding:0 12px 12px}
  @media(max-width:680px){#calendar .routeFocus{grid-template-columns:1fr}#calendar .routeStep{grid-template-columns:28px minmax(0,1fr)}#calendar .routeStep em{grid-column:2}.routeDates summary{align-items:flex-start!important;flex-direction:column}}
  `;document.head.appendChild(style);

  var shell=document.createElement('div');shell.className='routeV2';
  shell.innerHTML='<section class="routeHero"><div class="routeEyebrow">CENTRO DE MANDOS · RUTA VIVA</div><h2>RUTA ISL</h2><p>Una sola lectura: qué está cerrado, qué hacemos ahora y qué viene después. El calendario queda debajo como capa secundaria.</p></section><section class="routeFocus"><article class="routeCard now" id="routeNowCard"><div class="routeLabel">AHORA</div><h3>...</h3><p>...</p></article><article class="routeCard next" id="routeNextCard"><div class="routeLabel">SIGUIENTE</div><h3>...</h3><p>...</p></article></section><section class="routeStrip" id="routeStrip"></section><div class="routeActions"><a class="primary" href="https://islas-voladoras-isl.netlify.app/poll/pilares-lite-v2.html" target="_blank" rel="noopener">PILARES LITE ↗</a><a href="https://islas-voladoras-isl.netlify.app/poll/referencias-lite-v2.html" target="_blank" rel="noopener">REFERENCIAS LITE ↗</a><a href="huellas.html?resume=1">BRÚJULA</a><a href="rpg-home.html?resume=1">PERFIL RPG</a></div>';
  view.insertBefore(shell,view.firstChild);view.appendChild(dates);

  function paint(s){
    var now=s.now||{}, steps=Array.isArray(s.route_steps)?s.route_steps:[];
    var nc=document.getElementById('routeNowCard');nc.querySelector('h3').textContent=now.title||s.current_stop||'Ruta actual';nc.querySelector('p').textContent=now.body||'';
    var next=document.getElementById('routeNextCard');next.querySelector('h3').textContent=s.next_label||'Siguiente gate';next.querySelector('p').textContent=(steps.find(function(x){return x.status==='next'})||{}).note||'Se abrirá al cerrar el gate actual.';
    var strip=document.getElementById('routeStrip');strip.innerHTML=steps.map(function(x){
      var sig=x.status==='done'?'✓':x.status==='now'?'◆':x.status==='next'?'→':'·';
      var lab=x.status==='done'?'Cerrado':x.status==='now'?'Ahora':x.status==='next'?'Siguiente':'Después';
      return '<article class="routeStep '+x.status+'"><span class="sig">'+sig+'</span><div><b>'+x.title+'</b><small>'+x.note+'</small></div><em>'+lab+'</em></article>'
    }).join('');
  }
  fetch('ISL_ROUTE_STATE_CURRENT.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('state');return r.json()}).then(paint).catch(function(){paint({now:{title:'Ruta no disponible',body:'Recarga el Centro de Mandos.'},next_label:'—',route_steps:[]})});
});
})();