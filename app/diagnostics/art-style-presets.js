const STORAGE_KEY = "hestia.art-style";
const DEFAULT_STYLE = "a";
const ALLOWED_STYLES = new Set(["a", "b"]);

export function initArtStylePresets(doc) {
  const root = doc.documentElement;
  const options = Array.from(doc.querySelectorAll(".font-option[data-art-style]"));
  if (options.length === 0) {
    return;
  }

  function emit(styleName) {
    const next = ALLOWED_STYLES.has(styleName) ? styleName : DEFAULT_STYLE;
    doc.dispatchEvent(
      new CustomEvent("hestia:display-mode-state", {
        detail: {
          id: "art-style",
          label: `Artstil ${String(next || "").toUpperCase()}`,
          active: next !== DEFAULT_STYLE
        }
      })
    );
  }

  function apply(styleName) {
    const next = ALLOWED_STYLES.has(styleName) ? styleName : DEFAULT_STYLE;
    root.setAttribute("data-art-style", next);
    try {
      if (next === DEFAULT_STYLE) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {}
    options.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.artStyle === next);
    });
    emit(next);
  }

  const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_STYLE;
  apply(saved);

  options.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.artStyle));
  });

  doc.addEventListener("hestia:dev-reset-state", () => {
    apply(DEFAULT_STYLE);
  });
}
