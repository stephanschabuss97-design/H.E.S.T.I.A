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

export function createState() {
  const state = {
    items: loadItems()
  };

  function upsertItem(nextItem) {
    state.items.push(nextItem);
    saveItems(state.items);
  }

  function removeItem(id) {
    state.items = state.items.filter((item) => item.id !== id);
    saveItems(state.items);
  }

  function toggleInCart(id, inCart) {
    state.items = state.items.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return { ...item, inCart };
    });
    saveItems(state.items);
  }

  function clearAll() {
    state.items = [];
    saveItems(state.items);
  }

  function finishShopping() {
    state.items = state.items.filter((item) => !item.inCart);
    saveItems(state.items);
  }

  return {
    state,
    upsertItem,
    removeItem,
    toggleInCart,
    clearAll,
    finishShopping
  };
}
