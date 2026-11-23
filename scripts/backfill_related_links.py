"""Build relatedLinks from inline <a href="/..."> already stored in pack sections."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACK_DIR = ROOT / "public" / "data" / "migrated"


def plain(s: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


def main():
    n = 0
    for fp in sorted(PACK_DIR.glob("*.json")):
        data = json.loads(fp.read_text(encoding="utf-8"))
        page = (data.get("path") or "").rstrip("/") or "/"
        blob = json.dumps(data.get("sections") or [])
        seen = set()
        related = []
        for m in re.finditer(r'<a\s+href="([^"]+)">([^<]*)</a>', blob):
            href, label = m.group(1), plain(m.group(2))
            if not href.startswith("/") or not label:
                continue
            if href.rstrip("/") == page:
                continue
            if href in seen:
                continue
            seen.add(href)
            related.append({"href": href, "label": label[:90]})
            if len(related) >= 10:
                break
        if related and related != data.get("relatedLinks"):
            data["relatedLinks"] = related
            fp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
            n += 1
    print("updated relatedLinks on", n, "packs")


if __name__ == "__main__":
    main()
