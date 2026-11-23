"""Strip related-services junk from Conclusion sections and normalize packs."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACK_DIR = ROOT / "public" / "data" / "migrated"

JUNK_PARA = re.compile(
    r"^(other testing services|related|also read|you may also|share this|leave a reply)$",
    re.I,
)
JUNK_BULLET = re.compile(
    r"(testing|calibration|training|blog|inquiry|privacy|terms|jobs|payment|thank you|subscription)",
    re.I,
)


def plain(s: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


def clean_section(sec: dict) -> dict | None:
    heading = plain(sec.get("heading") or "")
    paras = [p.strip() for p in sec.get("paragraphs") or [] if plain(p)]
    bullets = [b.strip() for b in sec.get("bullets") or [] if plain(b)]

    is_conclusion = "conclu" in heading.lower()

    paras = [p for p in paras if not JUNK_PARA.match(plain(p)) and len(plain(p)) > 40]
    if is_conclusion:
        # Drop sitemap-style related lists entirely
        bullets = []
        # Keep only the first substantial closing paragraph(s)
        paras = [p for p in paras if len(plain(p)) > 80][:2]
        if not paras:
            return None
        return {"heading": "Conclusion", "paragraphs": paras, "bullets": []}

    # Non-conclusion: drop absurdly long related-style bullet dumps
    if len(bullets) > 8 and sum(1 for b in bullets if JUNK_BULLET.search(plain(b))) > 5:
        bullets = []

    if not paras and not bullets:
        return None
    return {"heading": heading, "paragraphs": paras, "bullets": bullets[:12]}


def main():
    n = 0
    for fp in PACK_DIR.glob("*.json"):
        data = json.loads(fp.read_text(encoding="utf-8"))
        cleaned = []
        for sec in data.get("sections") or []:
            c = clean_section(sec)
            if c:
                cleaned.append(c)
        if cleaned != data.get("sections"):
            n += 1
        data["sections"] = cleaned
        # scraped images only — never treat category hero as scraped
        scraped = []
        for im in data.get("images") or []:
            src = im.get("src") or ""
            if "/images/migrated-heroes/" in src:
                continue
            if "/images/migrated/" in src:
                scraped.append(im)
        data["scrapedImages"] = scraped
        data["images"] = scraped
        fp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print("cleaned packs", n)


if __name__ == "__main__":
    main()
