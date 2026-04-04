const CACHE_VERSION = "v28";
const STATIC_CACHE = `hestia-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `hestia-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = "./offline.html";
let noCacheAssetsEnabled = false;

const APP_SHELL = [
  "./",
  "./?source=pwa",
  "./index.html",
  "./offline.html",
  "./manifest.webmanifest",
  "./app/app.css",
  "./app/main.js",
  "./app/styles/tokens.css",
  "./app/styles/base.css",
  "./app/styles/layout.css",
  "./app/styles/ui.css",
  "./app/styles/home.css",
  "./app/styles/writing.css",
  "./app/styles/shopping.css",
  "./app/styles/devtools.css",
  "./app/styles/pwa.css",
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
  "./app/diagnostics/dev-flags.js",
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
    return;
  }

  if (event.data?.type === "DEV_SET_NO_CACHE_ASSETS") {
    noCacheAssetsEnabled = event.data.enabled === true;
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

  if (event.request.mode === "navigate" && requestUrl.searchParams.get("dev_nocache_assets") === "1") {
    noCacheAssetsEnabled = true;
  }

  if (requestUrl.pathname.endsWith("/public/runtime-config.json")) {
    event.respondWith(networkFirstForConfig(event.request));
    return;
  }

  if (noCacheAssetsEnabled && isNoCacheAssetRequest(event.request, requestUrl)) {
    event.respondWith(networkOnlyNoCache(event.request));
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

async function networkOnlyNoCache(request) {
  try {
    return await fetch(request, { cache: "reload" });
  } catch {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    if (request.mode === "navigate") {
      const offlinePage = await caches.match(OFFLINE_URL);
      if (offlinePage) {
        return offlinePage;
      }
    }

    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}

function isNoCacheAssetRequest(request, requestUrl) {
  if (request.mode === "navigate") {
    return true;
  }

  const path = requestUrl.pathname.toLowerCase();
  return (
    path.endsWith(".css") ||
    path.endsWith(".js") ||
    path.endsWith(".svg") ||
    path.endsWith(".png") ||
    path.endsWith(".webmanifest") ||
    path.endsWith(".html")
  );
}
