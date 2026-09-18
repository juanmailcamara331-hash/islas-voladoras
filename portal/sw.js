const CACHE='isl-center-v033-pixelrecreo';
const HOT=['./','./index.html','./rpg-home.html','./command-center.html','./recreo.html','./capsulas.html','./capsulas-tv.html','./musica.html','./playtest-echo.html','./manifest.webmanifest','./isl-icon.svg','./isl-capsules-current.json','./styles.css','./app.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(HOT)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function isColdAsset(req){
  const u=new URL(req.url);
  return u.origin===location.origin && (/\/assets\//.test(u.pathname)||/\.(?:png|jpe?g|webp|avif|svg|mp3|mp4|woff2?)$/i.test(u.pathname));
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(isColdAsset(e.request)){
    const u=new URL(e.request.url);
  const isNav=e.request.mode==='navigate'||/\.html$/i.test(u.pathname)||u.pathname.endsWith('/');
  if(isNav){
    e.respondWith(caches.match(e.request).then(hit=>{
      const fresh=fetch(e.request).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r}).catch(()=>hit);
      return hit||fresh;
    }));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r})));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r})));
});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=e.notification.data&&e.notification.data.url||'./index.html';e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(ws=>{for(const w of ws){if('focus'in w){w.navigate(url);return w.focus()}}return clients.openWindow(url)}))});