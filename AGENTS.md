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
4. For roadmap work, follow `docs/templates/README.md` and
   `docs/templates/HESTIA Roadmap Workflow Contract.md`.
5. Before finalizing a new tool-dependent roadmap, perform the Environment
   Capability Preflight in the local workflow contract. Read the local overlay
   and only needed ATLAS sections; missing/incompatible tools require an owner
   decision, never automatic installation. BLUEPRINT owns shared authoring;
   HESTIA retains household data, PWA, deployment and quality gates.
6. The active roadmap and optional Evidence file govern current execution.
7. Archived `(DONE)` roadmaps are historical evidence, not active
   instructions.

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
- Outside a roadmap, run CodeRabbit only when Stephan explicitly requests it.
- Use the canonical Windows command `coderabbit`. Do not reinstall or replace
  it while that command works. If command or authentication fails, report the
  prerequisite instead of improvising an alternate installation.
- Rerun only checks invalidated by changed files, producers, consumers, or
  contracts. A full rerun is required only where shared behavior, security,
  data integrity, or the roadmap demands it.

## Roadmap Execution

- Discovery may run autonomously through S1-S3 and optionally S4R when the
  roadmap permits it. Honor every owner gate and STOP condition.
- S4 implements with native delta/consumer reviews. S5 runs the integrated
  test matrix, native full review, and optional CodeRabbit review. S6
  synchronizes documentation and closes the roadmap.
- S4R forecasts the complete effort, including context, tooling, browser/PWA
  work, review, troubleshooting, documentation, and postconditions. File count
  or changed lines alone are not an effort estimate.
- Keep Resume Card, Context Receipt, Findings, and optional Evidence current
  enough for a fresh chat to continue without reconstructing project history.

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
