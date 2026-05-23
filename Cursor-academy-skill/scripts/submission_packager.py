"""
Cursor Academy (Academic Research Skills ARS v4.0)
Submission Packager & Multi-Author CRediT Coordinator

Provides the core programmatic functionality for assembling publication-ready
submission packages, generating standardized CRediT (Contributor Roles Taxonomy)
statements, and compiling blinded manuscript versions for peer review.
"""

import os
import re
import yaml
import json
from typing import List, Dict, Any, Optional

class SubmissionPackager:
    def __init__(self, passport_filepath: str = "material_passport.json"):
        self.passport_filepath = passport_filepath
        self.authors: List[Dict[str, Any]] = []
        self._load_authors()

    def _load_authors(self):
        """Loads author metadata from the Material Passport file or falls back to defaults."""
        if os.path.exists(self.passport_filepath):
            try:
                with open(self.passport_filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.authors = data.get("authors", [])
            except Exception:
                pass
        
        # Fallback to default Yujun (AI-CYJ) metadata if empty
        if not self.authors:
            self.authors = [
                {
                    "id": "yujun",
                    "name": "Yujun",
                    "email": "yujun@example.com",
                    "orcid": "0000-0002-1823-4567",
                    "affiliation": "Academic Research Skills Team",
                    "is_corresponding": True,
                    "credit_roles": [
                        "conceptualization",
                        "methodology",
                        "software",
                        "writing-original-draft",
                        "writing-review-editing"
                    ]
                }
            ]

    def generate_credit_statement(self) -> str:
        """Generates a standardized CRediT author contributions paragraph."""
        role_map: Dict[str, List[str]] = {}
        for author in self.authors:
            name = author["name"]
            for role in author.get("credit_roles", []):
                # Standardize casing for display
                standard_role = role.replace("-", " ").title()
                role_map.setdefault(standard_role, []).append(name)

        statements = []
        for role, names in sorted(role_map.items()):
            statements.append(f"{role}: {', '.join(names)}.")
        
        return "Author Contributions: " + " ".join(statements)

    def generate_cover_letter(self, venue_name: str, manuscript_title: str) -> str:
        """Drafts a formal journal cover letter following strict academic style guidelines."""
        corresponding_author = next((a for a in self.authors if a.get("is_corresponding")), self.authors[0])
        
        letter = f"""Dear Editor-in-Chief,

We are pleased to submit our original research manuscript titled "{manuscript_title}" for publication consideration in {venue_name.title()}.

In this study, we present a novel framework that bridges AI potential and rigorous scientific processes. This work has significant implications for ensuring research integrity and reducing hallucinated citations in the generative writing pipeline.

We confirm that this manuscript is original, has not been published before, and is not currently under consideration by any other journal or conference. All authors have reviewed and approved the manuscript, and we declare no competing financial or personal interests.

Thank you for your time and consideration of our work.

Sincerely,

{corresponding_author['name']}
Corresponding Author
{corresponding_author.get('affiliation', '')}
Email: {corresponding_author['email']}
"""
        return letter

    def create_blinded_manuscript(self, input_filepath: str, output_filepath: str) -> bool:
        """
        Creates a reviewer-blind version of a manuscript file (Markdown or LaTeX)
        by stripping all author identities, affiliations, and contact emails.
        """
        if not os.path.exists(input_filepath):
            return False

        with open(input_filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Build regular expressions based on registered author list
        for author in self.authors:
            # Blind family/given name (case-insensitive)
            name_parts = author["name"].split()
            for part in name_parts:
                if len(part) > 2:
                    content = re.sub(re.escape(part), "[REDACTED_AUTHOR]", content, flags=re.IGNORECASE)
            
            # Blind email
            content = re.sub(re.escape(author["email"]), "[REDACTED_EMAIL]", content, flags=re.IGNORECASE)
            
            # Blind ORCID if present
            orcid = author.get("orcid")
            if orcid:
                content = re.sub(re.escape(orcid), "[REDACTED_ORCID]", content)

            # Blind affiliation
            affiliation = author.get("affiliation")
            if affiliation:
                content = re.sub(re.escape(affiliation), "[REDACTED_AFFILIATION]", content, flags=re.IGNORECASE)

        with open(output_filepath, "w", encoding="utf-8") as f:
            f.write(content)

        return True

if __name__ == "__main__":
    packager = SubmissionPackager()
    print(packager.generate_credit_statement())
    print("\n" + "="*40 + "\n")
    print(packager.generate_cover_letter("nature", "Cursor Academy: Academic AI Writing Suite"))
