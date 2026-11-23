"""Assign category heroes to migrated packs missing heroes; enrich thin packs."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACK_DIR = ROOT / "public" / "data" / "migrated"
HERO_BASE = "/images/migrated-heroes"

RULES = [
    (("emc", "emi", "cispr", "61000", "anechoic"), "emc"),
    (("photometr", "lm-79", "lm-80", "lumin", "led", "lux", "flicker", "integrating"), "photometry"),
    (("batter", "lithium", "un-38", "vrla", "cell"), "battery"),
    (("60601", "medical", "infant", "oximeter", "infusion", "hospital", "patient"), "medical"),
    (("calibrat", "micrometer", "pyranometer", "gauge", "sensor", "lux-meter"), "calibration"),
    (("ip-", "ipx", "ingress", "waterproof", "rain-test", "dust"), "ip"),
    (("chemical", "rohs", "reach", "biodegrad", "compost"), "chemical"),
    (("drop", "impact", "mechanical", "packag", "ista", "vibration", "shock"), "mechanical"),
    (("electrical", "iec-60335", "cable", "switch", "motor", "fuse", "rectifier"), "electrical"),
]


def pick(path: str, title: str) -> str:
    blob = f"{path} {title}".lower()
    for keys, cat in RULES:
        if any(k in blob for k in keys):
            return cat
    return "general"


def main():
    n = 0
    for fp in PACK_DIR.glob("*.json"):
        data = json.loads(fp.read_text(encoding="utf-8"))
        cat = pick(data.get("path", ""), data.get("h1", "") or data.get("title", ""))
        hero = f"{HERO_BASE}/{cat}.webp"
        # Always set categoryHero for portrait support; replace missing scraped hero
        data["category"] = cat
        data["heroPortrait"] = f"{HERO_BASE}/{cat}-portrait.webp"
        if not data.get("hero"):
            data["hero"] = hero
            n += 1
        elif data.get("hero", "").startswith("/images/migrated/") is False and not data.get("images"):
            data["hero"] = hero
            n += 1
        # Ensure at least one image for intro figure
        if not data.get("images"):
            data["images"] = [{"src": data["hero"], "alt": data.get("h1") or cat}]
        fp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print("assigned missing heroes", n)


if __name__ == "__main__":
    main()
