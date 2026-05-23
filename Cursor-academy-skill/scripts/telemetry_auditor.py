"""
Cursor Academy (Academic Research Skills ARS v4.0)
Telemetry & Governance Local Auditor

Implements a local, privacy-respecting, anonymized telemetry engine
to record pipeline runs, execution durations, and failure mode trends
locally under the user's workspace without any automatic phone-home.
"""

import os
import json
from datetime import datetime, timezone

class LocalTelemetryAuditor:
    def __init__(self, workspace_path: str = "."):
        self.workspace_path = workspace_path
        self.telemetry_dir = os.path.join(workspace_path, "telemetry")
        self.log_filepath = os.path.join(self.telemetry_dir, "local_runs.jsonl")

    def log_run(self, mode: str, wall_clock_ms: int, success: bool, failure_mode: str = "none"):
        """Logs an anonymized run record locally, respecting privacy guidelines."""
        # Telemetry is strictly opt-in via environment flag
        if os.getenv("ARS_TELEMETRY") != "1":
            return

        os.makedirs(self.telemetry_dir, exist_ok=True)

        log_entry = {
            "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "mode": mode,
            "wall_clock_duration_ms": wall_clock_ms,
            "success": success,
            "failure_mode": failure_mode,
            "anonymized_platform": sys.platform if hasattr(sys, 'platform') else 'unknown'
        }

        with open(self.log_filepath, "a", encoding="utf-8") as f:
            f.write(json.dumps(log_entry) + "\n")

    def show_local_analytics(self) -> dict:
        """Parses and computes aggregate statistics for local runs."""
        if not os.path.exists(self.log_filepath):
            return {"total_runs": 0, "success_rate": 0.0, "common_failures": {}}

        total = 0
        successes = 0
        failures = {}

        with open(self.log_filepath, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    entry = json.loads(line)
                    total += 1
                    if entry.get("success", False):
                        successes += 1
                    else:
                        fm = entry.get("failure_mode", "unknown")
                        failures[fm] = failures.get(fm, 0) + 1
                except Exception:
                    pass

        return {
            "total_runs": total,
            "success_rate": (successes / total) if total > 0 else 0.0,
            "common_failures": failures
        }

if __name__ == "__main__":
    import sys
    # Force enable telemetry for demonstration
    os.environ["ARS_TELEMETRY"] = "1"
    auditor = LocalTelemetryAuditor()
    auditor.log_run("full", 450000, True)
    auditor.log_run("full", 12000, False, "CONTAMINATED-PREPRINT")
    print(json.dumps(auditor.show_local_analytics(), indent=2))
    
    # Cleanup demo log if ran in-place
    if os.path.exists("telemetry"):
        import shutil
        shutil.rmtree("telemetry")
