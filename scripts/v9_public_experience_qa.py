#!/usr/bin/env python3
"""Focused public-experience QA for the Justice for Gina V9 redesign."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FAILURES: list[str] = []


def fail(message: str) -> None:
    FAILURES.append(message)


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8", errors="replace")


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.h1 = 0
        self.lang = None
        self.images_without_alt: list[str] = []
        self.blank_without_noopener: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        if tag == "html":
            self.lang = values.get("lang")
        if tag == "h1":
            self.h1 += 1
        if tag == "img" and "alt" not in values:
            self.images_without_alt.append(values.get("src", ""))
        if tag == "a" and values.get("target") == "_blank":
            rel = set(values.get("rel", "").split())
            if "noopener" not in rel:
                self.blank_without_noopener.append(values.get("href", ""))


def check_homepage() -> None:
    page = read("index.html")
    required = [
        "Gina Marie Gazvoda",
        "July 7, 2026",
        "U04W-CR26-0519807-S",
        "Forgery in the Second Degree",
        "Conspiracy to Commit Forgery in the Second Degree",
        "presumed innocent",
        "Family position",
        "Grant and Garrison Gazvoda believe",
        "info@justiceforgina.org",
    ]
    for marker in required:
        if marker.lower() not in page.lower():
            fail(f"index.html: missing required public marker: {marker}")

    prohibited = [
        "Twenty-one structured records · Twenty-five classified claims",
        "CURRENT COMMAND VIEW",
        "THE EXTERNAL EVIDENCE PHASE",
        "implementation note",
        "developer instruction",
        "workflow instruction",
    ]
    for marker in prohibited:
        if marker.lower() in page.lower():
            fail(f"index.html: public-facing internal or repetitive text remains: {marker}")

    if page.lower().count("help fund the work") > 3:
        fail("index.html: fundraising action is repeated excessively")


def check_structured_evidence() -> None:
    index = json.loads(read("evidence-index.json"))
    evidence = json.loads(read("data/public-evidence.json"))
    claims = json.loads(read("data/v9-public-claim-register.json"))
    catalog = json.loads(read("data/v9-document-catalog.json"))

    if index.get("version") != 9:
        fail("evidence-index.json: version must be 9")
    if index.get("record_count") != 21 or len(evidence.get("records", [])) != 21:
        fail("structured evidence count must remain 21")
    if index.get("claim_count") != 25 or len(claims.get("claims", [])) != 25:
        fail("classified claim count must remain 25")
    if len(catalog.get("records", [])) != 21:
        fail("document catalog must remain route-matched to 21 evidence records")

    form = next((item for item in evidence.get("records", []) if item.get("record_id") == "cremation-request-form-status"), None)
    if not form or form.get("verification_status") != "apparent-form-produced-authentication-incomplete":
        fail("corrected cremation-form status is missing from structured evidence")


def check_accessibility_basics() -> None:
    for relative in [
        "index.html", "case-status.html", "evidence.html", "timeline.html",
        "gina-gazvoda.html", "press.html", "funding.html", "standards.html",
    ]:
        parser = AuditParser()
        parser.feed(read(relative))
        if parser.lang != "en":
            fail(f"{relative}: html lang must be en")
        if parser.h1 != 1:
            fail(f"{relative}: expected exactly one h1, found {parser.h1}")
        for src in parser.images_without_alt:
            fail(f"{relative}: image missing alt text: {src}")
        for href in parser.blank_without_noopener:
            fail(f"{relative}: target=_blank missing noopener: {href}")

    script = read("script.js")
    for marker in ["aria-expanded", "Escape", "restoreFocus", "prefers-reduced-motion", "info@justiceforgina.org"]:
        if marker not in script:
            fail(f"script.js: missing accessibility/privacy marker: {marker}")


def check_public_contact_source() -> None:
    corpus = "\n".join(path.read_text(encoding="utf-8", errors="replace") for path in ROOT.rglob("*.html"))
    blocked = [
        "garrisongazvoda3@gmail.com",
        "grantgazvoda@gmail.com",
        "203-695-1721",
        "203 695 1721",
        "2036951721",
        "+12036951721",
    ]
    for value in blocked:
        if value.lower() in corpus.lower():
            fail(f"public HTML source still exposes blocked personal contact: {value}")
    if "info@justiceforgina.org" not in corpus.lower():
        fail("public HTML source does not contain info@justiceforgina.org")


def main() -> int:
    check_homepage()
    check_structured_evidence()
    check_accessibility_basics()
    check_public_contact_source()

    if FAILURES:
        print("V9 PUBLIC EXPERIENCE QA FAILED")
        for item in FAILURES:
            print(f"- {item}")
        return 1

    print("V9 PUBLIC EXPERIENCE QA PASSED")
    print("- homepage hierarchy and legal labels verified")
    print("- structured evidence counts and corrected form status verified")
    print("- accessibility basics verified")
    print("- project-only public contact verified")
    return 0


if __name__ == "__main__":
    sys.exit(main())
