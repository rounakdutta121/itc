"""
Re-fetch migrated pages and restore internal <a> links into pack paragraphs/bullets.
Rewrites itcindia.org URLs to local routes. Keeps images/heroes from existing packs.
"""

from __future__ import annotations

import html as html_lib
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
import urllib.request

from itc_url_map import refresh_maps, resolve_internal_path, rewrite_anchor_html

ROOT = Path(__file__).resolve().parents[1]
PACK_DIR = ROOT / "public" / "data" / "migrated"
UA = "Mozilla/5.0 (compatible; ITCIndiaMigrator/1.0)"
MAX_WORKERS = 8

JUNK_PARA = re.compile(
    r"^(other testing services|related|also read|you may also|share this|leave a reply)$",
    re.I,
)
JUNK_BULLET = re.compile(
    r"(testing|calibration|training|blog|inquiry|privacy|terms|jobs|payment|thank you|subscription)",
    re.I,
)
SKIP_LINK_LABEL = re.compile(
    r"^(home|about|contact|privacy|terms|cookie|facebook|twitter|linkedin|instagram|youtube|x)$",
    re.I,
)


class LinkedContentParser(HTMLParser):
    """Capture h2/h3/p/li with inline anchors preserved as <a href="...">text</a>."""

    def __init__(self):
        super().__init__()
        self.blocks: list[dict] = []
        self._capture = None
        self._parts: list[str] = []
        self._link_href: str | None = None
        self.in_script = False
        self.in_style = False
        self.in_nav = False
        self.in_footer = False
        self.in_header = False
        self.in_aside = False
        self.depth_ignore = 0

    def _ignoring(self) -> bool:
        return (
            self.in_script
            or self.in_style
            or self.in_nav
            or self.in_footer
            or self.in_header
            or self.in_aside
            or self.depth_ignore > 0
        )

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        tag = tag.lower()
        if tag in ("script", "style", "noscript"):
            self.in_script = True
        if tag == "nav":
            self.in_nav = True
        if tag == "footer":
            self.in_footer = True
        if tag == "header":
            self.in_header = True
        if tag == "aside":
            self.in_aside = True
        # Skip sitemap-style page lists
        cls = (attrs.get("class") or "").lower()
        if tag in ("ul", "ol", "div") and any(
            x in cls for x in ("page_item", "widget", "menu", "sidebar", "related-posts")
        ):
            self.depth_ignore += 1

        if self._ignoring():
            return

        if tag in ("h2", "h3", "p", "li") and self._capture is None:
            self._capture = tag
            self._parts = []
            self._link_href = None
            return

        if self._capture and tag == "a":
            self._link_href = (attrs.get("href") or "").strip()
            return

        if self._capture and tag == "br":
            self._parts.append(" ")

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in ("script", "style", "noscript"):
            self.in_script = False
        if tag == "nav":
            self.in_nav = False
        if tag == "footer":
            self.in_footer = False
        if tag == "header":
            self.in_header = False
        if tag == "aside":
            self.in_aside = False
        if tag in ("ul", "ol", "div") and self.depth_ignore > 0:
            self.depth_ignore -= 1

        if self._capture and tag == "a":
            self._link_href = None
            return

        if self._capture and tag == self._capture:
            raw = "".join(self._parts)
            text = re.sub(r"\s+", " ", raw).strip()
            # unwrap empty anchors leftovers
            text = re.sub(r"<a\s+href=\"[^\"]*\"\s*>\s*</a>", "", text)
            text = re.sub(r"\s+", " ", text).strip()
            if text and len(re.sub(r"<[^>]+>", "", text)) > 2:
                low = re.sub(r"<[^>]+>", "", text).lower()
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
                    kind = (
                        "h2"
                        if self._capture == "h2"
                        else "h3"
                        if self._capture == "h3"
                        else "li"
                        if self._capture == "li"
                        else "p"
                    )
                    self.blocks.append({"type": kind, "text": text})
            self._capture = None
            self._parts = []
            self._link_href = None

    def handle_data(self, data):
        if not self._capture or self._ignoring():
            return
        chunk = html_lib.escape(data)
        if self._link_href:
            local = resolve_internal_path(self._link_href)
            if local:
                self._parts.append(f'<a href="{html_lib.escape(local, quote=True)}">{chunk}</a>')
            else:
                self._parts.append(chunk)
        else:
            self._parts.append(chunk)


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


