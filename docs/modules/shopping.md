# Module: Shopping

## Purpose

Execution mode for open list items.

## Scope

- display all open items
- toggle `Im Wagen`
- finish action deletes checked items
- unresolved items remain

## Current Implementation

File: `app/modules/shopping.js`

- event-driven rerender on `hestia:items-updated`
- checkbox updates item status
- finish action performs hard delete for checked items

## Planned Upgrade

- collaborative updates from Supabase realtime
- conflict handling for simultaneous edits
- optional "not found" marker
