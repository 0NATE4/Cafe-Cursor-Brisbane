# ARS v4.0 Upgrade Proposal: A Comprehensive Roadmap for Next-Generation Academic Research Skills

**Document version:** 1.0
**Target baseline:** ARS v3.9.4.2
**Proposed milestone:** ARS v4.0 ("Provenance, Reproducibility, and Cognitive Partnership")
**Audience:** Maintainers, contributors, and researchers extending the ARS ecosystem

---

## 0. Executive Summary

ARS has matured into one of the most rigorous human-in-the-loop academic AI pipelines available, with strong emphasis on integrity gates, anti-sycophancy protocols, and locator-anchored citations. The v3.7.x → v3.9.x line has substantially closed the L3 (claim-faithfulness) gap and added cross-index triangulation.

However, the system still has structural opportunities in eight areas: **(1)** retrieval architecture, **(2)** experiment-to-paper integration, **(3)** longitudinal cognitive partnership, **(4)** multi-agent orchestration efficiency, **(5)** evaluation rigor, **(6)** domain-specific extensibility, **(7)** institutional/compliance integration, and **(8)** developer ergonomics.

This document proposes a coordinated v4.0 release organized into **twelve workstreams**, each scoped with rationale, technical design sketch, dependencies, risks, and acceptance criteria. The proposal is opinionated but modular — workstreams can ship independently as v3.10, v3.11, … v4.0 over a 9–12 month horizon.

---

## 1. Diagnostic: What ARS Does Well and Where the Frontier Lies

### 1.1 Current strengths (do not regress these)

- **Integrity gates as first-class citizens.** Stage 2.5 / 4.5 cannot be skipped; the 7-mode AI failure-mode checklist (Lu et al. 2026) is a real differentiator versus naive AI writing tools.
- **Locator-anchored citations (v3.7.3 → v3.8).** Three-layer anchors plus the optional `ARS_CLAIM_AUDIT=1` pass move ARS beyond "does this reference exist" into "does this reference actually support the claim."
- **Cross-index triangulation (v3.9.0).** S2 + OpenAlex + Crossref with k=0/1/2/3 advisory tiers is conceptually correct and avoids the single-index trap.
- **Anti-sycophancy discipline.** DA concession threshold protocol, intent detection, dialogue health indicator — these are non-trivial and not present in most competitors.
- **Honest self-reporting culture.** The post-publication audit that found 21/68 issues missed by three rounds of integrity checks is exemplary; the project documents its failures rather than hiding them.
- **Schema-driven design.** Material Passport, sprint contracts, claim audit results, etc., are machine-checkable artifacts rather than free-text prompts.

### 1.2 Structural gaps for v4.0 to address

1. **Retrieval is shallow.** The system currently relies on metadata-level verification (S2/OpenAlex/Crossref) and ad-hoc fetches for the claim audit pass. There is no proper RAG layer over a user-curated corpus, no semantic chunk index, and no full-text persistence between stages.
2. **Experiment-paper handoff is loose.** The companion Experiment Agent runs in a separate session and brings results back via Material Passport. There is no first-class artifact lineage linking specific tables/figures in the paper to specific experiment runs, code commits, or data hashes.
3. **No longitudinal memory across projects.** Style Calibration learns from past papers, but there is no persistent researcher profile that accumulates: methodological preferences, recurring weaknesses flagged by reviewers, vocabulary drift, citation network.
4. **Agent orchestration is mostly sequential.** Beyond the Stage 2 visualization/argument parallelization (v3.3), the 13/12/7 agent rosters run largely in series. Cost and wall-clock could improve substantially with proper DAG scheduling.
5. **Evaluation infrastructure is gold-set-bound.** The v3.8 calibration uses a 20-tuple gold set with FNR<0.15 / FPR<0.10 thresholds. This is a good start but does not generalize to corpus-scale, cross-domain, or adversarial benchmarks.
6. **Domain coverage is uneven.** The reference materials lean toward computer science, education, and information systems. STEM lab sciences (wet-lab biology, chemistry, materials), clinical research (CONSORT, STROBE), qualitative research (COREQ, SRQR), and humanities have lighter support.
7. **Institutional features are minimal.** No multi-author collaboration model, no IRB/ethics workflow integration beyond a checklist, no journal-specific submission package automation, no ORCID/funder reporting.
8. **Developer experience.** The plugin install path is good, but contributing a new agent or domain pack requires understanding many implicit conventions. There is no plugin SDK, no agent scaffolding CLI, no formal extension point registry.

---

## 2. Design Principles for v4.0

Before the workstreams, fix the principles. Every proposed feature must satisfy:

