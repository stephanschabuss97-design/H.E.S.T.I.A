const FALLBACK_ENTRIES = [
  {
    id: "milk",
    label: "Milch",
    aliases: ["milch", "kuhmilch"],
    default_unit: "l",
    category: "dairy"
  },
  {
    id: "bread_rolls",
    label: "Broetchen",
    aliases: ["broetchen", "semmeln"],
    default_unit: "stk",
    category: "bakery"
  },
  {
    id: "mineral_water",
    label: "Mineralwasser",
    aliases: ["mineralwasser", "wasser"],
    default_unit: "l",
    category: "drinks"
  },
  {
    id: "dish_soap",
    label: "Spuelmittel",
    aliases: ["spuelmittel", "spueli"],
    default_unit: "pkg",
    category: "cleaning"
  }
];

const CATEGORY_SYNONYMS = {
  vegetables: ["gemüse", "gemüse sorten", "veggie"],
  fruit: ["obst", "früchte", "frucht"],
  dairy: ["käse", "milchprodukte", "milch"],
  dairy_alt: ["milchersatz", "pflanzenmilch"],
  bakery: ["backwaren", "brot", "gebaeck"],
  pantry: ["vorrat", "trockenwaren", "grundnahrung"],
  drinks: ["getränke", "saft", "tee"],
  cleaning: ["putzmittel", "reinigung", "haushalt"],
  spices: ["gewürze", "gewürz", "würzmittel"],
  meat: ["fleisch", "wurst"]
};

const UNIT_BY_TERM = new Map();
let ENTRIES = [];

