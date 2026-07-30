#!/usr/bin/env python3
"""Public-layer privacy allowlist checks for the Justice for Gina V9 candidate."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALLOWED_EMAILS = {"garrisongazvoda3@gmail.com"}
ALLOWED_PHONE_DIGITS = {"2036951721", "12036951721"}
EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)
TEL_RE = re.compile(r"tel:([^\"'<>\s]+)", re.IGNORECASE)
VISIBLE_PHONE_RE = re.compile(
    r"(?<!\d)(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}(?!\d)"
)
SSN_RE = re.compile(r"(?<!\d)\d{3}-\d{2}-\d{4}(?!\d)")
FAILURES: list[str] = []


def normalize_digits(value: str) -> str:
    return re.sub(r"\D", "", value)


def fail(message: str) -> None:
    FAILURES.append(message)


def public_text_files() -> list[Path]:
    files = list(ROOT.rglob("*.html"))
    files.extend(
        [
            ROOT / "evidence-index.json",
            ROOT / "data/public-evidence.json",
            ROOT / "data/v9-document-catalog.json",
            ROOT / "data/v9-public-claim-register.json",
        ]
    )
    return sorted({path for path in files if path.is_file()})


def main() -> int:
    observed_emails: set[str] = set()
    observed_phones: set[str] = set()

    for path in public_text_files():
        relative = path.relative_to(ROOT)
        text = path.read_text(encoding="utf-8", errors="replace")

        for match in EMAIL_RE.findall(text):
            email = match.lower()
            observed_emails.add(email)
            if email not in ALLOWED_EMAILS:
                fail(f"{relative}: non-allowlisted public email: {match}")

        for match in TEL_RE.findall(text):
            digits = normalize_digits(match)
            observed_phones.add(digits)
            if digits not in ALLOWED_PHONE_DIGITS:
                fail(f"{relative}: non-allowlisted tel link: {match}")

        for match in VISIBLE_PHONE_RE.findall(text):
            digits = normalize_digits(match)
            observed_phones.add(digits)
            if digits not in ALLOWED_PHONE_DIGITS:
                fail(f"{relative}: non-allowlisted visible phone: {match}")

        if SSN_RE.search(text):
            fail(f"{relative}: Social Security number pattern in public layer")

    if observed_emails != ALLOWED_EMAILS:
        missing = sorted(ALLOWED_EMAILS - observed_emails)
        extra = sorted(observed_emails - ALLOWED_EMAILS)
        if missing:
            fail("designated public press email is missing: " + ", ".join(missing))
        if extra:
            fail("unexpected public emails observed: " + ", ".join(extra))

    if not observed_phones.intersection(ALLOWED_PHONE_DIGITS):
        fail("designated public press phone is missing")

    if FAILURES:
        print("V9 PRIVACY QA FAILED")
        for item in FAILURES:
            print(f"- {item}")
        return 1

    print("V9 PRIVACY QA PASSED")
    print(f"- public email allowlist: {', '.join(sorted(ALLOWED_EMAILS))}")
    print("- public phone allowlist: designated press number only")
    print("- no Social Security number pattern detected")
    return 0


if __name__ == "__main__":
    sys.exit(main())
