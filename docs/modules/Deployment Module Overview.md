# Deployment Module Overview

Kurze Einordnung:

- Zweck: beschreibt, wie HESTIA heute ausgeliefert und betrieben wird.
- Rolle innerhalb von HESTIA: verbindet Repo, GitHub Pages, PWA-Verhalten und Supabase-Betrieb zu einem einfachen Laufmodell.
- Abgrenzung: keine Produktlogik und keine tiefe CI/CD-Doku.

Related docs:

- [README.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/README.md)
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Runtime Config Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Runtime%20Config%20Module%20Overview.md)
- [PWA Install Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/PWA%20Install%20Module%20Overview.md)
- [Waste Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Waste%20Module%20Overview.md)

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
- mit Supabase als externem Shared-List-Dienst

---

## 3. Aktuelles Hosting

Bekannte gehostete URL:

- `https://stephanschabuss97-design.github.io/H.E.S.T.I.A/`

Wichtige Ableitungen:

- Die App laeuft auf GitHub Pages unter einem Repo-Unterpfad.
- Die meisten Asset-Pfade bleiben relativ.
- Das PWA-Manifest nutzt fuer `id`, `start_url` und `scope` absichtsvoll absolute GitHub-Pages-Pfade.

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

## 5. PWA- und Shell-Betrieb

Relevante Betriebsbausteine:

- `manifest.webmanifest`
- `sw.js`
- `offline.html`
- `app/core/pwa-install-bootstrap.js`
- `app/core/pwa-install.js`
- `public/runtime-config.json`

Wichtige Betriebsrealitaet:

- Service-Worker-Caches muessen bei Shell-Aenderungen konsequent versioniert werden.
- Installierte PWAs koennen sonst alte Assets laenger halten als Browser-Tabs.

---

## 6. Deployment-Constraints

- Relative Pfade fuer Assets beibehalten, wenn sie nicht die GitHub-Pages-Basis brechen.
- PWA-Identitaet ueber `manifest.webmanifest` stabil halten.
- Runtime-Config soll moeglichst frisch geladen werden und nicht an altem Cache haengen.
- Supabase ist externer Dienst und nicht Teil des statischen Deployments.

---

## 7. Bekannte Betriebsbesonderheiten

- Edge kann Tracking-Prevention-Warnungen gegen das `jsdelivr`-Supabase-Skript loggen.
- Diese Meldungen sind derzeit eher Diagnosegeraesch als Produktfehler.
- Der kritischere Betriebsfall war bisher korrupter lokaler Household-Key in der installierten PWA.

---

## 8. GitHub Actions fuer Datenpflege

HESTIA hat fuer das Entsorgungsdaten-Fundament einen kleinen GitHub-Actions-Workflow:

- `.github/workflows/update-axams-waste-calendar.yml`

Zweck:

- offizielle Axams-iCal-Quellen selten laden
- `assets/data/waste-calendar.axams.json` deterministisch aktualisieren
- nur bei echtem JSON-Diff committen

Trigger:

- `workflow_dispatch`
- `17 3 15,30 1 *`
- `17 3 1 4,7,10 *`

Betriebsvertrag:

- `contents: write` ist noetig, damit `GITHUB_TOKEN` committen kann.
- `concurrency` verhindert unnoetige parallele Laeufe fuer denselben Branch.
- Der Workflow verwendet Node 24 und keine Dependency-Installation.
- Der Commit ist auf `assets/data/waste-calendar.axams.json` begrenzt.
- Fehlerhafte oder unplausible Quellen brechen im Script ab und duerfen keinen Teilstand committen.

Nicht lokal pruefbar:

- echter Schedule-Lauf
- Bot-Push unter realen Repository-Permissions
- moegliche Branch-Protection-Effekte

Details stehen in [Waste Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Waste%20Module%20Overview.md).

---

## 9. Risiken

- falsche Pfade koennen unter GitHub Pages brechen
- Service-Worker-Cache kann alte Assets laenger sichtbar halten
- installierte PWA und Browser-Tab koennen zeitweise unterschiedliche Shell-Staende sehen
- Bot-Commits aus GitHub Actions koennen durch Repository-Permissions oder Branch Protection blockiert werden

---

## 10. Definition of Done

- Ein neuer Chat versteht sofort, wie HESTIA lokal und gehostet laeuft.
- GitHub Pages, PWA und Supabase sind als gemeinsames Betriebsmodell beschrieben.
- GitHub-Actions-Datenpflege ist als begrenzter Sonderfall dokumentiert.
- Deployment bleibt leichter als das Produkt selbst.