1. **Human-in-the-loop is non-negotiable.** No workstream may introduce a path that lets the pipeline run end-to-end without checkpoint confirmations on substantive judgments.
2. **Advisory before blocking.** New checks ship as advisory first, accumulate calibration evidence, then graduate to blocking gates with documented FNR/FPR thresholds (mirror the v3.8 ramp-on pattern).
3. **Schema before prompt.** Any new agent output that downstream agents consume must be a JSON-schema-validated artifact, not free text.
4. **Provenance over plausibility.** When ARS cannot verify, it must say so with a typed marker, not produce plausible-looking output.
5. **Reproducibility documented, not promised.** LLM outputs are not byte-reproducible (per the v3.3.5 `repro_lock` doctrine). Document configuration, do not claim replay.
6. **Open-ended task discipline.** Most ARS tasks are open-ended; resist the temptation to add outcome-graded benchmarks where they don't fit.
7. **Backward compatibility for two minor versions.** v3.x users must keep working through v4.0 and v4.1 with at most a one-command migration tool per breaking change.

---

## 3. Workstream Overview

| # | Workstream | Target version | Effort | Risk | Priority |
|---|---|---|---|---|---|
| W1 | Persistent retrieval layer (RAG-over-corpus) | v3.10 | L | M | High |
| W2 | First-class experiment lineage | v3.11 | M | M | High |
| W3 | Researcher profile & longitudinal memory | v3.12 | M | M | Med |
| W4 | Agent DAG scheduler & parallel cost optimizer | v3.13 | L | M | High |
| W5 | Evaluation harness v2 (corpus-scale, adversarial) | v3.14 | L | M | High |
| W6 | Domain packs (clinical, qualitative, STEM lab, humanities) | v3.15 | L | L | Med |
| W7 | Submission package & journal automation | v3.16 | M | L | Med |
| W8 | Multi-author collaboration model | v3.17 | M | M | Med |
| W9 | Plugin SDK & agent scaffolding CLI | v3.18 | M | L | Med |
| W10 | Native multimodal support (figures, tables, equations) | v3.19 | L | M | Med |
| W11 | Adversarial robustness & prompt-injection hardening | v3.20 | M | H | High |
| W12 | v4.0 unification: governance, telemetry, and release | v4.0 | M | L | — |

L = Large (3–4 months), M = Medium (1–2 months). Risk is technical + scope risk.

---

## 4. Workstream Details

### W1 — Persistent Retrieval Layer (RAG-over-corpus)

**Problem.** The v3.6.4 `literature_corpus[]` input port and v3.6.5 consumer integration give agents a list of references but not a queryable semantic index over their **full text**. Every claim audit pass currently re-fetches and re-parses sources. Cross-stage reuse is poor.

**Proposal.** Introduce a `corpus_index/` directory in the Material Passport workspace containing:

- `chunks.parquet` — chunked full text with metadata (`ref_slug`, `section_path`, `page`, `paragraph_id`, `char_offsets`).
- `embeddings.npy` — embedding matrix aligned to chunks. Embedding model is declared in `passport.yaml` under `corpus_index.embedding_model`.
- `bm25.index` — BM25 sparse index for hybrid retrieval.
- `provenance.yaml` — per-chunk extraction provenance (PDF page, OCR engine if used, extraction confidence, `extracted_at`).

A new agent `corpus_indexer_agent` runs after `bibliography_agent` ingestion. It supports incremental indexing (only re-chunk new or changed entries by content hash). A retrieval API:

```python
# scripts/corpus_retrieval.py
def retrieve(
    query: str,
    *,
    ref_slugs: list[str] | None = None,
    k: int = 8,
    hybrid_alpha: float = 0.5,  # 1.0=pure dense, 0.0=pure BM25
    section_filter: str | None = None,
) -> list[Chunk]: ...
```

**Integration points.**

- `synthesis_agent`, `draft_writer_agent`, `report_compiler_agent`: when emitting a citation, may pre-retrieve a candidate quote anchor from the index, reducing hallucinated locators.
- `claim_ref_alignment_audit_agent` (v3.8): retrieval-augmented judging — instead of fetching the full PDF and prompting a long-context judge, retrieve top-k chunks per (claim, ref_slug) pair and judge against those. Cuts judge token cost by ~70%.
- `literature_strategist_agent`: corpus-first search becomes corpus-first **semantic** search.

**Schema additions.**

- `corpus_index_manifest.schema.json` declaring chunker version, embedding model, embedding dim, chunk count, indexed-at timestamp, content-hash → chunk-id map.
- New advisory marker `[CORPUS-INDEX-STALE]` when the manifest's content hashes don't match current corpus entries.

**Acceptance criteria.**

- Retrieval latency < 200 ms for k=8 on a 500-paper corpus (commodity laptop).
- Claim audit token cost reduction ≥ 50% on the v3.8 calibration gold set with no FNR regression.
- Rebuild idempotent and content-hash-driven; CI test verifies that re-indexing the same corpus produces byte-identical `chunks.parquet`.

**Risks.**

- Embedding model choice locks users into a particular vector space. Mitigation: the model identifier is part of the manifest, and a `corpus_reindex.py` migration tool re-embeds when the project changes models.
- PDF extraction is unreliable for figure-heavy or scanned papers. Mitigation: emit `extraction_confidence: low` and gate downstream auto-quote anchors when confidence is low.

