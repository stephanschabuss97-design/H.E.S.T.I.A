const INSTALL_STATE_KEY = "hestia.pwa-installed";

function hasDisplayMode(mode) {
  try {
    return window.matchMedia(`(display-mode: ${mode})`).matches;
  } catch {
    return false;
  }
}

function hasWindowControlsOverlay() {
  try {
    return window.navigator.windowControlsOverlay?.visible === true;
  } catch {
    return false;
  }
}

function isInstalledAppContext() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("source") === "pwa") {
    return true;
  }

  if (document.referrer.startsWith("android-app://")) {
    return true;
  }

  return (
    hasWindowControlsOverlay() ||
    hasDisplayMode("standalone") ||
    hasDisplayMode("window-controls-overlay") ||
    hasDisplayMode("minimal-ui") ||
    hasDisplayMode("fullscreen") ||
    window.navigator.standalone === true
  );
}

function hasInstalledMarker() {
  try {
    return localStorage.getItem(INSTALL_STATE_KEY) === "1";
  } catch {
    return false;
  }
}

function markInstalled() {
  try {
    localStorage.setItem(INSTALL_STATE_KEY, "1");
  } catch {}
}

export function getPwaInstallDiagnostics(doc = document) {
  const installBanner = doc.getElementById("installBanner");
  const installBtn = doc.getElementById("installBtn");
  const debug = window.__hestiaPwaDebug || {};
  const prompt = window.__hestiaInstallPrompt;
  const params = new URLSearchParams(window.location.search);

  return {
    href: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer || "",
    installedContext: isInstalledAppContext(),
    installMarker: hasInstalledMarker(),
    standalone: hasDisplayMode("standalone"),
    overlay: hasWindowControlsOverlay(),
    minimalUi: hasDisplayMode("minimal-ui"),
    fullscreen: hasDisplayMode("fullscreen"),
    windowControlsOverlayMode: hasDisplayMode("window-controls-overlay"),
    navigatorStandalone: window.navigator.standalone === true,
    sourceParam: params.get("source") || "",
    promptReady: Boolean(prompt && typeof prompt.prompt === "function"),
    bannerHidden: installBanner?.hidden ?? null,
    buttonDisabled: installBtn?.disabled ?? null,
    lastEvent: debug.lastEvent || "",
    beforeInstallPromptCount: Number(debug.beforeInstallPromptCount || 0),
    appInstalledCount: Number(debug.appInstalledCount || 0),
    lastInstalledLikeContext: Boolean(debug.lastInstalledLikeContext)
  };
}

export function initPwaInstallBanner(doc) {
  const installBanner = doc.getElementById("installBanner");
  const installBtn = doc.getElementById("installBtn");
  if (!installBanner || !installBtn) {
    return;
  }

  let deferredInstallPrompt = window.__hestiaInstallPrompt || null;

  function hasUsablePrompt() {
    return !!deferredInstallPrompt && typeof deferredInstallPrompt.prompt === "function";
  }

  function clearDeferredPrompt() {
    window.__hestiaInstallPrompt = null;
    deferredInstallPrompt = null;
  }

  function hideInstallBanner() {
    installBanner.hidden = true;
    installBanner.setAttribute("aria-hidden", "true");
  }

  function showInstallBanner() {
    installBanner.hidden = false;
    installBanner.setAttribute("aria-hidden", "false");
  }

  function syncInstallBanner() {
    const installed = isInstalledAppContext() || hasInstalledMarker();
    if (installed) {
      markInstalled();
      clearDeferredPrompt();
      installBtn.disabled = true;
      hideInstallBanner();
      return;
    }

    if (!hasUsablePrompt()) {
      clearDeferredPrompt();
    }

    installBtn.disabled = !hasUsablePrompt();

    if (hasUsablePrompt()) {
      showInstallBanner();
      return;
    }

    hideInstallBanner();
  }

  window.addEventListener("hestia:installprompt-ready", () => {
    if (isInstalledAppContext() || hasInstalledMarker()) {
      clearDeferredPrompt();
      syncInstallBanner();
      return;
    }
    deferredInstallPrompt = window.__hestiaInstallPrompt || null;
    syncInstallBanner();
  });

  installBtn.addEventListener("click", async () => {
    if (!hasUsablePrompt()) {
      clearDeferredPrompt();
      syncInstallBanner();
      return;
    }
    hideInstallBanner();
    deferredInstallPrompt.prompt();

    try {
      const choice = await deferredInstallPrompt.userChoice;
      if (choice?.outcome === "accepted") {
        markInstalled();
      }
    } catch {
      // Ignore user cancellation.
    }
    clearDeferredPrompt();
    syncInstallBanner();
  });

  window.addEventListener("appinstalled", () => {
    markInstalled();
    clearDeferredPrompt();
    syncInstallBanner();
  });

  window.addEventListener("hestia:appinstalled", () => {
    markInstalled();
    clearDeferredPrompt();
    syncInstallBanner();
  });

  window.addEventListener("pageshow", syncInstallBanner);
  window.addEventListener("focus", syncInstallBanner);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      syncInstallBanner();
    }
  });

  syncInstallBanner();
}
