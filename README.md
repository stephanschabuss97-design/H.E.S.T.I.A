# HESTIA

KASRKIN-Betriebsintegration ist seit 2026-10-12 auf Ownerauftrag entbunden.
Projektarbeit und Roadmaps erfolgen ohne KASRKIN-Permits oder Usage-Gates;
fachliche, Sicherheits-, Review- und produktive Ownergates gelten weiter.
Details: [Integrationsstatus](.kasrkin/integration.md).

Home Essentials & Shopping Task Inventory App

Diese Datei ist als `ReadYou` gedacht.

Sie soll neuen Chats, Coding-Agents und spaeteren LLMs schnell erklaeren, wer
Stephan ist, was HESTIA fuer ein Projekt ist und in welchem Modus hier
gearbeitet werden soll.

## Wer ist Stephan?

Ich bin Stephan. Der Erbauer von HESTIA.

Ich lebe in Tirol in Axams.
Ich arbeite nicht als klassischer Entwickler, sondern baue solche Projekte
gemeinsam mit KI-gestuetzter Unterstuetzung, Roadmaps und iterativen
Produktgespraechen auf.

Ich mag persoenlichere Chats lieber als sterile Tool-Kommunikation. Du darfst
mich deshalb gerne Stephan nennen und duzen, solange die fachliche Klarheit
erhalten bleibt.

Ich erwarte mir von Coding-Agents und KI-Unterstuetzung eine Mischung aus
pragmatischem Support, technischem Mitdenken und sauberer, senioriger
Orientierung.

H.E.S.T.I.A ist fuer mich kein Showcase-Projekt, sondern ein Werkzeug fuer den
echten Alltag von mir und meiner Familie.

## Was ist HESTIA?

HESTIA ist ein ruhiges Haushaltswerkzeug fuer den echten Alltag eines kleinen,
bekannten Haushalts.

Der aktuelle Feature-Kern ist bewusst klein:

- `Einkauf`: Dinge fuer den Markt schnell aufschreiben, teilen, abhaken und
  abschliessen
- `Amazon`: Dinge fuer spaetere Amazon-Bestellungen getrennt merken, als
  `Bestellt` markieren und entfernen
- `Muell`: naechste Entsorgungstermine sichtbar machen, ohne daraus ein
  Dashboard zu bauen

HESTIA ist kein Familien-Organizer, kein Aufgaben-System und kein
Feature-Sammelbecken.

Die ausfuehrliche Produkt- und Systembeschreibung steht in [PRODUCT.md][local1].

## Wie sollst du HESTIA verstehen?

- HESTIA ist kein generisches Shopping-Produkt.
- HESTIA ist kein SaaS fuer fremde Nutzer.
- HESTIA ist fuer einen kleinen, bekannten Haushalt gedacht.
- Reibung reduzieren ist wichtiger als Funktionsvielfalt.
- Ruhe, Klarheit und Alltagstauglichkeit sind wichtiger als technische
  Beeindruckung.

Wenn eine Idee Einkauf, Amazon-Merkliste oder Muelluebersicht nicht ruhiger,
schneller oder klarer macht, ist sie wahrscheinlich kein guter HESTIA-Change.

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

1. Beachte [AGENTS.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/AGENTS.md).
2. Lies diese `README.md`.
3. Lies [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md).
4. Lies bei Bedarf nur die fuer die Aufgabe relevanten Zusatzdokumente.
5. Lies dann erst den Code.

Arbeitsregeln:

- Freitext bleibt erlaubt.
- Der Datenvertrag `name`, `quantity`, `unit`, `inCart`, `listType` bleibt
  stabil, solange nichts anderes bewusst beschlossen wurde.
- Der sichtbare Kernbereich heisst aktuell `Einkauf`; die technische Route und
  das Modul heissen weiterhin `writing`.
- Die Home-Kachel `Amazon` oeffnet eine kleine typgetrennte Merkliste fuer
  spaetere Amazon-Bestellungen.
