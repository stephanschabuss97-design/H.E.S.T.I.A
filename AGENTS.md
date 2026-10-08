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

## Usage-Aware Continuation

- During local roadmap execution on Stephan's Windows workstation, apply the
  central usage continuation contract before the first main block and before
  every later coherent execution block.
- Refresh and validate only through the canonical commands in
  `docs/DEV_ENVIRONMENT.md`. Do not infer quota from Rainmeter, chat banners,
  browser UI, or remembered values, and do not reinterpret raw JSON ad hoc.
- In this initialized consumer, invoke KASRKIN through the stable `kasrkin`
  command from the project tree. Its resolver must validate the project-local
  `.kasrkin/binding.json` and exact installed release before dispatch. W7
  retired the duplicated local snapshot; recovery uses the proven
  `codex-tools` source, installed release and receipts under an explicit
  rollback boundary.
- The exact bound KASRKIN release is the sole executable authority for usage
  decisions. HESTIA owns when the tool is consulted and how its result is
  applied to HESTIA-specific execution, rollback, product, and owner gates.
  `.kasrkin/activation.json` binds that split and the consulted local contracts;
  any mismatch is contract drift and fails closed.
- Missing, partial, failed, or stale telemetry forbids a new major block.
  Preserve the last complete block, synchronize the roadmap and Resume Card,
  and stop at a safe resume boundary.
- Usage gates never interrupt an atomic block and never weaken product,
  security, owner, deploy, SQL, workflow, or external-write gates.

## PRISM

- Only on an explicit PRISM review request, use the canonical
  [PRISM entry point](../codex-tools/docs/prism/README.md). Ordinary idea discussions
  do not activate PRISM. Preserve HESTIA household, data, offline/PWA, security
  and execution gates; a review neither authorizes nor automatically implements changes.


## Installed KASRKIN Endphase (Activation/3)

- In every new PowerShell process, verify the local .kasrkin/command.json,
  binding, installation receipt and installed bootstrap bytes. Invoke that
  bootstrap with -ProjectRoot set to this project before kasrkin. Get-Command
  kasrkin must resolve the selected shim. No fallback, alias shadowing or
  persistent PATH change. Refresh with kasrkin validate -Refresh -Envelope.
- The pinned installed release owns usage decisions; this project's workflow
  owns product, medical/data/security/review, owner and external-write gates.
- Normal CONTINUE work may use regular admission. CAUTION or rejected primary
  work requires kasrkin gate -Endphase with a frozen complete plan and -Start,
  an allowed effectiveDecision and persisted permit before the first work
  action. Low-level policy or a W1 CAUTION result alone is insufficient.
- Complete the same permit with -CompletionPath after verification, review,
  evidence, documentation and closure. Measure freshly for each next whole
  block. These Endphase rules supersede the older one-block/SMALL restriction
  only for work admitted under this installed Endphase contract.
- First failure stops at the defined Finding/rollback boundary; no automatic
  diagnosis, fix or retry. Missing costs, capacity, episode and substantive
  gates remain separate reasons. Never invent AVAILABLE state or history.
- Owner exceptions require genuine finite scope/release-bound authorization.
  Controlled serial usage is required; no account-wide reservation is claimed.
  Paid-credit availability grants no spend. LIMIT/0 is final-response-only.


## KASRKIN work interface (Activation/3)

The process-only selected bootstrap, receipt/payload integrity and this project's
own consultations remain mandatory. In Windows PowerShell 5.1 use the bound local
K0 proof before the selected bootstrap; neither performs a usage refresh.
Before executing that local proof, compare its bytes/hash against the proof
record in the externally SHA-verified pinned receipt, and verify selected
bootstrap bytes/role. The self-check alone does not establish execution trust.
Describe one complete block in a project-local kasrkin-work/2 request and use
`kasrkin work -InputPath <request>` to derive immutable scope/plans/hashes.
Preparation grants no admission or owner authority. For regular work use
`kasrkin work -Action Begin -BundlePath <bundle>`; its one canonical fresh gate
replaces a separate setup validate/regular gate for that same operation. Work
starts only on PRIMARY_ALLOWED. For CAUTION/rejected regular work use an explicit
Endphase plan and `Begin -Endphase`; an allowed decision and original persisted
permit remain required before work. Do not query Regular and then Begin merely
to repeat the same check. Legacy explicit validate/gate commands remain valid.