def plain(s: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


def blocks_to_sections(blocks: list[dict]) -> list[dict]:
    sections: list[dict] = []
    current = {"heading": "Overview", "paragraphs": [], "bullets": []}
    for b in blocks:
        if b["type"] == "h2":
            if current["paragraphs"] or current["bullets"] or current["heading"] != "Overview":
                sections.append(current)
            current = {"heading": plain(b["text"]), "paragraphs": [], "bullets": []}
        elif b["type"] == "h3":
            current["paragraphs"].append(b["text"])
        elif b["type"] == "li":
            current["bullets"].append(b["text"])
        else:
            if len(plain(b["text"])) > 40:
                current["paragraphs"].append(b["text"])
    if current["paragraphs"] or current["bullets"]:
        sections.append(current)

    for sec in sections:
        seen = set()
        paras = []
        for p in sec["paragraphs"]:
            key = plain(p)[:80]
            if key in seen:
                continue
            seen.add(key)
            paras.append(p)
        sec["paragraphs"] = paras[:12]
        sec["bullets"] = sec["bullets"][:20]
    return [s for s in sections if s["paragraphs"] or s["bullets"]][:10]


def clean_section(sec: dict) -> dict | None:
    heading = plain(sec.get("heading") or "")
    paras = [p.strip() for p in (sec.get("paragraphs") or []) if plain(p)]
    bullets = [b.strip() for b in (sec.get("bullets") or []) if plain(b)]

    is_conclusion = "conclu" in heading.lower()
    paras = [p for p in paras if not JUNK_PARA.match(plain(p)) and len(plain(p)) > 40]
    if is_conclusion:
        bullets = []
        paras = [p for p in paras if len(plain(p)) > 80][:2]
        if not paras:
            return None
        return {"heading": "Conclusion", "paragraphs": paras, "bullets": []}

    if len(bullets) > 8 and sum(1 for b in bullets if JUNK_BULLET.search(plain(b))) > 5:
        bullets = []

    if not paras and not bullets:
        return None
    return {"heading": heading, "paragraphs": paras, "bullets": bullets[:12]}


def extract_related_links(blocks: list[dict], page_path: str) -> list[dict]:
    """Collect unique internal links from body copy (not self)."""
    seen = set()
    out = []
    page = resolve_internal_path(page_path) or page_path
    for b in blocks:
        for m in re.finditer(r'<a\s+href="([^"]+)">([^<]*)</a>', b["text"]):
            href, label = m.group(1), plain(m.group(2))
            if not label or SKIP_LINK_LABEL.match(label):
                continue
            if href == page or href.rstrip("/") == page.rstrip("/"):
                continue
            if not href.startswith("/"):
                continue
            key = href
            if key in seen:
                continue
            seen.add(key)
            out.append({"href": href, "label": label[:90]})
            if len(out) >= 8:
                return out
    return out


def inject_links_into_existing(existing: list[dict], fresh: list[dict]) -> list[dict]:
    """
    Prefer keeping existing section structure/copy, but swap in linked variants
    when plain text matches. Fall back to fresh cleaned sections when nothing matches.
    """
    fresh_paras = []
    for sec in fresh:
        for p in sec.get("paragraphs") or []:
            fresh_paras.append(p)
        for b in sec.get("bullets") or []:
            fresh_paras.append(b)
    by_plain = {plain(p): p for p in fresh_paras if "<a " in p.lower()}

    if not by_plain:
        return existing

    updated = []
    any_hit = False
    for sec in existing:
        paras = []
        for p in sec.get("paragraphs") or []:
            key = plain(p)
            if key in by_plain:
                paras.append(by_plain[key])
                any_hit = True
            else:
                # Fuzzy: startswith match for truncated packs
                hit = None
                for fp, rich in by_plain.items():
                    if key and fp.startswith(key[:60]) or (fp and key.startswith(fp[:60])):
                        hit = rich
                        break
                if hit:
                    paras.append(hit)
                    any_hit = True
                else:
                    paras.append(rewrite_anchor_html(p) if "<a " in p.lower() else p)
        bullets = []
        for b in sec.get("bullets") or []:
            key = plain(b)
            if key in by_plain:
                bullets.append(by_plain[key])
                any_hit = True
            else:
                bullets.append(rewrite_anchor_html(b) if "<a " in b.lower() else b)
        updated.append({**sec, "paragraphs": paras, "bullets": bullets})

    if any_hit:
        return updated
    # No overlap — use fresh cleaned sections
    return fresh


def process_pack(fp: Path) -> dict:
    data = json.loads(fp.read_text(encoding="utf-8"))
    source = data.get("source") or ("https://www.itcindia.org" + (data.get("path") or ""))
    if not source.endswith("/"):
        source = source.rstrip("/") + "/"

    html = fetch(source)
    if not html:
        # Still rewrite any existing anchors
        for sec in data.get("sections") or []:
            sec["paragraphs"] = [rewrite_anchor_html(p) for p in sec.get("paragraphs") or []]
            sec["bullets"] = [rewrite_anchor_html(b) for b in sec.get("bullets") or []]
        fp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        return {"path": data.get("path"), "ok": False, "links": 0}

    parser = LinkedContentParser()
    try:
        parser.feed(html)
    except Exception as e:
        print("PARSE FAIL", data.get("path"), e)
        return {"path": data.get("path"), "ok": False, "links": 0}

    fresh_sections = []
    for sec in blocks_to_sections(parser.blocks):
        c = clean_section(sec)
        if c:
            fresh_sections.append(c)

    existing = data.get("sections") or []
    if existing:
        data["sections"] = inject_links_into_existing(existing, fresh_sections)
    else:
        data["sections"] = fresh_sections

    related = extract_related_links(parser.blocks, data.get("path") or "")
    # Prefer links that appear in final sections
    body_html = json.dumps(data["sections"])
    related = [r for r in related if r["href"] in body_html] or related
    data["relatedLinks"] = related[:8]

    link_count = len(re.findall(r"<a\s+href=", json.dumps(data["sections"]), flags=re.I))
    fp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return {"path": data.get("path"), "ok": True, "links": link_count, "related": len(related)}


def main():
    refresh_maps()
    packs = sorted(PACK_DIR.glob("*.json"))
    print("hydrating links for", len(packs), "packs")
    totals = {"ok": 0, "fail": 0, "links": 0, "with_links": 0}

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
        futs = {ex.submit(process_pack, fp): fp for fp in packs}
        for fut in as_completed(futs):
            res = fut.result()
            if res.get("ok"):
                totals["ok"] += 1
                totals["links"] += res.get("links") or 0
                if res.get("links"):
                    totals["with_links"] += 1
                    print("OK", res["path"], "inline", res["links"], "related", res.get("related"))
            else:
                totals["fail"] += 1
            time.sleep(0.02)

    print(
        "done ok",
        totals["ok"],
        "fail",
        totals["fail"],
        "packs_with_links",
        totals["with_links"],
        "total_anchors",
        totals["links"],
    )


if __name__ == "__main__":
    main()
