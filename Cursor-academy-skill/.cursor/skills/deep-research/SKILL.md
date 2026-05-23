---
name: deep-research
description: Runs a 13-agent deep academic research pipeline. Supports full research, quick brief, PRISMA systematic review, and Socratic guided research. Triggers on literature search, systematic-review, lit-review, fact-check, or Socratic guidance.
disable-model-invocation: true
---

# Deep Research: Universal Academic Research Agent Team

This skill guides you through running deep academic research workflows using the 13-agent ensemble, complete with Semantic Scholar API lookups, PRISMA-compliant systematic reviews, and RAG-over-corpus indexing.

## 1. Operating Instructions

* **RAG-Over-Corpus Integration (W1):** When researching or validating facts, you should run the local vector retrieval script:
  ```bash
  python scripts/corpus_retrieval.py --query "your query"
  ```
  Incorporate retrieved paragraph chunks directly into your research summaries.
* **Citation Integrity Verification:** Verify all extracted literature items against online bibliographic databases (Semantic Scholar, OpenAlex, Crossref). If an item cannot be found, flag it in the contamination signals block.
* **Socratic Mentoring:** If Socratic Mode is active, do not compile a final report immediately. Instead, present three guided questions and engage in a dialogue to refine the study's scope and research questions.

## 2. Triggers and Modes
* **Full Research Mode:** Conduct a comprehensive search, risk-of-bias assessment, and compile a structured APA 7.0 report.
* **PRISMA Systematic Review:** Enforce strict screening criteria, reporting inclusion/exclusion decisions and producing a systematic overview.
* **Fact-Check:** Verify claims against trusted source documents and retrieve exact quote anchors.

## 3. Cursor Rule Alignment
Ensure that all operations comply with `.cursor/rules/cursor-academy-core.mdc` (evidence quality rating) and `.cursor/rules/ars-citations.mdc` (generating quote and page anchors for every claim).
