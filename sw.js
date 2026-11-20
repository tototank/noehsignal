// 홈 화면 앱용 서비스워커: 늘 최신 신호를 받도록 네트워크 우선, 끊겼을 때만 마지막으로 받은 화면을 보여줌
const C = 'ns-v7';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok && (u.pathname.endsWith('/') || u.pathname.endsWith('.html') || u.pathname.endsWith('.json'))) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
