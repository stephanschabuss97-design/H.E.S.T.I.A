import { getRuntimeConfig } from "../core/runtime-config.js";

let cachedClient = null;
let cachedSignature = "";
let lastClientError = "";

function normalizeHeaderValue(value) {
  if (typeof value !== "string") {
    return "";
  }

  // Strip control characters so browser Headers construction cannot fail.
  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").trim();
}

export function getLastSupabaseClientError() {
  return lastClientError;
}

export function createSupabaseClient() {
  const { supabaseUrl, supabaseKey, householdKey } = getRuntimeConfig();
  const safeHouseholdKey = normalizeHeaderValue(householdKey);

  if (!supabaseUrl || !supabaseKey) {
    lastClientError = "";
    return null;
  }

  if (!window.supabase?.createClient) {
    lastClientError = "Supabase createClient ist nicht verfuegbar.";
    return null;
  }

  const signature = `${supabaseUrl}|${supabaseKey}|${safeHouseholdKey}`;
  if (cachedClient && cachedSignature === signature) {
    lastClientError = "";
    return cachedClient;
  }

  try {
    cachedClient = window.supabase.createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      global: {
        headers: safeHouseholdKey ? { "x-household-key": safeHouseholdKey } : {}
      }
    });
    cachedSignature = signature;
    lastClientError = "";
  } catch (error) {
    cachedClient = null;
    cachedSignature = "";
    lastClientError = error instanceof Error ? error.message : String(error || "Unbekannter Fehler");
    return null;
  }

  return cachedClient;
}
