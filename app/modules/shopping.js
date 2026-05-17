import { formatItemMeta } from "../core/item-display.js";

const GROCERY_LIST_TYPE = "grocery";

export function initShopping(doc, store, listSync, touchlog) {
  const listElement = doc.getElementById("shopping-list");
  const finishButton = doc.getElementById("finish-shopping");

  function getGroceryItems() {
    return store.state.items.filter((item) => item.listType === GROCERY_LIST_TYPE);
  }

  async function persistSharedState(reason) {
    if (!listSync?.isConfigured()) {
      return { ok: true };
    }

    touchlog?.add(`[sync] save start reason=${reason} items=${store.state.items.length}`, {
      eventId: `sync-save-start-${reason}`
    });

    const result = await listSync.saveSnapshot(store.state.items);
    if (!result.ok) {
      touchlog?.add(`[sync] save failed reason=${reason} ${result.message || "unknown"}`, {
        severity: "warn",
        eventId: `sync-save-failed-${reason}`
      });
      return result;
    }

    touchlog?.add(`[sync] save success reason=${reason} items=${store.state.items.length}`, {
      eventId: `sync-save-success-${reason}`
    });
    doc.dispatchEvent(
      new CustomEvent("hestia:items-updated", {
        detail: {
          source: "remote",
          syncedAt: result.savedAt || new Date().toISOString()
        }
      })
    );
    return result;
  }

  function toggleCartItem(itemId, checked) {
    store.toggleInCart(itemId, checked);
    touchlog?.add(
      `[shopping] toggle cart id=${itemId} checked=${checked ? "yes" : "no"}`,
      { eventId: `shopping-toggle-${itemId}-${checked ? "yes" : "no"}` }
    );
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("shopping-toggle").catch(() => {});
  }

  function hasCartItems() {
    return getGroceryItems().some((item) => item.inCart);
  }

  function updateFinishButtonState() {
    finishButton.disabled = !hasCartItems();
  }

  function createShoppingRow(item) {
    const row = doc.createElement("li");
    row.className = "item-row shopping-item-row";
    row.classList.toggle("is-in-cart", Boolean(item.inCart));

    const itemAction = doc.createElement("label");
    itemAction.className = "shopping-item-action";

    const checkWrap = doc.createElement("span");
    checkWrap.className = "check-wrap";

    const checkbox = doc.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(item.inCart);
    checkbox.dataset.toggle = item.id;
    checkbox.setAttribute("aria-label", `${item.name} Im Wagen`);

    const itemName = doc.createElement("span");
    itemName.className = "item-main";
    itemName.textContent = item.name;

    checkWrap.append(checkbox, itemName);
    itemAction.appendChild(checkWrap);

    const itemMetaText = formatItemMeta(item);
    if (itemMetaText) {
      const itemMeta = doc.createElement("span");
      itemMeta.className = "item-meta";
      itemMeta.textContent = itemMetaText;
      itemAction.appendChild(itemMeta);
    }
    row.appendChild(itemAction);

    checkbox.addEventListener("change", () => {
      toggleCartItem(item.id, checkbox.checked);
    });

    return row;
  }

  function render() {
    updateFinishButtonState();

    const groceryItems = getGroceryItems();
    if (groceryItems.length === 0) {
      listElement.textContent = "";
      const emptyRow = doc.createElement("li");
      emptyRow.className = "item-row muted";
      emptyRow.textContent = "Alles erledigt.";
      listElement.appendChild(emptyRow);
      return;
    }

    listElement.textContent = "";
    groceryItems.forEach((item) => {
      listElement.appendChild(createShoppingRow(item));
    });
  }

  finishButton.addEventListener("click", () => {
    if (!hasCartItems()) {
      return;
    }

    store.finishByType(GROCERY_LIST_TYPE);
    touchlog?.add("[shopping] finished shopping run", {
      eventId: "shopping-finish-run"
    });
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("shopping-finish").catch(() => {});
  });

  doc.addEventListener("hestia:items-updated", render);
  render();
}