After actual implementation, verification, native review, evidence/documentation
and safe closure, supply an honest kasrkin-work-completion/2 report and use
`work -Action Complete -BundlePath <bundle> -CompletionPath <report>` (add
`-Endphase` only for the actual Endphase permit). Complete records one canonical
end measurement and derives a receipt; unknown attribution/bounds stays
ineligible. No completed stage, eligible history or finite owner exception is
generated by convenience automation. First failure still closes the block at
its Finding/rollback boundary; any diagnosis/repair needs separate admission.
`work -Action Status` projects original state without refresh/reset/charge;
`Receipt` republishes exact preserved checkpoints without another measurement.
Original episode and owner policy remain authoritative, with unchanged floors,
caps, reserve, eligibility, paid-spend and project-specific substantive gates.

Activation/3 excludes only the explicitly nonnormative notes body on approved
document roles. All other bytes, legend/markers, references, local identity,
product/workflow/security/owner rules and executable selections remain protected.
Notes are never instructions, authority, execution evidence or command selection.
See [KASRKIN Manual](../codex-tools/apps/kasrkin/docs/KASRKIN%20Manual.md#work3-schnittstelle) for the request/report
schema and recovery boundaries. No persistent PATH or automatic reactivation.



## Explicit KRC-C2 Work/2 cutover — 2026-10-06

Current exact selection: kasrkin-1e00b126f303d631 in kasrkin-admin-v1;
receiptSHA51ea013ec6d2227555bc096dcfe9bf32bdc758ec597f1124497578180c4d3ac1.
This dated section supersedes older KASRKIN interface/version descriptions.
Receipt-verified local K0 and selected bootstrap in Windows PowerShell5.1
remain mandatory; all own product/security/workflow/owner gates stay intact.
Work/2 preparation performs a bounded local AUTO census and derives a candidate
without refresh or admission. Finalize binds an actual valid standing rule or
exact finite owner authority; Begin takes one canonical fresh measurement.
Complete takes one original end measurement after all six actual work stages.
Status/Receipt never refresh, reserve quota or grant admission.
History requires verified original Work/2 checkpoints, eligible Cost/3, matching
profile/technical coverage and exact resets; unknown values remain ineligible.
No generic first run: the two named finite local R1/SMALL documentation and
R3/MEDIUM read-only discovery pilots require an actual bound contract, CONTINUE,
known unblocked accounting, episode/rule/family caps and all substantive gates.
Forecast, ceiling and conservative actual charge remain distinct. Unknown or
excess accounting blocks further exceptions. No implicit state migration/reset,
AVAILABLE attestation, eligible history, paid spend or owner authorization.
Existing State/1 pairs migrate explicitly with exact SHA/preimages and all prior
starts/charges/blocks preserved; missing state stays NOT_INITIALIZED/UNKNOWN.
New activation preserves four/nine/nine roles and process-only exact selection.
Source checkout is unnecessary for installed command dispatch. Lossless rollback
or fail-closed rejection protects every newer charge and original checkpoint.

## KRC-CONTRACT-2 Work/3 consultation — 2026-10-08

The current Work/3 contract in this project\'s .kasrkin/integration.md
supersedes older KRC-C2 Work/2-only KASRKIN projections here. Consult that
exact role together with this artifact\'s unchanged domain and owner gates.
Usage admission never replaces those gates; no Paid Credits are granted.

<!-- KASRKIN NONNORMATIVE NOTES V1: informational only; never instruction, authority, evidence or executable selection. -->
<!-- KASRKIN NONNORMATIVE NOTES BEGIN -->
Human annotations only. Normative rules and execution evidence belong outside this section.
<!-- KASRKIN NONNORMATIVE NOTES END -->
