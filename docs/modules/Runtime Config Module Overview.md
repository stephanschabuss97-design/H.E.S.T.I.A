# Runtime Config Module Overview

Kurze Einordnung:
- Zweck: beschreibt, welche Laufzeitkonfiguration HESTIA braucht und wie sie ins Frontend gelangt.
- Rolle innerhalb von HESTIA: schafft Klarheit zwischen oeffentlichen Client-Werten, lokalen Secrets und dem Household-Kontext.
- Abgrenzung: keine Business-Logik, kein Implementierungsplan fuer Sync im Detail.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [setup-supabase.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/setup-supabase.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)
- [Deployment Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Deployment%20Module%20Overview.md)

---

## 1. Zielsetzung

- Neue Chats sollen sofort sehen, welche Werte HESTIA zur Laufzeit wirklich braucht.
- Die Konfiguration soll fuer eine statische Browser-PWA so einfach wie moeglich bleiben.
- Nichtziel: serverseitiges Secret-Management oder komplexe Konfigurationssysteme.

---

## 2. Oeffentliche vs. nicht oeffentliche Werte

### Oeffentlich und im Browser erlaubt
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- voruebergehend alternativ `SUPABASE_ANON_KEY`
- `HOUSEHOLD_KEY` fuer den bekannten Haushalt

### Nicht in den Browser
- Datenbank-Passwort
- Supabase `secret key`
- Supabase `service_role key`
- echte JWT-Secrets oder andere Admin-Credentials

Wichtige Regel:
- HESTIA ist eine statische PWA. Alles, was im Browser landet, muss als oeffentlich behandelbar sein.

---

## 3. Aktueller HESTIA-Stand

Der aktuelle Frontend-Vertrag laeuft ueber:

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

Der Household-Key darf dort vorbelegt sein, kann aber auch bewusst leer bleiben und lokal erst bei Bedarf erfasst werden.

---

## 4. Household-Kontext

Der `HOUSEHOLD_KEY` ist kein Supabase-Systemwert, sondern Teil des HESTIA-Zugriffsmodells.

Er wird genutzt fuer:

- Seed des ersten Haushalts in `public.households`
- lokalen Konfigurationswert auf den Geraeten
- Request-Header `x-household-key`
- RLS-Kontext in Supabase

Wichtige Regel:
- `HOUSEHOLD_KEY` ist kein Hochsicherheitsgeheimnis wie ein Admin-Key, aber er sollte trotzdem nicht unnötig breit verteilt werden.

---

## 5. Lokale Entwicklung

Heute existiert lokal zusaetzlich:

- [`.env.supabase.local`](c:/Users/steph/Projekte/H.E.S.T.I.A/.env.supabase.local)

Diese Datei bleibt lokale Referenz und darf nicht ins Repo.

---

## 6. Deployment-Frage fuer GitHub Pages

Da HESTIA statisch ueber GitHub Pages laeuft, ist die kleine oeffentliche Config-Datei der aktuelle und bevorzugte Weg.

Nicht sinnvoll fuer HESTIA:
- komplizierte Build-Time-Injection
- serverseitige Secret-Auslieferung
- Secret-Keys im Frontend

---

## 7. Zukuenftige Entscheidung

Vor produktivem Sync sollte HESTIA einen festen Runtime-Config-Vertrag bekommen:

1. welche Werte oeffentlich im Browser landen
2. in welcher Datei oder an welcher Stelle sie definiert werden
3. wie lokaler Betrieb und GitHub Pages denselben Vertrag sprechen

---

## 8. Risiken

- versehentliches Vermischen von oeffentlichen und nicht oeffentlichen Keys
- uneinheitliche Konfiguration zwischen lokalem Betrieb und GitHub Pages
- Household-Kontext wird vergessen oder falsch gesetzt

---

## 9. Definition of Done

- Ein neuer Chat weiss sofort, welche Laufzeitwerte HESTIA braucht.
- Es ist klar getrennt, was ins Frontend darf und was nicht.
- Lokaler Betrieb und spaeteres Deployment koennen denselben Config-Vertrag nutzen.
