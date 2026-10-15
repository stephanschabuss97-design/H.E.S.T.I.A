# HESTIA Agent Contract

## Product boundary

- HESTIA is Stephan's quiet tool for a small known household, not a generic
  organizer, SaaS or multi-tenant platform. No speculative platform abstractions.
- Favor low friction, honest state and maintainability. Changes must make a real
  household flow quieter, faster or clearer; free text remains allowed.

## Binding sources

- Read [README](README.md), [PRODUCT](PRODUCT.md) and relevant `docs/modules/*.md`
  before code. PRODUCT owns binding product/data/runtime/access/offline/PWA/sync
  contracts, product-risk checks and local archive/documentation practice.
- Enter [BLUEPRINT](../codex-tools/docs/blueprint/README.md) directly for roadmaps
  and their Evidence/review/handoff documentation. Its authoring contract and
  three forms are the sole current process/template source, including the
  applicable review obligations also outside roadmaps. Active roadmap/Evidence
  govern execution.
- Enter [ATLAS](../codex-tools/apps/atlas/README.md) directly for shared tool
  facts; follow BLUEPRINT's Capability Preflight and read only needed sections.
- Adopt [NOMOS-QA](../codex-tools/apps/nomos/QA_STANDARDS.md) directly:
  `NOMOS-QA / 2026-10-15 / E01`, prospectively for applicable new or changed
  test and procedure definitions. Running and frozen roadmaps retain their
  actual adopted basis. HESTIA owns concrete tests, product/architecture,
  commands and household/security/owner boundaries; local QA remains binding.
- Actual local checks belong to [QA](docs/QA_CHECKS.md); server/workflow use to
  [deployment](docs/modules/Deployment%20Module%20Overview.md), config/secrets
  to [runtime](docs/modules/Runtime%20Config%20Module%20Overview.md) and
  [setup/watchlist](setup-supabase.md#security-watchlist-vom-2026-08-28).
  Read affected local sources; archived DONE/LEGACY is historical evidence.

## Working rules

- Preserve unrelated dirty work; keep changes scoped, reversible and compatible
  with the binding household/product contracts. Never expose or commit secrets.
- Production SQL/RLS, Supabase changes, deploys, workflows, devices, pushes and
  other external writes require actual owner authority in the roadmap/order.
- Do not commit, tag, push or publish without Stephan's explicit request.
- New German UI/prose uses Austrian German spelling and umlauts. Preserve
  unrelated existing ASCII transliterations.

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
