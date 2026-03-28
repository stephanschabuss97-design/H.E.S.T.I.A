const CONFIG_URL = "./public/runtime-config.json";
const HOUSEHOLD_STORAGE_KEY = "hestia.v1.household-key";

let runtimeConfig = {
  supabaseUrl: "",
  supabasePublishableKey: "",
  supabaseAnonKey: "",
  householdKey: ""
};

function normalizeValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function mergeRuntimeConfig(rawConfig) {
  return {
    supabaseUrl: normalizeValue(rawConfig?.supabaseUrl || window.HESTIA_SUPABASE_URL),
    supabasePublishableKey: normalizeValue(
      rawConfig?.supabasePublishableKey || window.HESTIA_SUPABASE_PUBLISHABLE_KEY
    ),
    supabaseAnonKey: normalizeValue(rawConfig?.supabaseAnonKey || window.HESTIA_SUPABASE_ANON_KEY),
    householdKey: normalizeValue(rawConfig?.householdKey || window.HESTIA_HOUSEHOLD_KEY)
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
  if (!householdKey) {
    localStorage.removeItem(HOUSEHOLD_STORAGE_KEY);
    return;
  }
  localStorage.setItem(HOUSEHOLD_STORAGE_KEY, householdKey);
}

export async function loadRuntimeConfig() {
  const fileConfig = await loadConfigFile();
  runtimeConfig = mergeRuntimeConfig(fileConfig);

  const localHouseholdKey = normalizeValue(localStorage.getItem(HOUSEHOLD_STORAGE_KEY));
  if (localHouseholdKey) {
    runtimeConfig.householdKey = localHouseholdKey;
  } else if (runtimeConfig.householdKey) {
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
  const householdKey = normalizeValue(config.householdKey);
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
    householdKeyLength: householdKey.length,
    householdKeyTail: householdKey ? householdKey.slice(-4) : ""
  };
}

export function hasSupabasePublicConfig() {
  const { supabaseUrl, supabaseKey } = getRuntimeConfig();
  return Boolean(supabaseUrl && supabaseKey);
}

export function hasHouseholdKey() {
  return Boolean(getRuntimeConfig().householdKey);
}

export function setHouseholdKey(nextHouseholdKey) {
  const householdKey = normalizeValue(nextHouseholdKey);
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

  const input = window.prompt("Bitte den Household-Key fuer HESTIA eingeben:");
  if (!input) {
    return "";
  }

  return setHouseholdKey(input);
}