---

### W2 — First-Class Experiment Lineage

**Problem.** The companion Experiment Agent feeds results back via Material Passport, but the link from a specific paper sentence ("our Transformer baseline achieves 78.4% accuracy") to a specific experiment run, code commit, and dataset version is informal. This is precisely where the Lu et al. (2026) failure modes hit hardest: implementation bugs, hallucinated results, methodology fabrication.

**Proposal.** Add an `experiment_lineage[]` aggregate to Material Passport (Schema 14) with entries like:

```yaml
- run_id: exp_2026_06_03_baseline_transformer
  code_commit: 4a8f2c1
  code_repo: github.com/user/project
  config_hash: sha256:...
  dataset_versions:
    - name: imagenet-1k
      version: v1.2
      hash: sha256:...
  primary_metrics:
    - name: top1_accuracy
      value: 0.7841
      ci_lower: 0.7793
      ci_upper: 0.7889
      ci_method: bootstrap_1000
  artifacts:
    - kind: figure
      path: figures/fig3_loss_curve.pdf
      generator: scripts/plot_loss.py
    - kind: table
      path: tables/tab2_main_results.tex
      generator: scripts/make_main_table.py
  environment:
    python: 3.11.7
    cuda: 12.4
    seed: 42
  ran_at: 2026-06-03T14:22:10Z
  ran_by: user@host
```

