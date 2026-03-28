const CACHE_VERSION = "v18";
const STATIC_CACHE = `hestia-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `hestia-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = "./offline.html";

const APP_SHELL = [
  "./",
  "./?source=pwa",
  "./index.html",
  "./offline.html",
  "./manifest.webmanifest",
  "./app/main.js",
  "./app/styles/tokens.css",
  "./app/styles/base.css",
  "./app/styles/components.css",
  "./app/styles/screens.css",
  "./app/core/router.js",
  "./app/core/pwa-install-bootstrap.js",
  "./app/core/runtime-config.js",
  "./app/core/touchlog.js",
  "./app/core/pwa-install.js",
  "./app/core/state.js",
  "./app/core/semantics.js",
  "./app/modules/home-scene.js",
  "./app/modules/writing.js",
  "./app/modules/shopping.js",
  "./app/diagnostics/ambient-touch.js",
  "./app/diagnostics/art-style-presets.js",
  "./app/diagnostics/font-presets.js",
  "./app/supabase/client.js",
  "./app/supabase/list-sync.js",
  "./assets/js/semantics.de.json",
  "./public/runtime-config.json",
  "./public/icon.svg",
  "./public/icon-192.png",
  "./public/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (requestUrl.pathname.endsWith("/public/runtime-config.json")) {
    event.respondWith(networkFirstForConfig(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirstForPages(event.request));
    return;
  }

  event.respondWith(staleWhileRevalidate(event.request));
});

async function networkFirstForPages(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cachedPage = await caches.match(request);
    if (cachedPage) {
      return cachedPage;
    }
    const offlinePage = await caches.match(OFFLINE_URL);
    if (offlinePage) {
      return offlinePage;
    }
    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await caches.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cachedResponse);

  return cachedResponse || networkPromise;
}

async function networkFirstForConfig(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response("{}", {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
}
