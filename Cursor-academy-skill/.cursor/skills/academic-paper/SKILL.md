---
name: academic-paper
description: 12-agent academic paper writing skill with Style Calibration, Writing Quality Check, LaTeX compilation, and W2 Experiment Lineage verification.
disable-model-invocation: true
---

# Academic Paper: Publication-Grade Writing Suite

This skill coordinates the 12-agent writing suite, covering style calibration, draft generation, table compilation, and journal packaging.

## 1. Operating Instructions

* **W2 — First-Class Experiment Lineage:** Ensure that all numeric results, tables, and figures from experiments carry a `<!--exp:run_id-->` annotation. Run value checks against `material_passport_lineage.json`.
* **LaTeX Equations Consistency (W10):** Verify that all symbols used in inline/block equations are defined in surrounding prose. Execute the programmatic validator to check for symbol shadowing or dimensional conflicts:
  ```bash
  python scripts/multimodal_validator.py
  ```
* **Submission Packaging (W7 & W8):** When generating final outputs for submission, run the packager to build blinded manuscripts and cover letters:
  ```bash
  python scripts/submission_packager.py
  ```
  Refer to `academic-paper/venues/` for venue profiles (NeurIPS 2026, Nature, etc.).

## 2. Triggers and Modes
* **Plan Mode:** Chapter-by-chapter Socratic planning of the manuscript's thesis and argumentative flow.
* **Revision Mode:** Integrates peer review critiques and updates the text, compiling a detailed Revision Response letter.
* **Format-Convert:** Compiles Markdown text to LaTeX, PDF, or DOCX styles.

## 3. Cursor Rule Alignment
Comply with `.cursor/rules/ars-citations.mdc` (three-layer citation locator anchors) and `.cursor/rules/ars-integrity-gates.mdc` (W2 experimental data checks).
