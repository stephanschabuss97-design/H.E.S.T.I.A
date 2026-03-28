export function createSupabaseClient() {
  const url = window.HESTIA_SUPABASE_URL;
  const anonKey = window.HESTIA_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (!window.supabase?.createClient) {
    return null;
  }

  return window.supabase.createClient(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true }
  });
}