Every numeric claim, table, and figure in the paper must carry a `<!--exp:run_id-->` HTML comment anchor (analogous to v3.7.3's three-layer citation anchors). A new agent `experiment_alignment_audit_agent` (opt-in, `ARS_EXP_AUDIT=1`) verifies:

1. Every numeric claim with a `<!--exp:-->` anchor matches the recorded `primary_metrics` value within tolerance.
2. Every figure/table file is reachable and its file hash matches the lineage record.
3. No paper claim references a `run_id` that doesn't exist in the lineage.
4. Confidence intervals, when claimed in prose, are present in the lineage.

**Integration with W1.** Lineage data is itself indexable; the Methods section can be drafted with retrieval against `experiment_lineage[]`, ensuring the methodology description matches what was actually run.

**Acceptance criteria.**

- A reference paper with 12 numeric claims, 3 figures, 2 tables passes audit with zero false positives.
- Tampering with any numeric value in the draft (not the lineage) triggers `[EXP-CLAIM-MISMATCH]` HIGH-WARN.
- Stage 4.5 integrity gate is extended to consume experiment audit results when the flag is on.

**Risks.**

- Forces users to instrument their experiment code. Mitigation: ship lightweight Python decorators (`@ars_track_run`, `@ars_emit_metric`) and an R analog; provide an "after-the-fact" lineage builder that reconstructs from existing log files.

---

### W3 — Researcher Profile & Longitudinal Memory

**Problem.** Every ARS session starts cold. Style Calibration learns from past papers each time. Recurring patterns (this researcher consistently misuses "significant," tends toward weak claims in the Discussion, has had three reviewers complain about under-specified ablations) are forgotten.

**Proposal.** Introduce `~/.ars/profile/<profile_id>.yaml` with consent-gated, opt-in longitudinal storage:

```yaml
profile_id: cwu-edtech-2026
created_at: 2026-04-01
consent:
  store_style_profile: true
  store_review_history: true
  store_citation_network: true
  expiry: 2029-04-01
style_profile:
  source_papers: [...]
  vocabulary_preferences: {...}
  sentence_burstiness: {...}
recurring_review_signals:
  - pattern: under_specified_ablations
    flagged_in: [paper_a_r1, paper_c_r2, paper_e_r1]
    last_seen: 2026-03-12
    severity: medium
citation_network:
  frequent_authors: [...]
  field_clusters: [...]
self_reflection_history:
  - session: 2026-04-01_da_concession_rate
    value: 0.22
    notes: ...
```

A new agent `researcher_profile_agent` reads this at session start (when enabled) and injects two things into the orchestrator's context:

1. A "watch list" of patterns the user has historically struggled with — surfaces during Stage 2 (writing) and Stage 3 (review).
2. Style continuity hints layered under v2.9 Style Calibration.

**Privacy and consent posture.** Profiles are local-only by default; any cloud sync is explicit opt-in via a separate `ARS_PROFILE_SYNC` flag with a documented backend contract. Profiles can be exported, redacted, or deleted with `ars-profile` CLI subcommands.

**Acceptance criteria.**

- A simulated longitudinal user (3 papers over 12 months) shows the agent correctly carrying forward at least 3 distinct recurring patterns with citations to specific past sessions.
- Disabling consent fully removes profile data within one CLI command and is verifiable by file inspection.
- No profile data is included in any artifact uploaded by built-in tooling unless `ARS_PROFILE_INCLUDE_IN_EXPORT=1` is explicitly set.

**Risks.**

- Privacy and consent. Mitigation: opt-in default-off, local-only default, expiry timestamps, transparent storage path.
- The agent could become a sycophancy vector ("you've struggled with this before, but this time it's much better!"). Mitigation: extend the v3.0 anti-sycophancy rules to profile-driven prose.

---

### W4 — Agent DAG Scheduler & Parallel Cost Optimizer

**Problem.** With 13 + 12 + 7 + 10 agents, sequential execution leaves substantial parallelism on the table. The v3.3 Stage 2 viz/argument parallelization is the only formal parallel point. Wall-clock for a 15k-word paper is hours, not because the work is intrinsically serial but because the orchestrator is.

**Proposal.** Replace the implicit stage-linear orchestration with an explicit DAG declared per pipeline mode at `academic-pipeline/dags/<mode>.yaml`:

```yaml
mode: full
nodes:
  - id: bibliography
    agent: bibliography_agent
    depends_on: []
    estimated_tokens: 12000
  - id: corpus_index
    agent: corpus_indexer_agent
    depends_on: [bibliography]
    estimated_tokens: 0  # no LLM
  - id: lit_strategy
    agent: literature_strategist_agent
    depends_on: [corpus_index]
    estimated_tokens: 8000
  - id: outline
    agent: outline_architect_agent
    depends_on: [lit_strategy]
    estimated_tokens: 6000
  - id: viz_design
    agent: visualization_agent
    depends_on: [outline]
    estimated_tokens: 9000
  - id: draft_intro
    agent: draft_writer_agent
    args: {section: intro}
    depends_on: [outline]
    estimated_tokens: 14000
  - id: draft_methods
    agent: draft_writer_agent
    args: {section: methods}
    depends_on: [outline]
    estimated_tokens: 12000
  ...
checkpoints:
  - after: [outline]
    type: FULL
  - after: [draft_intro, draft_methods, draft_results, draft_discussion]
    type: FULL
```

A scheduler `scripts/run_dag.py`:

- Validates the DAG topologically and against a registered agent manifest.
- Runs nodes in topological order with bounded parallelism (default 3, configurable via `ARS_MAX_PARALLEL_AGENTS`).
- Respects checkpoint nodes — pauses for user confirmation before any post-checkpoint node runs.
- Reports a budget plan up front (sum of `estimated_tokens` × per-model price) so users approve cost before spending.

**Integration points.**

- Existing checkpoint semantics are preserved; the scheduler reads checkpoint declarations from the DAG.
- The integrity gates (Stage 2.5 / 4.5) become DAG nodes with dependency edges to all their input artifacts and a fan-out to all downstream nodes — so skipping is structurally impossible, not just rule-prohibited.
- Failed nodes can be re-run with their dependencies cached (content-hash keyed).

**Acceptance criteria.**

- Wall-clock reduction ≥ 35% on full-pipeline reference run with `ARS_MAX_PARALLEL_AGENTS=3`.
- Token cost within ±5% of sequential baseline (parallelism shouldn't change total work).
- 100% checkpoint preservation: no DAG can be defined that bypasses an integrity gate (validated by lint).

**Risks.**

- Race conditions on shared artifacts (passport, corpus index). Mitigation: artifacts are append-only or content-hashed; the scheduler holds a write lock per artifact.
- Increased orchestrator complexity. Mitigation: ship default DAGs for all modes; users only edit DAGs as an advanced feature.

---

### W5 — Evaluation Harness v2

**Problem.** The v3.8 calibration with a 20-tuple gold set is a meaningful start but doesn't scale. There is no answer to: "How does ARS perform on a 1000-paper corpus across 5 disciplines?" or "What's the FNR on adversarially crafted citations?"

**Proposal.** A new top-level directory `evaluation/` containing:

1. **Benchmark suite** — multi-task, multi-discipline:
   - `eval_citation_existence/` — does this reference exist? (gold: ~2000 citations across 5 fields, sourced from retracted-papers corpus + valid corpus).
   - `eval_claim_faithfulness/` — does the cited source support the claim? (gold: ~500 hand-annotated tuples; extension of v3.8 gold set).
   - `eval_methodology_fabrication/` — does the methodology described match the paper's actual methods? (synthetic + real cases).
   - `eval_review_quality/` — given a paper and a gold review, does ARS's reviewer agent identify the same critical issues?
   - `eval_writing_quality/` — held-out papers with known stylistic issues.
2. **Adversarial test pack** — citations with subtly wrong page anchors, fabricated quotes that are "plausible but unsupported," methodology descriptions with one critical step omitted, etc. ~100 hand-crafted cases.
3. **Cross-domain coverage report** — runs the full suite across CS, biology, education, IS, humanities, and surfaces per-domain FNR/FPR.
4. **Continuous benchmarking CI** — a nightly job runs a subset of the suite against the current main branch and posts deltas to `evaluation/reports/<date>/`.

**Reporting standard.** Extends the v3.3.5 `benchmark_report.schema.json`:

- Mandatory disclosure of: model versions, prompt versions, embedding model, retrieval k, judge model, gold-set version, sample size, confidence intervals (Wilson score for proportions, bootstrap for continuous), seeds.
- Mandatory failure-mode categorization aligned with the 7-mode Lu 2026 checklist.
- Mandatory "what we did NOT measure" section.

**Acceptance criteria.**

- The full benchmark runs in < 6 hours on a single Claude Code session with a documented dollar budget.
- Reproducibility: re-running the benchmark on the same model snapshot produces results within reported CIs ≥ 95% of the time.
- The benchmark catches at least 2 historically-known regressions (e.g., the v2.7 31% citation error rate would have been flagged before release if v2 harness existed).

**Risks.**

- Benchmark gaming. Mitigation: hold-out test sets, periodic gold-set rotation, adversarial test pack expansion as new failure modes are discovered.
- Cost. Mitigation: tiered benchmarks (smoke / full / exhaustive); CI runs only smoke nightly.

---

### W6 — Domain Packs

**Problem.** ARS's defaults assume a generic IMRaD or thematic-review structure. A clinical RCT writeup needs CONSORT 2010, a qualitative interview study needs COREQ, a wet-lab biology paper needs MIQE for qPCR, and a humanities monograph needs a different structure entirely.

**Proposal.** Introduce `domain_packs/` as a first-class extension point:

```
domain_packs/
  clinical/
    pack.yaml              # declares applicable modes, hooks, schemas
    references/
      consort_2010_checklist.md
      strobe_checklist.md
      spirit_2013_protocol.md
      icmje_authorship.md
    structures/
      rct_imrad.yaml
      cohort_strobe.yaml
    agents/
      clinical_compliance_agent.md
    schemas/
      trial_registration.schema.json
  qualitative/
    pack.yaml
    references/
      coreq_checklist.md
      srqr_checklist.md
      thematic_analysis_braun_clarke.md
    structures/
      qualitative_irmrd.yaml
    ...
  stem_lab/
    pack.yaml
    references/
      arrive_2.0_checklist.md   # animal research
      miqe_qpcr.md
      psbp_biological_protocols.md
    ...
  humanities/
    pack.yaml
    references/
      chicago_notes_full.md
      mla_9th_full.md
      humanities_argument_structures.md
    structures/
      monograph.yaml
      historical_essay.yaml
    ...
```

A `pack.yaml` declares:

- Which checklists apply to which modes/stages.
- Domain-specific failure modes (e.g., for clinical: trial registration mismatch, primary outcome switching, p-hacking patterns).
- Domain-specific citation styles or extra requirements (e.g., AMA, Vancouver superscript variants).
- Domain-specific reviewer rubrics.

The `compliance_agent` (v3.4) is extended to load all enabled packs and apply their checklists at Stage 2.5 / 4.5.

**Initial pack list (v4.0 ships these four).**

1. **Clinical**: CONSORT, STROBE, SPIRIT, PRISMA-ScR, AMA citation, ICMJE authorship/conflicts, CER conflict of interest disclosure norms.
2. **Qualitative**: COREQ, SRQR, thematic analysis (Braun & Clarke), grounded theory (Charmaz), reflexivity statements.
3. **STEM lab**: ARRIVE 2.0 (animal research), MIQE (qPCR), CHRIS (chemistry), data deposition norms (GenBank, PDB).
4. **Humanities**: Chicago notes-bibliography full implementation, MLA 9, humanities argument structures (close reading, archival, theoretical), no-IRB-but-ethics framework.

**Acceptance criteria.**

- Each pack ships with at least one end-to-end example paper that exercises its full checklist.
- Pack activation is opt-in via `passport.yaml` `domain_packs: [clinical]` field.
- Switching packs mid-pipeline is supported but flagged.

**Risks.**

- Domain expert involvement is essential. Mitigation: each pack must have a named domain reviewer (Contributors section) before it can ship as stable; pre-stable packs are marked `experimental: true`.

---

### W7 — Submission Package & Journal Automation

**Problem.** Stage 5 produces APA-formatted Markdown/PDF, but the actual submission to a journal involves: matching the journal's specific template (often a custom LaTeX class), filling out cover letters, generating ORCID-linked author lists, declaring funding, writing graphical abstracts, generating reviewer suggestions, and packaging supplementary materials. None of this is automated.

**Proposal.** A new `submission/` mode in `academic-paper`:

```
academic-paper submission --venue=neurips-2026
academic-paper submission --venue=nature
academic-paper submission --venue=jbi  # Journal of Biomedical Informatics
```

Each venue has a profile at `academic-paper/venues/<venue>.yaml`:

```yaml
venue: neurips-2026
template:
  type: latex
  url: https://...neurips_2026.zip
  hash: sha256:...
sections_required:
  - title
  - abstract
  - main
  - checklist  # NeurIPS reproducibility checklist
  - broader_impact
limits:
  main_pages: 9
  supplementary_pages: unlimited
checklist:
  type: neurips_reproducibility_2026
  path: references/neurips_2026_checklist.md
cover_letter:
  required: false
disclosure:
  policy_anchor: neurips-2026
  ai_disclosure_required: true
suggested_reviewers:
  required: false
graphical_abstract:
  required: false
```

A `submission_packager_agent` produces, in order:

1. The venue-formatted manuscript (LaTeX with the journal's class).
2. A populated reproducibility / ethics checklist if required.
3. A cover letter draft (user reviews and edits — never auto-submitted).
4. An author metadata file (ORCID-linked, affiliations, contributions following CRediT).
5. A funding/COI disclosure statement.
6. A supplementary materials archive.
7. A submission manifest listing every file with content hashes.

**Important constraint.** The agent does not interface with journal submission systems directly. It produces files; the user submits them. This preserves human-in-the-loop and avoids accidental submissions.

**Acceptance criteria.**

- v4.0 ships venue profiles for: NeurIPS, ICLR, ACL, EMNLP, Nature, Science, PNAS, JAMA, Lancet, JMIR, plus 3 humanities venues.
- Switching venues regenerates the package without re-doing Stage 1–4 work.
- A "venue compatibility check" runs at Stage 4 and warns about page-limit overruns, missing required sections, etc.

**Risks.**

- Journal templates change. Mitigation: pin template versions with content hashes; the agent fails loudly on hash mismatch and asks the user to re-fetch.

---

### W8 — Multi-Author Collaboration Model

**Problem.** ARS currently assumes a single human author. Real papers have 2–20 authors with different roles. The Material Passport has no concept of who-did-what beyond the implicit "the user."

**Proposal.** Extend the passport with an `authors[]` array following CRediT taxonomy:

```yaml
authors:
  - id: cwu
    name: "Yujun"
    orcid: 0000-0000-0000-0000
    affiliation: ...
    is_corresponding: true
    credit_roles:
      - conceptualization
      - writing-original-draft
      - methodology
  - id: collaborator_a
    ...
```

A new agent `author_coordination_agent` (advisory) helps generate:

- The CRediT statement from the recorded roles.
- An author contribution paragraph in the venue's format.
- A reviewer-blind version of the manuscript with author info stripped (for double-blind venues).

A new mode `multi-author handoff` produces a structured "author update package" — a diff of changes since the last handoff with a summary of which sections changed and which authors should review what. This is intentionally lightweight; ARS does not attempt to replace git or Overleaf.

**Acceptance criteria.**

- CRediT statement generation matches manually-written reference statements in 5 example papers (judged by a human evaluator, not gradable automatically).
- Double-blind packaging passes a strict "no author info in PDF" check (regex over PDF text + metadata fields).

---

### W9 — Plugin SDK & Agent Scaffolding CLI

**Problem.** Contributing a new agent requires understanding:
- The four skill directory structure.
- Frontmatter conventions (`data_access_level`, `task_type`, `model: inherit`, `status: active`).
- Schema files in `shared/contracts/`.
- Lint scripts and where to register new patterns.
- The CHANGELOG conventions and version-bump propagation rules.

This is a high barrier to entry.

**Proposal.** Ship `ars-cli`:

```
ars-cli new agent --skill=academic-paper --name=my_new_agent
ars-cli new schema --name=my_artifact
ars-cli new domain-pack --name=psychology
ars-cli new venue --name=cogsci-2027
ars-cli lint                # runs all linters
ars-cli test                # runs full test suite
ars-cli release-prep        # generates CHANGELOG entry, bumps versions, validates spec consistency
ars-cli profile show
ars-cli passport validate <path>
```

The `new agent` command scaffolds:

- `agents/<name>_agent.md` with required frontmatter and section skeletons.
- A test fixture under `tests/fixtures/<name>/`.
- A lint registration in the appropriate manifest.

A `docs/CONTRIBUTING_AGENTS.md` walks contributors through the lifecycle: design → schema → prompt → tests → calibration (if outcome-gradable) → review → ship.

**Acceptance criteria.**

- A new contributor can ship a working advisory agent end-to-end in under 4 hours of their time, given the SDK and docs.
- All v4.0 agents pass a `ars-cli lint --strict` check.

---

### W10 — Native Multimodal Support

**Problem.** Figures, tables, and equations are currently weak points. The v3.3 VLM figure verification is opt-in and limited. Tables are generated via Markdown/LaTeX but not validated against the underlying data. Equations are not checked for consistency with surrounding prose.

**Proposal.** Three sub-features:

**W10.1 — Figure pipeline.**
A `figure_agent` that:
1. Generates figure-spec YAML from an outline ("Fig 3: bar chart, x = condition, y = accuracy, error bars = 95% CI").
2. Generates the plotting code (Python/R) deterministically from the spec.
3. Renders the figure.
4. Runs VLM verification (extension of v3.3): does the rendered figure match the spec? Are axis labels readable? Is the colormap accessible (CVD-safe)?
5. Generates the caption with cross-references to data lineage (W2).

**W10.2 — Table pipeline.**
A `table_agent` that:
1. Reads structured data from `experiment_lineage[]` (W2).
2. Generates LaTeX tables via a deterministic template.
3. Verifies every numeric cell against the lineage.
4. Generates table notes and significance markers consistently.

**W10.3 — Equation consistency.**
An `equation_check_agent` that:
1. Parses LaTeX equations.
2. Builds a symbol table.
3. Verifies symbols introduced in equations are defined in prose (or vice versa).
4. Flags symbol shadowing, dimensional inconsistencies (where types are declarable), and undefined operators.

**Acceptance criteria.**

- Figures produced via the pipeline pass VLM verification at ≥ 90% on a held-out set.
- Tables produced via the pipeline have zero numeric mismatches with lineage on the calibration set.
- Equation consistency flags catch ≥ 80% of seeded errors in adversarial test set.

**Risks.**

- VLM dependency cost. Mitigation: make verification opt-in; cache by figure content hash.

---

### W11 — Adversarial Robustness & Prompt-Injection Hardening

**Problem.** ARS ingests user-supplied PDFs, BibTeX files, web search results, and reviewer comments. Every one of these is an attack vector for prompt injection — an attacker who controls a cited PDF could try to inject instructions into ARS agents.

**Proposal.** A formal threat model document at `docs/THREAT_MODEL.md` enumerating:

1. **Injection via cited document content** (PDF text, abstracts).
2. **Injection via user-supplied notes/comments.**
3. **Injection via web-search results.**
4. **Injection via citation database responses** (S2/OpenAlex/Crossref maliciously manipulated, or compromised).
5. **Data exfiltration** (a malicious skill or domain pack tries to upload passport contents).
6. **Supply chain** (malicious plugin install).

Mitigations include:

- **Content quarantine.** All ingested external text is wrapped in `<external_content type="cited_pdf" ref_slug="..."> ... </external_content>` delimiters and agents are instructed to treat its contents as data, never as instructions. Mirror the v3.6.2 `<phase1_output>` data-delimiter pattern but applied to all external content.
- **Egress allowlist.** Network calls are limited to a documented allowlist (S2, OpenAlex, Crossref, configured journal servers). Anything else requires explicit opt-in.
- **Plugin signing.** v4.0 plugins are content-hashed in the marketplace manifest; plugin install verifies hashes.
- **Profile isolation.** W3 researcher profiles are never sent over the network unless `ARS_PROFILE_SYNC=1`.
- **Adversarial test cases** in W5's harness — at least 30 prompt-injection attempts seeded into PDFs, BibTeX comments, and web-search snippets.

**Acceptance criteria.**

- ARS detects and refuses ≥ 95% of seeded prompt-injection attempts in the adversarial test set without false-positive blocking on legitimate content.
- The threat model is reviewed by an external security contributor before v4.0 ships.

**Risks.**

- This is hard. Prompt injection is an open research problem. Mitigation: ship as defense-in-depth, not as a guarantee; document residual risk explicitly.

---

### W12 — v4.0 Unification: Governance, Telemetry, and Release

**Problem.** Eleven workstreams shipped piecemeal need a coherent v4.0 narrative.

**Proposal.**

- **Governance.** A `GOVERNANCE.md` documenting maintainer responsibilities, decision-making (consensus → maintainer call), release cadence, deprecation policy.
- **Telemetry (opt-in, anonymous, local-summarized).** With `ARS_TELEMETRY=1`, the system writes a local summary file recording: pipeline runs, mode usage, error rates, feature flag adoption, anonymized failure modes. Users can review and optionally upload. No automatic phone-home.
- **Release.** v4.0 ships with: end-to-end migration guide from v3.x, recorded reference pipeline runs across 4 disciplines, an updated showcase, updated docs/ARCHITECTURE.md, and a 6-month support commitment for v3.9.x.

---

## 5. Cross-Cutting Concerns

### 5.1 Schema evolution policy

Every schema gets a `schema_version` field. Migrations ship as scripts under `scripts/migrate_*.py`. Two-version backward compatibility is maintained: a v4.0 system reads v3.x artifacts; a v3.x system reads v4.0 artifacts with a documented downgrade tool.

### 5.2 Model-agnostic posture

The system should not bind to a single model. v4.0 documents tested-against models (Claude 4.7 Opus, Claude 4.7 Sonnet, GPT-5.5, Gemini 3.1 Pro) with a per-model capability matrix (which features need vision, which need 200k+ context, etc.). Embedding models, judge models, and writer models are independently configurable.

### 5.3 Internationalization

Beyond zh-CN, zh-TW, ja-JP, and en, v4.0 should target ko, es, fr, de README and trigger keyword coverage. Domain packs may localize their checklists.

### 5.4 Cost transparency

The v3.4 token budget docs are good but stage-level. v4.0 surfaces cost per node in the W4 DAG plan and a running ledger in the passport.

### 5.5 Reproducibility doctrine reaffirmed

LLM outputs remain non-byte-reproducible. Every new feature must respect this — `repro_lock` documents configuration, not output.

---

## 6. Phasing and Roadmap

### v3.10 (target +6 weeks): W1 — Persistent retrieval layer
Smallest valuable increment. Unblocks W2 audit cost reduction, W4 DAG node parallelism, W5 retrieval-grounded benchmarks.

### v3.11 (+10 weeks): W2 — Experiment lineage
Pairs naturally with W1; lineage data benefits from corpus indexing.

### v3.12 (+14 weeks): W3 — Researcher profile
Independent; can ship after W1 stabilizes.

### v3.13 (+18 weeks): W4 — DAG scheduler
Significant architectural change; lands after W1/W2/W3 schemas are stable so DAG nodes have well-defined inputs/outputs.

### v3.14 (+24 weeks): W5 — Evaluation harness v2
Depends on W1 (corpus-backed retrieval) and W4 (cost-efficient parallel runs) for benchmark feasibility.

### v3.15 (+30 weeks): W6 — Domain packs
Independent; ships after the SDK (W9) ideally, but can ship first if needed.

### v3.16 (+34 weeks): W7 — Submission packaging
Depends on W6 for venue-domain alignment.

### v3.17 (+38 weeks): W8 — Multi-author model
Mostly independent.

### v3.18 (+42 weeks): W9 — Plugin SDK & CLI
Best to ship after W6 stabilizes the domain-pack extension point so the SDK has a real consumer.

### v3.19 (+46 weeks): W10 — Multimodal
Depends on W2 (figure/table data lineage).

### v3.20 (+50 weeks): W11 — Adversarial robustness
Touches every previous workstream; lands late so it can audit the whole surface.

### v4.0 (+52 weeks): W12 — Unification, governance, telemetry, release.

The sequence is opinionated; maintainers may reorder based on community demand and contributor availability.

---

## 7. Calibration and Acceptance for v4.0 as a Whole

Before declaring v4.0:

1. **Full benchmark run** (W5 suite) shows no regression on v3.9 baselines and improvement on at least 4 of 5 benchmarks.
2. **Reference pipeline runs** in 4 disciplines (CS, clinical, qualitative education, humanities) complete end-to-end with documented dollar cost and wall-clock.
3. **Adversarial robustness** (W11) ≥ 95% detection with documented residual risks.
4. **Migration tested** from v3.7.0 (plugin baseline) and v3.6.x (clone baseline). Both paths produce a working v4.0 system.
5. **External review.** At least one academic researcher per domain pack signs off that the pack matches their domain's actual norms.
6. **Documentation completeness.** ARCHITECTURE.md, SETUP.md, PERFORMANCE.md, THREAT_MODEL.md, GOVERNANCE.md, CONTRIBUTING.md, CONTRIBUTING_AGENTS.md, and per-pack docs are all current.
7. **Honest limitations section** in the v4.0 README explicitly enumerates: what v4.0 still cannot do, where its FNR/FPR exceeds calibration thresholds, and what is deferred to v4.1+.

---

## 8. What the Proposal Deliberately Does Not Do

To keep the scope honest, v4.0 explicitly **does not** propose:

- **Full autonomy.** ARS remains human-in-the-loop. No "submit my paper" button, no "auto-respond to reviewers" mode.
- **A built-in writing model.** ARS remains a skills suite over Claude Code, not a self-hosted model.
- **Hidden AI-use.** Style Calibration and Writing Quality Check remain quality tools, not detection-evasion tools. v4.0 reaffirms this in the README.
- **Replacing reference managers.** Zotero/Mendeley/etc. remain the source of truth; ARS reads from them.
- **Replacing git/Overleaf for collaboration.** W8 is metadata and packaging, not version control.
- **Domain-graded automatic outcome judging on open-ended tasks.** The `task_type: open-ended` discipline (v3.3.2) is preserved.

---

## 9. Risks to the Proposal Itself

1. **Scope creep.** Twelve workstreams over a year is ambitious. Mitigation: each workstream is independently shippable; v4.0 can be declared whenever 8+ are stable.
2. **Maintainer bandwidth.** Currently small contributor base. Mitigation: W9 (SDK) is partly designed to lower contribution barriers; W6 (domain packs) explicitly invites domain-expert contributors.
3. **Model landscape shifts.** A major model change could obsolete some prompt-engineering work. Mitigation: schema-driven design (principle #3) means most artifacts are model-agnostic; only agent prompts need updating.
4. **Anthropic platform changes.** Claude Code plugin packaging, hook semantics, etc., may evolve. Mitigation: dual-track install (plugin + clone+symlink) preserves fallback.
5. **Adversarial robustness is fundamentally hard.** Mitigation: ship as defense-in-depth, not guarantee; communicate honestly.
