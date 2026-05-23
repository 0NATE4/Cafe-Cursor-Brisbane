---
name: academic-pipeline
description: Orchestrator for the full 10-stage academic research pipeline using parallel DAG execution and Material Passport tracking.
disable-model-invocation: true
---

# Academic Pipeline: Full Research Orchestration

This skill acts as the global conductor, managing state transitions, checking checkpoint flags, and validating Material Passport artifacts throughout the 10-stage research lifecycle.

## 1. Operating Instructions

* **Parallel DAG Scheduling (W4):** Instead of executing stages linearly, launch the parallel DAG task runner to execute independent agent operations concurrently:
  ```bash
  python scripts/run_dag.py --dag academic-pipeline/dags/full.yaml --parallel 3
  ```
* **Material Passport Invariants:** Maintain the integrity of the material passport file. Enforce Schema 13.1 generator-evaluator contract boundaries and verify that all necessary data is backed up before a transition.
* **Local Telemetry & Failure Monitoring (W12):** Write anonymized local metrics on success rates and execution duration by calling:
  ```bash
  python scripts/telemetry_auditor.py
  ```

## 2. Checkpoints and Gates
* **Stage 2.5 Gate:** Hard check on reference coverage, formatting anchors, and core methodology parameters before review.
* **Stage 4.5 Gate:** Hard check on final reference veracity, revised claim alignment, and journal template compliance.

## 3. Cursor Rule Alignment
Directly supports `.cursor/rules/ars-routing.mdc` (stages mapping) and `.cursor/rules/ars-integrity-gates.mdc` (7-mode security gates).
