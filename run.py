#!/usr/bin/env python3
"""
NetWork Academy local helper runner.

Usage:
  python run.py check
  python run.py init
  python run.py plan
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent

REQUIRED_FILES = [
    "README.md",
    "docs/architecture.md",
    "docs/ai-prompts.md",
    "docs/roadmap.md",
    "apps/web/README.md",
    "apps/api/README.md",
    "packages/content/sections.json",
    "packages/shared/types.ts",
]

EXPECTED_SECTION_IDS = {
    "network-fundamentals",
    "http-https-tls-ssl",
    "web-servers",
    "server-infrastructure",
    "software-architecture",
    "network-security",
    "pentesting",
}


def check_files() -> int:
    missing = [p for p in REQUIRED_FILES if not (ROOT / p).exists()]
    if missing:
        print("❌ Missing required files:")
        for f in missing:
            print(f"  - {f}")
        return 1

    sections_path = ROOT / "packages/content/sections.json"
    try:
        data = json.loads(sections_path.read_text(encoding="utf-8"))
        section_ids = {s["id"] for s in data.get("sections", [])}
    except Exception as exc:
        print(f"❌ Could not parse sections manifest: {exc}")
        return 1

    missing_ids = EXPECTED_SECTION_IDS - section_ids
    if missing_ids:
        print("❌ Missing expected section IDs:")
        for sid in sorted(missing_ids):
            print(f"  - {sid}")
        return 1

    print("✅ Repository blueprint check passed.")
    return 0


def init_structure() -> int:
    dirs = [
        ROOT / "apps/web",
        ROOT / "apps/api",
        ROOT / "docs",
        ROOT / "packages/content",
        ROOT / "packages/shared",
    ]
    for d in dirs:
        d.mkdir(parents=True, exist_ok=True)

    print("✅ Base directory structure is ready.")
    return 0


def print_plan() -> int:
    print("NetWork Academy build plan:")
    print("1) Scaffold Next.js 15 app in apps/web")
    print("2) Scaffold NestJS app in apps/api")
    print("3) Add Prisma schema + migrations")
    print("4) Implement mini-exam/final-exam API flows")
    print("5) Integrate AI evaluation + question generation")
    print("6) Build interactive lesson player and dashboard")
    return 0


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="NetWork Academy helper runner")
    parser.add_argument(
        "command",
        choices=["check", "init", "plan"],
        help="Command to execute",
    )
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    args = parse_args(argv)
    if args.command == "check":
        return check_files()
    if args.command == "init":
        return init_structure()
    if args.command == "plan":
        return print_plan()
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
