import { createState } from "./core/state.js";
import { initRouter } from "./core/router.js";
import { initPwaInstallBanner } from "./core/pwa-install.js";
import { loadRuntimeConfig } from "./core/runtime-config.js";
import { bindSemanticsAutocomplete, initSemantics } from "./core/semantics.js";
import { initWriting } from "./modules/writing.js";
import { initShopping } from "./modules/shopping.js";
import { initHomeScene } from "./modules/home-scene.js";
import { initAmbientTouch } from "./diagnostics/ambient-touch.js";
import { initFontPresets } from "./diagnostics/font-presets.js";
import { initArtStylePresets } from "./diagnostics/art-style-presets.js";
import { createListSync } from "./supabase/list-sync.js";

function emitItemsUpdated(detail = {}) {
  document.dispatchEvent(new CustomEvent("hestia:items-updated", { detail }));
}

async function initApp() {
  await loadRuntimeConfig();

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
    }
  }

  initSemantics(semanticsList).then(() => {
    bindSemanticsAutocomplete(itemNameInput, semanticsList);
  });
  initPwaInstallBanner(document);
  initRouter(document);
  initWriting(document, state, listSync);
  initShopping(document, state);
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
    listSync.subscribeToSnapshots((remoteSnapshot) => {
      if (!remoteSnapshot?.ok) {
        return;
      }

      state.setItems(remoteSnapshot.items);
      emitItemsUpdated({
        source: "remote",
        syncedAt: remoteSnapshot.syncedAt
      });
    });
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

initApp();
