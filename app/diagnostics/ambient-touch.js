export function initAmbientTouch(doc) {
  const shell = doc.querySelector(".app-shell");
  const root = doc.body;
  if (!shell || !root) {
    return;
  }

  shell.addEventListener("pointerdown", () => {
    root.classList.add("touch-lift");
    window.setTimeout(() => root.classList.remove("touch-lift"), 420);
  });
}
