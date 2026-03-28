(function registerInstallPromptBootstrap(global) {
  if (!global || global.__hestiaInstallPromptBootstrapAttached) {
    return;
  }

  global.__hestiaInstallPromptBootstrapAttached = true;
  global.__hestiaInstallPrompt = null;

  function hasDisplayMode(mode) {
    try {
      return global.matchMedia(`(display-mode: ${mode})`).matches;
    } catch {
      return false;
    }
  }

  function hasWindowControlsOverlay() {
    try {
      return global.navigator.windowControlsOverlay?.visible === true;
    } catch {
      return false;
    }
  }

  function isInstalledLikeContext() {
    try {
      const params = new URLSearchParams(global.location.search);
      if (params.get("source") === "pwa") {
        return true;
      }
    } catch {}

    try {
      if (global.document.referrer.startsWith("android-app://")) {
        return true;
      }
    } catch {}

    return (
      hasWindowControlsOverlay() ||
      hasDisplayMode("standalone") ||
      hasDisplayMode("window-controls-overlay") ||
      hasDisplayMode("minimal-ui") ||
      hasDisplayMode("fullscreen") ||
      global.navigator.standalone === true
    );
  }

  function clearPrompt() {
    global.__hestiaInstallPrompt = null;
  }

  if (isInstalledLikeContext()) {
    clearPrompt();
  }

  global.addEventListener("beforeinstallprompt", (event) => {
    if (isInstalledLikeContext()) {
      clearPrompt();
      return;
    }

    event.preventDefault();
    global.__hestiaInstallPrompt = event;
    global.dispatchEvent(new CustomEvent("hestia:installprompt-ready"));
  });

  global.addEventListener("appinstalled", () => {
    clearPrompt();
    global.dispatchEvent(new CustomEvent("hestia:appinstalled"));
  });
})(window);
