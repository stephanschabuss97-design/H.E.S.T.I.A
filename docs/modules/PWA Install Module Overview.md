# PWA Install Module Overview

Kurze Einordnung:
- Zweck: beschreibt den Install-Pfad von HESTIA als GitHub-Pages-PWA.
- Rolle innerhalb von HESTIA: trennt normalen Browser-Kontext, installierte PWA und den eigenen Banner-/Prompt-Pfad.
- Abgrenzung: keine allgemeine PWA-Theorie und keine tiefe Service-Worker-Doku.

Related docs:
- [Bootflow Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Bootflow%20Module%20Overview.md)
- [Deployment Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Deployment%20Module%20Overview.md)
- [Touchlog Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Touchlog%20Module%20Overview.md)

---

## 1. Zielsetzung

- HESTIA soll installierbar sein, ohne den Alltagsfluss zu verkomplizieren.
- Der Install-Banner soll nur erscheinen, wenn wirklich ein nutzbarer Prompt vorhanden ist.
- In der installierten PWA soll kein Install-Banner sichtbar bleiben.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `manifest.webmanifest` | PWA-Identitaet, Start-URL und Scope |
| `app/core/pwa-install-bootstrap.js` | faengt `beforeinstallprompt` sehr frueh ab |
| `app/core/pwa-install.js` | Banner- und Install-Kontextlogik |
| `index.html` | Install-Banner-Markup |
| `sw.js` | Shell-Versionierung fuer installierte PWAs |

---

## 3. Aktueller Betriebsvertrag

- `beforeinstallprompt` wird frueh im Bootstrap abgefangen.
- HESTIA nutzt den eigenen Banner statt des nativen Browser-Banners.
- Ein installierter Kontext soll Banner und Prompt konsequent verwerfen.
- Der Install-Marker wird lokal gespeichert.

Install-Kontexte werden heute erkannt ueber:

- `?source=pwa`
- `display-mode: standalone`
- `window-controls-overlay`
- weitere Browser-Signale wie `fullscreen` oder `navigator.standalone`

---

## 4. Manifest-Vertrag

Wichtige Punkte:

- `id` ist fuer GitHub Pages explizit gesetzt
- `start_url` zeigt auf `/H.E.S.T.I.A/?source=pwa`
- `scope` ist `/H.E.S.T.I.A/`

Dieser Vertrag ist noetig, damit Edge die installierte App stabil als dieselbe HESTIA erkennt.

---

## 5. Laufzeitdiagnostik

PWA-Diagnostik wird heute im Touchlog sichtbar gemacht:

- `installed`
- `marker`
- `prompt`
- `standalone`
- `source`
- `path`
- `search`
- `href`
- `lastEvent`

Das war noetig, weil der Install-Pfad auf GitHub Pages und in der installierten PWA mehrfach echte Randfaelle hatte.

---

## 6. Risiken

- alte PWA-Shell durch Service-Worker-Cache
- Browserkontext und installierter PWA-Kontext koennen unterschiedliche Signale liefern
- spaete Prompt-Bindung fuehrt zu totem Banner-Button
- CSS darf `hidden` nicht visuell ueberstimmen

---

## 7. Definition of Done

- Der Banner erscheint nur im installierbaren Browser-Kontext.
- Der Banner verschwindet in der installierten PWA.
- Ein neuer Chat versteht, warum Manifest, Bootstrap und Touchlog hier zusammengehoeren.
