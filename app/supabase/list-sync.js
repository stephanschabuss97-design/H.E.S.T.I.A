import { ensureHouseholdKey, getRuntimeConfig, hasSupabasePublicConfig } from "../core/runtime-config.js";
import { createSupabaseClient, getLastSupabaseClientError } from "./client.js";

const TRANSIENT_ERROR_PATTERNS = [
  "failed to fetch",
  "networkerror",
  "network request failed",
  "load failed",
  "the network connection was lost",
  "something went wrong"
];

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function normalizeErrorMessage(error, fallback = "Unbekannter Fehler") {
  if (!error) {
    return fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  const parts = [
    typeof error.message === "string" ? error.message : "",
    typeof error.details === "string" ? error.details : "",
    typeof error.hint === "string" ? error.hint : "",
    typeof error.code === "string" ? `code=${error.code}` : ""
  ].filter(Boolean);

  return parts.join(" | ") || fallback;
}

function isTransientError(error) {
  const normalized = normalizeErrorMessage(error, "").toLowerCase();
  return TRANSIENT_ERROR_PATTERNS.some((pattern) => normalized.includes(pattern));
}

async function withRetry(task, options = {}) {
  const retries = Number(options.retries ?? 0);
  const retryDelayMs = Number(options.retryDelayMs ?? 0);

  let lastResult = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    lastResult = await task(attempt);
    if (!lastResult?.error || !isTransientError(lastResult.error) || attempt === retries) {
      return lastResult;
    }
    await delay(retryDelayMs * (attempt + 1));
  }

  return lastResult;
}

function toRow(item, householdId) {
  return {
    id: item.id,
    household_id: householdId,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    in_cart: Boolean(item.inCart)
  };
}

function toItem(row) {
  return {
    id: row.id,
    name: row.name,
    quantity: Number(row.quantity) || 1,
    unit: row.unit || "Stk",
    inCart: Boolean(row.in_cart)
  };
}

function normalizeHeaderValue(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").trim();
}

function getRestContext() {
  const { supabaseUrl, supabaseKey } = getRuntimeConfig();
  const householdKey = normalizeHeaderValue(ensureHouseholdKey());

  if (!supabaseUrl || !supabaseKey) {
    return { ok: false, message: "Supabase ist noch nicht konfiguriert." };
  }

  if (!householdKey) {
    return { ok: false, message: "Household-Key fehlt." };
  }

  return {
    ok: true,
    supabaseUrl,
    supabaseKey,
    householdKey,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "x-household-key": householdKey
    }
  };
}

async function parseJsonSafely(response) {
  const rawText = await response.text();
  if (!rawText) {
    return null;
  }

  try {
    return JSON.parse(rawText);
  } catch {
    return rawText;
  }
}

function normalizeRestError(status, payload, fallback) {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    return normalizeErrorMessage(payload, fallback);
  }

  if (typeof payload === "string" && payload.trim()) {
    return `${fallback} | HTTP ${status}: ${payload.trim()}`;
  }

  return `${fallback} | HTTP ${status}`;
}

async function restRequest(path, options = {}) {
  const restContext = getRestContext();
  if (!restContext.ok) {
    return { ok: false, message: restContext.message, data: null };
  }

  const { supabaseUrl, headers } = restContext;
  const requestHeaders = {
    Accept: "application/json",
    ...headers,
    ...(options.headers || {})
  };

  const result = await withRetry(
    async () => {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
          method: options.method || "GET",
          headers: requestHeaders,
          body: options.body ? JSON.stringify(options.body) : undefined
        });

        const payload = await parseJsonSafely(response);
        if (!response.ok) {
          return {
            data: null,
            error: new Error(
              normalizeRestError(
                response.status,
                payload,
                options.errorMessage || "REST-Anfrage fehlgeschlagen."
              )
            )
          };
        }

        return { data: payload, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },
    { retries: Number(options.retries ?? 0), retryDelayMs: Number(options.retryDelayMs ?? 0) }
  );

  if (result?.error) {
    return {
      ok: false,
      message: normalizeErrorMessage(result.error, options.errorMessage || "REST-Anfrage fehlgeschlagen."),
      data: null
    };
  }

  return { ok: true, message: "", data: result?.data ?? null };
}

