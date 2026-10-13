# HESTIA Agent Contract

## Product Boundary

- HESTIA is Stephan's quiet household tool for a small, known household. It
  replaces paper notes in the shared shopping flow; it is not a generic
  organizer, task system, SaaS product, or multi-tenant platform.
- Optimize for low friction, calm daily use, honest state, and long-term
  maintainability. Do not add speculative platform abstractions.
- Preserve the established product core: `Einkauf`, `Amazon`, and `Muell`.
  New work must make a real household flow quieter, faster, or clearer.
- Freitext remains allowed. Semantics, quantities, and units assist but never
  block the user.

## Sources Of Truth

1. Read the root `README.md` for collaboration context and product intent.
2. Read `PRODUCT.md` for the canonical product and system contract.
3. Read only the relevant `docs/modules/*.md` files for module contracts.
4. For roadmap creation, enter [BLUEPRINT](../codex-tools/docs/blueprint/README.md)
   directly. Its authoring contract and central forms are the single current
   roadmap process/template source of truth; apply the project boundaries below.
5. Before finalizing a new tool-dependent roadmap, perform the Environment
   Capability Preflight in the BLUEPRINT authoring contract. Read the local overlay
   and only needed ATLAS sections; missing/incompatible tools require an owner
   decision, never automatic installation. BLUEPRINT owns shared authoring;
   HESTIA retains household data, PWA, deployment and quality gates.
6. The active roadmap and optional Evidence file govern current execution.
7. Archived `(DONE)` roadmaps and `(LEGACY)` process documents are historical
   evidence, not active instructions for new work.

Read only references relevant to the current task. Search large sources by
section, symbol, producer, or consumer before opening a broad range. Reuse a
fingerprint-bound Context Receipt only while its source and covered contract
remain unchanged; otherwise read the authoritative source.

## Working Rules

- Work with the existing static HTML/CSS/JavaScript PWA and optional Supabase
  snapshot sync. HESTIA has no web build step and does not need one by default.
- Preserve the UI data contract `name`, `quantity`, `unit`, `inCart`,
  `listType` unless Stephan explicitly changes it.
- Preserve the `fast in, fast out` model: current open state matters; HESTIA is
  not a household history or metrics system.
- Keep local-only operation working when Supabase credentials or connectivity
  are unavailable.
- Keep changes scoped, reversible, and compatible with the known-household
  access model. Do not silently introduce personal accounts or identity-first
  workflows.
- Treat production SQL, RLS, remote Supabase changes, deploys, workflow runs,
  device actions, pushes, and other externally visible writes as owner-gated
  unless an active roadmap records explicit approval.
- Preserve unrelated user changes in a dirty worktree.
- New German UI and prose use correct Austrian German spelling and umlauts.
  Existing ASCII transliterations do not need unrelated cleanup.

## Review And Evidence

- A `native review` means local code, contract, security, and scope inspection.
  It does not mean CodeRabbit.
- During roadmap execution with code changes, CodeRabbit belongs only to S5:
  one initial run and at most one verification run after justified fixes.
  Documentation-only roadmaps use no external review.
- Further external review runs require a new explicit owner request; a new
  finding alone does not increase the budget.
- Outside a roadmap, run CodeRabbit only when Stephan explicitly requests it.
- Use the canonical Windows command `coderabbit`. Do not reinstall or replace
  it while that command works. If command or authentication fails, report the
  prerequisite instead of improvising an alternate installation.
- Rerun only checks invalidated by changed files, producers, consumers, or
  contracts. A full rerun is required only where shared behavior, security,
  data integrity, or the roadmap demands it.

## Roadmap Execution and Local Boundaries

- Read BLUEPRINT directly with this AGENTS file. New roadmaps explicitly adopt
  its dated revision; there is no local template or required LEGACY reading.
  Existing active roadmaps retain their frozen process and scope. Exact old
  rules come from their Git baseline when needed; current real product,
  security and owner gates and KASRKIN detachment remain effective.
- Local autonomy default is `gated`; use BLUEPRINT profiles and actual owner
  authority. A concrete full-scope approval permits green internal continuation
  without another routine question. Active roadmap/Evidence govern execution.
- Keep product/README, active roadmap/Resume/Findings, dirty boundary/diff,
  changed code and productive owner gates as live context; exact source reuse
  and read sufficiency follow BLUEPRINT. No usage/reset/checkpoint prerequisite.
- Active roadmap and optional Evidence live in `docs/`; after verified S6,
  archive both as `(DONE)` in `docs/archive/`, maintain links and final checks.
  `(LEGACY)` files have historical authority only. Commit/push require an
  explicit owner request, separate from documentation completion.
- PRODUCT and README are live project context. Before product implementation,
  prove a real household flow becomes quieter/faster/clearer, no silent
  organizer/SaaS/history expansion, and free text/local usage/current data
  contracts remain intact or explicitly changed. Open product questions block
  the affected implementation. Documentation work records preserved boundaries.
- Target/risk review covers data/error/offline/snapshot-sync/security/copy,
  silent overwrite/false sync state/data loss, auth/RLS/races/cache/service
  worker/realtime as relevant. Freeze data model/lifecycle/sync/runtime config
  and compatible producers/consumers before implementation.
- S4R forecasts whole PWA/runtime/remote work, browser/device tests, review,
  troubleshooting and closure using BLUEPRINT; all productive SQL/RLS, deploy,
  workflow, push and external writes remain their own owner gates.
- Separate Evidence is mandatory for productive write/delete SQL; migration,
  RLS/ACL/roles/schedulers; multiple deploys or remote runtime gates; concurrency,
  lock, rollback or extensive before/after proofs. Use central BLUEPRINT fields.
  Small local proofs stay in the roadmap; no secrets, household keys, tokens
  or sensitive raw data. Existing reasoning defaults remain unchanged:
  creation/initial review may use Extra High, execution is planned by risk.
- S6 updates affected README/PRODUCT/modules/QA/setup/future documentation only
  with proven results. HESTIA has no mandatory changelog; don't introduce one.
  Optional follow-up postimage receipt follows BLUEPRINT at one existing place.

## KASRKIN freeze / consumer detached — 2026-10-12

Stephan explicitly withdrew this project's KASRKIN consumer integration and
authorized detachment without a permit. This project is NOT an active KASRKIN
consumer. Normal work and roadmaps require no KASRKIN command trust setup,
telemetry refresh, request, forecast, reserve, Begin, permit or Complete.
This owner decision supersedes historical KASRKIN clauses in existing roadmaps;
it does not change their scope, acceptance, review or product/owner gates.

KASRKIN development and individual component review may continue in codex-tools.
Its production use is frozen. Do not restore a binding, activate an installation
or reintroduce enforcement without a new explicit owner decision.
Installed releases, receipts, historical starts/charges and original records
remain retained; detachment creates no usage record or eligible cost history.
Product, security, external-write and review gates remain in force. Paid Credits
are not authorized. Preserve unrelated work and create a safe handoff when needed.
Details and exact preimages: [integration status](.kasrkin/integration.md).
