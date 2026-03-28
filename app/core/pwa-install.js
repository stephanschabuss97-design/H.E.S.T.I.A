const INSTALL_STATE_KEY = "hestia.pwa-installed";

function hasDisplayMode(mode) {
  try {
    return window.matchMedia(`(display-mode: ${mode})`).matches;
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
  const standalone = isInstalledAppContext();

  if (standalone) {
    markInstalled();
  }

  function showInstallBanner() {
    if (standalone || hasInstalledMarker()) {
      hideInstallBanner();
      return;
    }
    installBanner.hidden = false;
    installBanner.setAttribute("aria-hidden", "false");
  }

  function hideInstallBanner() {
    installBanner.hidden = true;
    installBanner.setAttribute("aria-hidden", "true");
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallBanner();
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
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
  });

  window.addEventListener("appinstalled", () => {
    markInstalled();
    deferredInstallPrompt = null;
    hideInstallBanner();
  });

  if (standalone || hasInstalledMarker()) {
    hideInstallBanner();
  }
}
