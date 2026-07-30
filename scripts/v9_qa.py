#!/usr/bin/env python3
"""Deterministic static QA for the Justice for Gina V9 release branch."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
FAILURES: list[str] = []


def fail(message: str) -> None:
    FAILURES.append(message)


def load_json(relative: str) -> dict:
    path = ROOT / relative
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001 - report all parse failures
        fail(f"{relative}: invalid JSON: {exc}")
        return {}


def resolve_local(source: Path, value: str) -> Path | None:
    if value.startswith(("#", "mailto:", "tel:", "data:")):
        return None
    if value.lower().startswith("javascript:"):
        fail(f"{source.relative_to(ROOT)}: javascript URL is prohibited: {value}")
        return None
    parsed = urlparse(value)
    if parsed.scheme or parsed.netloc:
        return None
    if value.startswith("/"):
        fail(
            f"{source.relative_to(ROOT)}: root-relative local reference breaks "
            f"project-path fallback: {value}"
        )
        return None
    path = value.split("#", 1)[0].split("?", 1)[0]
    if not path:
        return None
    target = (source.parent / path).resolve()
    try:
        target.relative_to(ROOT)
    except ValueError:
        fail(f"{source.relative_to(ROOT)}: reference escapes repository: {value}")
        return None
    if target.is_dir():
        target = target / "index.html"
    return target


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[tuple[str, str]] = []
        self.blank_links: list[str] = []
        self.ids: list[str] = []
        self.images_without_alt: list[str] = []
        self.lang: str | None = None
        self.h1_count = 0
        self.title_count = 0
        self.menu_buttons = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = {key: value or "" for key, value in attrs}
        if tag == "html":
            self.lang = attributes.get("lang")
        if tag == "title":
            self.title_count += 1
        if tag == "h1":
            self.h1_count += 1
        if tag == "button" and "menu-button" in attributes.get("class", "").split():
            self.menu_buttons += 1
        if tag == "img" and "alt" not in attributes:
            self.images_without_alt.append(attributes.get("src", ""))
        if attributes.get("id"):
            self.ids.append(attributes["id"])
        value = attributes.get("href") or attributes.get("src")
        if tag in {"a", "link", "script", "img", "source"} and value:
            self.links.append((tag, value))
        if tag == "a" and attributes.get("target") == "_blank":
            rel = set(attributes.get("rel", "").split())
            if "noopener" not in rel:
                self.blank_links.append(attributes.get("href", ""))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def check_required_files() -> None:
    required = [
        "index.html",
        "case-status.html",
        "evidence.html",
        "timeline.html",
        "press.html",
        "support.html",
        "funding.html",
        "standards.html",
        "911-call-analysis.html",
        "police-response-review.html",
        "panwar-pronouncement-review.html",
        "records-request-status.html",
        "record.html",
        "record.js",
        "404.html",
        "styles.css",
        "css/v8-command-center.css",
        "script.js",
        "sitemap.xml",
        "robots.txt",
        "site.webmanifest",
        "_headers",
        "evidence-index.json",
        "data/public-evidence.json",
        "data/v9-document-catalog.json",
        "data/v9-public-claim-register.json",
        "V9_RELEASE_PLAN.md",
        "V9_WORK_LOG.md",
        "V9_QA_LOG.md",
        "documents/index.html",
    ]
    for relative in required:
        path = ROOT / relative
        if not path.is_file() or path.stat().st_size == 0:
            fail(f"missing or empty required file: {relative}")


def check_release_markers() -> None:
    text = {
        name: (ROOT / name).read_text(encoding="utf-8", errors="replace")
        for name in [
            "robots.txt",
            "sitemap.xml",
            "_headers",
            "site.webmanifest",
            "index.html",
            "case-status.html",
            "evidence.html",
            "timeline.html",
            "404.html",
            "standards.html",
        ]
        if (ROOT / name).exists()
    }
    expectations = [
        ("robots.txt", "Sitemap: https://justiceforgina.org/sitemap.xml"),
        ("sitemap.xml", "https://justiceforgina.org/case-status.html"),
        ("_headers", "frame-ancestors 'none'"),
        ("_headers", "object-src 'none'"),
        ("site.webmanifest", '"start_url": "./"'),
        ("index.html", 'data-site-version="9"'),
        ("case-status.html", 'data-site-version="9"'),
        ("evidence.html", 'data-site-version="9"'),
        ("timeline.html", 'data-site-version="9"'),
        ("404.html", 'data-site-version="9"'),
    ]
    for relative, needle in expectations:
        if needle not in text.get(relative, ""):
            fail(f"{relative}: missing release marker: {needle}")

    lower_case_status = text.get("case-status.html", "").lower()
    lower_index = text.get("index.html", "").lower()
    lower_standards = text.get("standards.html", "").lower()
    if "presumed innocent" not in lower_case_status:
        fail("case-status.html: missing presumption-of-innocence language")
    if "does not establish who caused gina" not in lower_case_status:
        fail("case-status.html: missing controlled homicide conclusion")
    if "not presented as final criminal conclusions" not in lower_index:
        fail("index.html: missing final-conclusion safeguard")
    if "missing-record language" not in lower_standards:
        fail("standards.html: missing missing-record publication standard")

    cname = ROOT / "CNAME"
    if cname.exists() and cname.read_text(encoding="utf-8").strip() != "justiceforgina.org":
        fail("CNAME exists but does not contain justiceforgina.org")


def check_structured_data() -> None:
    manifest = load_json("site.webmanifest")
    index = load_json("evidence-index.json")
    evidence = load_json("data/public-evidence.json")
    catalog = load_json("data/v9-document-catalog.json")
    claims = load_json("data/v9-public-claim-register.json")

    if manifest.get("start_url") != "./" or manifest.get("scope") != "./":
        fail("site.webmanifest: start_url and scope must be ./")
    if index.get("version") != 9:
        fail("evidence-index.json: version is not 9")

    records = evidence.get("records", [])
    catalog_records = catalog.get("records", [])
    claim_records = claims.get("claims", [])
    if len(records) != 20:
        fail(f"data/public-evidence.json: {len(records)} records; expected 20")
    if len(catalog_records) != 20:
        fail(f"data/v9-document-catalog.json: {len(catalog_records)} records; expected 20")
    if len(claim_records) != 24:
        fail(f"data/v9-public-claim-register.json: {len(claim_records)} claims; expected 24")

    record_ids = [record.get("record_id") for record in records]
    catalog_ids = [record.get("record_id") for record in catalog_records]
    claim_ids = [claim.get("claim_id") for claim in claim_records]
    for label, values in [
        ("evidence records", record_ids),
        ("catalog records", catalog_ids),
        ("claims", claim_ids),
    ]:
        if any(not value for value in values):
            fail(f"{label}: missing identifier")
        if len(values) != len(set(values)):
            fail(f"{label}: duplicate identifier")
    if set(record_ids) != set(catalog_ids):
        fail("public-evidence and document-catalog record IDs do not match")

    required_fields = {
        "record_id",
        "title",
        "summary",
        "record_type",
        "source_name",
        "source_class",
        "publication_status",
        "verification_status",
        "sensitivity_class",
        "provenance",
        "establishes",
        "does_not_establish",
        "records_needed",
        "revision_history",
    }
    for record in records:
        record_id = record.get("record_id", "unknown")
        missing = sorted(required_fields - set(record))
        if missing:
            fail(f"{record_id}: missing fields: {', '.join(missing)}")
        for field in ["establishes", "does_not_establish", "records_needed"]:
            if not record.get(field):
                fail(f"{record_id}: {field} is empty")
        route = record.get("route") or record.get("source_url")
        if route and not re.match(r"^https?://", route):
            target = ROOT / route
            if target.is_dir():
                target = target / "index.html"
            if not target.exists():
                fail(f"{record_id}: missing route target: {route}")

    evidence_html = (ROOT / "evidence.html").read_text(encoding="utf-8")
    linked_ids = set(re.findall(r"record\.html\?id=([A-Za-z0-9_-]+)", evidence_html))
    unknown = sorted(linked_ids - set(record_ids))
    omitted = sorted(set(record_ids) - linked_ids)
    if unknown:
        fail("evidence.html links unknown record IDs: " + ", ".join(unknown))
    if omitted:
        fail("evidence.html omits record IDs: " + ", ".join(omitted))

    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    for record in catalog_records:
        route = record.get("route", "")
        if route and f"https://justiceforgina.org/{route}" not in sitemap:
            fail(f"sitemap missing catalog route: {route}")


def check_html() -> None:
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
        for href in parser.blank_links:
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


def check_language_and_sensitive_artifacts() -> None:
    public_files = list(ROOT.rglob("*.html")) + [
        ROOT / "data/public-evidence.json",
        ROOT / "data/v9-document-catalog.json",
        ROOT / "data/v9-public-claim-register.json",
    ]
    prohibited = {
        r"appears illegal": "conclusory legality wording",
        r"appears unlawful": "conclusory legality wording",
        r"authority-side": "unsupported authority-side conclusion",
        r"was murdered by": "unsupported homicide attribution",
        r"murdered gina": "unsupported homicide attribution",
        r"was poisoned by": "unsupported poisoning attribution",
        r"poisoned gina": "unsupported poisoning attribution",
        r"committed perjury": "unsupported perjury attribution",
        r"obstructed justice": "unsupported obstruction attribution",
    }
    for path in public_files:
        text = path.read_text(encoding="utf-8", errors="replace")
        for pattern, label in prohibited.items():
            if re.search(pattern, text, re.IGNORECASE):
                fail(f"{path.relative_to(ROOT)}: {label}: /{pattern}/")

    secret_patterns = {
        r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----": "private key",
        r"\bghp_[A-Za-z0-9]{30,}\b": "GitHub token",
        r"\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b": "API key",
        r"\bAKIA[0-9A-Z]{16}\b": "AWS access key",
    }
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts or path.stat().st_size >= 2_000_000:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        for pattern, label in secret_patterns.items():
            if re.search(pattern, text):
                fail(f"{path.relative_to(ROOT)}: possible {label}")

    forbidden_extensions = {".docx", ".xlsx", ".pptx", ".zip", ".7z", ".eml", ".msg", ".pst"}
    for path in ROOT.rglob("*"):
        if path.is_file() and path.suffix.lower() in forbidden_extensions:
            fail(f"{path.relative_to(ROOT)}: restricted or review-required binary artifact")


def check_sitemap() -> None:
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    primary = [
        "case-status.html",
        "evidence.html",
        "documents/",
        "911-call-analysis.html",
        "panwar-pronouncement-review.html",
        "police-response-review.html",
        "records-request-status.html",
        "timeline.html",
        "press.html",
        "support.html",
        "funding.html",
        "standards.html",
    ]
    for route in primary:
        if f"https://justiceforgina.org/{route}" not in sitemap:
            fail(f"sitemap missing primary route: {route}")


def main() -> int:
    check_required_files()
    check_release_markers()
    check_structured_data()
    check_html()
    check_language_and_sensitive_artifacts()
    check_sitemap()

    if FAILURES:
        print(f"V9 QA FAILED with {len(FAILURES)} issue(s):")
        for failure in FAILURES:
            print(f"- {failure}")
        return 1

    html_count = len(list(ROOT.rglob("*.html")))
    print("V9 deterministic QA passed.")
    print("- 20 structured public evidence records")
    print("- 20 catalog records")
    print("- 24 classified public claims")
    print(f"- {html_count} HTML files checked recursively")
    print("- JSON, routes, record IDs, HTML semantics, links, sitemap, publication language, secrets, and restricted artifacts passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
