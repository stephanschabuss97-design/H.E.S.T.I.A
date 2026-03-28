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
  const toggleButton = doc.getElementById("dev-panel-toggle") || doc.getElementById("touchlog-toggle");
  const closeButton = doc.getElementById("touchlog-close");

  const entries = loadSnapshot().map((line) => ({
    line: String(line?.line || ""),
    eventId: String(line?.eventId || line?.line || ""),
    ts: Number(line?.ts) || 0,
    count: Number(line?.count) || 1
  }));

  let isOpen = false;

  function renderLine(entry) {
    return entry.count > 1 ? `${entry.line} (x${entry.count})` : entry.line;
  }

  function render() {
    if (!logEl) {
      return;
    }
    logEl.textContent = entries.map(renderLine).join("\n");
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

  function show() {
    if (!panel) {
      return;
    }
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    isOpen = true;
  }

  function hide() {
    if (!panel) {
      return;
    }
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");
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
  doc.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "d" && event.shiftKey) {
      toggle();
    }
  });

  render();

  return {
    add,
    show,
    hide,
    toggle
  };
}
