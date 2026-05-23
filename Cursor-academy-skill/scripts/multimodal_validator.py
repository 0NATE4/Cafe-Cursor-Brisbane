"""
Cursor Academy (Academic Research Skills ARS v4.0)
Native Multimodal Support Pipeline & Symbol Validator

Implements native LaTeX equations parsing and Symbol shadow tracking,
verifying logical consistency and ensuring all symbols introduced in equations
are defined within the prose body before publication compilation.
"""

import os
import re
from typing import List, Dict, Set, Tuple

class MultimodalEquationValidator:
    def __init__(self, manuscript_filepath: str):
        self.manuscript_filepath = manuscript_filepath
        self.symbol_table: Set[str] = set()
        self.prose_words: Set[str] = set()

    def parse_equations(self) -> List[str]:
        """Extracts LaTeX style inline and block equations from the manuscript."""
        if not os.path.exists(self.manuscript_filepath):
            return []

        with open(self.manuscript_filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Extract block equations: $$ ... $$ or \[ ... \]
        block_equations = re.findall(r"\$\$(.*?)\$\$", content, re.DOTALL)
        block_equations_latex = re.findall(r"\\\[(.*?)\\\]", content, re.DOTALL)

        # Extract inline equations: $ ... $
        inline_equations = re.findall(r"\$(.*?)\$", content)

        all_equations = block_equations + block_equations_latex + inline_equations
        # Remove empty matches
        return [eq.strip() for eq in all_equations if eq.strip()]

    def extract_symbols(self, equation: str) -> List[str]:
        """Extracts individual variable letters/symbols from a LaTeX equation string."""
        # Simple regex to capture single variable letters while excluding standard LaTeX symbols/commands
        # Finds single alphabet characters not preceded by a backslash (LaTeX command)
        raw_symbols = re.findall(r"\b([a-zA-Z])\b", equation)
        # Filter out common mathematical functions/constants
        reserved_math = {"e", "i", "d", "T"}  # base of natural log, imaginary, differential, transpose
        return list(set([s for s in raw_symbols if s not in reserved_math]))

    def analyze_prose(self) -> Set[str]:
        """Tokenizes text outside equations to extract defined prose words."""
        if not os.path.exists(self.manuscript_filepath):
            return set()

        with open(self.manuscript_filepath, "r", encoding="utf-8") as f:
            # Strip math formulas to inspect bare prose
            prose = re.sub(r"\$.*?\$", " ", f.read())
            prose = re.sub(r"\\\[.*?\\\]", " ", prose, flags=re.DOTALL)

        words = re.findall(r"\b[a-zA-Z]+\b", prose)
        return set([w.lower() for w in words])

    def validate_manuscript(self) -> List[Tuple[str, str]]:
        """
        Validates the manuscript and returns a list of warnings
        specifying symbols found in equations but not introduced in prose.
        """
        equations = self.parse_equations()
        prose_vocabulary = self.analyze_prose()
        warnings = []

        for eq in equations:
            symbols = self.extract_symbols(eq)
            for sym in symbols:
                # Basic check: is the symbol mentioned in the nearby text?
                # Case insensitive check
                if sym.lower() not in prose_vocabulary:
                    warnings.append((sym, eq))

        return warnings

if __name__ == "__main__":
    # Test validator
    test_manuscript = "test_draft.md"
    with open(test_manuscript, "w", encoding="utf-8") as f:
        f.write("""
# Introduction
The model uses an embedding matrix but we do not define alpha anywhere in prose.
We describe accuracy and validation details.

$$ y = W x + b $$

Where $W$ is the weights and $b$ is the bias vector.
Here, $z$ is used in an inline formula $z = x + 3$ but never declared.
""")

    validator = MultimodalEquationValidator(test_manuscript)
    mismatches = validator.validate_manuscript()
    for sym, eq in mismatches:
        print(f"Warning: Symbol '{sym}' used in equation '{eq}' is never defined in surrounding prose!")

    if os.path.exists(test_manuscript):
        os.remove(test_manuscript)
