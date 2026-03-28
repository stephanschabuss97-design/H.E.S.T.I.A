const STORAGE_KEY = "hestia.font-set";
const DEFAULT_SET = "b";
const ALLOWED_SETS = new Set(["a", "b", "c", "d", "e", "f", "g"]);

export function initFontPresets(doc) {
  const root = doc.documentElement;
  const options = Array.from(doc.querySelectorAll(".font-option[data-font-set]"));
  if (options.length === 0) {
    return;
  }

  function apply(setName) {
    const next = ALLOWED_SETS.has(setName) ? setName : DEFAULT_SET;
    root.setAttribute("data-font-set", next);
    localStorage.setItem(STORAGE_KEY, next);
    options.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.fontSet === next);
    });
  }

  const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_SET;
  apply(saved);

  options.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.fontSet));
  });
}
