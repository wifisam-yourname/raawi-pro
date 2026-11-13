const C='raawi-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin||u.pathname.endsWith('/sw.js'))return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>{const n=fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x}).catch(()=>m||caches.match('./'));return m||n}))});
