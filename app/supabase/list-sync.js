import { ensureHouseholdKey, hasSupabasePublicConfig } from "../core/runtime-config.js";
import { createSupabaseClient, getLastSupabaseClientError } from "./client.js";

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

    const { data, error } = await client
      .from("households")
      .select("id, label")
      .limit(1)
      .maybeSingle();

    if (error) {
      return { data: null, error };
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
    const { data, error } = await client
      .from("shopping_items")
      .select("id, name, quantity, unit, in_cart, created_at")
      .eq("household_id", householdId)
      .order("created_at", { ascending: true });

    if (error) {
      return { ok: false, message: error.message, items: [] };
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
      const { error: deleteError } = await client
        .from("shopping_items")
        .delete()
        .eq("household_id", household.id);

      if (deleteError) {
        return { ok: false, message: deleteError.message };
      }

      if (items.length > 0) {
        const rows = items.map((item) => toRow(item, household.id));
        const { error: insertError } = await client.from("shopping_items").insert(rows);
        if (insertError) {
          return { ok: false, message: insertError.message };
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
