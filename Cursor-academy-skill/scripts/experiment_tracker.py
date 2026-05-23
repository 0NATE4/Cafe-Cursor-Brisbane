"""
Cursor Academy (Academic Research Skills ARS v4.0)
First-Class Experiment Lineage Python Tracker SDK

Provides lightweight Python decorators and helpers to instrument experiment runs,
automatically logging execution parameters, metrics, environment details, and file hashes
directly into the Material Passport lineage aggregate.
"""

import os
import sys
import json
import time
import hashlib
import platform
import functools
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional, Callable

# Global lineage storage for the active run
_CURRENT_RUN: Dict[str, Any] = {}

def get_git_commit() -> str:
    """Retrieves the current git commit hash."""
    try:
        import subprocess
        return subprocess.check_output(["git", "rev-parse", "HEAD"]).decode("ascii").strip()
    except Exception:
        return "0000000000000000000000000000000000000000"

def get_file_hash(filepath: str) -> str:
    """Computes the SHA-256 hash of a file."""
    if not os.path.exists(filepath):
        return ""
    sha256 = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            sha256.update(chunk)
    return f"sha256:{sha256.hexdigest()}"

def ars_track_run(
    run_id: str,
    code_repo: str,
    dataset_name: str,
    dataset_version: str,
    seed: int = 42,
    config_filepath: Optional[str] = None
) -> Callable:
    """
    Decorator to wrap a main training or evaluation entrypoint.
    Automatically captures the execution metadata, hardware environment, and system state.
    """
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            global _CURRENT_RUN
            
            # Read configuration hash
            config_hash = "sha256:" + "0" * 64
            if config_filepath and os.path.exists(config_filepath):
                config_hash = get_file_hash(config_filepath)

            # Initialize active run metadata
            _CURRENT_RUN = {
                "run_id": run_id,
                "code_commit": get_git_commit(),
                "code_repo": code_repo,
                "config_hash": config_hash,
                "dataset_versions": [
                    {
                        "name": dataset_name,
                        "version": dataset_version,
                        "hash": "sha256:" + "0" * 64  # Reference hash
                    }
                ],
                "primary_metrics": [],
                "artifacts": [],
                "environment": {
                    "python": platform.python_version(),
                    "cuda": os.getenv("CUDA_VERSION", "none"),
                    "seed": seed
                },
                "ran_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
                "ran_by": os.getenv("USER", os.getenv("USERNAME", "anonymous"))
            }

            try:
                result = func(*args, **kwargs)
                # Flush the run lineage on successful exit
                _flush_lineage()
                return result
            except Exception as e:
                # Log crash status to lineage prior to re-raising
                _CURRENT_RUN["status"] = "failed"
                _CURRENT_RUN["error"] = str(e)
                _flush_lineage()
                raise e

        return wrapper
    return decorator

def ars_emit_metric(
    name: str,
    value: float,
    *,
    ci_lower: Optional[float] = None,
    ci_upper: Optional[float] = None,
    ci_method: Optional[str] = None
):
    """
    Emits a primary experimental metric into the currently tracked run.
    """
    global _CURRENT_RUN
    if not _CURRENT_RUN:
        return

    metric_entry = {
        "name": name,
        "value": value
    }
    if ci_lower is not None:
        metric_entry["ci_lower"] = ci_lower
    if ci_upper is not None:
        metric_entry["ci_upper"] = ci_upper
    if ci_method is not None:
        metric_entry["ci_method"] = ci_method

    _CURRENT_RUN["primary_metrics"].append(metric_entry)

def ars_register_artifact(kind: str, path: str, generator: str):
    """
    Registers a figure, table, or weights file produced by the experiment.
    """
    global _CURRENT_RUN
    if not _CURRENT_RUN:
        return

    # Compute hash and add to artifact entry
    artifact_hash = get_file_hash(path) if os.path.exists(path) else ""
    _CURRENT_RUN["artifacts"].append({
        "kind": kind,
        "path": path,
        "generator": generator,
        "hash": artifact_hash
    })

def _flush_lineage():
    """Appends the completed run metadata to the material passport experiment lineage file."""
    global _CURRENT_RUN
    if not _CURRENT_RUN:
        return

    lineage_filepath = "material_passport_lineage.json"
    existing_lineage = []

    if os.path.exists(lineage_filepath):
        try:
            with open(lineage_filepath, "r", encoding="utf-8") as f:
                existing_lineage = json.load(f)
                if not isinstance(existing_lineage, list):
                    existing_lineage = []
        except Exception:
            existing_lineage = []

    # Update or append
    run_idx = -1
    for idx, run in enumerate(existing_lineage):
        if run.get("run_id") == _CURRENT_RUN["run_id"]:
            run_idx = idx
            break

    if run_idx >= 0:
        existing_lineage[run_idx] = _CURRENT_RUN
    else:
        existing_lineage.append(_CURRENT_RUN)

    with open(lineage_filepath, "w", encoding="utf-8") as f:
        json.dump(existing_lineage, f, indent=2)
