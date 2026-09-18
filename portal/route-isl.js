(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  ready(function(){
    var view=document.getElementById('calendar');
    if(!view||view.dataset.islRouteInstalled==='1')return;
    view.dataset.islRouteInstalled='1';

    var nav=document.querySelector('.rail button[data-view="calendar"]');
    if(nav){nav.title='RUTA ISL';nav.setAttribute('data-help','Viaje por el mapa del proyecto: destino actual, hitos y huella.');nav.textContent='🧭'}

    var oldKids=Array.prototype.slice.call(view.children);
    var details=document.createElement('details');
    details.className='routeDates';
    var sum=document.createElement('summary');
    sum.innerHTML='<span>▦</span><b>Fechas concretas</b><small>Calendario operativo, sólo cuando importe una fecha.</small>';
    details.appendChild(sum);
    var oldWrap=document.createElement('div');
    oldWrap.className='routeDatesInner';
    oldKids.forEach(function(n){oldWrap.appendChild(n)});
    details.appendChild(oldWrap);

    var style=document.createElement('style');
    style.id='isl-route-v1-css';
    style.textContent=`
      #calendar .routeShell{display:grid;gap:12px}
      #calendar .routeHead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap}
      #calendar .routeHead h2{font-size:clamp(28px,5vw,50px);letter-spacing:-.035em;margin:3px 0 6px}
      #calendar .routeLegend{display:flex;gap:6px;flex-wrap:wrap}
      #calendar .routeLegend span{font-size:8px;letter-spacing:.08em;border:1px solid var(--line);border-radius:999px;padding:5px 7px;background:#08151c}
      #calendar .routeLegend .done{color:var(--lime);border-color:#4b754a}
      #calendar .routeLegend .now{color:var(--gold);border-color:#8b6b39}
      #calendar .routeMap{position:relative;min-height:clamp(440px,62vw,760px);overflow:hidden;border:1px solid #365b68;border-radius:20px;background:#061017;box-shadow:var(--shadow);isolation:isolate}
      #calendar .routeMap>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.75) contrast(1.05) brightness(.58);z-index:-3}
      #calendar .routeMap:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,#06101728,#061017c9 96%),radial-gradient(circle at 62% 38%,transparent,#06101788 70%);z-index:-2}
      #calendar .routeMap:after{content:"";position:absolute;inset:0;opacity:.13;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:52px 52px;mask-image:linear-gradient(#000,transparent 90%);z-index:-1}
      #calendar .routePath{position:absolute;left:13%;top:66%;width:72%;height:2px;background:linear-gradient(90deg,#73dfc155,#87efff99,#ffc36e99,#6b748066);transform:rotate(-16deg);transform-origin:left center;box-shadow:0 0 14px #87efff55}
      #calendar .routeNode{position:absolute;transform:translate(-50%,-50%);width:min(142px,24vw);min-height:66px;border:1px solid #456775;border-radius:18px;background:#08151ce8;color:#eef8f5;padding:9px 10px;text-align:left;box-shadow:0 14px 34px #0008;backdrop-filter:blur(8px);z-index:3}
      #calendar .routeNode:hover,#calendar .routeNode:focus-visible{border-color:#87efff;box-shadow:0 16px 38px #0009,0 0 0 2px #87efff22;outline:none}
      #calendar .routeNode b{display:block;font-size:11px;line-height:1.15;margin-top:2px}
      #calendar .routeNode small{display:block;margin-top:4px;font-size:8px;line-height:1.25;color:#9db2b8}
      #calendar .routeNode .routeSig{font-size:13px}
      #calendar .routeNode.done{border-color:#4d7651}.routeNode.done .routeSig{color:var(--lime)}
      #calendar .routeNode.current{border-color:#9a783e;background:#19170fe9;box-shadow:0 16px 38px #0009,0 0 28px #ffc36e24;animation:routePulse 2.8s ease-in-out infinite}.routeNode.current .routeSig{color:var(--gold)}
      #calendar .routeNode.future{opacity:.72}
      #calendar .routeNode.visited:after{content:"✦";position:absolute;right:7px;top:5px;font-size:9px;color:var(--cyan)}
      @keyframes routePulse{50%{box-shadow:0 16px 38px #0009,0 0 38px #ffc36e46}}
      #calendar .routeNow{position:absolute;left:4%;right:4%;bottom:4%;display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid #806538;background:#11140fdd;border-radius:13px;padding:10px 12px;backdrop-filter:blur(10px);z-index:4}
      #calendar .routeNow b{display:block;color:var(--gold);font-size:12px}.routeNow span{font-size:10px;color:#cfdbd8}
      #calendar .routeDates{border:1px solid #294955;border-radius:14px;background:#08151c;overflow:hidden}
      #calendar .routeDates summary{display:grid;grid-template-columns:auto auto 1fr;gap:8px;align-items:center;padding:12px 13px;cursor:pointer;list-style:none}
      #calendar .routeDates summary::-webkit-details-marker{display:none}
      #calendar .routeDates summary small{color:var(--muted);font-size:9px}.routeDatesInner{padding:0 12px 12px}
      #routeModal{position:fixed;inset:0;display:none;align-items:center;justify-content:center;padding:18px;background:#02070bc7;z-index:16000;backdrop-filter:blur(12px)}
      #routeModal.show{display:flex}#routeModal .routeModalCard{width:min(560px,94vw);border:1px solid #456775;border-radius:18px;background:linear-gradient(180deg,#10242d,#08151c);box-shadow:0 28px 80px #000c;padding:18px;position:relative}
      #routeModal .routeClose{position:absolute;right:10px;top:10px;width:36px;height:36px;border:1px solid #ffffff29;border-radius:50%;background:#071018;color:#fff}
      #routeModal .routeStatus{font-size:9px;letter-spacing:.11em;color:var(--gold);text-transform:uppercase}
      #routeModal h2{margin:5px 40px 8px 0;font-size:28px}#routeModal p{color:#c4d3d6;line-height:1.55;font-size:12px}
      #routeModal .routeAction{margin-top:12px;display:flex;gap:7px;flex-wrap:wrap}
      @media(max-width:680px){
        #calendar .routeMap{min-height:620px}
        #calendar .routeNode{width:122px;min-height:60px;padding:8px}
        #calendar .routeNode b{font-size:10px}#calendar .routeNode small{font-size:7px}
        #calendar .routeNow{left:3%;right:3%;bottom:2.5%;align-items:flex-start;flex-direction:column}
        #calendar .routeDates summary{grid-template-columns:auto 1fr}#calendar .routeDates summary small{grid-column:1/-1}
      }
      @media(prefers-reduced-motion:reduce){#calendar .routeNode.current{animation:none}}
    `;
    document.head.appendChild(style);

    var stops=[
      {id:'base',x:13,y:68,state:'done',sig:'✓',name:'Base ISL',sub:'1A × 1B × 1C · huella · mutación',status:'TRAMO SUPERADO',body:'La base sistémica está conservada. No se reinicia: sirve de suelo para los experimentos posteriores.'},
      {id:'labs',x:28,y:55,state:'done',sig:'✓',name:'Labs de viento',sub:'Wind Lab · receptor · CQC',status:'TRAMO SUPERADO',body:'Los laboratorios demostraron cómo experimentar pequeño antes de construir grande.'},
      {id:'molino',x:44,y:47,state:'done',sig:'✓',name:'Molino que Miente',sub:'Decisión física · tres rutas',status:'REVISIÓN VIVA',body:'Se conserva como laboratorio narrativo-jugable. Debe revalidarse integrado, no convertirse en menú moral.'},
      {id:'pre50',x:61,y:36,state:'current',sig:'◆',name:'PRE50',sub:'Gate humano real pendiente',status:'AHORA IMPORTA',body:'PRE50 sigue siendo el gate humano real. No se falsifica playtest ni se asciende nada a CANON automáticamente.'},
      {id:'pre60',x:75,y:28,state:'future',sig:'◇',name:'PRE60',sub:'Síntesis · nueva variante',status:'SIGUIENTE HORIZONTE',body:'Se abre después de feedback humano real: sintetizar evidencia, corregir y decidir una nueva variante.'},
      {id:'slice',x:88,y:19,state:'future',sig:'◇',name:'Vertical Slice',sub:'Cruce jugable · telemetría',status:'HORIZONTE',body:'Sólo cuando los gates previos sobrevivan CQC y confirmación humana. Entonces toca experiencia pequeña real e instrumentación.'}
    ];

    var shell=document.createElement('div');shell.className='routeShell';
    shell.innerHTML='<div class="routeHead"><div><div class="eyebrow">CENTRO DE MANDOS · INCEPTION</div><h2>RUTA ISL</h2><div class="sub">El proyecto se navega como un viaje. Cada isla es una fase real; el mapa orienta, no maquilla estados.</div></div><div class="routeLegend"><span class="done">✓ recorrido</span><span class="now">◆ ahora importa</span><span>◇ horizonte</span></div></div>';
    var map=document.createElement('div');map.className='routeMap';
    map.innerHTML='<img src="assets/floating-islands-map.png" alt="Mapa de viaje ISL"><i class="routePath" aria-hidden="true"></i>';
    stops.forEach(function(s){
      var b=document.createElement('button');b.type='button';b.className='routeNode '+s.state;b.dataset.route=s.id;b.style.left=s.x+'%';b.style.top=s.y+'%';
      b.innerHTML='<span class="routeSig">'+s.sig+'</span><b>'+s.name+'</b><small>'+s.sub+'</small>';
      map.appendChild(b);
    });
    var now=document.createElement('div');now.className='routeNow';now.innerHTML='<div><b>◆ AHORA IMPORTA · PRE50</b><span>Conseguir evidencia humana real sin abrir más infraestructura.</span></div><span>La revisión actual viaja contigo →</span>';map.appendChild(now);
    shell.appendChild(map);
    view.insertBefore(shell,view.firstChild);
    view.appendChild(details);

    var modal=document.createElement('div');modal.id='routeModal';modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<div class="routeModalCard" role="dialog" aria-modal="true" aria-labelledby="routeModalTitle"><button class="routeClose" type="button" aria-label="Cerrar">×</button><div class="routeStatus"></div><h2 id="routeModalTitle"></h2><p></p><div class="routeAction"><button class="btn primary routeMark" type="button">DEJAR HUELLA</button><button class="btn routeDismiss" type="button">CERRAR</button></div></div>';
    document.body.appendChild(modal);
    var selected=null,key='isl-route-v1-visited';
    function read(){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch(e){return[]}}
    function paint(){var v=read();map.querySelectorAll('.routeNode').forEach(function(n){n.classList.toggle('visited',v.indexOf(n.dataset.route)>=0)})}
    function close(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');selected=null}
    function open(id){var s=stops.filter(function(x){return x.id===id})[0];if(!s)return;selected=s;modal.querySelector('.routeStatus').textContent=s.status;modal.querySelector('h2').textContent=s.name;modal.querySelector('p').textContent=s.body;modal.classList.add('show');modal.setAttribute('aria-hidden','false')}
    map.addEventListener('click',function(e){var n=e.target.closest('.routeNode');if(n)open(n.dataset.route)});
    modal.querySelector('.routeClose').onclick=close;modal.querySelector('.routeDismiss').onclick=close;
    modal.addEventListener('click',function(e){if(e.target===modal)close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('show'))close()});
    modal.querySelector('.routeMark').onclick=function(){if(!selected)return;var v=read();if(v.indexOf(selected.id)<0)v.push(selected.id);try{localStorage.setItem(key,JSON.stringify(v))}catch(e){}paint();close()};
    paint();
  });
})();