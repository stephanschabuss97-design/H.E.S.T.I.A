import { createState } from "./core/state.js";
import { initRouter } from "./core/router.js";
import { getPwaInstallDiagnostics, initPwaInstallBanner } from "./core/pwa-install.js";
import { getRuntimeConfigSummary, loadRuntimeConfig } from "./core/runtime-config.js";
import { createTouchlog } from "./core/touchlog.js";
import { bindSemanticsAutocomplete, initSemantics } from "./core/semantics.js";
import { initWriting } from "./modules/writing.js";
import { initShopping } from "./modules/shopping.js";
import { initHomeScene } from "./modules/home-scene.js";
import { initAmbientTouch } from "./diagnostics/ambient-touch.js";
import { initFontPresets } from "./diagnostics/font-presets.js";
import { initArtStylePresets } from "./diagnostics/art-style-presets.js";
import { initDevFlags } from "./diagnostics/dev-flags.js";
import { createListSync } from "./supabase/list-sync.js";

function emitItemsUpdated(detail = {}) {
  document.dispatchEvent(new CustomEvent("hestia:items-updated", { detail }));
}

let didReloadForNewController = false;

function formatPwaDiagnostics(diag) {
  return [
    `installed=${diag.installedContext}`,
    `marker=${diag.installMarker}`,
    `prompt=${diag.promptReady}`,
    `bannerHidden=${diag.bannerHidden}`,
    `btnDisabled=${diag.buttonDisabled}`,
    `standalone=${diag.standalone}`,
    `overlay=${diag.overlay}`,
    `overlayMode=${diag.windowControlsOverlayMode}`,
    `minimal=${diag.minimalUi}`,
    `fullscreen=${diag.fullscreen}`,
    `navStandalone=${diag.navigatorStandalone}`,
    `source=${diag.sourceParam || "-"}`,
    `path=${diag.pathname || "-"}`,
    `search=${diag.search || "-"}`,
    `href=${diag.href || "-"}`,
    `ref=${diag.referrer || "-"}`,
    `lastEvent=${diag.lastEvent || "-"}`,
    `bip=${diag.beforeInstallPromptCount}`,
    `installedEvents=${diag.appInstalledCount}`,
    `bootstrapInstalledLike=${diag.lastInstalledLikeContext}`
  ].join(" ");
}

async function initApp() {
  initPwaInstallBanner(document);

  const touchlog = createTouchlog(document);
  touchlog.add("[boot] init start", { eventId: "boot-init-start" });
  touchlog.add(`[pwa] diag ${formatPwaDiagnostics(getPwaInstallDiagnostics(document))}`, {
    eventId: "pwa-diag-init"
  });
  initDevFlags(document, touchlog);

  window.addEventListener("hestia:installprompt-ready", () => {
    touchlog.add(`[pwa] installprompt-ready ${formatPwaDiagnostics(getPwaInstallDiagnostics(document))}`, {
      eventId: "pwa-installprompt-ready"
    });
  });

  window.addEventListener("hestia:appinstalled", () => {
    touchlog.add(`[pwa] appinstalled ${formatPwaDiagnostics(getPwaInstallDiagnostics(document))}`, {
      eventId: "pwa-appinstalled"
    });
  });

  window.addEventListener("pageshow", () => {
    touchlog.add(`[pwa] pageshow ${formatPwaDiagnostics(getPwaInstallDiagnostics(document))}`, {
      eventId: "pwa-pageshow"
    });
  });

  await loadRuntimeConfig();
  touchlog.add("[boot] runtime-config loaded", { eventId: "boot-runtime-config-loaded" });
  const runtimeConfigSummary = getRuntimeConfigSummary();
  touchlog.add(
    `[sync] config host=${runtimeConfigSummary.host || "-"} keyType=${runtimeConfigSummary.keyType} keyPrefix=${runtimeConfigSummary.keyPrefix || "-"} householdPresent=${runtimeConfigSummary.householdKeyPresent} householdValid=${runtimeConfigSummary.householdKeyValid} householdLen=${runtimeConfigSummary.householdKeyLength} householdTail=${runtimeConfigSummary.householdKeyTail || "-"}`,
    { eventId: "sync-config-summary" }
  );

  const state = createState();
  const listSync = createListSync();
  let initialRemoteSnapshot = null;
  const semanticsList = document.getElementById("semantics-list");
  const itemNameInput = document.getElementById("item-name");

  if (listSync.isConfigured()) {
    const remoteSnapshot = await listSync.loadSnapshot();
    if (remoteSnapshot.ok) {
      state.setItems(remoteSnapshot.items);
      initialRemoteSnapshot = remoteSnapshot;
      touchlog.add(`[sync] remote snapshot loaded items=${remoteSnapshot.items.length}`, {
        eventId: "sync-remote-snapshot-loaded"
      });
    } else {
      touchlog.add(`[sync] remote snapshot failed ${remoteSnapshot.message || "unknown"}`, {
        severity: "warn",
        eventId: "sync-remote-snapshot-failed"
      });
    }
  } else {
    touchlog.add("[sync] supabase not configured, local mode active", {
      eventId: "sync-local-only"
    });
  }

  initSemantics(semanticsList).then(() => {
    bindSemanticsAutocomplete(itemNameInput, semanticsList);
  });
  initRouter(document);
  initWriting(document, state, listSync, touchlog);
  initShopping(document, state, listSync, touchlog);
  initArtStylePresets(document);
  initHomeScene(document);
  initAmbientTouch(document);
  initFontPresets(document);

  if (initialRemoteSnapshot?.ok) {
    emitItemsUpdated({
      source: "remote",
      syncedAt: initialRemoteSnapshot.syncedAt
    });
  }

  if (initialRemoteSnapshot?.ok) {
    const subscription = await listSync.subscribeToSnapshots((remoteSnapshot) => {
      if (!remoteSnapshot?.ok) {
        touchlog.add(`[sync] realtime refresh failed ${remoteSnapshot?.message || "unknown"}`, {
          severity: "warn",
          eventId: "sync-realtime-refresh-failed"
        });
        return;
      }

      state.setItems(remoteSnapshot.items);
      touchlog.add(`[sync] remote update applied items=${remoteSnapshot.items.length}`, {
        eventId: "sync-remote-update-applied"
      });
      emitItemsUpdated({
        source: "remote",
        syncedAt: remoteSnapshot.syncedAt
      });
    });

    if (subscription.ok) {
      touchlog.add("[sync] realtime subscribed", { eventId: "sync-realtime-subscribed" });
    } else {
      touchlog.add(`[sync] realtime subscribe failed ${subscription.message || "unknown"}`, {
        severity: "warn",
        eventId: "sync-realtime-subscribe-failed"
      });
    }
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (didReloadForNewController) {
        return;
      }

      didReloadForNewController = true;
      window.location.reload();
    });

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js")
        .then((registration) => {
          if (registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
          }

          registration.addEventListener("updatefound", () => {
            const nextWorker = registration.installing;
            if (!nextWorker) {
              return;
            }

            nextWorker.addEventListener("statechange", () => {
              if (nextWorker.state === "installed" && registration.waiting) {
                registration.waiting.postMessage({ type: "SKIP_WAITING" });
              }
            });
          });

          touchlog.add("[boot] service worker registered", {
            eventId: "boot-service-worker-registered"
          });
        })
        .catch(() => {
          touchlog.add("[boot] service worker registration failed", {
            severity: "warn",
            eventId: "boot-service-worker-registration-failed"
          });
        });
    });
  }

  touchlog.add("[boot] init done", { eventId: "boot-init-done" });
}

initApp();
