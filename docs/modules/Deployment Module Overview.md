# Deployment Module Overview

Kurze Einordnung:
- Zweck: beschreibt, wie HESTIA heute ausgeliefert und betrieben wird.
- Rolle innerhalb von HESTIA: verbindet Repo, GitHub Pages, PWA-Verhalten und spaeteren Supabase-Betrieb zu einem einfachen Laufmodell.
- Abgrenzung: keine Produktlogik, keine tiefen CI/CD-Flows.

Related docs:
- [README.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/README.md)
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Runtime Config Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Runtime%20Config%20Module%20Overview.md)
- [Bootflow Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Bootflow%20Module%20Overview.md)

---

## 1. Zielsetzung

- HESTIA soll als statische, browser-first PWA einfach auslieferbar bleiben.
- Deployment darf den lokalen Kernfluss nicht komplizierter machen als noetig.
- Nichtziel: schwere Build- oder Server-Infrastruktur.

---

## 2. Aktuelles Laufmodell

HESTIA ist heute:

- statisches HTML, CSS und JS
- ohne Build-Step
- browser-first
- lokal nutzbar ueber `localhost`
- spaeter mit Supabase als externer Shared-List-Dienst

---

## 3. Aktuelles Hosting

Bekannte gehostete URL:

- `https://stephanschabuss97-design.github.io/H.E.S.T.I.A/`

Wichtige Ableitung:

- Die App laeuft auf GitHub Pages unter einem Repo-Unterpfad.
- Relative Pfade sind deshalb wichtig und sollen bevorzugt beibehalten werden.

---

## 4. Lokaler Betrieb

Fuer lokale Entwicklung:

```powershell
python -m http.server 8766
```

Danach:

```text
http://127.0.0.1:8766
```

Wichtige Regel:
- Nicht ueber `file://` testen, wenn Service Worker oder PWA-Verhalten relevant sind.

---

## 5. PWA-Verhalten

Relevante Betriebsbausteine:

- `manifest.webmanifest`
- `sw.js`
- `offline.html`
- Install-Banner in `app/core/pwa-install.js`
- `public/runtime-config.json`

Der Service Worker cached die App-Shell und liefert bei Ausfall ein Offline-Fallback.

---

## 6. Deployment-Constraints

- keine absoluten Root-Pfade, wenn sie den GitHub-Pages-Unterpfad ignorieren
- Build-Step nur einfuehren, wenn er echten Produktwert bringt
- oeffentliche Runtime-Config muss GitHub-Pages-kompatibel bleiben
- Runtime-Config soll moeglichst frisch geladen werden und nicht an altem Cache haengen
- Supabase ist externer Dienst, nicht Teil des Deployments der statischen App

---

## 7. Zukuenftiger Produktionspfad

Wenn Sync produktiv wird, besteht das Betriebsmodell aus:

1. GitHub-Repo als Codebasis
2. GitHub Pages fuer die statische PWA
3. Supabase fuer Household-Listen, RLS und Realtime

Optional spaeter:

4. manueller Push-/Awareness-Layer

---

## 8. Risiken

- falsche Pfade koennen unter GitHub Pages brechen
- Service-Worker-Cache kann alte Assets laenger sichtbar halten
- Runtime-Config fuer Supabase muss sauber zwischen lokal und gehostet abgestimmt werden

---

## 9. Definition of Done

- Ein neuer Chat versteht sofort, wie HESTIA lokal und gehostet laeuft.
- GitHub Pages, PWA und Supabase sind als gemeinsames Betriebsmodell beschrieben.
- Deployment bleibt leichter als das Produkt selbst.
