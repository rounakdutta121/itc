"""
Scrape itcindia.org pages listed in migration-manifest.json.
Writes JSON content packs under public/data/migrated/ and downloads images
to public/images/migrated/<slug>/.
Does not scrape reserved (already-built) routes.
"""

from __future__ import annotations

import html as html_lib
import json
import re
import time
import hashlib
from pathlib import Path
from urllib.parse import urljoin, urlparse
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor, as_completed

import urllib.request

from itc_url_map import refresh_maps, resolve_internal_path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts" / "migration-manifest.json"
OUT_DIR = ROOT / "public" / "data" / "migrated"
IMG_ROOT = ROOT / "public" / "images" / "migrated"
INDEX_OUT = ROOT / "src" / "data" / "migratedIndex.ts"

BASE = "https://www.itcindia.org"
UA = "Mozilla/5.0 (compatible; ITCIndiaMigrator/1.0)"
MAX_WORKERS = 6


def plain_text(s: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.meta_desc = ""
        self.h1 = ""
        self.canonical = ""
        self.og_image = ""
        self._capture = None
        self._buf = []
        self._link_href: str | None = None
        self.in_script = False
        self.in_style = False
        self.in_nav = False
        self.in_footer = False
        self.in_header = False
        self.in_main = False
        self.depth_ignore = 0
        self.blocks: list[dict] = []
        self.images: list[str] = []
        self._tag_stack: list[str] = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        tag = tag.lower()
        self._tag_stack.append(tag)

        if tag in ("script", "style", "noscript"):
            self.in_script = True
        if tag == "nav":
            self.in_nav = True
        if tag == "footer":
            self.in_footer = True
        if tag == "header":
            self.in_header = True
        if tag in ("main", "article"):
            self.in_main = True

        if tag == "meta":
            name = (attrs.get("name") or attrs.get("property") or "").lower()
            content = attrs.get("content") or ""
            if name in ("description", "og:description") and content and not self.meta_desc:
                self.meta_desc = content.strip()
            if name == "og:image" and content and not self.og_image:
                self.og_image = content.strip()
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = (attrs.get("href") or "").strip()
        if tag == "title":
            self._capture = "title"
            self._buf = []
            self._link_href = None
        if tag == "h1" and not self.h1:
            self._capture = "h1"
            self._buf = []
            self._link_href = None

        ignore = self.in_script or self.in_nav or self.in_footer or self.in_header
        if not ignore and tag in ("h2", "h3", "p", "li") and self._capture is None:
            self._capture = tag
            self._buf = []
            self._link_href = None

        if self._capture in ("h2", "h3", "p", "li") and tag == "a":
            self._link_href = (attrs.get("href") or "").strip()

        if not ignore and tag == "img":
            src = attrs.get("src") or attrs.get("data-src") or ""
            alt = (attrs.get("alt") or "").strip()
            if src and not src.startswith("data:"):
                self.images.append({"src": src, "alt": alt})

    def handle_endtag(self, tag):
        tag = tag.lower()
        if self._tag_stack and self._tag_stack[-1] == tag:
            self._tag_stack.pop()
        if tag in ("script", "style", "noscript"):
            self.in_script = False
        if tag == "nav":
            self.in_nav = False
        if tag == "footer":
            self.in_footer = False
        if tag == "header":
            self.in_header = False
        if tag in ("main", "article"):
            self.in_main = False

        if self._capture in ("h2", "h3", "p", "li") and tag == "a":
            self._link_href = None
            return

        if self._capture in ("title", "h1", "h2", "h3", "p", "li") and tag == self._capture:
            text = re.sub(r"\s+", " ", "".join(self._buf)).strip()
            if self._capture == "title" and text:
                self.title = plain_text(text)
            elif self._capture == "h1" and text and not self.h1:
                self.h1 = plain_text(text)
            elif text and len(plain_text(text)) > 2:
                kind = "h2" if self._capture == "h2" else "h3" if self._capture == "h3" else "li" if self._capture == "li" else "p"
                # skip chrome / cookie fluff
                low = plain_text(text).lower()
                if not any(
                    x in low
                    for x in (
                        "cookie",
                        "privacy policy",
                        "subscribe",
                        "copyright",
                        "all rights reserved",
                        "skip to content",
                    )
                ):
                    # Headings stay plain; body keeps local anchors
                    payload = plain_text(text) if kind in ("h2", "h3") else text
                    self.blocks.append({"type": kind, "text": payload})
            self._capture = None
            self._buf = []
            self._link_href = None

    def handle_data(self, data):
        if not self._capture or self.in_script:
            return
        if self._capture in ("title", "h1"):
            self._buf.append(data)
            return
        chunk = html_lib.escape(data)
        if self._link_href:
            local = resolve_internal_path(self._link_href)
            if local:
                self._buf.append(f'<a href="{html_lib.escape(local, quote=True)}">{chunk}</a>')
            else:
                self._buf.append(chunk)
        else:
            self._buf.append(chunk)


def fetch(url: str) -> str | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=25) as res:
            raw = res.read()
            charset = res.headers.get_content_charset() or "utf-8"
            return raw.decode(charset, errors="replace")
    except Exception as e:
        print("FAIL", url, e)
        return None


