#!/usr/bin/env python3
"""Deterministic static QA for the Justice for Gina V9 release candidate."""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
FAILURES: list[str] = []
EXPECTED_RECORDS = 21
EXPECTED_CLAIMS = 25
EXPECTED_INTAKE_ENTRIES = 11


def fail(message: str) -> None:
    FAILURES.append(message)


def read(relative: str) -> str:
    path = ROOT / relative
    try:
        return path.read_text(encoding="utf-8")
    except Exception as exc:  # noqa: BLE001
        fail(f"{relative}: cannot read: {exc}")
        return ""


def load_json(relative: str) -> dict:
    try:
        return json.loads(read(relative))
    except Exception as exc:  # noqa: BLE001
        fail(f"{relative}: invalid JSON: {exc}")
        return {}


def resolve_local(source: Path, value: str) -> Path | None:
    if value.startswith(("#", "mailto:", "tel:", "data:")):
        return None
    if value.lower().startswith("javascript:"):
        fail(f"{source.relative_to(ROOT)}: javascript URL prohibited: {value}")
        return None
    parsed = urlparse(value)
    if parsed.scheme or parsed.netloc:
        return None
    if value.startswith("/"):
        fail(f"{source.relative_to(ROOT)}: root-relative path breaks project fallback: {value}")
        return None
    raw = value.split("#", 1)[0].split("?", 1)[0]
    if not raw:
        return None
    target = (source.parent / raw).resolve()
    try:
        target.relative_to(ROOT)
    except ValueError:
        fail(f"{source.relative_to(ROOT)}: reference escapes repository: {value}")
        return None
    return target / "index.html" if target.is_dir() else target


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[tuple[str, str]] = []
        self.blank_without_noopener: list[str] = []
        self.ids: list[str] = []
        self.images_without_alt: list[str] = []
        self.lang: str | None = None
        self.h1_count = 0
        self.title_count = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = {key: value or "" for key, value in attrs}
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "title":
            self.title_count += 1
        elif tag == "h1":
            self.h1_count += 1
        if tag == "img" and "alt" not in a:
            self.images_without_alt.append(a.get("src", ""))
        if a.get("id"):
            self.ids.append(a["id"])
        value = a.get("href") or a.get("src")
        if tag in {"a", "link", "script", "img", "source"} and value:
            self.links.append((tag, value))
        if tag == "a" and a.get("target") == "_blank":
            rel = set(a.get("rel", "").split())
            if "noopener" not in rel:
                self.blank_without_noopener.append(a.get("href", ""))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def check_required_files() -> None:
    required = [
        "index.html", "gina-gazvoda.html", "case-status.html", "evidence.html",
        "timeline.html", "press.html", "support.html", "funding.html",
        "standards.html", "911-call-analysis.html", "police-response-review.html",
        "panwar-pronouncement-review.html", "records-request-status.html",
        "record.html", "record.js", "404.html", "styles.css",
        "css/v3-1.css", "css/v3-4.css", "css/v8-command-center.css", "script.js",
        "sitemap.xml", "robots.txt", "site.webmanifest", "_headers",
        "evidence-index.json", "data/public-evidence.json",
        "data/v9-document-catalog.json", "data/v9-public-claim-register.json",
        "data/v9-intake-catalog-2026-07-30.json", "V9_RELEASE_PLAN.md",
        "V9_WORK_LOG.md", "V9_QA_LOG.md",
        "V9_EVIDENCE_COMPLETION_ADDENDUM_2026-07-30.md",
        "V9_DOCKET_VERIFICATION_MEMO_2026-07-30.md",
        "V9_ACCESSIBILITY_AND_BROWSER_QA_2026-07-30.md",
        "documents/index.html", "documents/funeral-home-summary-judgment/index.html",
        "documents/cremation-request-form-status/index.html",
    ]
    for relative in required:
        path = ROOT / relative
        if not path.is_file() or path.stat().st_size == 0:
            fail(f"missing or empty required file: {relative}")


