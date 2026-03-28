import { ensureHouseholdKey, hasSupabasePublicConfig } from "../core/runtime-config.js";
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

export function createListSync() {
  let cachedHousehold = null;
  let cachedHouseholdKey = "";

  async function resolveHousehold(client) {
    const householdKey = ensureHouseholdKey();
    if (!householdKey) {
      return { data: null, error: new Error("Household-Key fehlt.") };
    }

    if (cachedHousehold && cachedHouseholdKey === householdKey) {
      return { data: cachedHousehold, error: null };
    }

    const { data, error } = await withRetry(
      async () =>
        client
          .from("households")
          .select("id, label")
          .limit(1)
          .maybeSingle(),
      { retries: 2, retryDelayMs: 180 }
    );

    if (error) {
      return { data: null, error: new Error(normalizeErrorMessage(error, "Haushalt konnte nicht geladen werden.")) };
    }

    if (!data) {
      return { data: null, error: new Error("Kein Haushalt fuer diesen Household-Key gefunden.") };
    }

    cachedHousehold = data;
    cachedHouseholdKey = householdKey;
    return { data, error: null };
  }

  async function getClientAndHousehold() {
    if (!hasSupabasePublicConfig()) {
      return { client: null, household: null, error: new Error("Supabase ist noch nicht konfiguriert.") };
    }

    const householdKey = ensureHouseholdKey();
    if (!householdKey) {
      return { client: null, household: null, error: new Error("Household-Key fehlt.") };
    }

    const client = createSupabaseClient();
    if (!client) {
      const clientError = getLastSupabaseClientError();
      return {
        client: null,
        household: null,
        error: new Error(
          clientError
            ? `Supabase-Client konnte nicht erstellt werden: ${clientError}`
            : "Supabase-Client konnte nicht erstellt werden."
        )
      };
    }

    const householdResult = await resolveHousehold(client);
    if (householdResult.error) {
      return { client: null, household: null, error: householdResult.error };
    }

    return { client, household: householdResult.data, error: null };
  }

  async function loadItemsForHousehold(client, householdId) {
    const { data, error } = await withRetry(
      async () =>
        client
          .from("shopping_items")
          .select("id, name, quantity, unit, in_cart, created_at")
          .eq("household_id", householdId)
          .order("created_at", { ascending: true }),
      { retries: 2, retryDelayMs: 220 }
    );

    if (error) {
      return {
        ok: false,
        message: normalizeErrorMessage(error, "Liste konnte nicht geladen werden."),
        items: []
      };
    }

    return {
      ok: true,
      items: Array.isArray(data) ? data.map(toItem) : [],
      syncedAt: new Date().toISOString()
    };
  }

  return {
    isConfigured() {
      return hasSupabasePublicConfig();
    },

    async saveSnapshot(items) {
      const syncTarget = await getClientAndHousehold();
      if (syncTarget.error) {
        return { ok: false, message: syncTarget.error.message };
      }

      const { client, household } = syncTarget;
      const { error: deleteError } = await withRetry(
        async () =>
          client
            .from("shopping_items")
            .delete()
            .eq("household_id", household.id),
        { retries: 1, retryDelayMs: 150 }
      );

      if (deleteError) {
        return { ok: false, message: normalizeErrorMessage(deleteError, "Liste konnte nicht geloescht werden.") };
      }

      if (items.length > 0) {
        const rows = items.map((item) => toRow(item, household.id));
        const { error: insertError } = await withRetry(
          async () => client.from("shopping_items").insert(rows),
          { retries: 1, retryDelayMs: 150 }
        );
        if (insertError) {
          return { ok: false, message: normalizeErrorMessage(insertError, "Liste konnte nicht gespeichert werden.") };
        }
      }

      return {
        ok: true,
        savedAt: new Date().toISOString(),
        householdLabel: household.label || "Home"
      };
    },

    async loadSnapshot() {
      const syncTarget = await getClientAndHousehold();
      if (syncTarget.error) {
        return { ok: false, message: syncTarget.error.message, items: [] };
      }

      const { client, household } = syncTarget;
      const result = await loadItemsForHousehold(client, household.id);
      if (!result.ok) {
        return result;
      }

      return {
        ...result,
        householdLabel: household.label || "Home"
      };
    },

    async subscribeToSnapshots(onRemoteChange) {
      const syncTarget = await getClientAndHousehold();
      if (syncTarget.error) {
        return { ok: false, message: syncTarget.error.message, unsubscribe() {} };
      }

      const { client, household } = syncTarget;
      let refreshTimer = 0;

      const refreshRemoteSnapshot = async () => {
        const result = await loadItemsForHousehold(client, household.id);
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
