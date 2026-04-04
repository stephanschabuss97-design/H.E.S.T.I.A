const NO_CACHE_ASSETS_KEY = "hestia.dev.nocache-assets";
const NO_CACHE_QUERY_KEY = "dev_nocache_assets";
const NO_CACHE_TS_QUERY_KEY = "dev_nocache_ts";

function readBooleanFlag(key) {
  try {
    return localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeBooleanFlag(key, value) {
  try {
    localStorage.setItem(key, value ? "true" : "false");
  } catch {}
}

function clearBooleanFlag(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

function setBodyFlag(doc, enabled) {
  doc.body?.setAttribute("data-dev-nocache-assets", enabled ? "true" : "false");
}

function emitModeState(doc, enabled) {
  doc.dispatchEvent(
    new CustomEvent("hestia:dev-mode-state", {
      detail: {
        id: "no-cache-assets",
        label: "No Cache Assets",
        active: enabled
      }
    })
  );
}

function syncServiceWorker(enabled) {
  const message = {
    type: "DEV_SET_NO_CACHE_ASSETS",
    enabled: !!enabled
  };

  navigator.serviceWorker?.controller?.postMessage(message);

  navigator.serviceWorker?.ready
    ?.then((registration) => {
      registration.active?.postMessage(message);
      registration.waiting?.postMessage(message);
      registration.installing?.postMessage(message);
    })
    .catch(() => {});
}

function nextNoCacheUrl(enabled) {
  const url = new URL(window.location.href);
  if (enabled) {
    url.searchParams.set(NO_CACHE_QUERY_KEY, "1");
    url.searchParams.set(NO_CACHE_TS_QUERY_KEY, String(Date.now()));
  } else {
    url.searchParams.delete(NO_CACHE_QUERY_KEY);
    url.searchParams.delete(NO_CACHE_TS_QUERY_KEY);
  }
  return url.toString();
}

export function initDevFlags(doc, touchlog) {
  const noCacheInput = doc.getElementById("dev-toggle-nocache-assets");
  const resetButton = doc.getElementById("dev-reset-state");
  if (!noCacheInput) {
    return;
  }

  function applyNoCache(enabled) {
    if (enabled) {
      writeBooleanFlag(NO_CACHE_ASSETS_KEY, true);
    } else {
      clearBooleanFlag(NO_CACHE_ASSETS_KEY);
    }
    noCacheInput.checked = enabled;
    setBodyFlag(doc, enabled);
    emitModeState(doc, enabled);
    syncServiceWorker(enabled);
  }

  const current = readBooleanFlag(NO_CACHE_ASSETS_KEY);
  applyNoCache(current);

  noCacheInput.addEventListener("change", () => {
    const enabled = !!noCacheInput.checked;
    applyNoCache(enabled);
    touchlog?.add(`[dev] no-cache assets ${enabled ? "enabled" : "disabled"}`, {
      eventId: `dev-no-cache-assets-${enabled ? "enabled" : "disabled"}`
    });
    window.location.replace(nextNoCacheUrl(enabled));
  });

  resetButton?.addEventListener("click", () => {
    applyNoCache(false);
    doc.dispatchEvent(new CustomEvent("hestia:dev-reset-state"));
    touchlog?.add("[dev] dev state reset", {
      eventId: "dev-state-reset"
    });
    window.location.replace(nextNoCacheUrl(false));
  });
}
