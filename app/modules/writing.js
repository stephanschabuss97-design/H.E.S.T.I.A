import { inferUnit } from "../core/semantics.js";

function formatTime(isoString) {
  return new Intl.DateTimeFormat("de-AT", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoString));
}

export function initWriting(doc, store, listSync) {
  const listElement = doc.getElementById("writing-list");
  const form = doc.getElementById("item-form");
  const clearButton = doc.getElementById("clear-list");
  const saveButton = doc.getElementById("save-list");
  const syncStatus = doc.getElementById("writing-sync-status");
  const nameInput = doc.getElementById("item-name");
  const qtyInput = doc.getElementById("item-qty");
  const unitInput = doc.getElementById("item-unit");

  let syncMode = listSync?.isConfigured() ? "idle" : "local-only";
  let lastSavedAt = "";
  let lastError = "";

  function hasItems() {
    return store.state.items.length > 0;
  }

  function markDirty() {
    if (!listSync?.isConfigured()) {
      syncMode = "local-only";
      return;
    }

    syncMode = hasItems() ? "dirty" : "idle";
    lastError = "";
  }

  function renderSyncState() {
    if (!syncStatus || !saveButton) {
      return;
    }

    saveButton.hidden = !listSync?.isConfigured() || !hasItems();
    saveButton.disabled = syncMode === "saving";

    if (!listSync?.isConfigured()) {
      syncStatus.textContent = "Nur lokal gespeichert.";
      syncStatus.dataset.syncState = "local-only";
      return;
    }

    if (syncMode === "saving") {
      syncStatus.textContent = "Speichere Liste ...";
      syncStatus.dataset.syncState = "saving";
      return;
    }

    if (syncMode === "error") {
      syncStatus.textContent = lastError || "Sync fehlgeschlagen.";
      syncStatus.dataset.syncState = "error";
      return;
    }

    if (syncMode === "saved" && lastSavedAt) {
      syncStatus.textContent = `Gespeichert um ${formatTime(lastSavedAt)}.`;
      syncStatus.dataset.syncState = "saved";
      return;
    }

    if (hasItems()) {
      syncStatus.textContent = "Nicht gespeichert.";
      syncStatus.dataset.syncState = "dirty";
      return;
    }

    syncStatus.textContent = "Sync bereit.";
    syncStatus.dataset.syncState = "idle";
  }

  function render() {
    if (store.state.items.length === 0) {
      listElement.innerHTML = "<li class=\"item-row muted\">Noch keine Eintraege.</li>";
      renderSyncState();
      return;
    }

    listElement.innerHTML = "";
    store.state.items.forEach((item) => {
      const row = doc.createElement("li");
      row.className = "item-row";
      row.innerHTML = `
        <span class="item-main">${item.name}</span>
        <span class="item-meta">${item.quantity} ${item.unit}</span>
        <button class="inline-link destructive" type="button" data-remove="${item.id}">Loeschen</button>
      `;
      listElement.appendChild(row);
    });

    listElement.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        store.removeItem(button.dataset.remove);
        markDirty();
        render();
        doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
      });
    });

    renderSyncState();
  }

  doc.addEventListener("hestia:items-updated", (event) => {
    if (event.detail?.source === "remote") {
      syncMode = hasItems() ? "saved" : "idle";
      lastSavedAt = event.detail?.syncedAt || new Date().toISOString();
      lastError = "";
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
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
  });

  clearButton.addEventListener("click", () => {
    store.clearAll();
    markDirty();
    render();
    doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
  });

  saveButton?.addEventListener("click", async () => {
    syncMode = "saving";
    lastError = "";
    renderSyncState();

    const result = await listSync.saveSnapshot(store.state.items);
    if (!result.ok) {
      syncMode = "error";
      lastError = result.message || "Sync fehlgeschlagen.";
      renderSyncState();
      return;
    }

    syncMode = hasItems() ? "saved" : "idle";
    lastSavedAt = result.savedAt || "";
    lastError = "";
    renderSyncState();
  });

  render();
}