def check_release_markers() -> None:
    expectations = {
        "robots.txt": "Sitemap: https://justiceforgina.org/sitemap.xml",
        "sitemap.xml": "https://justiceforgina.org/documents/funeral-home-summary-judgment/",
        "_headers": "frame-ancestors 'none'",
        "site.webmanifest": '"start_url": "./"',
        "index.html": "Twenty-one structured records",
        "case-status.html": "Twenty-one structured records",
        "evidence.html": "21 controlled records",
        "timeline.html": "twenty-one structured records",
        "press.html": "Twenty-one issue-specific V9 records",
        "gina-gazvoda.html": 'data-site-version="9"',
        "css/v3-1.css": ":focus-visible",
        "css/v3-4.css": "prefers-reduced-motion: reduce",
        "script.js": "restoreFocus",
    }
    for relative, needle in expectations.items():
        if needle not in read(relative):
            fail(f"{relative}: missing release marker: {needle}")

    index_html = read("index.html")
    if "Twenty-five classified claims" not in index_html:
        fail("index.html: missing twenty-five claim count")
    if "apparent § 20-230c-type disposition page" not in index_html:
        fail("index.html: missing corrected statutory-form status")

    case_status = read("case-status.html").lower()
    if "presumed innocent" not in case_status:
        fail("case-status.html: missing presumption-of-innocence language")
    if "does not establish who caused gina" not in case_status:
        fail("case-status.html: missing controlled homicide conclusion")
    if "apparent § 20-230c-type disposition page" not in case_status:
        fail("case-status.html: missing corrected statutory-form status")
    if "counts 5 through 7" not in case_status or "counts 1 through 4" not in case_status:
        fail("case-status.html: missing scoped funeral-home court status")

    cname = ROOT / "CNAME"
    if cname.exists() and cname.read_text(encoding="utf-8").strip() != "justiceforgina.org":
        fail("CNAME exists but does not contain justiceforgina.org")


