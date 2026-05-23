"""
Cursor Academy (Academic Research Skills ARS v4.0)
Developer Plugin SDK & Scaffolding Command Line Interface (CLI)

Provides modular scaffolds for rapidly bootstrapping new agents, schemas,
domain packs, and venues to extend the ARS v4.0 framework.
"""

import os
import sys
import argparse
import yaml
import json

def scaffold_agent(skill: str, name: str):
    """Generates an agent markdown template with strict required frontmatter."""
    agent_dir = os.path.join(skill, "agents")
    os.makedirs(agent_dir, exist_ok=True)
    agent_filepath = os.path.join(agent_dir, f"{name}_agent.md")

    if os.path.exists(agent_filepath):
        print(f"Error: Agent '{name}' already exists at {agent_filepath}", file=sys.stderr)
        return

    frontmatter = f"""---
task_type: open-ended
data_access_level: raw
model: inherit
status: active
ars_version: 4.0.0
---

# {name.replace('_', ' ').title()} Agent

You are a highly analytical AI research assistant specialized in academic workflows.

## Objectives
- Perform deep reviews and verifications on user-supplied drafts.
- Ensure strict compliance with domain requirements.

## Inputs
- Material Passport (`passport.yaml`)
- Selected literature chunks (`corpus_index/`)

## Outputs
- Emits structured JSON findings compliant with schemas.
"""
    with open(agent_filepath, "w", encoding="utf-8") as f:
        f.write(frontmatter)
    print(f"Scaffolded agent at: {agent_filepath}")

def scaffold_domain_pack(name: str):
    """Scaffolds a domain pack with pack.yaml and standard checklists."""
    pack_dir = os.path.join("domain_packs", name)
    ref_dir = os.path.join(pack_dir, "references")
    os.makedirs(ref_dir, exist_ok=True)

    pack_yaml = {
        "pack_name": name,
        "version": "1.0.0",
        "description": f"Custom {name} pack providing reporting guidelines and checklists.",
        "applicable_modes": ["full"],
        "checklists": [
            {
                "id": f"{name}-guidelines",
                "name": f"{name.title()} Compliance Guidelines",
                "path": f"references/{name}_guidelines.md",
                "stage_gate": 4.5
            }
        ]
    }

    with open(os.path.join(pack_dir, "pack.yaml"), "w", encoding="utf-8") as f:
        yaml.safe_dump(pack_yaml, f, sort_keys=False)

    with open(os.path.join(ref_dir, f"{name}_guidelines.md"), "w", encoding="utf-8") as f:
        f.write(f"# {name.title()} Guidelines Checklist\n\n- [ ] Ensure all data is cited properly.\n")

    print(f"Scaffolded domain pack at: {pack_dir}")

def main():
    parser = argparse.ArgumentParser(description="ars-cli (ARS v4.0 Developer CLI)")
    subparsers = parser.add_subparsers(dest="command")

    # new agent sub-command
    agent_parser = subparsers.add_parser("new-agent", help="Scaffold a new agent")
    agent_parser.add_argument("--skill", required=True, help="Skill folder, e.g., academic-paper")
    agent_parser.add_argument("--name", required=True, help="Name of the new agent")

    # new domain-pack sub-command
    dp_parser = subparsers.add_parser("new-domain-pack", help="Scaffold a new domain pack")
    dp_parser.add_argument("--name", required=True, help="Name of the new domain pack")

    args = parser.parse_args()

    if args.command == "new-agent":
        scaffold_agent(args.skill, args.name)
    elif args.command == "new-domain-pack":
        scaffold_domain_pack(args.name)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