export function createListSync() {
  let cachedHousehold = null;
  let cachedHouseholdKey = "";

  async function resolveHousehold() {
    const householdKey = ensureHouseholdKey();
    if (!householdKey) {
      return { data: null, error: new Error("Household-Key fehlt.") };
    }

    if (cachedHousehold && cachedHouseholdKey === householdKey) {
      return { data: cachedHousehold, error: null };
    }

    const restResult = await restRequest("households?select=id,label&limit=1", {
      retries: 2,
      retryDelayMs: 180,
      errorMessage: "Haushalt konnte nicht geladen werden."
    });

    if (!restResult.ok) {
      return { data: null, error: new Error(restResult.message) };
    }

    const data = Array.isArray(restResult.data) ? restResult.data[0] || null : restResult.data;
    if (!data) {
      return { data: null, error: new Error("Kein Haushalt fuer diesen Household-Key gefunden.") };
    }

    cachedHousehold = data;
    cachedHouseholdKey = householdKey;
    return { data, error: null };
  }

  async function getHousehold() {
    if (!hasSupabasePublicConfig()) {
      return { household: null, error: new Error("Supabase ist noch nicht konfiguriert.") };
    }

    const householdKey = ensureHouseholdKey();
    if (!householdKey) {
      return { household: null, error: new Error("Household-Key fehlt.") };
    }

    const householdResult = await resolveHousehold();
    if (householdResult.error) {
      return { household: null, error: householdResult.error };
    }

    return { household: householdResult.data, error: null };
  }

  async function loadItemsForHousehold(householdId) {
    const restResult = await restRequest(
      `shopping_items?select=id,name,quantity,unit,in_cart,created_at&household_id=eq.${encodeURIComponent(householdId)}&order=created_at.asc`,
      {
        retries: 2,
        retryDelayMs: 220,
        errorMessage: "Liste konnte nicht geladen werden."
      }
    );

    if (!restResult.ok) {
      return {
        ok: false,
        message: restResult.message,
        items: []
      };
    }

    return {
      ok: true,
      items: Array.isArray(restResult.data) ? restResult.data.map(toItem) : [],
      syncedAt: new Date().toISOString()
    };
  }

  return {
    isConfigured() {
      return hasSupabasePublicConfig();
    },

    async saveSnapshot(items) {
      const syncTarget = await getHousehold();
      if (syncTarget.error) {
        return { ok: false, message: syncTarget.error.message };
      }

      const { household } = syncTarget;
      const deleteResult = await restRequest(
        `shopping_items?household_id=eq.${encodeURIComponent(household.id)}`,
        {
          method: "DELETE",
          retries: 1,
          retryDelayMs: 150,
          headers: { Prefer: "return=minimal" },
          errorMessage: "Liste konnte nicht geloescht werden."
        }
      );

      if (!deleteResult.ok) {
        return { ok: false, message: deleteResult.message };
      }

      if (items.length > 0) {
        const rows = items.map((item) => toRow(item, household.id));
        const insertResult = await restRequest("shopping_items", {
          method: "POST",
          body: rows,
          retries: 1,
          retryDelayMs: 150,
          headers: {
            "Content-Type": "application/json",
            Prefer: "return=minimal"
          },
          errorMessage: "Liste konnte nicht gespeichert werden."
        });
        if (!insertResult.ok) {
          return { ok: false, message: insertResult.message };
        }
      }

      return {
        ok: true,
        savedAt: new Date().toISOString(),
        householdLabel: household.label || "Home"
      };
    },

    async loadSnapshot() {
      const syncTarget = await getHousehold();
      if (syncTarget.error) {
        return { ok: false, message: syncTarget.error.message, items: [] };
      }

      const { household } = syncTarget;
      const result = await loadItemsForHousehold(household.id);
      if (!result.ok) {
        return result;
      }

      return {
        ...result,
        householdLabel: household.label || "Home"
      };
    },

    async subscribeToSnapshots(onRemoteChange) {
      const syncTarget = await getHousehold();
      if (syncTarget.error) {
        return { ok: false, message: syncTarget.error.message, unsubscribe() {} };
      }

      const client = createSupabaseClient();
      if (!client) {
        const clientError = getLastSupabaseClientError();
        return {
          ok: false,
          message: clientError
            ? `Realtime konnte nicht gestartet werden: ${clientError}`
            : "Realtime konnte nicht gestartet werden.",
          unsubscribe() {}
        };
      }

      const { household } = syncTarget;
      let refreshTimer = 0;

      const refreshRemoteSnapshot = async () => {
        const result = await loadItemsForHousehold(household.id);
        if (typeof onRemoteChange === "function") {
          onRemoteChange(result);
        }
      };

      const scheduleRefresh = () => {
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => {
          refreshRemoteSnapshot().catch(() => {});
        }, 120);
      };

      const channel = client
        .channel(`hestia-shopping-items-${household.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "shopping_items",
            filter: `household_id=eq.${household.id}`
          },
          scheduleRefresh
        );

      channel.subscribe();

      return {
        ok: true,
        unsubscribe() {
          window.clearTimeout(refreshTimer);
          client.removeChannel(channel);
        }
      };
    }
  };
}
