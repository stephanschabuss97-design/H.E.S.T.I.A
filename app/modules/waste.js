const WASTE_DATA_URL = "./assets/data/waste-calendar.axams.json";
const DAY_MS = 24 * 60 * 60 * 1000;
const SOON_DATA_WINDOW_DAYS = 30;
const LONG_TICKER_LABEL_LIMIT = 34;
const WEEKDAY_LABELS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const RECYCLING_HOF_WINDOWS = [
  { weekday: 1, start: "13:00", end: "18:00" },
  { weekday: 3, start: "08:00", end: "12:00" },
  { weekday: 3, start: "13:00", end: "17:00" },
  { weekday: 6, start: "07:00", end: "12:00" }
];

function getElement(doc, id) {
  return doc.getElementById(id);
}

export function parseLocalDateParts(isoDate) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return { year, month, day, date };
}

export function toLocalDayStart(value = new Date()) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

export function getDayDifference(isoDate, today = new Date()) {
  const parsed = parseLocalDateParts(isoDate);
  if (!parsed) {
    return null;
  }

  return Math.round((parsed.date.getTime() - toLocalDayStart(today).getTime()) / DAY_MS);
}

function formatAbsoluteDate(isoDate) {
  const parsed = parseLocalDateParts(isoDate);
  if (!parsed) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("de-AT", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  }).format(parsed.date);
}

function formatFullDate(isoDate) {
  const parsed = parseLocalDateParts(isoDate);
  if (!parsed) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("de-AT", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(parsed.date);
}

export function formatDateDetail(isoDate, today = new Date()) {
  const fullDate = formatFullDate(isoDate);
  const diff = getDayDifference(isoDate, today);
  if (diff !== null && diff >= 0 && diff < 7) {
    return `${fullDate} · ${formatRelativeDate(isoDate, today)}`;
  }

  return fullDate;
}

function parseTimeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getMinutesOfDay(date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function formatRelativeDate(isoDate, today = new Date()) {
  const diff = getDayDifference(isoDate, today);
  if (diff === null) {
    return isoDate;
  }

  if (diff === 0) {
    return "Heute";
  }

  if (diff === 1) {
    return "Morgen";
  }

  if (diff > 1 && diff < 7) {
    return `In ${diff} Tagen`;
  }

  return formatAbsoluteDate(isoDate);
}

function joinLabels(labels) {
  if (labels.length <= 1) {
    return labels[0] || "";
  }

  if (labels.length === 2) {
    return `${labels[0]} und ${labels[1]}`;
  }

  return `${labels.slice(0, -1).join(", ")} und ${labels[labels.length - 1]}`;
}

function assertWasteData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Waste data is not an object.");
  }

  if (data.schemaVersion !== 1 || !Array.isArray(data.collections)) {
    throw new Error("Waste data has an unsupported structure.");
  }

  data.collections.forEach((collection) => {
    if (!collection?.id || !collection?.label || !Array.isArray(collection.dates)) {
      throw new Error("Waste collection is incomplete.");
    }

    collection.dates.forEach((entry) => {
      if (!entry?.date || !parseLocalDateParts(entry.date)) {
        throw new Error("Waste date is invalid.");
      }
    });
  });
}

export function getNextCollectionEntries(collections, today = new Date()) {
  return collections.map((collection) => {
    const nextDate = collection.dates.find((entry) => {
      const diff = getDayDifference(entry.date, today);
      return diff !== null && diff >= 0;
    });

    return {
      collection,
      nextDate: nextDate || null
    };
  });
}

export function getNextOverallEntries(collections, today = new Date()) {
  const nextEntries = getNextCollectionEntries(collections, today).filter((entry) => entry.nextDate);
  if (nextEntries.length === 0) {
    return [];
  }

  const firstDate = nextEntries.reduce((earliest, entry) => {
    return entry.nextDate.date < earliest ? entry.nextDate.date : earliest;
  }, nextEntries[0].nextDate.date);

  return nextEntries.filter((entry) => entry.nextDate.date === firstDate);
}

