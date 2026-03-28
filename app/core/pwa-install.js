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

export function initPwaInstallBanner(doc) {
  const installBanner = doc.getElementById("installBanner");
  const installBtn = doc.getElementById("installBtn");
  if (!installBanner || !installBtn) {
    return;
  }

  let deferredInstallPrompt = null;

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
      deferredInstallPrompt = null;
      installBtn.disabled = true;
      hideInstallBanner();
      return;
    }

    installBtn.disabled = !deferredInstallPrompt;

    if (deferredInstallPrompt) {
      showInstallBanner();
      return;
    }

    hideInstallBanner();
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    if (isInstalledAppContext() || hasInstalledMarker()) {
      deferredInstallPrompt = null;
      syncInstallBanner();
      return;
    }
    deferredInstallPrompt = event;
    syncInstallBanner();
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
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
    deferredInstallPrompt = null;
    syncInstallBanner();
  });

  window.addEventListener("appinstalled", () => {
    markInstalled();
    deferredInstallPrompt = null;
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
