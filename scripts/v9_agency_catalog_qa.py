#!/usr/bin/env python3
"""Validate the Justice for Gina V9 agency communications catalog."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "data/v9-agency-communications-catalog-2026-07-30.json"
EXPECTED_IDS = {
    "ova-docket-guidance-2026-07-22",
    "ovs-compensation-screening-2026-07-23",
    "dcj-routing-2026-07-27",
}
REQUIRED_FIELDS = {
    "communication_id",
    "gmail_message_id",
    "received_at",
    "sender_organization",
    "subject",
    "source_class",
    "attachments",
    "establishes",
    "does_not_establish",
    "publication_status",
    "public_route",
    "next_action",
}


def main() -> int:
    failures: list[str] = []
    try:
        catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001
        print(f"V9 AGENCY CATALOG QA FAILED\n- invalid JSON: {exc}")
        return 1

    if catalog.get("version") != 9:
        failures.append("version must be 9")
    communications = catalog.get("communications", [])
    if catalog.get("communication_count") != 3 or len(communications) != 3:
        failures.append("communication_count and communications length must both be 3")

    ids = [item.get("communication_id") for item in communications]
    message_ids = [item.get("gmail_message_id") for item in communications]
    if set(ids) != EXPECTED_IDS:
        failures.append("communication IDs do not match the controlled three-message set")
    if len(ids) != len(set(ids)):
        failures.append("duplicate communication_id")
    if any(not value for value in message_ids) or len(message_ids) != len(set(message_ids)):
        failures.append("gmail_message_id values must be present and unique")

    for item in communications:
        item_id = item.get("communication_id", "unknown")
        missing = sorted(REQUIRED_FIELDS - set(item))
        if missing:
            failures.append(f"{item_id}: missing fields: {', '.join(missing)}")
        if not item.get("establishes"):
            failures.append(f"{item_id}: establishes is empty")
        if not item.get("does_not_establish"):
            failures.append(f"{item_id}: does_not_establish is empty")
        if item.get("publication_status") != "metadata-and-public-safe-summary":
            failures.append(f"{item_id}: unexpected publication_status")
        route = ROOT / str(item.get("public_route", ""))
        if route.is_dir():
            route = route / "index.html"
        if not route.is_file():
            failures.append(f"{item_id}: missing public route")

    by_id = {item.get("communication_id"): item for item in communications}
    if by_id.get("ova-docket-guidance-2026-07-22", {}).get("gmail_message_id") != "19f8b6a3caa396b6":
        failures.append("OVA Gmail source ID mismatch")
    if by_id.get("ovs-compensation-screening-2026-07-23", {}).get("gmail_message_id") != "19f8f04c40b7328f":
        failures.append("OVS Gmail source ID mismatch")
    if by_id.get("dcj-routing-2026-07-27", {}).get("gmail_message_id") != "19fa4d9330d2fc84":
        failures.append("DCJ Gmail source ID mismatch")

    ova = by_id.get("ova-docket-guidance-2026-07-22", {})
    if "July 22, 2026 at 5:13 a.m." not in " ".join(ova.get("establishes", [])):
        failures.append("OVA record must preserve the source accuracy timestamp")
    ovs = by_id.get("ovs-compensation-screening-2026-07-23", {})
    if len(ovs.get("attachments", [])) != 6:
        failures.append("OVS attachment inventory must contain six files")
    dcj = by_id.get("dcj-routing-2026-07-27", {})
    if "routing" not in str(dcj.get("source_class", "")):
        failures.append("DCJ message must remain classified as routing")

    if failures:
        print("V9 AGENCY CATALOG QA FAILED")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("V9 AGENCY CATALOG QA PASSED")
    print("- 3 official agency communications")
    print("- unique Gmail message IDs and source timestamps")
    print("- OVA docket snapshot, OVS program screening, and DCJ routing remain separately classified")
    return 0


if __name__ == "__main__":
    sys.exit(main())