- Push ist spaeter Awareness, nicht Reminder-Logik.
- Household-Sync soll leichtgewichtig bleiben.
- Roadmap 1 bis 6B bilden den abgeschlossenen Feature-Kern; neue Ideen muessen
  ab jetzt besonders streng gegen Alltagsnutzen und Wartungskosten geprueft
  werden.
- Keine stillschweigende Ausweitung zu einer grossen Familien-App.

## Relevante Zusatzdokumente

- [AGENTS.md][local2]: kompakter Agenten-/Ownervertrag mit bindenden
  SoT-Verweisen
- [PRODUCT.md][local1]: kanonische Produkt- und Systembeschreibung
- [setup-supabase.md][local3]: Supabase-Setup und Household-Key-Header
- [hestia-shared-list-sync-roadmap.md][local4]: geplanter Sync-Ausbau
- [ATLAS][local5]: direkter Einstieg für gemeinsame technische Fähigkeiten;
  lokale Checks in QA, Server/Workflow im Deploymentmodul und
  Config-/Secret-/offene Watchlistgrenzen in Runtime/Setup.
- [BLUEPRINT][local6]: direkter Roadmap-Einstieg, zentraler Autorenvertrag und
  Formen; AGENTS bindet die HESTIA-Fachgrenzen in PRODUCT und Modulen;
  gemeinsame Evidence-/Reviewregeln stehen im Autorenkern.
- [HESTIA Dev Panel, Touchlog & Diagnostics Roadmap (DONE).md][local7]
- [QA_CHECKS.md][local8]: manuelle Smokechecks und Regressionsbasis
- [CSS Module Overview.md][local9]
- [Diagnostics Module Overview.md][local10]
- [docs/modules/Home Module Overview.md][local11]
- [docs/modules/Shopping Module Overview.md][local12]
- [docs/modules/Amazon Module Overview.md][local13]
- [docs/modules/Waste Module Overview.md][local14]
- [Bootflow Module Overview.md][local15]
- [State Layer Module Overview.md][local16]
- [Supabase Sync Module Overview.md][local17]
- [Runtime Config Module Overview.md][local18]
- [Deployment Module Overview.md][local19]
- [future roadmaps.md][local20]: abgeschlossene Roadmaps und bewusst geparkte
  Folgeideen

## Kurzfassung fuer neue Chats

Stephan baut mit KI-Unterstuetzung eine ruhige, alltagstaugliche Haushaltsapp
fuer seinen eigenen Haushalt. Der Feature-Kern ist `Einkauf`, `Amazon` und
`Muell`. Deine Rolle ist pragmatische, seniorige Produkt- und
Technikunterstuetzung ohne Feature-Drift. Verstehe zuerst den Produktkern und
arbeite dann klar innerhalb dieser Grenzen.

[local1]: /c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md
[local2]: /c:/Users/steph/Projekte/H.E.S.T.I.A/AGENTS.md
[local3]: /c:/Users/steph/Projekte/H.E.S.T.I.A/setup-supabase.md
[local4]: /c:/Users/steph/Projekte/H.E.S.T.I.A/hestia-shared-list-sync-roadmap.md
[local5]: ../codex-tools/apps/atlas/README.md
[local6]: ../codex-tools/docs/blueprint/README.md
[local7]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/archive/HESTIA%20Dev%20Panel,%20Touchlog%20%26%20Diagnostics%20Roadmap%20(DONE).md
[local8]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/QA_CHECKS.md
[local9]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/CSS%20Module%20Overview.md
[local10]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Diagnostics%20Module%20Overview.md
[local11]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Home%20Module%20Overview.md
[local12]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md
[local13]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Amazon%20Module%20Overview.md
[local14]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Waste%20Module%20Overview.md
[local15]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Bootflow%20Module%20Overview.md
[local16]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/State%20Layer%20Module%20Overview.md
[local17]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md
[local18]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Runtime%20Config%20Module%20Overview.md
[local19]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Deployment%20Module%20Overview.md
[local20]: /c:/Users/steph/Projekte/H.E.S.T.I.A/docs/future%20roadmaps.md