def check_structured_data() -> None:
    manifest = load_json("site.webmanifest")
    index = load_json("evidence-index.json")
    evidence = load_json("data/public-evidence.json")
    catalog = load_json("data/v9-document-catalog.json")
    claims = load_json("data/v9-public-claim-register.json")
    intake = load_json("data/v9-intake-catalog-2026-07-30.json")

    if manifest.get("start_url") != "./" or manifest.get("scope") != "./":
        fail("site.webmanifest: start_url and scope must be ./")
    if index.get("version") != 9:
        fail("evidence-index.json: version is not 9")
    if index.get("record_count") != EXPECTED_RECORDS:
        fail("evidence-index.json: incorrect record_count")
    if index.get("claim_count") != EXPECTED_CLAIMS:
        fail("evidence-index.json: incorrect claim_count")

    records = evidence.get("records", [])
    catalog_records = catalog.get("records", [])
    claim_records = claims.get("claims", [])
    intake_entries = intake.get("entries", [])
    if len(records) != EXPECTED_RECORDS:
        fail(f"data/public-evidence.json: {len(records)} records; expected {EXPECTED_RECORDS}")
    if len(catalog_records) != EXPECTED_RECORDS:
        fail(f"data/v9-document-catalog.json: {len(catalog_records)} records; expected {EXPECTED_RECORDS}")
    if catalog.get("record_count") != EXPECTED_RECORDS:
        fail("data/v9-document-catalog.json: incorrect record_count")
    if len(claim_records) != EXPECTED_CLAIMS:
        fail(f"data/v9-public-claim-register.json: {len(claim_records)} claims; expected {EXPECTED_CLAIMS}")
    if claims.get("claim_count") != EXPECTED_CLAIMS:
        fail("data/v9-public-claim-register.json: incorrect claim_count")
    if intake.get("version") != 9:
        fail("data/v9-intake-catalog-2026-07-30.json: version is not 9")
    if len(intake_entries) != EXPECTED_INTAKE_ENTRIES:
        fail(
            "data/v9-intake-catalog-2026-07-30.json: "
            f"{len(intake_entries)} entries; expected {EXPECTED_INTAKE_ENTRIES}"
        )

    record_ids = [item.get("record_id") for item in records]
    catalog_ids = [item.get("record_id") for item in catalog_records]
    claim_ids = [item.get("claim_id") for item in claim_records]
    intake_ids = [item.get("intake_id") for item in intake_entries]
    for label, values in [
        ("evidence records", record_ids),
        ("catalog records", catalog_ids),
        ("claims", claim_ids),
        ("intake entries", intake_ids),
    ]:
        if any(not value for value in values):
            fail(f"{label}: missing identifier")
        if len(values) != len(set(values)):
            fail(f"{label}: duplicate identifier")
    if set(record_ids) != set(catalog_ids):
        fail("public-evidence and document-catalog record IDs do not match")

    required_fields = {
        "record_id", "title", "summary", "record_type", "source_name",
        "source_class", "publication_status", "verification_status",
        "sensitivity_class", "provenance", "establishes", "does_not_establish",
        "records_needed", "revision_history",
    }
    for item in records:
        record_id = item.get("record_id", "unknown")
        missing = sorted(required_fields - set(item))
        if missing:
            fail(f"{record_id}: missing fields: {', '.join(missing)}")
        for field in ("establishes", "does_not_establish", "records_needed"):
            if not item.get(field):
                fail(f"{record_id}: {field} is empty")
        route = item.get("route") or item.get("source_url")
        if route and not re.match(r"^https?://", route):
            target = ROOT / route
            if target.is_dir():
                target = target / "index.html"
            if not target.exists():
                fail(f"{record_id}: missing route target: {route}")

    intake_required_fields = {
        "intake_id", "display_title", "source_role", "record_description",
        "evidence_use", "does_not_establish", "publication_posture", "next_action",
    }
    for item in intake_entries:
        intake_id = item.get("intake_id", "unknown")
        missing = sorted(intake_required_fields - set(item))
        if missing:
            fail(f"{intake_id}: missing intake fields: {', '.join(missing)}")
        if not item.get("does_not_establish"):
            fail(f"{intake_id}: does_not_establish is empty")

    mirror_lead = next(
        (item for item in intake_entries if item.get("intake_id") == "civil-docket-mirror-lead-2026-07-30"),
        {},
    )
    if mirror_lead.get("source_role") != "secondary-public-index-lead":
        fail("civil-docket-mirror-lead-2026-07-30: must remain a secondary-public-index-lead")
    if "not a public factual source" not in mirror_lead.get("publication_posture", ""):
        fail("civil-docket-mirror-lead-2026-07-30: publication restriction missing")

    evidence_html = read("evidence.html")
    linked_ids = set(re.findall(r"record\.html\?id=([A-Za-z0-9_-]+)", evidence_html))
    if linked_ids - set(record_ids):
        fail("evidence.html links unknown record IDs: " + ", ".join(sorted(linked_ids - set(record_ids))))
    if set(record_ids) - linked_ids:
        fail("evidence.html omits record IDs: " + ", ".join(sorted(set(record_ids) - linked_ids)))

    sitemap = read("sitemap.xml")
    for item in catalog_records:
        route = item.get("route", "")
        if route and f"https://justiceforgina.org/{route}" not in sitemap:
            fail(f"sitemap missing catalog route: {route}")

    form = next((item for item in records if item.get("record_id") == "cremation-request-form-status"), {})
    if form.get("verification_status") != "apparent-form-produced-authentication-incomplete":
        fail("cremation-request-form-status: corrected verification status missing")
    judgment = next((item for item in records if item.get("record_id") == "funeral-home-summary-judgment"), {})
    if judgment.get("source_class") != "court-finding":
        fail("funeral-home-summary-judgment: source class must be court-finding")


def check_html_and_links() -> None:
    html_files = sorted(ROOT.rglob("*.html"))
    for path in html_files:
        relative = path.relative_to(ROOT)
        text = path.read_text(encoding="utf-8", errors="replace")
        parser = PageParser()
        try:
            parser.feed(text)
        except Exception as exc:  # noqa: BLE001
            fail(f"{relative}: HTML parse error: {exc}")
            continue
        if parser.title_count != 1:
            fail(f"{relative}: expected one title, found {parser.title_count}")
        if parser.lang != "en":
            fail(f"{relative}: html lang is not en")
        if parser.h1_count != 1:
            fail(f"{relative}: expected one h1, found {parser.h1_count}")
        duplicates = sorted({value for value in parser.ids if parser.ids.count(value) > 1})
        if duplicates:
            fail(f"{relative}: duplicate ids: {', '.join(duplicates)}")
        for src in parser.images_without_alt:
            fail(f"{relative}: image missing alt: {src}")
        for href in parser.blank_without_noopener:
            fail(f"{relative}: target=_blank missing noopener: {href}")
        for _tag, value in parser.links:
            target = resolve_local(path, value)
            if target is not None and not target.exists():
                fail(f"{relative}: missing local reference: {value}")

    for css_path in sorted(ROOT.rglob("*.css")):
        text = css_path.read_text(encoding="utf-8", errors="replace")
        for value in re.findall(r"url\((?:['\"]?)([^)'\"]+)", text):
            target = resolve_local(css_path, value.strip())
            if target is not None and not target.exists():
                fail(f"{css_path.relative_to(ROOT)}: missing CSS reference: {value}")


