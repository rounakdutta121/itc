"""Assign unique generated heroes + section images; keep scraped images separate."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACK_DIR = ROOT / "public" / "data" / "migrated"
HERO_DIR = ROOT / "public" / "images" / "migrated-heroes"
SECTION_DIR = ROOT / "public" / "images" / "migrated-sections"

RULES = [
    (("emc", "emi", "cispr", "61000", "anechoic"), "emc"),
    (("photometr", "lm-79", "lm-80", "lumin", "led", "lux", "flicker", "integrating"), "photometry"),
    (("batter", "lithium", "un-38", "vrla", "cell"), "battery"),
    (("60601", "medical", "infant", "oximeter", "infusion", "hospital", "patient"), "medical"),
    (("calibrat", "micrometer", "pyranometer", "gauge", "sensor", "lux-meter"), "calibration"),
    (("ip-", "ipx", "ingress", "waterproof", "rain-test", "dust"), "ip"),
    (("chemical", "rohs", "reach", "biodegrad", "compost"), "chemical"),
    (("drop", "impact", "mechanical", "packag", "ista", "vibration", "shock", "motor", "torque"), "mechanical"),
    (("electrical", "iec-60335", "cable", "switch", "fuse", "rectifier"), "electrical"),
]


def pick_cat(path: str, title: str) -> str:
    blob = f"{path} {title}".lower()
    for keys, cat in RULES:
        if any(k in blob for k in keys):
            return cat
    return "general"


def hero_variants(cat: str) -> list[str]:
    bases = []
    for b in (cat, f"{cat}-2"):
        if (HERO_DIR / f"{b}.webp").exists():
            bases.append(b)
    return bases or ["general"]


def section_variants(cat: str) -> list[str]:
    out = []
    for b in (f"{cat}-1", f"{cat}-2", "general-1", "general-2"):
        if (SECTION_DIR / f"{b}.webp").exists():
            out.append(b)
    return out or ["general-1"]


def stable_index(key: str, n: int) -> int:
    if n <= 0:
        return 0
    h = int(hashlib.md5(key.encode()).hexdigest(), 16)
    return h % n


def main():
    packs = sorted(PACK_DIR.glob("*.json"), key=lambda p: p.name)
    # Round-robin unique hero assignment within category
    cat_counters: dict[str, int] = {}

    for fp in packs:
        data = json.loads(fp.read_text(encoding="utf-8"))
        cat = pick_cat(data.get("path", ""), data.get("h1", "") or data.get("title", ""))
        data["category"] = cat

        heroes = hero_variants(cat)
        idx = cat_counters.get(cat, 0)
        hero_base = heroes[idx % len(heroes)]
        cat_counters[cat] = idx + 1

        data["hero"] = f"/images/migrated-heroes/{hero_base}.webp"
        data["heroPortrait"] = f"/images/migrated-heroes/{hero_base}-portrait.webp"

        sections = section_variants(cat)
        # Pick two different section images for intro/mid, never equal to each other
        s0 = sections[stable_index(data["path"] + ":a", len(sections))]
        s1 = sections[stable_index(data["path"] + ":b", len(sections))]
        if s1 == s0 and len(sections) > 1:
            s1 = sections[(sections.index(s0) + 1) % len(sections)]

        data["generatedIntro"] = f"/images/migrated-sections/{s0}.webp"
        data["generatedMid"] = f"/images/migrated-sections/{s1}.webp"

        scraped = []
        for im in data.get("scrapedImages") or data.get("images") or []:
            src = im.get("src") or ""
            if "/images/migrated/" in src and "/migrated-heroes/" not in src and "/migrated-sections/" not in src:
                scraped.append({"src": src, "alt": im.get("alt") or ""})
        data["scrapedImages"] = scraped
        data["images"] = scraped

        fp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    print("assigned", len(packs), "packs; category hero counts", dict(cat_counters))


if __name__ == "__main__":
    main()