export function buildTickerText(collections, today = new Date()) {
  const nextEntries = getNextOverallEntries(collections, today);
  if (nextEntries.length === 0) {
    return "Keine kommenden Termine";
  }

  const date = nextEntries[0].nextDate.date;
  const relativeDate = formatRelativeDate(date, today);
  if (nextEntries.length > 1) {
    const labels = nextEntries.map((entry) => entry.collection.label);
    const joined = joinLabels(labels);
    if (joined.length > LONG_TICKER_LABEL_LIMIT) {
      return `${relativeDate} ${nextEntries.length} Termine`;
    }

    return `${relativeDate} ${joined}`;
  }

  return `${relativeDate} ${nextEntries[0].collection.label}`;
}

export function getRecyclinghofStatus(now = new Date()) {
  const currentWeekday = now.getDay();
  const currentMinutes = getMinutesOfDay(now);
  const todayWindows = RECYCLING_HOF_WINDOWS.filter((window) => window.weekday === currentWeekday);
  const openWindow = todayWindows.find((window) => {
    const start = parseTimeToMinutes(window.start);
    const end = parseTimeToMinutes(window.end);
    return currentMinutes >= start && currentMinutes < end;
  });

  if (openWindow) {
    return {
      isOpen: true,
      statusText: `Recyclinghof offen bis ${openWindow.end}`,
      nextOpeningText: "",
      currentWindow: openWindow,
      nextOpening: null
    };
  }

  for (let dayOffset = 0; dayOffset <= 7; dayOffset += 1) {
    const weekday = (currentWeekday + dayOffset) % 7;
    const windows = RECYCLING_HOF_WINDOWS
      .filter((window) => window.weekday === weekday)
      .sort((a, b) => parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start));
    const nextWindow = windows.find((window) => {
      return dayOffset > 0 || parseTimeToMinutes(window.start) > currentMinutes;
    });

    if (nextWindow) {
      const dayLabel = dayOffset === 0 ? "heute" : WEEKDAY_LABELS[weekday];
      return {
        isOpen: false,
        statusText: "Recyclinghof geschlossen",
        nextOpeningText: `Öffnet ${dayLabel} um ${nextWindow.start}`,
        currentWindow: null,
        nextOpening: {
          weekday,
          dayOffset,
          ...nextWindow
        }
      };
    }
  }

  return {
    isOpen: false,
    statusText: "Recyclinghof geschlossen",
    nextOpeningText: "Nächste Öffnung gerade nicht verfügbar",
    currentWindow: null,
    nextOpening: null
  };
}

function getLatestDate(collections) {
  const dates = collections.flatMap((collection) => collection.dates.map((entry) => entry.date));
  if (dates.length === 0) {
    return null;
  }

  return dates.reduce((latest, date) => (date > latest ? date : latest), dates[0]);
}

function createMutedParagraph(doc, text) {
  const paragraph = doc.createElement("p");
  paragraph.className = "waste-empty-note";
  paragraph.textContent = text;
  return paragraph;
}

function renderLoadError(elements, message = "Termine gerade nicht verfügbar.") {
  elements.homeTicker.textContent = "Termine gerade nicht verfügbar";
  elements.statusNote.textContent = message;
  elements.summary.textContent = "";
  elements.summary.appendChild(createMutedParagraph(elements.doc, "Keine lokalen Entsorgungsdaten geladen."));
  elements.collectionList.textContent = "";
  elements.collectionList.appendChild(createMutedParagraph(elements.doc, "Noch keine Termine geladen."));
}

function renderRecyclinghof(elements, now = new Date()) {
  if (!elements.recyclingStatus || !elements.recyclingDetails) {
    return;
  }

  const status = getRecyclinghofStatus(now);
  elements.recyclingStatus.textContent = status.statusText;
  elements.recyclingStatus.dataset.status = status.isOpen ? "open" : "closed";
  elements.recyclingDetails.textContent = "";

  if (status.nextOpeningText) {
    elements.recyclingDetails.appendChild(createMutedParagraph(elements.doc, status.nextOpeningText));
  }

  const hours = elements.doc.createElement("ul");
  hours.className = "waste-recycling-window-list";
  [
    "Mo 13:00-18:00",
    "Mi 08:00-12:00, 13:00-17:00",
    "Sa 07:00-12:00"
  ].forEach((entry) => {
    const item = elements.doc.createElement("li");
    item.textContent = entry;
    hours.appendChild(item);
  });

  elements.recyclingDetails.append(hours);
}

