 const CACHE_NAME = "microhabitats-algas-v1";
const URLS_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./icon_180.png",
  "./icon_512.png",
  "./aguaverde.html",
  "./greendust.html",
  "./filamentosadura.html",
  "./filamentosamacia.html",
  "./greenspot.html",
  "./algamarrom.html",
  "./cianobacterias.html",
  "./algasvermelhas.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) =>
      response || fetch(event.request)
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
