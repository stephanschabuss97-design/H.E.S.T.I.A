const ACTIVE_CLASS = "is-active";

export function initRouter(doc) {
  const screens = Array.from(doc.querySelectorAll(".screen"));
  const navButtons = Array.from(doc.querySelectorAll("[data-nav]"));

  function goTo(screenName) {
    screens.forEach((screen) => {
      screen.classList.toggle(ACTIVE_CLASS, screen.dataset.screen === screenName);
    });
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.nav;
      if (!target) {
        return;
      }
      goTo(target);
    });
  });
}
