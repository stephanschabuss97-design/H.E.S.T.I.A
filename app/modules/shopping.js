export function initShopping(doc, store, listSync, touchlog) {
  const listElement = doc.getElementById("shopping-list");
  const finishButton = doc.getElementById("finish-shopping");

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
        touchlog?.add(
          `[shopping] toggle cart id=${checkbox.dataset.toggle} checked=${checkbox.checked ? "yes" : "no"}`,
          { eventId: `shopping-toggle-${checkbox.dataset.toggle}-${checkbox.checked ? "yes" : "no"}` }
        );
        doc.dispatchEvent(new CustomEvent("hestia:items-updated", { detail: { source: "local" } }));
        persistSharedState("shopping-toggle").catch(() => {});
      });
    });
  }

  finishButton.addEventListener("click", () => {
    store.finishShopping();
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
