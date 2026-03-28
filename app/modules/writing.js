import { inferUnit } from "../core/semantics.js";

export function initWriting(doc, store) {
  const listElement = doc.getElementById("writing-list");
  const form = doc.getElementById("item-form");
  const clearButton = doc.getElementById("clear-list");
  const nameInput = doc.getElementById("item-name");
  const qtyInput = doc.getElementById("item-qty");
  const unitInput = doc.getElementById("item-unit");

  function render() {
    if (store.state.items.length === 0) {
      listElement.innerHTML = "<li class=\"item-row muted\">Noch keine Einträge.</li>";
      return;
    }

    listElement.innerHTML = "";
    store.state.items.forEach((item) => {
      const row = doc.createElement("li");
      row.className = "item-row";
      row.innerHTML = `
        <span class="item-main">${item.name}</span>
        <span class="item-meta">${item.quantity} ${item.unit}</span>
        <button class="inline-link destructive" type="button" data-remove="${item.id}">Löschen</button>
      `;
      listElement.appendChild(row);
    });

    listElement.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        store.removeItem(button.dataset.remove);
        render();
        doc.dispatchEvent(new CustomEvent("hestia:items-updated"));
      });
    });
  }

  nameInput.addEventListener("change", () => {
    if (!unitInput.value.trim()) {
      unitInput.value = inferUnit(nameInput.value);
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const quantity = Number(qtyInput.value);
    const unit = unitInput.value.trim() || inferUnit(name);
    if (!name || Number.isNaN(quantity) || quantity <= 0) {
      return;
    }
    store.upsertItem({
      id: crypto.randomUUID(),
      name,
      quantity,
      unit,
      inCart: false
    });
    form.reset();
    qtyInput.value = "1";
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated"));
  });

  clearButton.addEventListener("click", () => {
    store.clearAll();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated"));
  });

  render();
}
