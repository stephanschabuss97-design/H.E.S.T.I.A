# Runtime Config Module Overview

Kurze Einordnung:
- Zweck: beschreibt, welche Laufzeitkonfiguration HESTIA heute wirklich braucht und wie sie validiert wird.
- Rolle innerhalb von HESTIA: trennt oeffentliche Client-Werte, lokalen Household-Kontext und unzulaessige Secrets.
- Abgrenzung: keine Business-Logik und kein vollstaendiger Sync-Plan.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [setup-supabase.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/setup-supabase.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)
- [Deployment Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Deployment%20Module%20Overview.md)

---

## 1. Zielsetzung

- Neue Chats sollen sofort sehen, welche Werte HESTIA zur Laufzeit braucht.
- Die Konfiguration soll fuer eine statische GitHub-Pages-PWA so einfach wie moeglich bleiben.
- Nichtziel: serverseitiges Secret-Management oder komplexe Build-Konfiguration.

---

## 2. Oeffentliche vs. nicht oeffentliche Werte

### Oeffentlich und im Browser erlaubt
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- alternativ `SUPABASE_ANON_KEY`
- `HOUSEHOLD_KEY` fuer den bekannten Haushalt

### Nicht in den Browser
- Datenbank-Passwort
- Supabase `secret key`
- Supabase `service_role key`
- echte JWT-Secrets oder andere Admin-Credentials

---

## 3. Aktueller Frontend-Vertrag

Der Frontend-Vertrag laeuft ueber:

- `public/runtime-config.json`

Aktuelle Form:

```json
{
  "supabaseUrl": "",
  "supabasePublishableKey": "",
  "supabaseAnonKey": "",
  "householdKey": ""
}
```

---

## 4. Household-Key-Verhalten heute

- Der Household-Key kann in `runtime-config.json` leer bleiben.
- Falls er leer ist, wird er beim ersten Sync-Zugriff lokal abgefragt.
- Danach wird er lokal unter `hestia.v1.household-key` gespeichert.

Wichtige Haertung:
- HESTIA akzeptiert nur Household-Keys mit gueltigem Muster.
- Korrupte oder unplausible Storage-Werte werden verworfen.
- Dadurch kann ein kaputter lokaler Wert den Sync nicht mehr dauerhaft blockieren.

Aktuelle Gueltigkeitsregel:
- 16 bis 128 Zeichen
- nur Buchstaben, Zahlen, `_` oder `-`

---

## 5. Lokale Entwicklung

Heute existiert lokal zusaetzlich:

- [`.env.supabase.local`](c:/Users/steph/Projekte/H.E.S.T.I.A/.env.supabase.local)

Diese Datei bleibt lokale Referenz und darf nicht ins Repo.

---

## 6. Laufzeitdiagnostik

`app/main.js` loggt beim Boot inzwischen eine kleine Konfig-Zusammenfassung:

- Host
- Key-Typ
- Key-Prefix
- ob ein Household-Key vorhanden ist
- ob er als gueltig erkannt wurde
- Laenge und Tail des Household-Keys

---

## 7. Risiken

- versehentliches Vermischen von oeffentlichen und nicht oeffentlichen Keys
- kaputte lokale Household-Keys in `localStorage`
- unterschiedliche Konfiguration zwischen lokalem Betrieb und GitHub Pages

---

## 8. Definition of Done

- Ein neuer Chat weiss sofort, welche Laufzeitwerte HESTIA braucht.
- Es ist klar getrennt, was ins Frontend darf und was nicht.
- Household-Key-Erfassung, -Validierung und -Persistenz sind als zusammenhaengender Vertrag beschrieben.
