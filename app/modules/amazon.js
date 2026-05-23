import { formatItemMeta } from "../core/item-display.js";

const AMAZON_LIST_TYPE = "amazon";

function formatTime(isoString) {
  return new Intl.DateTimeFormat("de-AT", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoString));
}

export function initAmazon(doc, store, listSync, touchlog) {
  const form = doc.getElementById("amazon-item-form");
  const listElement = doc.getElementById("amazon-list");
  const clearButton = doc.getElementById("amazon-clear-list");
  const finishButton = doc.getElementById("finish-amazon-list");
  const saveButton = doc.getElementById("amazon-save-list");
  const acceptRemoteButton = doc.getElementById("amazon-accept-remote-list");
  const syncStatus = doc.getElementById("amazon-sync-status");
  const nameInput = doc.getElementById("amazon-item-name");
  const qtyInput = doc.getElementById("amazon-item-qty");
  const unitInput = doc.getElementById("amazon-item-unit");
  const formNote = doc.getElementById("amazon-item-form-note");

  let syncMode = listSync?.isConfigured() ? "idle" : "local-only";
  let lastSavedAt = "";
  let hasPendingRemote = false;

  function getAmazonItems() {
    return store.state.items.filter((item) => item.listType === AMAZON_LIST_TYPE);
  }

  function hasItems() {
    return getAmazonItems().length > 0;
  }

  function hasOrderedItems() {
    return getAmazonItems().some((item) => item.inCart);
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
      syncStatus.textContent =
        "Anderer Listenstand verfügbar. Erst lokale Änderungen freigeben oder verwerfen.";
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

  function toggleOrderedItem(itemId, checked) {
    store.toggleInCart(itemId, checked);
    touchlog?.add(
      `[amazon] toggle ordered id=${itemId} checked=${checked ? "yes" : "no"}`,
      { eventId: `amazon-toggle-${itemId}-${checked ? "yes" : "no"}` }
    );
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("amazon-toggle").catch(() => {});
  }

  function updateFinishButtonState() {
    if (finishButton) {
      finishButton.disabled = !hasOrderedItems();
    }
  }

  function render() {
    if (!listElement) {
      return;
    }

    updateFinishButtonState();

    const amazonItems = getAmazonItems();
    if (amazonItems.length === 0) {
      listElement.textContent = "";
      const emptyRow = doc.createElement("li");
      emptyRow.className = "item-row writing-paper-row muted";
      emptyRow.textContent = "Keine Amazon-Eintraege.";
      listElement.appendChild(emptyRow);
      renderSyncState();
      return;
    }

    listElement.textContent = "";
    amazonItems.forEach((item) => {
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
      checkbox.setAttribute("aria-label", `${item.name} Bestellt`);

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
        toggleOrderedItem(item.id, checkbox.checked);
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
        touchlog?.add(`[amazon] removed item ${button.dataset.itemName || button.dataset.remove}`, {
          eventId: `amazon-remove-${button.dataset.remove}`
        });
        markDirty();
        render();
        doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
        persistSharedState("amazon-remove-item").catch(() => {});
      });
    });

    renderSyncState();
  }

  doc.addEventListener("hestia:items-updated", (event) => {
    if (event.detail?.source === "remote") {
      hasPendingRemote = false;
      syncMode = hasItems() ? "saved" : "idle";
      lastSavedAt = event.detail?.syncedAt || new Date().toISOString();
    } else if (event.detail?.source === "pending-remote") {
      hasPendingRemote = true;
      syncMode = "pending-remote";
      touchlog?.add("[amazon] remote state pending while local changes exist", {
        eventId: "amazon-remote-state-pending"
      });
    } else if (event.detail?.source === "local") {
      markDirty();
    }

    render();
  });

  nameInput?.addEventListener("input", () => {
    clearFieldNote(nameInput);
  });
  qtyInput?.addEventListener("input", () => {
    clearFieldNote(qtyInput);
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const quantity = Number(qtyInput.value);
    const unit = unitInput.value.trim() || "Stk";

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
      listType: AMAZON_LIST_TYPE
    });
    touchlog?.add(`[amazon] added item ${name} qty=${quantity} unit=${unit}`, {
      eventId: `amazon-add-${name}-${quantity}-${unit}`
    });
    form.reset();
    qtyInput.value = "1";
    clearFormNote();
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("amazon-add-item").catch(() => {});
  });

  saveButton?.addEventListener("click", async () => {
    await persistSharedState("amazon-manual-save");
  });

  acceptRemoteButton?.addEventListener("click", () => {
    doc.dispatchEvent(new CustomEvent("hestia:remote-apply-request"));
  });

  clearButton?.addEventListener("click", () => {
    store.clearByType(AMAZON_LIST_TYPE);
    touchlog?.add("[amazon] cleared list", { eventId: "amazon-clear-list" });
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("amazon-clear-list").catch(() => {});
  });

  finishButton?.addEventListener("click", () => {
    if (!hasOrderedItems()) {
      return;
    }

    store.finishByType(AMAZON_LIST_TYPE);
    touchlog?.add("[amazon] removed ordered items", {
      eventId: "amazon-finish-run"
    });
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
    persistSharedState("amazon-finish").catch(() => {});
  });

  render();
}
