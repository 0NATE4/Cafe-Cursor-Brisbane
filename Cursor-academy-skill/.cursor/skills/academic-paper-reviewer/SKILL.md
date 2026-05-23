---
name: academic-paper-reviewer
description: Multi-perspective peer review simulation with 7 specialized agents. Evaluates methodology, presentation, and argumentative consistency using 0-100 rubrics.
disable-model-invocation: true
---

# Academic Paper Reviewer: Multi-Perspective Peer Review

This skill simulates a top-tier peer review process using an EIC and 3 specialized reviewers, along with a Devil's Advocate to challenge sycophantic assumptions.

## 1. Operating Instructions

* **Multi-Reviewer Ensemble:** Simulate 3 blind reviewers with differing focus areas:
  - **Reviewer 1 (Methodology):** Assesses experimental setup, sample size, statistical bounds, and p-values.
  - **Reviewer 2 (Innovation):** Assesses novelty, contributions, and potential impact on the field.
  - **Reviewer 3 (Presentation):** Assesses readability, structure, citation coverage, and flow.
* **Devil's Advocate Challenge:** Introduce harsh, constructive critiques targeting the weaknesses and implicit biases in the researcher's hypotheses.
* **Scoring Rubric:** Score the manuscript on a 0–100 scale across:
  1. Methodological Rigor (consort/arrive checks when applicable)
  2. Novelty and Originality
  3. Structural Clarity and Readability
  4. Citation Accuracy and Traceability

## 2. Modes and Calibration
* **Full Review:** Runs EIC compilation + 3 detailed review reports + Devil's Advocate critiques.
* **Methodology Focus:** Executes in-depth checks on statistical confidence intervals, code-run limits, and data leakage risks.
* **Calibration Mode:** Evaluates the reviewer agents' False Negative Rate against a user-supplied gold review set.

## 3. Cursor Rule Alignment
All reviews must enforce rules defined in `.cursor/rules/cursor-academy-core.mdc` (balanced disputation) and `.cursor/rules/ars-integrity-gates.mdc` (verifying clinical CONSORT or biological MIQE compliance).