function renderSummary(elements, data, today) {
  const nextEntries = getNextOverallEntries(data.collections, today);
  elements.summary.textContent = "";

  if (nextEntries.length === 0) {
    elements.summary.appendChild(createMutedParagraph(elements.doc, "Keine kommenden Termine im lokalen Kalender."));
    return;
  }

  const date = nextEntries[0].nextDate.date;
  const labels = joinLabels(nextEntries.map((entry) => entry.collection.label));
  const title = elements.doc.createElement("p");
  title.className = "waste-next-title";
  title.textContent = `${formatRelativeDate(date, today)} ${labels}`;

  const detail = elements.doc.createElement("p");
  detail.className = "waste-empty-note";
  detail.textContent = `${formatFullDate(date)} · ${nextEntries.map((entry) => entry.collection.hint).filter(Boolean)[0] || "Abholtermin"}`;

  elements.summary.append(title, detail);
}

function renderCollections(elements, data, today) {
  const entries = getNextCollectionEntries(data.collections, today);
  elements.collectionList.textContent = "";

  if (entries.length === 0) {
    elements.collectionList.appendChild(createMutedParagraph(elements.doc, "Keine Abholtermine im lokalen Kalender."));
    return;
  }

  entries.forEach(({ collection, nextDate }) => {
    const item = elements.doc.createElement("article");
    item.className = "waste-collection-item";

    const title = elements.doc.createElement("h4");
    title.textContent = collection.label;

    const date = elements.doc.createElement("p");
    date.className = "waste-date-line";
    if (nextDate) {
      date.textContent = formatDateDetail(nextDate.date, today);
    } else {
      date.textContent = "Keine kommenden Termine im lokalen Kalender.";
    }

    const hint = elements.doc.createElement("p");
    hint.className = "waste-empty-note";
    hint.textContent = collection.hint || "Abholtermin";

    item.append(title, date, hint);
    elements.collectionList.appendChild(item);
  });
}

function renderDataWarning(elements, data, today) {
  if (getNextOverallEntries(data.collections, today).length === 0) {
    elements.statusNote.textContent = "Keine kommenden Termine im lokalen Kalender.";
    return;
  }

  const latestDate = getLatestDate(data.collections);
  if (!latestDate) {
    elements.statusNote.textContent = "Keine kommenden Termine im lokalen Kalender.";
    return;
  }

  const latestDiff = getDayDifference(latestDate, today);
  if (latestDiff !== null && latestDiff < SOON_DATA_WINDOW_DAYS) {
    elements.statusNote.textContent = `Daten reichen nur bis ${formatAbsoluteDate(latestDate)}.`;
    return;
  }

  elements.statusNote.textContent = "Lokale Entsorgungsdaten geladen.";
}

function renderWasteData(elements, data, today = new Date()) {
  const tickerText = buildTickerText(data.collections, today);
  elements.homeTicker.textContent = tickerText;
  renderDataWarning(elements, data, today);
  renderSummary(elements, data, today);
  renderCollections(elements, data, today);
}

async function loadWasteData() {
  const response = await fetch(WASTE_DATA_URL);
  if (!response.ok) {
    throw new Error(`Waste data failed with HTTP ${response.status}.`);
  }

  const data = await response.json();
  assertWasteData(data);
  return data;
}

export function initWaste(doc, touchlog) {
  const elements = {
    doc,
    homeTicker: getElement(doc, "home-waste-ticker"),
    statusNote: getElement(doc, "waste-status-note"),
    summary: getElement(doc, "waste-next-summary"),
    collectionList: getElement(doc, "waste-collection-list"),
    recyclingStatus: getElement(doc, "waste-recycling-status"),
    recyclingDetails: getElement(doc, "waste-recycling-details")
  };

  if (!elements.homeTicker || !elements.statusNote || !elements.summary || !elements.collectionList) {
    return;
  }

  renderRecyclinghof(elements);

  loadWasteData()
    .then((data) => {
      renderWasteData(elements, data);
      touchlog?.add(`[waste] calendar loaded collections=${data.collections.length}`, {
        eventId: "waste-calendar-loaded"
      });
    })
    .catch((error) => {
      renderLoadError(elements);
      touchlog?.add(`[waste] calendar load failed ${error.message || "unknown"}`, {
        severity: "warn",
        eventId: "waste-calendar-load-failed"
      });
    });
}
