from __future__ import annotations

import html as H
import re
import sys
from pathlib import Path
from urllib.request import Request, urlopen

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

url = "https://www.itcindia.org/atex-testing-certification/"
html = urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=45).read().decode(
    "utf-8", "replace"
)
Path("scripts/_atex_live.html").write_text(html, encoding="utf-8")
print("saved scripts/_atex_live.html", len(html))

# Find collapsed / learn-more blocks
for m in re.finditer(r".{0,80}is-collapsed.{0,120}", html, re.I):
    print("COLLAPSE", re.sub(r"\s+", " ", m.group(0))[:180])

for m in re.finditer(r".{0,60}Learn More.{0,200}", html, re.I):
    s = re.sub(r"\s+", " ", m.group(0))
    print("LEARN", s[:220])

# Compare pack vs live plain length inside article-ish regions
# Use our parser
sys.path.insert(0, str(Path("scripts").resolve()))
from full_scrape_content import FullPageParser, blocks_to_sections, plain  # type: ignore

p = FullPageParser()
p.feed(html)
secs = blocks_to_sections(p.blocks)
paras = sum(len(s["paragraphs"]) for s in secs)
bullets = sum(len(s["bullets"]) for s in secs)
tables = sum(len(s["tables"]) for s in secs)
imgs = len(p.images)
chars = sum(len(plain(x)) for s in secs for x in s["paragraphs"] + s["bullets"])
print(
    "parser sections",
    len(secs),
    "paras",
    paras,
    "bullets",
    bullets,
    "tables",
    tables,
    "imgs",
    imgs,
    "chars",
    chars,
    "related_sidebar",
    len(p.sidebar_links),
)
for s in secs:
    print(
        "-",
        s["heading"][:70],
        "p",
        len(s["paragraphs"]),
        "b",
        len(s["bullets"]),
        "t",
        len(s["tables"]),
        "i",
        len(s["images"]),
    )

# Show first 30 block types from parser
from collections import Counter

print("block types", Counter(b["type"] for b in p.blocks))
print("first headings/p sample:")
for b in p.blocks[:40]:
    if b["type"] == "heading":
        print(" H", b["text"][:90])
    elif b["type"] == "p":
        print(" P", plain(b["text"])[:90])
    elif b["type"] == "li":
        print(" L", plain(b["text"])[:90])
    elif b["type"] == "table":
        print(" T", b["headers"][:4], "rows", len(b["rows"]))
    elif b["type"] == "image":
        print(" I", b["src"][:90])
