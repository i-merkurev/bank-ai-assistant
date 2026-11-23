#!/usr/bin/env python3
"""Reconstruct editable React/Vite project from the published Netlify bundle.

Original authored sources and source maps are missing. This script recovers the
application logic from the original build (which uses React's jsx-runtime),
restores the exact stylesheet, and gives components descriptive names.
It is a one-time migration tool, not a substitute for the original sources.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
BUNDLE_DIR = ROOT / "deployed" / "assets"

SYMBOLS = {
    "m": "navigationItems",
    "h": "transactions",
    "g": "services",
    "_": "suggestedQuestions",
    "v": "App",
    "y": "HomeScreen",
    "b": "AssistantScreen",
    "x": "OfferScreen",
    "ee": "FeatureRow",
    "S": "AssistantOverview",
    "C": "DetailHeader",
    "te": "ExpensesScreen",
    "ne": "LegendItem",
    "re": "RemindersScreen",
    "w": "SavingsScreen",
    "ie": "ChatScreen",
    "ae": "getMockReply",
    "oe": "OtherTabScreen",
}

HEADER = """// Reconstructed from the published Netlify bundle of 17 Aug 2026.
// This retains the real app's interactions and text, but the original JSX
// component source was not available. Components use compiled jsx-runtime
// calls; refactor them into JSX only after verifying visual parity.
import * as React from "react";
import * as JSX from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import "./styles.css";

const f = React;
const p = JSX;
const d = { createRoot };

"""

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Overwrite previously reconstructed source")
    args = parser.parse_args()

    js_files = sorted(BUNDLE_DIR.glob("index-*.js"))
    css_files = sorted(BUNDLE_DIR.glob("index-*.css"))
    if len(js_files) != 1 or len(css_files) != 1:
        raise SystemExit("Expected one deployed JS and CSS asset; inspect deployed/assets")
    main_file = SRC / "main.jsx"
    styles_file = SRC / "styles.css"
    if (main_file.exists() or styles_file.exists()) and not args.force:
        raise SystemExit("src already exists. Refusing to overwrite edits; use --force intentionally.")

    bundle = js_files[0].read_text(encoding="utf-8")
    start_marker = "m=[{id:" + chr(96) + "home" + chr(96)
    start = bundle.rfind(start_marker)
    if start < 0:
        raise SystemExit("Application boundary not found. Bundle format may have changed.")
    application = bundle[start:]
    if "createRoot" not in application or "function " not in application:
        raise SystemExit("Application extraction produced unexpected output.")

    # In compiled output the datasets were comma-separated parts of a var
    # declaration: m=[...],h=[...],g=[...],_=[...];function App().
    application = "const " + application

    # Rename only known app-level symbols. The original production bundle
    # uses short names for all local function parameters, which remain as-is.
    for short, long in sorted(SYMBOLS.items(), key=lambda item: -len(item[0])):
        application = re.sub(r"\b" + re.escape(short) + r"\b", long, application)

    SRC.mkdir(parents=True, exist_ok=True)
    main_file.write_text(HEADER + application + "\n", encoding="utf-8")
    styles_file.write_text(css_files[0].read_text(encoding="utf-8"), encoding="utf-8")
    print(f"Restored {main_file.relative_to(ROOT)} ({main_file.stat().st_size} bytes)")
    print(f"Restored {styles_file.relative_to(ROOT)} ({styles_file.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
