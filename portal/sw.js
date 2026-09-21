const CACHE='isl-center-v076-human-device-fixes';
const HOT=['./','./index.html','./rpg-home.html','./command-center.html','./route-isl.js','./ISL_ROUTE_STATE_CURRENT.json','./recreo.html','./air-fishing.html','./sunday-market.html','./ningun-sitio.html','./boss-prototype.html','./storm-route.html','./secret-level.html','./velaria-v2.html','./capsulas.html','./capsulas-tv.html','./musica.html','./manifest.webmanifest','./isl-icon-master.png','./huellas.html','./recreo-pixel.css'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(HOT)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
function sameOrigin(req){try{return new URL(req.url).origin===self.location.origin}catch(e){return false}}
function coldAsset(req){if(!sameOrigin(req))return false;var p=new URL(req.url).pathname;return /\/assets\//.test(p)||/\.(png|jpe?g|webp|avif|svg|mp3|mp4|woff2?)$/i.test(p)}
function isNavigation(req){if(!sameOrigin(req))return false;var p=new URL(req.url).pathname;return req.mode==='navigate'||/\.html$/i.test(p)||p.endsWith('/')}
self.addEventListener('fetch',function(e){
  var req=e.request;if(req.method!=='GET')return;
  if(isNavigation(req)){
    e.respondWith(fetch(req).then(function(r){if(r&&r.ok){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(req,cp)})}return r}).catch(function(){return caches.match(req)}));
    return;
  }
  if(sameOrigin(req)&&(/\/route-isl\.js$/i.test(new URL(req.url).pathname)||/\/ISL_ROUTE_STATE_CURRENT\.json$/i.test(new URL(req.url).pathname))){e.respondWith(fetch(req,{cache:'no-store'}).then(function(r){if(r&&r.ok){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(req,cp)})}return r}).catch(function(){return caches.match(req)}));return;}
  if(coldAsset(req)){
    e.respondWith(caches.match(req).then(function(hit){return hit||fetch(req).then(function(r){if(r&&r.ok){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(req,cp)})}return r})}));
    return;
  }
  e.respondWith(fetch(req).catch(function(){return caches.match(req)}));
});
self.addEventListener('notificationclick',function(e){e.notification.close();var url=e.notification.data&&e.notification.data.url||'./index.html';e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(function(ws){for(var i=0;i<ws.length;i++){if('focus'in ws[i]){ws[i].navigate(url);return ws[i].focus()}}return clients.openWindow(url)}))});