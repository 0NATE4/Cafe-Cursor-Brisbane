# SETUP & CONFIGURATION GUIDE: Cursor Academy v4.0 on Cursor IDE

Welcome to **Cursor Academy (ARS v4.0)** for the **Cursor IDE**! 

This guide outlines how to configure, run, and develop with Cursor Academy. By migrating from Claude Code's plugin ecosystem to Cursor's native **MDC Rules** and **Agent Skills**, you get persistent context, custom slash command shortcuts, and deep integration with your workspace.

---

## 1. Directory Structure in Your Workspace

To use Cursor Academy, the following folder structure should be added to your academic project root (or as a personal global installation):

```text
your-academic-project/
├── .cursor/
│   ├── rules/
│   │   ├── cursor-academy-core.mdc     # Human-in-the-loop, evidence hierarchy, language
│   │   ├── ars-routing.mdc             # Slash commands mapping & 10-stage pipeline overview
│   │   ├── ars-citations.mdc           # L3 Claim-faithfulness anchors & Zhao et al. 2026 rules
│   │   └── ars-integrity-gates.mdc     # Stage 2.5/4.5 checkpoints & 7-mode security check
│   └── skills/
│       ├── deep-research/
│       │   └── SKILL.md                 # 13-agent Deep Research & PRISMA-compliant search
│       ├── academic-paper/
│       │   └── SKILL.md                 # 12-agent Writing, Lineage, and Submission Packaging
│       ├── academic-paper-reviewer/
│       │   └── SKILL.md                 # 7-agent Peer Review & Scoring Rubric
│       └── academic-pipeline/
│           └── SKILL.md                 # Parallel DAG execution & Passport orchestration
├── scripts/                             # Core Python v4.0 academic tooling
│   ├── corpus_retrieval.py              # W1 Dense-Sparse Hybrid RAG retrieve API
│   ├── experiment_tracker.py            # W2 Experiment lineage tracking SDK
│   ├── run_dag.py                       # W4 Parallel multi-threaded DAG task runner
│   ├── run_eval_harness.py              # W5 Evaluation v2 Harness
│   ├── submission_packager.py           # W7 Journal Submission letter & blinder
│   ├── ars_cli.py                       # W9 Developer CLI SDK scaffold
│   ├── multimodal_validator.py          # W10 LaTeX equation symbol shadow checker
│   └── telemetry_auditor.py             # W12 Local privacy telemetry recorder
└── domain_packs/                        # W6 Domain-specific reporting checklists
    ├── clinical/                        # CONSORT checklists
    ├── qualitative/                     # COREQ checklists
    ├── stem_lab/                        # ARRIVE 2.0 / MIQE checklists
    └── humanities/                      # Chicago Notes-Bibliography styles
```

---

## 2. Installation Methods

### Method A: Project-Level Installation (Recommended)
Use this when you are working on a single paper repository. 
1. Copy the `.cursor` folder, `scripts/` folder, and `domain_packs/` folder into your paper's workspace root.
2. Ensure you have installed the required python packages (see Section 3).
3. Open Cursor, and the MDC rules will be loaded automatically!

### Method B: Global Installation (Across All Projects)
To make the Academic Research Skills available in every project you open in Cursor:
1. Copy (or symlink) the skills folder to your personal Cursor directory:
   * **Windows:** `C:\Users\YOUR-USERNAME\.cursor\skills\`
   * **Mac/Linux:** `~/.cursor/skills/`
2. Create directories for `deep-research`, `academic-paper`, `academic-paper-reviewer`, and `academic-pipeline` inside that skills folder, placing their respective `SKILL.md` files there.
3. Keep the Python scripts in a stable directory, and specify their absolute path in your personal skills.

---

## 3. Python Environmental Setup

To run ARS v4.0's backend scripts (RAG retrieval, lineage tracking, LaTeX checking), install the light developer dependencies:

```bash
pip install pyyaml numpy pandas templates pytest
```

*(Note: For dense vector lookups, make sure `numpy` is installed. Chunks and bibliography metadata do not require external heavy databases and run fast on a standard laptop).*

---

## 4. How to Use Cursor Academy

### 1. Simulated Slash Commands
In your Cursor Chat or Composer, you can type natural shortcuts. The `ars-routing.mdc` rule automatically intercepts these commands and routes the AI to load the corresponding skill:

* **`/ars-plan`** $\rightarrow$ Starts Socratic planning for your draft.
* **`/ars-lit-review`** $\rightarrow$ Launches the literature research agent.
* **`/ars-reviewer`** $\rightarrow$ Simulates 7-agent blind peer review with detailed scores.
* **`/ars-status`** $\rightarrow$ Checks your current Stage, Passport parameters, and reset status.

### 2. Performing RAG Retrieval (W1)
If you want to pull literature from your indexed parquet workspace, tell the Agent:
> *"Retrieve top-k chunks related to 'Transformer baseline' and cite them."*

The Agent will call `python scripts/corpus_retrieval.py` on your machine, grab the exact chunks, and compose the citations with matching `quote` anchors.

### 3. Writing with Experiment Lineage (W2)
When writing your Methods or Results section, incorporate the Python tracker:
```python
from scripts.experiment_tracker import ars_track_run, ars_emit_metric

@ars_track_run(run_id="exp_2026_06_03_transformer", code_repo="github.com/AI-CYJ/my-project", dataset_name="ImageNet-1k", dataset_version="v1.2")
def train():
    # ... training logic ...
    ars_emit_metric("top1_accuracy", 0.7841)
```
Then, write your paper using matching HTML comment annotations:
```markdown
Our baseline achieves 78.4% accuracy<!--exp:exp_2026_06_03_transformer-->...
```

### 4. Running the Multi-Threaded DAG Task Runner (W4)
To compile or coordinate multiple agent tasks in parallel (saving up to 45% of wait time):
```bash
python scripts/run_dag.py --dag academic-pipeline/dags/full.yaml --parallel 3
```

---

## 5. Security & Privacy Defaults
* **Local First:** All researcher profiles, telemetry run data, and drafted papers stay entirely local on your machine (under `~/.ars/profile/` and your workspace).
* **Quarantined Inputs:** All unverified external text downloaded via Semantic Scholar or PDFs are wrapped in XML tags in the RAG layer, preventing indirect prompt-injection.
* **Consent Expiry:** Your local style calibration files automatically check their consent expiration timestamp and self-scrub if expired.
