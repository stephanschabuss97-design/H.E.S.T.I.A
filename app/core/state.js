const STORAGE_KEY = "hestia.v1.items";

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function normalizeItem(rawItem) {
  return {
    id: String(rawItem?.id || crypto.randomUUID()),
    name: String(rawItem?.name || "").trim(),
    quantity: Number(rawItem?.quantity) || 1,
    unit: String(rawItem?.unit || "Stk").trim() || "Stk",
    inCart: Boolean(rawItem?.inCart)
  };
}

export function createState() {
  const state = {
    items: loadItems().map(normalizeItem)
  };

  function setItems(nextItems) {
    state.items = Array.isArray(nextItems) ? nextItems.map(normalizeItem) : [];
    saveItems(state.items);
  }

  function upsertItem(nextItem) {
    setItems([...state.items, nextItem]);
  }

  function removeItem(id) {
    setItems(state.items.filter((item) => item.id !== id));
  }

  function toggleInCart(id, inCart) {
    setItems(
      state.items.map((item) => {
        if (item.id !== id) {
          return item;
        }
        return { ...item, inCart };
      })
    );
  }

  function clearAll() {
    setItems([]);
  }

  function finishShopping() {
    setItems(state.items.filter((item) => !item.inCart));
  }

  return {
    state,
    setItems,
    upsertItem,
    removeItem,
    toggleInCart,
    clearAll,
    finishShopping
  };
}
