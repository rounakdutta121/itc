import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
paths = set(json.loads((ROOT / "scripts" / "migration-index.json").read_text(encoding="utf-8"))["paths"])
paths.update(
    [
        "/",
        "/about-us",
        "/vibration-testing",
        "/drop-testing",
        "/salt-testing",
        "/jss-55555",
        "/contact-us",
        "/services",
        "/careers",
    ]
)

menu_path = ROOT / "src" / "data" / "siteMenu.ts"
text = menu_path.read_text(encoding="utf-8")
old_links = len(re.findall(r"https://www\.itcindia\.org/", text))


def repl(m: re.Match[str]) -> str:
    url = m.group(1)
    path = re.sub(r"^https?://(www\.)?itcindia\.org", "", url).rstrip("/") or "/"
    if not path.startswith("/"):
        path = "/" + path
    if path in paths:
        return m.group(0).replace(url, path)
    return m.group(0)


new = re.sub(r'"(https://www\.itcindia\.org/[^"]+)"', repl, text)
new_links = len(re.findall(r"https://www\.itcindia\.org/", new))
menu_path.write_text(new, encoding="utf-8")
print("external before", old_links, "after", new_links, "converted", old_links - new_links)

packs = list((ROOT / "public" / "data" / "migrated").glob("*.json"))
heroes = list((ROOT / "public" / "images" / "migrated-heroes").glob("*.webp"))
img_dirs = list((ROOT / "public" / "images" / "migrated").glob("*"))
print("json", len(packs), "heroes", len(heroes), "scraped img dirs", len(img_dirs))
