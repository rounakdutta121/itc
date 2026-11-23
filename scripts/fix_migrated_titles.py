"""Replace sitewide H1 with the real page title from <title> / slug."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACK_DIR = ROOT / "public" / "data" / "migrated"

GENERIC = re.compile(
    r"^\s*electrical safety testing laboratory\s*$",
    re.I,
)

SUFFIXES = [
    r"\s*[-|–—:]\s*electrical safety testing laboratory.*$",
    r"\s*[-|–—:]\s*itc india.*$",
    r"\s*\|\s*itc india.*$",
]


def from_slug(slug: str) -> str:
    s = (slug or "").replace("/", " ").replace("-", " ").replace("_", " ")
    s = re.sub(r"\s+", " ", s).strip()
    # keep common acronyms upper
    words = []
    for w in s.split(" "):
        up = w.upper()
        if up in {
            "IEC",
            "ISO",
            "IS",
            "IP",
            "EMC",
            "EMI",
            "NABL",
            "BIS",
            "LED",
            "UN",
            "LM",
            "JSS",
            "RDSO",
            "ATEX",
            "UPS",
            "AC",
            "DC",
            "EN",
            "BS",
            "ASTM",
            "ISTA",
            "MIL",
            "STD",
            "OT",
            "PCB",
            "UV",
            "IPX",
        } or re.fullmatch(r"\d+(\.\d+)*", w):
            words.append(up if not w[0].isdigit() else w)
        elif re.fullmatch(r"iec\d+.*", w, re.I) or re.fullmatch(r"iso\d+.*", w, re.I):
            words.append(w.upper())
        else:
            words.append(w.capitalize())
    return " ".join(words)


def clean_title(title: str, slug: str) -> str:
    t = (title or "").strip()
    for pat in SUFFIXES:
        t = re.sub(pat, "", t, flags=re.I).strip()
    t = re.sub(r"\s+", " ", t).strip(" -|–—:")
    if not t or GENERIC.match(t) or len(t) < 4:
        return from_slug(slug)
    return t


def main():
    n = 0
    for fp in sorted(PACK_DIR.glob("*.json")):
        data = json.loads(fp.read_text(encoding="utf-8"))
        slug = data.get("slug") or fp.stem
        new_h1 = clean_title(data.get("title", ""), slug)
        if data.get("h1") != new_h1:
            n += 1
        data["h1"] = new_h1
        # Keep SEO title with brand suffix
        data["title"] = f"{new_h1} | ITC India"
        if data.get("description") and GENERIC.search(data["description"][:80] or ""):
            pass
        fp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print("updated", n, "packs")
    # sample
    for sample in (
        "motor-torque-and-speed-testing",
        "un-38-3-lithium-ion-batteries-transpotation-testing",
        "emc-emi-testing",
        "battery-testing",
    ):
        p = PACK_DIR / f"{sample}.json"
        if p.exists():
            d = json.loads(p.read_text(encoding="utf-8"))
            print(sample, "=>", d["h1"])


if __name__ == "__main__":
    main()
