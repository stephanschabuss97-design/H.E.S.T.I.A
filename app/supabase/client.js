import { getRuntimeConfig } from "../core/runtime-config.js";

let cachedClient = null;
let cachedSignature = "";

export function createSupabaseClient() {
  const { supabaseUrl, supabaseKey, householdKey } = getRuntimeConfig();

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (!window.supabase?.createClient) {
    return null;
  }

  const signature = `${supabaseUrl}|${supabaseKey}|${householdKey}`;
  if (cachedClient && cachedSignature === signature) {
    return cachedClient;
  }

  cachedClient = window.supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      headers: householdKey ? { "x-household-key": householdKey } : {}
    }
  });
  cachedSignature = signature;

  return cachedClient;
}
