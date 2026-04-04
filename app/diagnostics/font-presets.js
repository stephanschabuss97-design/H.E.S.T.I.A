const STORAGE_KEY = "hestia.font-set";
const DEFAULT_SET = "b";
const ALLOWED_SETS = new Set(["a", "b", "c", "d", "e", "f", "g"]);

export function initFontPresets(doc) {
  const root = doc.documentElement;
  const options = Array.from(doc.querySelectorAll(".font-option[data-font-set]"));
  if (options.length === 0) {
    return;
  }

  function emit(setName) {
    const next = ALLOWED_SETS.has(setName) ? setName : DEFAULT_SET;
    doc.dispatchEvent(
      new CustomEvent("hestia:display-mode-state", {
        detail: {
          id: "font-set",
          label: `Schriftstil ${String(next || "").toUpperCase()}`,
          active: next !== DEFAULT_SET
        }
      })
    );
  }

  function apply(setName) {
    const next = ALLOWED_SETS.has(setName) ? setName : DEFAULT_SET;
    root.setAttribute("data-font-set", next);
    try {
      if (next === DEFAULT_SET) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {}
    options.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.fontSet === next);
    });
    emit(next);
  }

  const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_SET;
  apply(saved);

  options.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.fontSet));
  });

  doc.addEventListener("hestia:dev-reset-state", () => {
    apply(DEFAULT_SET);
  });
}
