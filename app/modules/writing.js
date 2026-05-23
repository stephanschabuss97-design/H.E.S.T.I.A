import { inferUnit } from "../core/semantics.js";
import { formatItemMeta } from "../core/item-display.js";

const GROCERY_LIST_TYPE = "grocery";

function formatTime(isoString) {
  return new Intl.DateTimeFormat("de-AT", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoString));
}

export function initWriting(doc, store, listSync, touchlog) {
  const listElement = doc.getElementById("writing-list");
  const form = doc.getElementById("item-form");
  const clearButton = doc.getElementById("clear-list");
  const saveButton = doc.getElementById("save-list");
  const acceptRemoteButton = doc.getElementById("accept-remote-list");
  const finishButton = doc.getElementById("finish-writing-list");
  const syncStatus = doc.getElementById("writing-sync-status");
  const nameInput = doc.getElementById("item-name");
  const qtyInput = doc.getElementById("item-qty");
  const unitInput = doc.getElementById("item-unit");
  const formNote = doc.getElementById("item-form-note");

  let syncMode = listSync?.isConfigured() ? "idle" : "local-only";
  let lastSavedAt = "";
  let hasPendingRemote = false;

  function getGroceryItems() {
    return store.state.items.filter((item) => item.listType === GROCERY_LIST_TYPE);
  }

  function hasItems() {
    return getGroceryItems().length > 0;
  }

  function hasCartItems() {
    return getGroceryItems().some((item) => item.inCart);
  }

  function clearFormNote() {
    if (!formNote) {
      return;
    }

    formNote.textContent = "";
    formNote.hidden = true;
    nameInput.removeAttribute("aria-invalid");
    qtyInput.removeAttribute("aria-invalid");
  }

  function clearFieldNote(targetInput) {
    targetInput.removeAttribute("aria-invalid");
    if (nameInput.hasAttribute("aria-invalid") || qtyInput.hasAttribute("aria-invalid")) {
      return;
    }

    if (!formNote) {
      return;
    }

    formNote.textContent = "";
    formNote.hidden = true;
  }

  function showFormNote(message, targetInput = nameInput) {
    if (formNote) {
      formNote.textContent = message;
      formNote.hidden = false;
    }

    targetInput.setAttribute("aria-invalid", "true");
    targetInput.focus();
  }

  function markDirty() {
    if (!listSync?.isConfigured()) {
      syncMode = "local-only";
      return;
    }

    syncMode = hasPendingRemote ? "pending-remote" : hasItems() ? "dirty" : "idle";
  }

  function renderSyncState() {
    if (!syncStatus || !saveButton) {
      return;
    }

    const canRetrySharedSave =
      syncMode === "dirty" || syncMode === "error" || syncMode === "pending-remote";

    saveButton.hidden = !listSync?.isConfigured() || !hasItems() || !canRetrySharedSave;
    saveButton.disabled = syncMode === "saving";
    if (acceptRemoteButton) {
      acceptRemoteButton.hidden = !hasPendingRemote;
    }
    syncStatus.hidden = false;

    if (!listSync?.isConfigured()) {
      syncStatus.textContent = "Nur auf diesem Gerät.";
      syncStatus.dataset.syncState = "local-only";
      return;
    }

    if (syncMode === "saving") {
      syncStatus.textContent = "Gebe Liste frei ...";
      syncStatus.dataset.syncState = "saving";
      return;
    }

    if (syncMode === "error") {
      syncStatus.textContent = "Freigabe nicht möglich. Liste bleibt lokal.";
      syncStatus.dataset.syncState = "error";
      return;
    }

    if (hasPendingRemote) {
      syncStatus.textContent = "Anderer Listenstand verfügbar. Erst lokale Änderungen freigeben oder verwerfen.";
      syncStatus.dataset.syncState = "pending-remote";
      return;
    }

    if (syncMode === "saved" && lastSavedAt) {
      syncStatus.textContent = `Für den Haushalt freigegeben um ${formatTime(lastSavedAt)}.`;
      syncStatus.dataset.syncState = "saved";
      return;
    }

    if (hasItems()) {
      syncStatus.textContent = "Noch nicht für den Haushalt freigegeben.";
      syncStatus.dataset.syncState = "dirty";
      return;
    }

    syncStatus.textContent = "";
    syncStatus.dataset.syncState = "idle";
    syncStatus.hidden = true;
  }

  async function persistSharedState(reason) {
    if (!listSync?.isConfigured()) {
      renderSyncState();
      return { ok: true, savedAt: "" };
    }

    touchlog?.add(`[sync] save start reason=${reason} items=${store.state.items.length}`, {
      eventId: `sync-save-start-${reason}`
    });
    syncMode = "saving";
    renderSyncState();

    const result = await listSync.saveSnapshot(store.state.items);
    if (!result.ok) {
      touchlog?.add(`[sync] save failed reason=${reason} ${result.message || "unknown"}`, {
        severity: "warn",
        eventId: `sync-save-failed-${reason}`
      });
      syncMode = "error";
      renderSyncState();
      return result;
    }

    touchlog?.add(`[sync] save success reason=${reason} items=${store.state.items.length}`, {
      eventId: `sync-save-success-${reason}`
    });
    syncMode = hasItems() ? "saved" : "idle";
    lastSavedAt = result.savedAt || new Date().toISOString();
    renderSyncState();
    doc.dispatchEvent(
      new CustomEvent("hestia:items-updated", {
        detail: {
          source: "remote",
          syncedAt: lastSavedAt
        }
      })
    );
    return result;
  }

  function toggleCartItem(itemId, checked) {
    store.toggleInCart(itemId, checked);
    touchlog?.add(
      `[writing] toggle cart id=${itemId} checked=${checked ? "yes" : "no"}`,
      { eventId: `writing-toggle-${itemId}-${checked ? "yes" : "no"}` }
    );
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("writing-toggle").catch(() => {});
  }

  function updateFinishButtonState() {
    if (finishButton) {
      finishButton.disabled = !hasCartItems();
    }
  }

  function render() {
    updateFinishButtonState();

    const groceryItems = getGroceryItems();
    if (groceryItems.length === 0) {
      listElement.textContent = "";
      const emptyRow = doc.createElement("li");
      emptyRow.className = "item-row writing-paper-row muted";
      emptyRow.textContent = "Noch keine Eintraege.";
      listElement.appendChild(emptyRow);
      renderSyncState();
      return;
    }

    listElement.textContent = "";
    groceryItems.forEach((item) => {
      const row = doc.createElement("li");
      row.className = "item-row shopping-item-row writing-paper-row";
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

      const itemMain = doc.createElement("span");
      itemMain.className = "item-main";
      itemMain.textContent = item.name;

      checkWrap.append(checkbox, itemMain);
      itemAction.appendChild(checkWrap);

      const itemMetaText = formatItemMeta(item);
      if (itemMetaText) {
        const itemMeta = doc.createElement("span");
        itemMeta.className = "item-meta";
        itemMeta.textContent = itemMetaText;
        itemAction.appendChild(itemMeta);
      }

      const removeButton = doc.createElement("button");
      removeButton.className = "inline-link destructive writing-row-remove";
      removeButton.type = "button";
      removeButton.dataset.remove = item.id;
      removeButton.dataset.itemName = item.name;
      removeButton.setAttribute("aria-label", `${item.name} löschen`);
      removeButton.title = "Löschen";
      removeButton.innerHTML = `
        <svg class="writing-row-remove-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3 6h18"></path>
          <path d="M8 6V4h8v2"></path>
          <path d="M19 6l-1 14H6L5 6"></path>
          <path d="M10 11v5"></path>
          <path d="M14 11v5"></path>
        </svg>
      `;

      checkbox.addEventListener("change", () => {
        toggleCartItem(item.id, checkbox.checked);
      });

      row.appendChild(itemAction);
      row.appendChild(removeButton);
      listElement.appendChild(row);
    });

    listElement.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        store.removeItem(button.dataset.remove);
        touchlog?.add(`[writing] removed item ${button.dataset.itemName || button.dataset.remove}`, {
          eventId: `writing-remove-${button.dataset.remove}`
        });
        markDirty();
        render();
        doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
        persistSharedState("remove-item").catch(() => {});
      });
    });

    renderSyncState();
  }

  doc.addEventListener("hestia:items-updated", (event) => {
    if (event.detail?.source === "remote") {
      hasPendingRemote = false;
      syncMode = hasItems() ? "saved" : "idle";
      lastSavedAt = event.detail?.syncedAt || new Date().toISOString();
      touchlog?.add(`[writing] remote state visible items=${store.state.items.length}`, {
        eventId: "writing-remote-state-visible"
      });
    } else if (event.detail?.source === "pending-remote") {
      hasPendingRemote = true;
      syncMode = "pending-remote";
      touchlog?.add("[writing] remote state pending while local changes exist", {
        eventId: "writing-remote-state-pending"
      });
    } else if (event.detail?.source === "local") {
      markDirty();
    }

    render();
  });

  nameInput.addEventListener("change", () => {
    if (!unitInput.value.trim()) {
      unitInput.value = inferUnit(nameInput.value);
    }
  });

  nameInput.addEventListener("input", () => {
    clearFieldNote(nameInput);
  });
  qtyInput.addEventListener("input", () => {
    clearFieldNote(qtyInput);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const quantity = Number(qtyInput.value);
    const unit = unitInput.value.trim() || inferUnit(name);
    if (!name) {
      showFormNote("Bitte ein Produkt eintragen.", nameInput);
      return;
    }

    if (Number.isNaN(quantity) || quantity <= 0) {
      showFormNote("Bitte eine gültige Menge eintragen.", qtyInput);
      return;
    }

    store.upsertItem({
      id: crypto.randomUUID(),
      name,
      quantity,
      unit,
      inCart: false,
      listType: GROCERY_LIST_TYPE
    });
    touchlog?.add(`[writing] added item ${name} qty=${quantity} unit=${unit}`, {
      eventId: `writing-add-${name}-${quantity}-${unit}`
    });
    form.reset();
    qtyInput.value = "1";
    clearFormNote();
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("add-item").catch(() => {});
  });

  clearButton.addEventListener("click", () => {
    store.clearByType(GROCERY_LIST_TYPE);
    touchlog?.add("[writing] cleared list", { eventId: "writing-clear-list" });
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("clear-list").catch(() => {});
  });

  finishButton?.addEventListener("click", () => {
    if (!hasCartItems()) {
      return;
    }

    store.finishByType(GROCERY_LIST_TYPE);
    touchlog?.add("[writing] finished shopping run", {
      eventId: "writing-finish-run"
    });
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("writing-finish").catch(() => {});
  });

  saveButton?.addEventListener("click", async () => {
    await persistSharedState("manual-save");
  });

  acceptRemoteButton?.addEventListener("click", () => {
    doc.dispatchEvent(new CustomEvent("hestia:remote-apply-request"));
  });

  render();
}
