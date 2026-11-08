// Service worker: кешує головну сторінку й стилі, щоб сайт відкривався і без мережі
const CACHE_NAME = 'vxe-r1-v1';
const PRECACHE = [
  './',
  './index.html',
  './dist/output.css',
  './script.js',
  './images/hero-white-angle.webp',
  './icons/icon-192.png',
];

// Встановлення: заздалегідь кладемо в кеш основні файли
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

// Активація: видаляємо кеші старих версій
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Запити: спершу мережа (свіжа версія після деплою), кеш — запасний варіант без інтернету
self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Обробляємо лише GET-запити до власного сайту; API, Google Fonts та інші домени — як звичайно
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () =>
        (await caches.match(request)) ||
        (request.mode === 'navigate' ? caches.match('./index.html') : Response.error())
      )
  );
});