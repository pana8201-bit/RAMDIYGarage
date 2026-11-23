/* Offline support for RAM DIY Garage.
   Network-first: always try to fetch the latest files (so data updates pushed to
   GitHub show up), fall back to cache when offline. Bump CACHE on each release. */
const CACHE = "ramgarage-2026.11-ram1";
const ASSETS = ["./", "index.html", "styles.css", "zxing.min.js", "vin-scan.js", "data.js", "data-1500.js", "data-hd.js", "data-van.js", "schedule.js", "app.js", "icon.svg", "manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("index.html")))
  );
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window" })
    .then((cs) => (cs[0] ? cs[0].focus() : self.clients.openWindow("./"))));
});
