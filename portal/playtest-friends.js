(function(){
  var PATH=(location.pathname.split('/').pop()||'').toLowerCase();
  var QS=new URLSearchParams(location.search);
  var FRIEND=QS.get('friends')==='1';
  try{if(FRIEND)localStorage.setItem('isl_friend_mode','1');else FRIEND=localStorage.getItem('isl_friend_mode')==='1'}catch(e){}
  if(!FRIEND)return;
  document.documentElement.classList.add('isl-friend-play');

  var META={
    'velaria-v2.html':['Velaria','Toca para moverte, prueba Anclaje y fíjate en si el mundo contradice la señal.'],
    'recreo.html':['Distrito Recreo','Elige cualquier rareza. Aquí vienes a jugar, no a entender un sistema.'],
    'air-fishing.html':['Pesca Aérea','Prueba el timing. Lo importante es si apetece repetir.'],
    'sunday-market.html':['Mercado del Domingo','Prueba un trueque. No busques optimizar: mira si la situación tiene gracia.'],
    'ningun-sitio.html':['Ningún Sitio','Toca cosas y mira qué ocurre. La sorpresa es parte de la prueba.'],
    'isla-baile-inagotable.html':['Baile Inagotable','Muévete por la escena y nota si la idea invita a seguir.'],
    'salon-cortinas-rojas.html':['Cortinas Rojas','Explora la escena como si hubieras llegado aquí dentro de una aventura.'],
    'secret-level.html':['El Nivel que No Existe','Prueba la regla rara del lugar. Es LAB y NO CANON.'],
    'storm-route.html':['Costura del Cielo','Lee la situación y toma una decisión. Es una hipótesis jugable.'],
    'boss-prototype.html':['Cartógrafo de la Tormenta','Prueba a leer el patrón antes de actuar. Es un boss de laboratorio.']
  };
  var m=META[PATH]||['ISL Playtest','Juega sin buscar la respuesta correcta. Si algo no se entiende, eso también cuenta.'];

  var css=document.createElement('style');
  css.textContent='html.isl-friend-play #islGlobalShell,html.isl-friend-play #islGlobalMore,html.isl-friend-play #islGlobalHomePulse{display:none!important}html.isl-friend-play body{padding-top:0!important}html.isl-friend-play a[href*="rpg-home.html"],html.isl-friend-play a[href*="command-center.html"]{display:none!important}#islFriendBar{position:fixed;left:8px;right:8px;top:max(8px,env(safe-area-inset-top));z-index:2147482900;display:flex;align-items:center;gap:7px;padding:7px;border:1px solid #45636d;border-radius:14px;background:#061017ee;box-shadow:0 8px 30px #0008;font-family:system-ui,sans-serif}#islFriendBar a,#islFriendBar button{border:1px solid #3e5d67;border-radius:9px;background:#0b1a21;color:#e9f4f5;text-decoration:none;padding:8px 9px;font-size:9px;font-weight:900}#islFriendBar b{flex:1;font-size:10px;color:#8defff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#islFriendHelp{position:fixed;inset:0;z-index:2147482950;display:none;place-items:center;padding:16px;background:#02070bd9;font-family:system-ui,sans-serif}#islFriendHelp.show{display:grid}.ifh{width:min(92vw,480px);border:1px solid #45636d;border-radius:20px;background:#0c1c24;color:#eef7f4;padding:20px}.ifh small{color:#8defff;font-weight:900;letter-spacing:.12em}.ifh h2{font-size:28px;margin:6px 0}.ifh p{color:#c7d6d8;line-height:1.5}.ifh button{width:100%;min-height:44px;border:1px solid #8defff;border-radius:11px;background:#153640;color:#fff;font-weight:900}';
  document.head.appendChild(css);

  var bar=document.createElement('div');bar.id='islFriendBar';
  bar.innerHTML='<a href="jugar.html?friends=1">← ARCADE</a><b>MODO COLEGAS · '+m[0]+'</b><button type="button" id="islFriendInfo">¿QUÉ HAGO?</button>';
  document.body.appendChild(bar);

  if(PATH!=='velaria-v2.html'){
    var help=document.createElement('div');help.id='islFriendHelp';
    help.innerHTML='<div class="ifh"><small>ISL · PRUEBA ENTRE COLEGAS</small><h2>'+m[0]+'</h2><p>'+m[1]+'</p><p><b>No es el acabado final.</b> Juega un momento y luego dime sólo: ¿lo entendiste?, ¿te divirtió?, ¿seguirías?</p><button type="button">VA, JUGAR</button></div>';
    document.body.appendChild(help);
    var seen='isl_friend_seen_'+PATH;
    try{if(sessionStorage.getItem(seen)!=='1')help.classList.add('show')}catch(e){help.classList.add('show')}
    help.querySelector('button').onclick=function(){help.classList.remove('show');try{sessionStorage.setItem(seen,'1')}catch(e){}};
    document.getElementById('islFriendInfo').onclick=function(){help.classList.add('show')};
  }else{
    document.getElementById('islFriendInfo').onclick=function(){
      var gate=document.getElementById('preplayGate');if(gate)gate.hidden=false;
    };
  }

  if(PATH==='isla-baile-inagotable.html'){
    try{
      var pending=localStorage.getItem('isl_baile_return_probe_pending')==='1';
      var raw=JSON.parse(localStorage.getItem('isl_dance_island_v1')||'{}');
      var hasKnots=raw.knots&&Object.keys(raw.knots).length>0;
      if(pending&&hasKnots){
        var pc=document.createElement('div');pc.id='islKnotReturnProbe';
        pc.innerHTML='<div class="ifh"><small>ISL · PRUEBA DE REGRESO</small><h2>¿Qué recuerdas?</h2><p>Sin mirar explicaciones anteriores, responde con tus palabras.</p><label>¿Qué crees que cambió?</label><textarea id="ikpChanged" rows="2"></textarea><label>¿Por qué crees que cambió?</label><textarea id="ikpWhy" rows="2"></textarea><label>¿Qué esperas que ocurra si vuelves otra vez?</label><textarea id="ikpNext" rows="2"></textarea><div class="ikpActions"><button type="button" id="ikpSave">GUARDAR HUELLA</button><button type="button" id="ikpLater">AHORA NO</button></div></div>';
        pc.style.cssText='position:fixed;inset:0;z-index:2147482960;display:grid;place-items:center;padding:16px;background:#02070be8;font-family:system-ui,sans-serif';
        document.body.appendChild(pc);
        var st=document.createElement('style');
        st.textContent='#islKnotReturnProbe .ifh label{display:block;margin:10px 0 4px;font-size:10px;color:#8defff;font-weight:800}#islKnotReturnProbe textarea{width:100%;resize:vertical;border:1px solid #45636d;border-radius:9px;background:#071118;color:#eef7f4;padding:9px;font:12px system-ui}#islKnotReturnProbe .ikpActions{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:12px}';
        document.head.appendChild(st);
        document.getElementById('ikpLater').onclick=function(){pc.remove()};
        document.getElementById('ikpSave').onclick=function(){
          var changed=document.getElementById('ikpChanged').value.trim();
          var why=document.getElementById('ikpWhy').value.trim();
          var next=document.getElementById('ikpNext').value.trim();
          if(!changed&&!why&&!next)return;
          var arr=[];try{arr=JSON.parse(localStorage.getItem('isl_baile_return_evidence_v1')||'[]');if(!Array.isArray(arr))arr=[]}catch(e){arr=[]}
          arr.push({at:new Date().toISOString(),changed:changed,why:why,next:next,knot_ids:Object.keys(raw.knots||{})});
          localStorage.setItem('isl_baile_return_evidence_v1',JSON.stringify(arr.slice(-12)));
          localStorage.removeItem('isl_baile_return_probe_pending');
          pc.remove();
        };
      }
    }catch(e){}
  }

})();