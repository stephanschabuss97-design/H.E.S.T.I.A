const STORAGE_KEY = "hestia_touchlog_snapshot";
const MAX_LINES = 80;
const DEDUPE_WINDOW_MS = 4000;

function timestampLabel() {
  return new Date().toLocaleTimeString("de-AT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function formatLine(message, severity) {
  const prefix = severity && severity !== "info" ? `[${severity.toUpperCase()}] ` : "";
  return `[${timestampLabel()}] ${prefix}${message}`;
}

function loadSnapshot() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistSnapshot(lines) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {}
}

export function createTouchlog(doc) {
  const panel = doc.getElementById("touchlog-panel");
  const logEl = doc.getElementById("touchlog-log");
  const activeModesEl = doc.getElementById("touchlog-active-modes");
  const displayModesEl = doc.getElementById("display-active-modes");
  const toggleButton =
    doc.getElementById("utility-panel-toggle") ||
    doc.getElementById("dev-panel-toggle") ||
    doc.getElementById("touchlog-toggle");
  const closeButton = doc.getElementById("touchlog-close");
  const clearButton = doc.getElementById("touchlog-clear");

  const entries = loadSnapshot().map((line) => ({
    line: String(line?.line || ""),
    eventId: String(line?.eventId || line?.line || ""),
    ts: Number(line?.ts) || 0,
    count: Number(line?.count) || 1
  }));

  let isOpen = false;
  const activeModes = new Map();
  const displayModes = new Map();

  function renderLine(entry) {
    return entry.count > 1 ? `${entry.line} (x${entry.count})` : entry.line;
  }

  function render() {
    if (!logEl) {
      return;
    }
    logEl.textContent = entries.map(renderLine).join("\n");
  }

  function renderActiveModes() {
    if (!activeModesEl) {
      return;
    }

    activeModesEl.textContent = "";
    const items = Array.from(activeModes.values()).filter(Boolean);
    if (items.length === 0) {
      const emptyItem = doc.createElement("li");
      emptyItem.className = "dev-mode-empty";
      emptyItem.textContent = "Keine aktiven Sonderzustande.";
      activeModesEl.append(emptyItem);
      return;
    }

    items.forEach((mode) => {
      const item = doc.createElement("li");
      item.className = "dev-mode-pill";
      item.textContent = String(mode);
      activeModesEl.append(item);
    });
  }

  function renderDisplayModes() {
    if (!displayModesEl) {
      return;
    }

    displayModesEl.textContent = "";
    const items = Array.from(displayModes.values()).filter(Boolean);
    if (items.length === 0) {
      const emptyItem = doc.createElement("li");
      emptyItem.className = "dev-mode-empty";
      emptyItem.textContent = "Standardstil aktiv.";
      displayModesEl.append(emptyItem);
      return;
    }

    items.forEach((mode) => {
      const item = doc.createElement("li");
      item.className = "dev-mode-pill";
      item.textContent = String(mode);
      displayModesEl.append(item);
    });
  }

  function syncStorage() {
    persistSnapshot(
      entries.map((entry) => ({
        line: entry.line,
        eventId: entry.eventId,
        ts: entry.ts,
        count: entry.count
      }))
    );
  }

  function add(message, opts = {}) {
    const severity = opts.severity || "info";
    const eventId = String(opts.eventId || `${severity}|${message}`);
    const now = Date.now();

    const existing = entries.find((entry) => entry.eventId === eventId && now - entry.ts <= DEDUPE_WINDOW_MS);
    if (existing) {
      existing.count += 1;
      existing.ts = now;
      render();
      syncStorage();
      return;
    }

    entries.unshift({
      line: formatLine(String(message || ""), severity),
      eventId,
      ts: now,
      count: 1
    });

    if (entries.length > MAX_LINES) {
      entries.length = MAX_LINES;
    }

    render();
    syncStorage();
  }

  function clear(opts = {}) {
    entries.length = 0;
    render();
    syncStorage();

    if (opts.announce !== false) {
      add("[dev] touchlog cleared", {
        eventId: "dev-touchlog-cleared"
      });
    }
  }

  function show() {
    if (!panel) {
      return;
    }
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    toggleButton?.setAttribute("aria-expanded", "true");
    isOpen = true;
  }

  function hide() {
    if (!panel) {
      return;
    }
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");
    toggleButton?.setAttribute("aria-expanded", "false");
    isOpen = false;
  }

  function toggle() {
    if (isOpen) {
      hide();
      return;
    }
    show();
  }

  toggleButton?.addEventListener("click", toggle);
  closeButton?.addEventListener("click", hide);
  clearButton?.addEventListener("click", () => clear());
  doc.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "d" && event.shiftKey) {
      toggle();
    }
  });

  doc.addEventListener("hestia:dev-mode-state", (event) => {
    const detail = event.detail || {};
    const id = String(detail.id || "");
    if (!id) {
      return;
    }

    if (detail.active === false) {
      activeModes.delete(id);
    } else {
      activeModes.set(id, String(detail.label || id));
    }

    renderActiveModes();
  });

  doc.addEventListener("hestia:display-mode-state", (event) => {
    const detail = event.detail || {};
    const id = String(detail.id || "");
    if (!id) {
      return;
    }

    if (detail.active === false) {
      displayModes.delete(id);
    } else {
      displayModes.set(id, String(detail.label || id));
    }

    renderDisplayModes();
  });

  render();
  renderActiveModes();
  renderDisplayModes();

  return {
    add,
    clear,
    show,
    hide,
    toggle
  };
}
