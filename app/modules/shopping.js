export function initShopping(doc, store) {
  const listElement = doc.getElementById("shopping-list");
  const finishButton = doc.getElementById("finish-shopping");

  function render() {
    if (store.state.items.length === 0) {
      listElement.innerHTML = "<li class=\"item-row muted\">Alles erledigt.</li>";
      return;
    }

    listElement.innerHTML = "";
    store.state.items.forEach((item) => {
      const row = doc.createElement("li");
      row.className = "item-row";
      row.innerHTML = `
        <label class="check-wrap">
          <input type="checkbox" data-toggle="${item.id}" ${item.inCart ? "checked" : ""}>
          <span>${item.name}</span>
        </label>
        <span class="item-meta">${item.quantity} ${item.unit}</span>
      `;
      listElement.appendChild(row);
    });

    listElement.querySelectorAll("[data-toggle]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        store.toggleInCart(checkbox.dataset.toggle, checkbox.checked);
        doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
      });
    });
  }

  finishButton.addEventListener("click", () => {
    store.finishShopping();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
  });

  doc.addEventListener("hestia:items-updated", render);
  render();
}
