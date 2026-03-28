# Module: Writing

## Purpose

Fast list capture with optional semantic assistance.

## Scope

- free text input (never blocked)
- quantity/unit defaults
- autocomplete hints
- remove entries

## Current Implementation

File: `app/modules/writing.js`

- listens on `#item-form`
- infers units from semantic helper
- writes items into store
- rerenders on each change

Semantic source: `assets/js/semantics.de.json`

- object-based entries: `id`, `label`, `aliases`, `default_unit`, optional `category`
- autocomplete uses canonical `label`
- unit suggestions resolve by normalized `label`/`aliases`, then fallback keyword heuristic

## Planned Upgrade

- inline editing per row
- synonyms and locale packs from curated semantic file
- optimistic Supabase sync
