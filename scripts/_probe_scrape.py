import re
import urllib.request
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from full_scrape_content import FullPageParser, blocks_to_sections, fetch

url = sys.argv[1] if len(sys.argv) > 1 else "https://www.itcindia.org/cispr-32-en-55032/"
html = fetch(url)
print("fetched", len(html or ""))
if not html:
    raise SystemExit(1)

for pat in [
    "entry-content",
    "post-content",
    "is-collapsed",
    "elementor",
    "wpb_wrapper",
    "Learn More",
    "<h2",
    "<h3",
]:
    print(pat, html.lower().count(pat.lower()))

print("h2s", re.findall(r"<h2[^>]*>(.*?)</h2>", html, flags=re.I | re.S)[:12])

parser = FullPageParser()
parser.feed(html)
print("blocks", len(parser.blocks))
print("block kinds", [b.get("kind") for b in parser.blocks[:30]])
secs = blocks_to_sections(parser.blocks)
print("sections", len(secs))
for s in secs[:6]:
    print("-", s["heading"], "paras", len(s["paragraphs"]), "bullets", len(s["bullets"]))
