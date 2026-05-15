#!/usr/bin/env python3
"""
Network Security Platform — Dev Server Runner
Usage: python3 run.py
"""

import subprocess
import sys
import os
import shutil

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))


def run(cmd, **kwargs):
    return subprocess.run(cmd, cwd=PROJECT_DIR, **kwargs)


def check_node():
    if not shutil.which("node"):
        print("ERROR: Node.js not found. Install from https://nodejs.org")
        sys.exit(1)
    result = run(["node", "--version"], capture_output=True, text=True)
    print(f"Node.js: {result.stdout.strip()}")


def check_npm():
    if not shutil.which("npm"):
        print("ERROR: npm not found.")
        sys.exit(1)
    result = run(["npm", "--version"], capture_output=True, text=True)
    print(f"npm:     {result.stdout.strip()}")


def install_deps():
    node_modules = os.path.join(PROJECT_DIR, "node_modules")
    if os.path.isdir(node_modules):
        print("Dependencies already installed. Skipping npm install.\n")
        return
    print("Installing dependencies...")
    result = run(["npm", "install"])
    if result.returncode != 0:
        print("ERROR: npm install failed.")
        sys.exit(1)
    print("Dependencies installed.\n")


def start_dev():
    print("=" * 50)
    print("  Network Security Platform")
    print("  Starting dev server on http://localhost:3000")
    print("=" * 50)
    print("Press Ctrl+C to stop.\n")
    try:
        run(["npm", "run", "dev"])
    except KeyboardInterrupt:
        print("\nServer stopped.")


if __name__ == "__main__":
    check_node()
    check_npm()
    install_deps()
    start_dev()