def slugify_path(path: str) -> str:
    s = path.strip("/") or "home"
    s = re.sub(r"[^a-zA-Z0-9._-]+", "-", s)
    return s[:120]


def download_image(url: str, dest: Path) -> str | None:
    try:
        if url.startswith("//"):
            url = "https:" + url
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=25) as res:
            data = res.read()
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return str(dest.relative_to(ROOT / "public")).replace("\\", "/")
    except Exception as e:
        print("IMG FAIL", url, e)
        return None


def process_entry(entry: dict) -> dict | None:
    if entry.get("reserved") or entry.get("action") in ("REDIRECT", "DELETE"):
        return None

    path = entry["path"]
    live = BASE + (path if path.endswith("/") else path + "/")
    html = fetch(live)
    if not html:
        # try without trailing slash
        html = fetch(BASE + path)
    if not html:
        return {
            "path": path,
            "slug": entry["slug"],
            "action": entry["action"],
            "ok": False,
            "title": entry["slug"].replace("-", " ").title(),
            "h1": entry["slug"].replace("-", " ").title(),
            "description": "",
            "sections": [],
            "images": [],
            "hero": None,
            "source": live,
        }

    parser = PageParser()
    try:
        parser.feed(html)
    except Exception as e:
        print("PARSE FAIL", path, e)

    # Collapse blocks into sections by h2
    sections: list[dict] = []
    current = {"heading": "Overview", "paragraphs": [], "bullets": []}
    for b in parser.blocks:
        if b["type"] == "h2":
            if current["paragraphs"] or current["bullets"] or current["heading"] != "Overview":
                sections.append(current)
            current = {"heading": b["text"], "paragraphs": [], "bullets": []}
        elif b["type"] == "h3":
            current["paragraphs"].append(b["text"])
        elif b["type"] == "li":
            current["bullets"].append(b["text"])
        else:
            if len(plain_text(b["text"])) > 40:
                current["paragraphs"].append(b["text"])
    if current["paragraphs"] or current["bullets"]:
        sections.append(current)

    # Deduplicate paragraphs
    for sec in sections:
        seen = set()
        paras = []
        for p in sec["paragraphs"]:
            key = plain_text(p)[:80]
            if key in seen:
                continue
            seen.add(key)
            paras.append(p)
        sec["paragraphs"] = paras[:12]
        sec["bullets"] = sec["bullets"][:20]
    sections = [s for s in sections if s["paragraphs"] or s["bullets"]][:10]

    slug = slugify_path(path)
    img_dir = IMG_ROOT / slug
    local_images = []
    candidates = []
    if parser.og_image:
        candidates.append({"src": parser.og_image, "alt": parser.h1 or "Lab"})
    for im in parser.images:
        candidates.append(im)

    # Download up to 4 unique content images + hero
    used = set()
    for im in candidates:
        abs_url = urljoin(live, im["src"])
        if abs_url in used:
            continue
        # skip tiny icons/logos
        if any(x in abs_url.lower() for x in ("logo", "icon", "favicon", "sprite", "wp-includes", "emoji")):
            continue
        used.add(abs_url)
        ext = Path(urlparse(abs_url).path).suffix.lower() or ".jpg"
        if ext not in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
            ext = ".jpg"
        name = hashlib.md5(abs_url.encode()).hexdigest()[:10] + ext
        rel = download_image(abs_url, img_dir / name)
        if rel:
            local_images.append({"src": "/" + rel if not rel.startswith("/") else rel, "alt": im.get("alt") or ""})
        if len(local_images) >= 4:
            break

    hero = local_images[0]["src"] if local_images else None

    title = parser.title or parser.h1 or entry["slug"].replace("-", " ").title()
    title = re.sub(r"\s*[|\-–—]\s*ITC India.*$", "", title, flags=re.I).strip() or title
    h1 = parser.h1 or title
    description = parser.meta_desc or (sections[0]["paragraphs"][0][:160] if sections and sections[0]["paragraphs"] else "")

    pack = {
        "path": path,
        "slug": entry["slug"],
        "action": entry["action"],
        "ok": True,
        "title": title,
        "h1": h1,
        "description": description,
        "sections": sections,
        "images": local_images,
        "hero": hero,
        "source": live,
        "note": entry.get("note", ""),
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / f"{slug}.json").write_text(json.dumps(pack, ensure_ascii=False, indent=2), encoding="utf-8")
    print("OK", path, "sections", len(sections), "imgs", len(local_images))
    return pack


