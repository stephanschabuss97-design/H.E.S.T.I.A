const CONFIG_URL = "./public/runtime-config.json";
const HOUSEHOLD_STORAGE_KEY = "hestia.v1.household-key";
const HOUSEHOLD_KEY_PATTERN = /^[A-Za-z0-9_-]{16,128}$/;

let runtimeConfig = {
  supabaseUrl: "",
  supabasePublishableKey: "",
  supabaseAnonKey: "",
  householdKey: ""
};

function normalizeValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeHouseholdKey(value) {
  return normalizeValue(value).replace(/\s+/g, "");
}

export function isValidHouseholdKey(value) {
  const householdKey = normalizeHouseholdKey(value);
  return HOUSEHOLD_KEY_PATTERN.test(householdKey);
}

function mergeRuntimeConfig(rawConfig) {
  const fileHouseholdKey = normalizeHouseholdKey(rawConfig?.householdKey || window.HESTIA_HOUSEHOLD_KEY);
  return {
    supabaseUrl: normalizeValue(rawConfig?.supabaseUrl || window.HESTIA_SUPABASE_URL),
    supabasePublishableKey: normalizeValue(
      rawConfig?.supabasePublishableKey || window.HESTIA_SUPABASE_PUBLISHABLE_KEY
    ),
    supabaseAnonKey: normalizeValue(rawConfig?.supabaseAnonKey || window.HESTIA_SUPABASE_ANON_KEY),
    householdKey: isValidHouseholdKey(fileHouseholdKey) ? fileHouseholdKey : ""
  };
}

async function loadConfigFile() {
  try {
    const response = await fetch(CONFIG_URL, { cache: "no-store" });
    if (!response.ok) {
      return {};
    }
    return await response.json();
  } catch {
    return {};
  }
}

function persistHouseholdKey(householdKey) {
  const normalizedKey = normalizeHouseholdKey(householdKey);
  if (!isValidHouseholdKey(normalizedKey)) {
    localStorage.removeItem(HOUSEHOLD_STORAGE_KEY);
    return;
  }
  localStorage.setItem(HOUSEHOLD_STORAGE_KEY, normalizedKey);
}

export async function loadRuntimeConfig() {
  const fileConfig = await loadConfigFile();
  runtimeConfig = mergeRuntimeConfig(fileConfig);

  const localHouseholdKey = normalizeHouseholdKey(localStorage.getItem(HOUSEHOLD_STORAGE_KEY));
  if (isValidHouseholdKey(localHouseholdKey)) {
    runtimeConfig.householdKey = localHouseholdKey;
  } else {
    persistHouseholdKey("");
  }

  if (!runtimeConfig.householdKey && isValidHouseholdKey(fileConfig?.householdKey)) {
    runtimeConfig.householdKey = normalizeHouseholdKey(fileConfig.householdKey);
  }

  if (runtimeConfig.householdKey) {
    persistHouseholdKey(runtimeConfig.householdKey);
  }

  return getRuntimeConfig();
}

export function getRuntimeConfig() {
  return {
    ...runtimeConfig,
    supabaseKey: runtimeConfig.supabasePublishableKey || runtimeConfig.supabaseAnonKey
  };
}

export function getRuntimeConfigSummary() {
  const config = getRuntimeConfig();
  const householdKey = normalizeHouseholdKey(config.householdKey);
  const supabaseKey = normalizeValue(config.supabaseKey);

  let host = "";
  try {
    host = config.supabaseUrl ? new URL(config.supabaseUrl).host : "";
  } catch {
    host = config.supabaseUrl || "";
  }

  return {
    host,
    keyType: config.supabasePublishableKey ? "publishable" : config.supabaseAnonKey ? "anon" : "missing",
    keyPrefix: supabaseKey ? supabaseKey.slice(0, 14) : "",
    householdKeyPresent: Boolean(householdKey),
    householdKeyValid: isValidHouseholdKey(householdKey),
    householdKeyLength: householdKey.length,
    householdKeyTail: householdKey ? householdKey.slice(-4) : ""
  };
}

export function hasSupabasePublicConfig() {
  const { supabaseUrl, supabaseKey } = getRuntimeConfig();
  return Boolean(supabaseUrl && supabaseKey);
}

export function hasHouseholdKey() {
  return isValidHouseholdKey(getRuntimeConfig().householdKey);
}

export function setHouseholdKey(nextHouseholdKey) {
  const householdKey = normalizeHouseholdKey(nextHouseholdKey);
  if (!isValidHouseholdKey(householdKey)) {
    runtimeConfig = {
      ...runtimeConfig,
      householdKey: ""
    };
    persistHouseholdKey("");
    return "";
  }

  runtimeConfig = {
    ...runtimeConfig,
    householdKey
  };
  persistHouseholdKey(householdKey);
  return householdKey;
}

export function ensureHouseholdKey() {
  if (hasHouseholdKey()) {
    return getRuntimeConfig().householdKey;
  }

  persistHouseholdKey("");
  const input = window.prompt(
    "Bitte den Household-Key fuer HESTIA eingeben (16-128 Zeichen, nur Buchstaben, Zahlen, - oder _):"
  );
  if (!input) {
    return "";
  }

  const householdKey = setHouseholdKey(input);
  if (!householdKey) {
    window.alert("Der Household-Key ist ungueltig.");
  }
  return householdKey;
}
