#!/usr/bin/env python3
"""Remove personal contact data from public HTML and use the project mailbox."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECT_EMAIL = "info@justiceforgina.org"

EMAIL_PATTERNS = [
    re.compile(r"garrisongazvoda3@gmail\.com", re.IGNORECASE),
    re.compile(r"grantgazvoda@gmail\.com", re.IGNORECASE),
]
PHONE_LINK_PATTERNS = [
    re.compile(r'<a\b[^>]*href=["\']tel:\+?1?2036951721["\'][^>]*>.*?</a>', re.IGNORECASE | re.DOTALL),
]
PHONE_TEXT_PATTERNS = [
    re.compile(r"\(203\)\s*695[-\s]?1721", re.IGNORECASE),
    re.compile(r"203[-\s]?695[-\s]?1721", re.IGNORECASE),
    re.compile(r"\+1\s*203[-\s]?695[-\s]?1721", re.IGNORECASE),
    re.compile(r"\+12036951721", re.IGNORECASE),
    re.compile(r"2036951721", re.IGNORECASE),
]

changed: list[str] = []

for path in sorted(ROOT.rglob("*.html")):
    text = path.read_text(encoding="utf-8", errors="replace")
    updated = text

    for pattern in PHONE_LINK_PATTERNS:
        updated = pattern.sub("", updated)
    for pattern in EMAIL_PATTERNS:
        updated = pattern.sub(PROJECT_EMAIL, updated)
    for pattern in PHONE_TEXT_PATTERNS:
        updated = pattern.sub("", updated)

    updated = re.sub(r"\b(?:Phone|Telephone):\s*(?=<|$)", "", updated, flags=re.IGNORECASE)
    updated = re.sub(r"\s{2,}", " ", updated)

    if updated != text:
        path.write_text(updated, encoding="utf-8")
        changed.append(str(path.relative_to(ROOT)))

print(f"Updated {len(changed)} public HTML files")
for item in changed:
    print(f"- {item}")