def main():
    refresh_maps()
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    # Extra sensible redirects onto already-built pages
    force_redirect = {
        "/salt-spray-testing": "/salt-testing",
        "/jss-55555-testing": "/jss-55555",
    }
    for e in manifest:
        if e["path"] in force_redirect:
            e["action"] = "REDIRECT"
            e["redirectTo"] = force_redirect[e["path"]]
            e["reserved"] = False

    candidates = [
        e
        for e in manifest
        if not e.get("reserved") and e.get("action") not in ("REDIRECT", "DELETE")
    ]
    print("scraping", len(candidates), "pages")

    packs = []
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
        futs = {ex.submit(process_entry, e): e for e in candidates}
        for fut in as_completed(futs):
            pack = fut.result()
            if pack:
                packs.append(pack)
            time.sleep(0.05)

    # Write redirects map + index for TS
    redirects = []
    for e in manifest:
        if e.get("action") == "REDIRECT" and e.get("redirectTo"):
            redirects.append({"from": e["path"], "to": e["redirectTo"]})
    for src, dst in force_redirect.items():
        if not any(r["from"] == src for r in redirects):
            redirects.append({"from": src, "to": dst})

    index = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "count": len(packs),
        "paths": sorted(p["path"] for p in packs),
        "redirects": redirects,
        "deletes": [e["path"] for e in manifest if e.get("action") == "DELETE"],
    }
    (ROOT / "scripts" / "migration-index.json").write_text(
        json.dumps(index, indent=2), encoding="utf-8"
    )

    # TypeScript route index (paths only; page JSON loaded at runtime from /data/migrated)
    lines = [
        "/** Auto-generated by scripts/scrape_itcindia.py — do not edit by hand. */",
        "export const migratedPaths = [",
    ]
    for p in sorted({x["path"] for x in packs}):
        lines.append(f"  {json.dumps(p)},")
    lines.append("] as const")
    lines.append("")
    lines.append("export const migratedRedirects: { from: string; to: string }[] = [")
    for r in redirects:
        lines.append(f"  {{ from: {json.dumps(r['from'])}, to: {json.dumps(r['to'])} }},")
    lines.append("]")
    lines.append("")
    lines.append("export const migratedDeletes = [")
    for d in index["deletes"]:
        lines.append(f"  {json.dumps(d)},")
    lines.append("] as const")
    lines.append("")
    INDEX_OUT.parent.mkdir(parents=True, exist_ok=True)
    INDEX_OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("wrote", INDEX_OUT, "packs", len(packs), "redirects", len(redirects))


if __name__ == "__main__":
    main()
