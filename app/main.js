import { createState } from "./core/state.js";
import { initRouter } from "./core/router.js";
import { initPwaInstallBanner } from "./core/pwa-install.js";
import { bindSemanticsAutocomplete, initSemantics } from "./core/semantics.js";
import { initWriting } from "./modules/writing.js";
import { initShopping } from "./modules/shopping.js";
import { initHomeScene } from "./modules/home-scene.js";
import { initAmbientTouch } from "./diagnostics/ambient-touch.js";
import { initFontPresets } from "./diagnostics/font-presets.js";
import { initArtStylePresets } from "./diagnostics/art-style-presets.js";

const state = createState();
const semanticsList = document.getElementById("semantics-list");
const itemNameInput = document.getElementById("item-name");

initSemantics(semanticsList).then(() => {
  bindSemanticsAutocomplete(itemNameInput, semanticsList);
});
initPwaInstallBanner(document);
initRouter(document);
initWriting(document, state);
initShopping(document, state);
initArtStylePresets(document);
initHomeScene(document);
initAmbientTouch(document);
initFontPresets(document);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
