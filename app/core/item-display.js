const DEFAULT_PIECE_UNITS = new Set(["stk", "stueck", "st\u00fcck"]);
const QUANTITY_IN_NAME_PATTERN = /\b\d+(?:[,.]\d+)?\s*(?:stk|stueck|st\u00fcck|kg|g|l|ml|liter|packung|packungen|pkg|pack)\b/i;
const QUANTITY_FORMATTER = new Intl.NumberFormat("de-AT", {
  maximumFractionDigits: 2
});

function normalizeUnit(unit) {
  return String(unit || "").trim().toLowerCase().replace(/\.+$/, "");
}

function normalizeQuantity(quantity) {
  const numericQuantity = Number(quantity);
  if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
    return 1;
  }

  return numericQuantity;
}

function formatQuantity(quantity) {
  return QUANTITY_FORMATTER.format(quantity);
}

function hasQuantityInName(name) {
  return QUANTITY_IN_NAME_PATTERN.test(String(name || ""));
}

export function formatItemMeta(item) {
  const quantity = normalizeQuantity(item?.quantity);
  const unit = String(item?.unit || "").trim();
  const normalizedUnit = normalizeUnit(unit);
  const usesDefaultPieceMeta = quantity === 1 && DEFAULT_PIECE_UNITS.has(normalizedUnit);

  if (usesDefaultPieceMeta && hasQuantityInName(item?.name)) {
    return "";
  }

  return `${formatQuantity(quantity)} ${unit || "Stk"}`.trim();
}