function normalizeTerm(input) {
  return String(input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeEntry(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  const label = typeof raw.label === "string" ? raw.label.trim() : "";
  const defaultUnit = typeof raw.default_unit === "string" ? raw.default_unit.trim() : "";
  const aliasesRaw = Array.isArray(raw.aliases) ? raw.aliases : [];
  const category = typeof raw.category === "string" ? raw.category.trim().toLowerCase() : "";

  if (!id || !label || !defaultUnit) {
    return null;
  }

  const aliases = aliasesRaw
    .filter((alias) => typeof alias === "string")
    .map((alias) => alias.trim())
    .filter(Boolean);

  if (!aliases.some((alias) => normalizeTerm(alias) === normalizeTerm(label))) {
    aliases.unshift(label);
  }

  return {
    id,
    label,
    aliases,
    default_unit: defaultUnit,
    category
  };
}

function buildUnitIndex(entries) {
  UNIT_BY_TERM.clear();
  entries.forEach((entry) => {
    UNIT_BY_TERM.set(normalizeTerm(entry.label), entry.default_unit);
    entry.aliases.forEach((alias) => {
      UNIT_BY_TERM.set(normalizeTerm(alias), entry.default_unit);
    });
  });
}

function categoryScore(entry, query) {
  if (!entry.category) {
    return 0;
  }
  const synonyms = CATEGORY_SYNONYMS[entry.category] || [];
  for (const synonym of synonyms) {
    const term = normalizeTerm(synonym);
    if (term === query) return 82;
    if (term.startsWith(query)) return 62;
    if (term.includes(query)) return 48;
  }
  return 0;
}

function rankSuggestion(entry, query) {
  const label = normalizeTerm(entry.label);
  if (label === query) return 100;
  if (label.startsWith(query)) return 84;
  if (label.includes(query)) return 66;

  for (const alias of entry.aliases) {
    const normalizedAlias = normalizeTerm(alias);
    if (normalizedAlias === query) return 94;
    if (normalizedAlias.startsWith(query)) return 74;
    if (normalizedAlias.includes(query)) return 56;
  }

  return categoryScore(entry, query);
}

function getSuggestions(query, limit = 14) {
  const normalizedQuery = normalizeTerm(query);
  if (!normalizedQuery) {
    return ENTRIES.slice(0, limit).map((entry) => entry.label);
  }

  const ranked = ENTRIES
    .map((entry) => ({ entry, score: rankSuggestion(entry, normalizedQuery) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.label.localeCompare(b.entry.label, "de"));

  const labels = [];
  const seen = new Set();
  for (const item of ranked) {
    if (seen.has(item.entry.label)) continue;
    seen.add(item.entry.label);
    labels.push(item.entry.label);
    if (labels.length >= limit) break;
  }
  return labels;
}

function renderDatalist(datalistElement, labels) {
  if (!datalistElement) {
    return;
  }
  const options = labels.map((label) => {
    const option = document.createElement("option");
    option.value = label;
    return option;
  });
  datalistElement.replaceChildren(...options);
}

async function loadSemantics() {
  try {
    const response = await fetch("assets/js/semantics.de.json", { cache: "no-store" });
    if (!response.ok) {
      return FALLBACK_ENTRIES;
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      return FALLBACK_ENTRIES;
    }

    const entries = data.map(normalizeEntry).filter(Boolean);
    return entries.length > 0 ? entries : FALLBACK_ENTRIES;
  } catch {
    return FALLBACK_ENTRIES;
  }
}

function inferUnitByKeyword(term) {
  if (term.includes("milch") || term.includes("wasser")) return "l";
  if (term.includes("joghurt") || term.includes("tomaten")) return "g";
  if (term.includes("reis") || term.includes("nudeln")) return "g";
  return "stk";
}

export function inferUnit(name) {
  const key = normalizeTerm(name);
  if (UNIT_BY_TERM.has(key)) {
    return UNIT_BY_TERM.get(key);
  }
  return inferUnitByKeyword(key);
}

export async function initSemantics(datalistElement) {
  ENTRIES = await loadSemantics();
  buildUnitIndex(ENTRIES);
  renderDatalist(datalistElement, getSuggestions(""));
}

export function bindSemanticsAutocomplete(inputElement, datalistElement) {
  if (!inputElement) {
    return;
  }

  const popup = document.createElement("div");
  popup.className = "semantics-popup";
  popup.hidden = true;
  popup.setAttribute("role", "listbox");
  document.body.appendChild(popup);

  let labels = [];
  let activeIndex = -1;

  const closePopup = () => {
    popup.hidden = true;
    popup.innerHTML = "";
    activeIndex = -1;
    inputElement.removeAttribute("aria-activedescendant");
  };

  const positionPopup = () => {
    const rect = inputElement.getBoundingClientRect();
    popup.style.left = `${Math.round(rect.left)}px`;
    popup.style.top = `${Math.round(rect.bottom + 4)}px`;
    popup.style.width = `${Math.round(rect.width)}px`;
  };

  const selectLabel = (label) => {
    inputElement.value = label;
    closePopup();
    inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    inputElement.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const setActiveIndex = (nextIndex) => {
    activeIndex = nextIndex;
    const items = popup.querySelectorAll(".semantics-popup-item");
    items.forEach((item, index) => {
      item.classList.toggle("is-active", index === activeIndex);
      if (index === activeIndex) {
        inputElement.setAttribute("aria-activedescendant", item.id);
      }
    });
  };

  const renderPopup = () => {
    if (labels.length === 0) {
      closePopup();
      return;
    }

    popup.innerHTML = "";
    labels.forEach((label, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "semantics-popup-item";
      button.id = `semantics-option-${index}`;
      button.textContent = label;
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", "false");
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        selectLabel(label);
      });
      popup.appendChild(button);
    });

    activeIndex = -1;
    positionPopup();
    popup.hidden = false;
  };

  const updateSuggestions = () => {
    labels = getSuggestions(inputElement.value);
    renderDatalist(datalistElement, labels);
    renderPopup();
  };

  inputElement.removeAttribute("list");
  inputElement.setAttribute("autocomplete", "off");
  inputElement.setAttribute("aria-autocomplete", "list");

  inputElement.addEventListener("input", updateSuggestions);
  inputElement.addEventListener("focus", updateSuggestions);
  inputElement.addEventListener("keydown", (event) => {
    if (popup.hidden || labels.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = activeIndex < labels.length - 1 ? activeIndex + 1 : 0;
      setActiveIndex(next);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = activeIndex > 0 ? activeIndex - 1 : labels.length - 1;
      setActiveIndex(next);
      return;
    }

    if (event.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < labels.length) {
        event.preventDefault();
        selectLabel(labels[activeIndex]);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closePopup();
    }
  });

  inputElement.addEventListener("blur", () => {
    window.setTimeout(closePopup, 120);
  });

  window.addEventListener("resize", () => {
    if (!popup.hidden) {
      positionPopup();
    }
  });

  window.addEventListener("scroll", () => {
    if (!popup.hidden) {
      positionPopup();
    }
  }, true);

  document.addEventListener("pointerdown", (event) => {
    if (event.target === inputElement || popup.contains(event.target)) {
      return;
    }
    closePopup();
  });
}
