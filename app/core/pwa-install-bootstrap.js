(function registerInstallPromptBootstrap(global) {
  if (!global || global.__hestiaInstallPromptBootstrapAttached) {
    return;
  }

  global.__hestiaInstallPromptBootstrapAttached = true;
  global.__hestiaInstallPrompt = null;
  global.__hestiaPwaDebug = global.__hestiaPwaDebug || {
    bootstrapAttached: true,
    beforeInstallPromptCount: 0,
    appInstalledCount: 0,
    lastEvent: "bootstrap",
    lastInstalledLikeContext: false
  };

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

  global.__hestiaPwaDebug.bootstrapAttached = true;
  global.__hestiaPwaDebug.lastInstalledLikeContext = isInstalledLikeContext();

  global.addEventListener("beforeinstallprompt", (event) => {
    const installedLikeContext = isInstalledLikeContext();
    global.__hestiaPwaDebug.beforeInstallPromptCount += 1;
    global.__hestiaPwaDebug.lastEvent = "beforeinstallprompt";
    global.__hestiaPwaDebug.lastInstalledLikeContext = installedLikeContext;
    global.__hestiaPwaDebug.lastBeforeInstallPromptAt = Date.now();

    if (installedLikeContext) {
      clearPrompt();
      return;
    }

    event.preventDefault();
    global.__hestiaInstallPrompt = event;
    global.dispatchEvent(new CustomEvent("hestia:installprompt-ready"));
  });

  global.addEventListener("appinstalled", () => {
    global.__hestiaPwaDebug.appInstalledCount += 1;
    global.__hestiaPwaDebug.lastEvent = "appinstalled";
    global.__hestiaPwaDebug.lastAppInstalledAt = Date.now();
    clearPrompt();
    global.dispatchEvent(new CustomEvent("hestia:appinstalled"));
  });
})(window);
