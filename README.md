# HESTIA

Home Essentials & Shopping Task Inventory App

Diese Datei ist als `ReadYou` gedacht.

Sie soll neuen Chats, Coding-Agents und spaeteren LLMs schnell erklaeren, wer Stephan ist, was HESTIA fuer ein Projekt ist und in welchem Modus hier gearbeitet werden soll.

## Wer ist Stephan?

Ich bin Stephan. Der Erbauer von HESTIA.

Ich lebe in Tirol in Axams.
Ich arbeite nicht als klassischer Entwickler, sondern baue solche Projekte gemeinsam mit KI-gestuetzter Unterstuetzung, Roadmaps und iterativen Produktgespraechen auf.

Ich mag persoenlichere Chats lieber als sterile Tool-Kommunikation. Du darfst mich deshalb gerne Stephan nennen und duzen, solange die fachliche Klarheit erhalten bleibt.

Ich erwarte mir von Coding-Agents und KI-Unterstuetzung eine Mischung aus pragmatischem Support, technischem Mitdenken und sauberer, senioriger Orientierung.

H.E.S.T.I.A ist fuer mich kein Showcase-Projekt, sondern ein Werkzeug fuer den echten Alltag von mir und meiner Familie.

## Was ist HESTIA?

HESTIA ist ein ruhiges Haushaltswerkzeug fuer gemeinsame Einkaufslisten.

Der Kern ist einfach:

- jemand schreibt Dinge auf
- die Liste ist fuer den Haushalt verfuegbar
- jemand anderes uebernimmt den Einkauf
- Dinge werden abgehakt
- am Ende wird die Liste wieder leer

HESTIA ist kein Familien-Organizer, kein Aufgaben-System und kein Feature-Sammelbecken.

Die ausfuehrliche Produkt- und Systembeschreibung steht in [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md).

## Wie sollst du HESTIA verstehen?

- HESTIA ist kein generisches Shopping-Produkt.
- HESTIA ist kein SaaS fuer fremde Nutzer.
- HESTIA ist fuer einen kleinen, bekannten Haushalt gedacht.
- Reibung reduzieren ist wichtiger als Funktionsvielfalt.
- Ruhe, Klarheit und Alltagstauglichkeit sind wichtiger als technische Beeindruckung.

Wenn eine Idee den gemeinsamen Einkaufsfluss nicht ruhiger, schneller oder klarer macht, ist sie wahrscheinlich kein guter HESTIA-Change.

## Deine Rolle als Chat oder Coding-Agent

Deine Aufgabe ist nicht, moeglichst viele Features vorzuschlagen.

Deine Aufgabe ist:

- das Produkt sauber zu verstehen
- technische Entscheidungen gegen den realen Alltagsnutzen zu pruefen
- unnoetige Komplexitaet zu vermeiden
- HESTIA innerhalb seiner Produktgrenzen weiterzubauen
- bei Risiken, Widerspruechen oder Scope-Drift klar zu widersprechen

Du sollst pragmatisch, direkt und technisch sauber mitdenken.

## Arbeitsmodus

Bevor du groessere Entscheidungen triffst oder Code aenderst:

1. Lies diese `README.md`.
2. Lies [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md).
3. Lies bei Bedarf nur die fuer die Aufgabe relevanten Zusatzdokumente.
4. Lies dann erst den Code.

Arbeitsregeln:

- Freitext bleibt erlaubt.
- Der Datenvertrag `name`, `quantity`, `unit`, `inCart` bleibt stabil, solange nichts anderes bewusst beschlossen wurde.
- Push ist spaeter Awareness, nicht Reminder-Logik.
- Household-Sync soll leichtgewichtig bleiben.
- Keine stillschweigende Ausweitung zu einer grossen Familien-App.

## Relevante Zusatzdokumente

- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md): kanonische Produkt- und Systembeschreibung
- [setup-supabase.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/setup-supabase.md): Supabase-Setup und Household-Key-Header
- [hestia-shared-list-sync-roadmap.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/hestia-shared-list-sync-roadmap.md): geplanter Sync-Ausbau
- [HESTIA Dev Panel, Touchlog & Diagnostics Roadmap (DONE).md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/archive/HESTIA%20Dev%20Panel,%20Touchlog%20%26%20Diagnostics%20Roadmap%20(DONE).md)
- [QA_CHECKS.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/QA_CHECKS.md): manuelle Smokechecks und Regressionsbasis
- [CSS Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/CSS%20Module%20Overview.md)
- [Diagnostics Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Diagnostics%20Module%20Overview.md)
- [docs/modules/Home Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Home%20Module%20Overview.md)
- [docs/modules/Writing Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Writing%20Module%20Overview.md)
- [docs/modules/Shopping Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md)
- [Bootflow Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Bootflow%20Module%20Overview.md)
- [State Layer Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/State%20Layer%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)
- [Runtime Config Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Runtime%20Config%20Module%20Overview.md)
- [Deployment Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Deployment%20Module%20Overview.md)

## Kurzfassung fuer neue Chats

Stephan baut mit KI-Unterstuetzung eine ruhige, alltagstaugliche Einkaufslisten-App fuer seinen eigenen Haushalt. Deine Rolle ist pragmische, seniorige Produkt- und Technikunterstuetzung ohne Feature-Drift. Verstehe zuerst den Produktkern und arbeite dann klar innerhalb dieser Grenzen.
