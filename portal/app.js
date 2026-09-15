(function(){
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const state={selected:[],ratings:{},settings:JSON.parse(localStorage.getItem('isl_settings')||'{}')};
let manifest=null, currentMonth=new Date(2026,8,1);

function progress(){const p=$('#progress');p.classList.remove('progressing');void p.offsetWidth;p.classList.add('progressing')}
function go(id){$$('.view,.nav').forEach(x=>x.classList.remove('active'));$('#'+id).classList.add('active');const b=$(`.nav[data-view="${id}"]`);if(b)b.classList.add('active');$('#drawer').classList.remove('open');progress();scrollTo(0,0)}
$$('.nav').forEach(b=>b.onclick=()=>go(b.dataset.view));$$('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
$('#drawerBtn').onclick=()=>$('#drawer').classList.add('open');$('#drawerClose').onclick=()=>$('#drawer').classList.remove('open');
$('#settingsBtn').onclick=()=>$('#settings').classList.add('open');$('#settingsClose').onclick=()=>$('#settings').classList.remove('open');

function setting(k,d){return typeof state.settings[k]==='boolean'?state.settings[k]:d}
function applySettings(){
 document.body.classList.toggle('hide-rail',!setting('rail',true));document.body.classList.toggle('no-tips',!setting('tips',true));document.body.classList.toggle('no-motion',!setting('motion',true));document.body.classList.toggle('compact',setting('compact',false));
 document.documentElement.style.setProperty('--scale',state.settings.scale||1);document.documentElement.style.setProperty('--accent',state.settings.accent||'#87efff');
 $$('[data-setting]').forEach(b=>{const d=['rail','tips','motion','welcome'].includes(b.dataset.setting);b.classList.toggle('on',setting(b.dataset.setting,d))});
 $('#scaleRange').value=state.settings.scale||1;$('#accent').value=state.settings.accent||'#87efff';
}
$$('[data-setting]').forEach(b=>b.onclick=()=>{const k=b.dataset.setting,d=['rail','tips','motion','welcome'].includes(k);state.settings[k]=!setting(k,d);localStorage.setItem('isl_settings',JSON.stringify(state.settings));applySettings()});
$('#scaleRange').oninput=e=>{state.settings.scale=+e.target.value;localStorage.setItem('isl_settings',JSON.stringify(state.settings));applySettings()};
$('#accent').onchange=e=>{state.settings.accent=e.target.value;localStorage.setItem('isl_settings',JSON.stringify(state.settings));applySettings()};applySettings();

const welcome=$('#welcome');const closeWelcome=()=>welcome.classList.add('off');$('#enterBtn').onclick=closeWelcome;if(!setting('welcome',true))closeWelcome();

const tip=$('#tooltip');let tipTimer;function tipOn(el){if(!setting('tips',true))return;const text=el.dataset.help||el.title;if(!text)return;clearTimeout(tipTimer);tipTimer=setTimeout(()=>{tip.textContent=text;const r=el.getBoundingClientRect();tip.style.left=Math.min(innerWidth-335,Math.max(8,r.left))+'px';tip.style.top=Math.min(innerHeight-80,r.bottom+8)+'px';tip.classList.add('show')},180)}function tipOff(){clearTimeout(tipTimer);tip.classList.remove('show')}
document.addEventListener('mouseover',e=>{const el=e.target.closest('[data-help]');if(el)tipOn(el)});document.addEventListener('mouseout',tipOff);document.addEventListener('focusin',e=>{const el=e.target.closest('[data-help]');if(el)tipOn(el)});document.addEventListener('focusout',tipOff);

function openLightbox(src,type='image',caption=''){const box=$('#lightbox'),slot=$('#lightboxMedia');slot.innerHTML='';const el=document.createElement(type==='video'?'video':'img');el.src=src;if(type==='video'){el.controls=true;el.autoplay=true;el.playsInline=true}else el.alt=caption;slot.appendChild(el);$('#lightboxCaption').textContent=caption;box.classList.remove('hidden');$('#lightboxClose').focus()}
function closeLightbox(){const v=$('#lightbox video');if(v)v.pause();$('#lightbox').classList.add('hidden');$('#lightboxMedia').innerHTML=''}
$('#lightboxClose').onclick=closeLightbox;$('#lightbox').onclick=e=>{if(e.target===$('#lightbox'))closeLightbox()};
document.addEventListener('click',e=>{const v=e.target.closest('[data-lightbox-video]');if(v){e.preventDefault();openLightbox(v.currentSrc||v.src,'video','Previs visual ISL')}const z=e.target.closest('[data-full-src]');if(z){e.preventDefault();openLightbox(z.dataset.fullSrc,'image',z.dataset.caption||'ISL')}});

async function initManifest(){manifest=await fetch('content-manifest.json').then(r=>r.json());buildGallery()}
function buildGallery(){
 const cats=[...new Set(manifest.gallery.map(x=>x.category))],sts=[...new Set(manifest.gallery.map(x=>x.status))];
 $('#categoryFilter').innerHTML='<option value="">Todas las categorías</option>'+cats.map(x=>`<option>${x}</option>`).join('');$('#statusFilter').innerHTML='<option value="">Todos los estados</option>'+sts.map(x=>`<option>${x}</option>`).join('');
 renderGallery();
}
function renderGallery(){const c=$('#categoryFilter').value,s=$('#statusFilter').value,q=$('#searchInput').value.toLowerCase();const items=manifest.gallery.filter(x=>(!c||x.category===c)&&(!s||x.status===s)&&(!q||(x.name+' '+x.category+' '+x.help).toLowerCase().includes(q)));$('#galleryGrid').innerHTML=items.map(x=>`<article class="card asset" data-help="${x.help}">${x.type==='video'?`<video data-lightbox-video poster="${x.poster}" muted><source src="${x.src}"></video>`:`<div data-full-src="${x.src}" data-caption="${x.name}"><img src="${x.src}" alt="${x.name}"></div>`}<input class="select" type="checkbox" data-id="${x.id}" ${state.selected.includes(x.id)?'checked':''}><div class="pad"><b>${x.name}</b><span>${x.category} · ${x.status}</span></div></article>`).join('');$$('.select').forEach(cb=>cb.onchange=()=>{if(cb.checked){if(state.selected.length>=3){cb.checked=false;return alert('Máximo 3 variantes.')}state.selected.push(cb.dataset.id)}else state.selected=state.selected.filter(x=>x!==cb.dataset.id)})}
['categoryFilter','statusFilter','searchInput'].forEach(id=>$('#'+id).addEventListener('input',renderGallery));
$('#compareBtn').onclick=()=>{const items=state.selected.map(id=>manifest.gallery.find(x=>x.id===id)).filter(Boolean);$('#compareGrid').innerHTML=items.length?items.map(x=>`<article class="card">${x.type==='video'?`<video controls poster="${x.poster}"><source src="${x.src}"></video>`:`<img src="${x.src}">`}<div class="pad"><b>${x.name}</b><p>${x.help}</p><div class="score">${score(x.id).toFixed(0)}/100</div>${['Identidad','Belleza','Legibilidad','Función'].map((k,i)=>`<label>${k}<input type="range" min="1" max="5" value="${rating(x.id,i)}" data-rate="${x.id}|${i}"></label>`).join('')}</div></article>`).join(''):'<p>Selecciona variantes primero.</p>';$('#comparePanel').classList.remove('hidden');$$('[data-rate]').forEach(r=>r.oninput=()=>{const [id,i]=r.dataset.rate.split('|');state.ratings[id]??={};state.ratings[id][i]=+r.value;$('#compareBtn').click()})};$('#compareClose').onclick=()=>$('#comparePanel').classList.add('hidden');
function rating(id,i){return state.ratings[id]?.[i]||3}function score(id){return [32,24,24,20].reduce((a,w,i)=>a+rating(id,i)*w/5,0)}

function renderCalendar(){const y=currentMonth.getFullYear(),m=currentMonth.getMonth();$('#monthTitle').textContent=currentMonth.toLocaleDateString('es-ES',{month:'long',year:'numeric'});const first=(new Date(y,m,1).getDay()+6)%7,days=new Date(y,m+1,0).getDate(),events={15:'CQC / Command',16:'Bake-off 3D',18:'3D Lab',21:'Wind × 3D'};let html=['L','M','X','J','V','S','D'].map(x=>`<div class="day head">${x}</div>`).join('');for(let i=0;i<42;i++){const d=i-first+1;html+=`<div class="day">${d>0&&d<=days?`<span class="date">${d}</span>${events[d]?`<div class="event">${events[d]}</div>`:''}`:''}</div>`}$('#calendarGrid').innerHTML=html}
$('#prevMonth').onclick=()=>{currentMonth=new Date(currentMonth.getFullYear(),currentMonth.getMonth()-1,1);renderCalendar()};$('#nextMonth').onclick=()=>{currentMonth=new Date(currentMonth.getFullYear(),currentMonth.getMonth()+1,1);renderCalendar()};renderCalendar();

function sim(){const h=+$('#hoursDay').value,d=+$('#daysWeek').value,w=+$('#weeks').value,r=+$('#reuse').value/100,a=+$('#automation').value/100,risk=+$('#risk').value/100;$('#hoursDayOut').textContent=h;$('#daysWeekOut').textContent=d;$('#weeksOut').textContent=w;$('#reuseOut').textContent=Math.round(r*100)+'%';$('#automationOut').textContent=Math.round(a*100)+'%';$('#riskOut').textContent=Math.round(risk*100)+'%';const nom=h*d*w,eff=nom*(1-risk)*(1+r*.5+a*.4);$('#nominalKpi').textContent=Math.round(nom)+'h';$('#effectiveKpi').textContent=Math.round(eff)+'h';$('#simText').textContent='Modelo exploratorio, no promesa. La palanca importa más que el número exacto.'}
['hoursDay','daysWeek','weeks','reuse','automation','risk'].forEach(id=>$('#'+id).oninput=sim);sim();

function focusables(){return $$('.view.active button,.view.active a[href],.view.active input,.view.active select').filter(x=>x.offsetParent!==null&&!x.disabled)}
function move(n){const l=focusables();if(!l.length)return;let i=l.indexOf(document.activeElement);i=i<0?0:(i+n+l.length)%l.length;l[i].focus()}
const navs=$$('.nav');function switchView(n){let i=navs.findIndex(x=>x.classList.contains('active'));i=(i+n+navs.length)%navs.length;navs[i].click();setTimeout(()=>move(0),30)}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#lightbox').classList.contains('hidden'))return closeLightbox();if($('#settings').classList.contains('open'))return $('#settings').classList.remove('open');if($('#drawer').classList.contains('open'))return $('#drawer').classList.remove('open');if(!welcome.classList.contains('off'))return closeWelcome();return go('home')}if(['ArrowRight','ArrowDown'].includes(e.key)){e.preventDefault();move(1)}if(['ArrowLeft','ArrowUp'].includes(e.key)){e.preventDefault();move(-1)}});
let last={};function edge(k,v,f){if(v&&!last[k])f();last[k]=v}function poll(){const gp=navigator.getGamepads?.()[0];if(gp){const p=i=>gp.buttons[i]?.pressed;edge('a',p(0),()=>document.activeElement?.click());edge('b',p(1),()=>go('home'));edge('l1',p(4),()=>switchView(-1));edge('r1',p(5),()=>switchView(1));edge('opt',p(9),()=>$('#drawerBtn').click());edge('u',p(12),()=>move(-1));edge('d',p(13),()=>move(1));edge('l',p(14),()=>move(-1));edge('r',p(15),()=>move(1))}requestAnimationFrame(poll)}if(navigator.getGamepads)requestAnimationFrame(poll);
if(location.search.includes('tv=1'))document.body.classList.add('tv');initManifest();
})();