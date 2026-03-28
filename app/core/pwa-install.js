function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

export function initPwaInstallBanner(doc) {
  const installBanner = doc.getElementById("installBanner");
  const installBtn = doc.getElementById("installBtn");
  if (!installBanner || !installBtn) {
    return;
  }

  let deferredInstallPrompt = null;

  function showInstallBanner() {
    if (isStandaloneMode()) {
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
      await deferredInstallPrompt.userChoice;
    } catch {
      // Ignore user cancellation.
    }
    deferredInstallPrompt = null;
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    hideInstallBanner();
  });

  if (isStandaloneMode()) {
    hideInstallBanner();
  }
}