def check_language_and_artifacts() -> None:
    public_files = list(ROOT.rglob("*.html")) + [
        ROOT / "data/public-evidence.json",
        ROOT / "data/v9-document-catalog.json",
        ROOT / "data/v9-public-claim-register.json",
    ]
    prohibited = {
        r"appears illegal": "conclusory legality wording",
        r"appears unlawful": "conclusory legality wording",
        r"was murdered by": "unsupported homicide attribution",
        r"murdered gina": "unsupported homicide attribution",
        r"was poisoned by": "unsupported poisoning attribution",
        r"poisoned gina": "unsupported poisoning attribution",
        r"committed perjury": "unsupported perjury attribution",
        r"obstructed justice": "unsupported obstruction attribution",
        r"form was entirely absent": "superseded total-absence wording",
        r"completed original is not in the controlled production": "superseded total-absence wording",
        r"completed original § 20-230c form is not located": "superseded total-absence wording",
        r"completed original (?:has not been|is not) located": "superseded total-absence wording",
        r"\btwenty structured (?:public )?records\b": "stale record count",
        r"\btwenty-four classified claims\b": "stale claim count",
        r"\btwenty issue-specific v9 records\b": "stale record count",
        r"\btwenty records with provenance\b": "stale record count",
        r"\b20 controlled records\b": "stale record count",
    }
    for path in public_files:
        text = path.read_text(encoding="utf-8", errors="replace")
        for pattern, label in prohibited.items():
            if re.search(pattern, text, re.IGNORECASE):
                fail(f"{path.relative_to(ROOT)}: {label}: {pattern}")

    secret_patterns = [
        r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
        r"gh[pousr]_[A-Za-z0-9_]{30,}",
        r"sk-[A-Za-z0-9]{20,}",
        r"AKIA[0-9A-Z]{16}",
    ]
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts or path.stat().st_size > 5_000_000:
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        for pattern in secret_patterns:
            if re.search(pattern, text):
                fail(f"{path.relative_to(ROOT)}: possible secret pattern")

    forbidden_suffixes = {".pdf", ".doc", ".docx", ".xls", ".xlsx", ".eml", ".msg", ".zip"}
    for path in ROOT.rglob("*"):
        if path.is_file() and path.suffix.lower() in forbidden_suffixes:
            fail(f"review-required binary artifact in public repository: {path.relative_to(ROOT)}")


def main() -> int:
    check_required_files()
    check_release_markers()
    check_structured_data()
    try:
        ET.parse(ROOT / "sitemap.xml")
    except Exception as exc:  # noqa: BLE001
        fail(f"sitemap.xml: invalid XML: {exc}")
    check_html_and_links()
    check_language_and_artifacts()
    if FAILURES:
        print("V9 QA FAILED")
        for item in FAILURES:
            print(f"- {item}")
        return 1
    html_count = len(list(ROOT.rglob("*.html")))
    print("V9 QA PASSED")
    print(f"- {EXPECTED_RECORDS} structured evidence records")
    print(f"- {EXPECTED_RECORDS} catalog records")
    print(f"- {EXPECTED_CLAIMS} classified public claims")
    print(f"- {EXPECTED_INTAKE_ENTRIES} controlled intake entries")
    print(f"- {html_count} HTML files checked recursively")
    print("- JSON, routes, record IDs, intake classifications, public counts, accessibility markers, HTML semantics, links, sitemap, publication language, secrets, and restricted artifacts passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
