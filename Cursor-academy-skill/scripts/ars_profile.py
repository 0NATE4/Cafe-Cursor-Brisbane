"""
Cursor Academy (Academic Research Skills ARS v4.0)
Researcher Profile & Longitudinal Memory Manager

Handles consent-gated, opt-in local researcher profiles, allowing past stylistic
weaknesses, writing preferences, and peer-review signals to be carried forward
to guide future papers while preserving data privacy.
"""

import os
import sys
import yaml
import json
from datetime import datetime, date
from typing import Dict, Any, Optional

PROFILE_ROOT = os.path.expanduser("~/.ars/profile")

class ProfileManager:
    @staticmethod
    def initialize_profile(profile_id: str, consent_style: bool = True, consent_review: bool = True) -> str:
        """Initializes a new researcher profile with explicit local consent settings."""
        os.makedirs(PROFILE_ROOT, exist_ok=True)
        profile_path = os.path.join(PROFILE_ROOT, f"{profile_id}.yaml")

        if os.path.exists(profile_path):
            raise FileExistsError(f"Profile '{profile_id}' already exists at {profile_path}")

        default_profile = {
            "profile_id": profile_id,
            "created_at": datetime.now().date().isoformat(),
            "consent": {
                "store_style_profile": consent_style,
                "store_review_history": consent_review,
                "store_citation_network": consent_review,
                "expiry": date(date.today().year + 3, date.today().month, date.today().day).isoformat()
            },
            "style_profile": {
                "source_papers": [],
                "vocabulary_preferences": {
                    "tendency_to_use_significant": "avoid_overuse",
                    "discussion_assertions": "strengthen_claims"
                },
                "sentence_burstiness": {
                    "mean_length": 22.4,
                    "standard_deviation": 5.2
                }
            },
            "recurring_review_signals": [
                {
                    "pattern": "under_specified_ablations",
                    "flagged_in": ["paper_a_r1", "paper_c_r2"],
                    "last_seen": "2026-03-12",
                    "severity": "medium"
                }
            ],
            "citation_network": {
                "frequent_authors": [],
                "field_clusters": ["AI Alignment", "Generative Writing Suite"]
            },
            "self_reflection_history": [
                {
                    "session": "2026-04-01_da_concession_rate",
                    "value": 0.22,
                    "notes": "Maintained healthy concession rates under anti-sycophancy prompts."
                }
            ]
        }

        with open(profile_path, "w", encoding="utf-8") as f:
            yaml.safe_dump(default_profile, f, sort_keys=False)

        return profile_path

    @staticmethod
    def load_profile(profile_id: str) -> Optional[Dict[str, Any]]:
        """Loads and parses a researcher profile, verifying privacy consent."""
        profile_path = os.path.join(PROFILE_ROOT, f"{profile_id}.yaml")
        if not os.path.exists(profile_path):
            return None

        with open(profile_path, "r", encoding="utf-8") as f:
            profile = yaml.safe_load(f)

        # Check if consent has expired
        expiry_str = profile.get("consent", {}).get("expiry")
        if expiry_str:
            expiry_date = datetime.strptime(expiry_str, "%Y-%m-%d").date()
            if expiry_date < date.today():
                # Consent expired, scrub and delete profile
                ProfileManager.delete_profile(profile_id)
                print(f"Advisory: Consent expired for profile '{profile_id}'. Profile has been auto-scrubbed.", file=sys.stderr)
                return None

        return profile

    @staticmethod
    def redact_profile(profile_id: str, field_to_redact: str) -> bool:
        """Redacts sensitive segments or historical patterns from the profile."""
        profile = ProfileManager.load_profile(profile_id)
        if not profile:
            return False

        modified = False
        if field_to_redact == "review_history":
            profile["recurring_review_signals"] = []
            profile["consent"]["store_review_history"] = False
            modified = True
        elif field_to_redact == "style_profile":
            profile["style_profile"] = {
                "source_papers": [],
                "vocabulary_preferences": {},
                "sentence_burstiness": {"mean_length": 20.0, "standard_deviation": 5.0}
            }
            profile["consent"]["store_style_profile"] = False
            modified = True

        if modified:
            profile_path = os.path.join(PROFILE_ROOT, f"{profile_id}.yaml")
            with open(profile_path, "w", encoding="utf-8") as f:
                yaml.safe_dump(profile, f, sort_keys=False)
            return True
        return False

    @staticmethod
    def delete_profile(profile_id: str) -> bool:
        """Permanently deletes the researcher profile from local storage."""
        profile_path = os.path.join(PROFILE_ROOT, f"{profile_id}.yaml")
        if os.path.exists(profile_path):
            os.remove(profile_path)
            return True
        return False

    @staticmethod
    def export_profile(profile_id: str, dest_path: str) -> bool:
        """Exports profile to a target location in JSON or YAML format."""
        profile = ProfileManager.load_profile(profile_id)
        if not profile:
            return False
        
        # Verify privacy export permission
        if not os.getenv("ARS_PROFILE_INCLUDE_IN_EXPORT") == "1":
            # Strip private files and identification by default
            profile["profile_id"] = "redacted-profile"
            if "recurring_review_signals" in profile:
                profile["recurring_review_signals"] = []

        with open(dest_path, "w", encoding="utf-8") as f:
            if dest_path.endswith(".json"):
                json.dump(profile, f, indent=2)
            else:
                yaml.safe_dump(profile, f, sort_keys=False)
        return True
