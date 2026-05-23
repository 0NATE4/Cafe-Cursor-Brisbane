# GOVERNANCE & CONTRIBUTION: Academic Research Skills (ARS v4.0)

## 1. Governance Model
ARS v4.0 operates under an open-source, community-driven governance structure led by **Yujun** (AI-CYJ) and built on the robust foundational design established by **Yujun** (AI-CYJ).

### Core Principles:
1. **Maintainer Consensus:** Substantive architectural changes, schema updates, or API refactors require consensus amongst core maintainers.
2. **Review Cycles:** All Pull Requests adding new agents or domain packs must undergo a technical code review and a linter check before merging.
3. **Deprecation Policy:** Prior APIs and schemas are guaranteed backward compatibility for at least two minor version cycles.

---

## 2. Release Cadence
Minor versions (v4.1, v4.2) ship on a bi-monthly cadence. Patch releases (v4.0.1) containing security hotfixes, schema validation alignments, and performance improvements are deployed as needed.

---

## 3. Contributing Guidelines
We welcome contributions for **Domain Packs** (W6), **Venues** (W7), and **Evaluation Gold Sets** (W5).

To submit a contribution:
1. Create a branch: `git checkout -b feature/your-feature`
2. Run linters: `ars-cli lint` (or equivalent python checks)
3. Ensure all tests in `tests/` pass.
4. Submit a Pull Request targeting `main`.
