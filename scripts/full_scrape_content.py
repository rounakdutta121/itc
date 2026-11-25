"""
Full-content re-scrape for migrated packs.

- Captures every heading (h2/h3), paragraph, list, table, and content image
- Resolves lazy-loaded images (data-src)
- Rewrites internal links to local routes
- Skips chrome: forms, sidebars, Learn More UI, country selectors, footers
- Preserves existing hero / generated art fields on each pack
"""

from __future__ import annotations

import html as html_lib
import json
import re
import time
import hashlib
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, quote
import urllib.request

from itc_url_map import refresh_maps, resolve_internal_path

ROOT = Path(__file__).resolve().parents[1]
PACK_DIR = ROOT / "public" / "data" / "migrated"
IMG_ROOT = ROOT / "public" / "images" / "migrated"
BASE = "https://www.itcindia.org"
UA = "Mozilla/5.0 (compatible; ITCIndiaMigrator/1.0)"
MAX_WORKERS = 3
MAX_IMAGES = 48

STOP_HEADINGS = re.compile(
    r"^(other testing services|itc training|inquiry for testing|subscribe|contact us|"
    r"related posts|leave a reply|share this|resources|other services)$",
    re.I,
)
RELATED_HEADING = re.compile(
    r"other testing services|other services|related (posts|services|links)",
    re.I,
)
JUNK_PLAIN = re.compile(
    r"(thank you for reading|don'?t forget to subscribe|cookie|privacy policy|"
    r"skip to content|all rights reserved|indiaazerbaijan|wpcf7)",
    re.I,
)
COUNTRY_BLOB = re.compile(r"^[A-Z][a-z]+(?:[A-Z][a-z]+){5,}$")
ZONE_LINE = re.compile(r"^zone\s*\d", re.I)
PSEUDO_NUMBERED = re.compile(r"^\d+\.\s+\S.{0,70}$")
SMALL_WORDS = {
    "a",
    "an",
    "and",
    "as",
    "at",
    "by",
    "for",
    "from",
    "in",
    "of",
    "on",
    "or",
    "per",
    "the",
    "to",
    "under",
    "via",
    "we",
    "with",
}


def plain(s: str) -> str:
    t = re.sub(r"<[^>]+>", "", s or "")
    t = html_lib.unescape(t)
    return re.sub(r"\s+", " ", t).strip()


def fetch(url: str) -> str | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    last_err: Exception | None = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=45) as res:
                raw = res.read()
                charset = res.headers.get_content_charset() or "utf-8"
                return raw.decode(charset, errors="replace")
        except Exception as e:
            last_err = e
            time.sleep(1.5 * (attempt + 1))
    print("FAIL", url, last_err)
    return None


def best_img_url(attrs: dict) -> str:
    for key in (
        "data-src",
        "data-lazy-src",
        "data-original",
        "data-lazy-original",
        "data-bg",
    ):
        v = (attrs.get(key) or "").strip()
        if v and not v.startswith("data:"):
            return v
    srcset = (attrs.get("data-srcset") or attrs.get("srcset") or "").strip()
    if srcset:
        first = srcset.split(",")[0].strip().split(" ")[0]
        if first and not first.startswith("data:"):
            return first
    src = (attrs.get("src") or "").strip()
    if src and not src.startswith("data:"):
        return src
    return ""


class FullPageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.meta_desc = ""
        self.h1 = ""
        self.og_image = ""
        self.blocks: list[dict] = []
        self.images: list[dict] = []
        self.sidebar_links: list[dict] = []

        self._capture: str | None = None
        self._parts: list[str] = []
        self._link_href: str | None = None
        self._table_rows: list[list[str]] = []
        self._table_row: list[str] = []
        self._in_table = False
        self._in_tr = False
        self._cell_tag: str | None = None

        self.in_script = False
        self.in_style = False
        self.in_nav = False
        self.in_footer = False
        self.in_header = False
        self.in_form = False
        self.in_aside = False
        self.in_select = False
        self.ignore_depth = 0
        self.stopped = False
        self._related_mode = False
        self._in_pages_widget = False
        self._related_label_parts: list[str] = []
        self._related_href: str | None = None

    def _ignoring(self) -> bool:
        return (
            self.stopped
            or self.in_script
            or self.in_style
            or self.in_nav
            or self.in_footer
            or self.in_header
            or self.in_form
            or self.in_aside
            or self.in_select
            or self.ignore_depth > 0
        )

    def _harvest_related_link(self, href: str, label: str) -> None:
        local = resolve_internal_path(href) if href else None
        if local and label and len(label) > 2:
            self.sidebar_links.append({"href": local, "label": label[:90]})

    def handle_starttag(self, tag, attrs):
        if self.stopped:
            return
        attrs = dict(attrs)
        tag = tag.lower()
        cls = (attrs.get("class") or "").lower()
        role = (attrs.get("role") or "").lower()

        if tag in ("script", "style", "noscript"):
            self.in_script = True
        if tag == "nav" or role == "navigation":
            self.in_nav = True
        if tag == "footer":
            self.in_footer = True
        if tag == "header":
            self.in_header = True
        # Only real <form> — wpcf7 wrapper divs must not trap the whole article
        if tag == "form":
            self.in_form = True
        if tag == "aside" or (
            tag == "div"
            and ("sidebar" in cls or cls.startswith("widget") or " widget" in f" {cls}")
        ):
            self.in_aside = True
            # WordPress "Other Testing Services" page list lives in widget_pages
            if "widget_pages" in cls or "widget_nav_menu" in cls:
                self._in_pages_widget = True
                self._related_mode = True
        if tag == "select":
            self.in_select = True
        if tag in ("ul", "ol", "div", "section") and any(
            x in cls
            for x in (
                "itc-desktop-service-toggle",
                "breadcrumb",
                "sharedaddy",
                "jp-relatedposts",
                "comments-area",
            )
        ):
            self.ignore_depth += 1
        # Skip sitemap/menu trees unless harvesting related links.
        # Only bump ignore on the list/container — never on <li> alone
        # (li end tags were not unwinding ignore_depth, which blanked the article).
        # When _related_mode, keep page_item / service lists so sidebar <a>s are harvested.
        if (
            not self._related_mode
            and tag in ("ul", "ol", "div")
            and "page_item" in cls
        ):
            self.ignore_depth += 1
        if (
            not self._related_mode
            and tag in ("ul", "ol")
            and any(x in cls for x in ("menu", "nav-menu", "navbar", "primary-menu"))
        ):
            self.ignore_depth += 1

        if tag == "meta":
            name = (attrs.get("name") or attrs.get("property") or "").lower()
            content = attrs.get("content") or ""
            if name in ("description", "og:description") and content and not self.meta_desc:
                self.meta_desc = content.strip()
            if name == "og:image" and content and not self.og_image:
                self.og_image = content.strip()
        if tag == "title" and not self.title:
            self._capture = "title"
            self._parts = []
            return
        if tag == "h1" and not self.h1:
            self._capture = "h1"
            self._parts = []
            return

        # Related harvest + stop-heading detection must work inside aside/chrome
        if self._related_mode and tag == "a":
            self._related_href = (attrs.get("href") or "").strip()
            self._related_label_parts = []
            return

        if tag in ("h2", "h3", "h4") and self._capture is None:
            self._capture = tag
            self._parts = []
            self._link_href = None
            return

        if self._ignoring():
            return

        if tag == "p" and self._capture is None and not self._in_table:
            self._capture = "p"
            self._parts = []
            self._link_href = None
            return

        if tag == "li" and self._capture is None and not self._in_table:
            self._capture = "li"
            self._parts = []
            self._link_href = None
            return

        if tag == "table":
            self._in_table = True
            self._table_rows = []
            return

        if self._in_table and tag == "tr":
            self._in_tr = True
            self._table_row = []
            return

        if self._in_table and tag in ("td", "th"):
            self._cell_tag = tag
            self._capture = "cell"
            self._parts = []
            self._link_href = None
            return

        if self._capture and tag == "a":
            self._link_href = (attrs.get("href") or "").strip()
            return

        if self._capture and tag == "br":
            self._parts.append(" ")
            return

        if tag == "img" and not self._related_mode:
            src = best_img_url(attrs)
            alt = (attrs.get("alt") or "").strip()
            if src:
                self.images.append({"src": src, "alt": alt})
                self.blocks.append({"type": "image", "src": src, "alt": alt})

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
        if tag == "form":
            self.in_form = False
        if tag == "aside":
            self.in_aside = False
            if self._in_pages_widget:
                self._in_pages_widget = False
                self._related_mode = False
        if tag == "select":
            self.in_select = False
        if tag in ("ul", "ol", "div", "section", "nav") and self.ignore_depth > 0:
            self.ignore_depth = max(0, self.ignore_depth - 1)
        # Clear pages-widget flag when leaving a widget div that opened it
        if tag == "div" and self._in_pages_widget and not self.in_aside:
            self._in_pages_widget = False
            self._related_mode = False

        if self._related_mode and tag == "a":
            label = plain("".join(self._related_label_parts))
            href = self._related_href or ""
            self._harvest_related_link(href, label)
            self._related_href = None
            self._related_label_parts = []
            return

        if self._capture and tag == "a":
            self._link_href = None
            return

        if self._in_table and tag in ("td", "th") and self._capture == "cell":
            cell = plain("".join(self._parts))
            self._table_row.append(cell)
            self._capture = None
            self._parts = []
            self._cell_tag = None
            return

        if self._in_table and tag == "tr":
            if self._table_row and any(c.strip() for c in self._table_row):
                self._table_rows.append(self._table_row)
            self._in_tr = False
            self._table_row = []
            return

        if tag == "table" and self._in_table:
            rows = self._table_rows
            self._in_table = False
            self._table_rows = []
            if rows:
                headers = rows[0]
                body = rows[1:] if len(rows) > 1 else []
                self.blocks.append({"type": "table", "headers": headers, "rows": body})
            return

        if self._capture in ("title", "h1", "h2", "h3", "h4", "p", "li") and tag == self._capture:
            raw = re.sub(r"\s+", " ", "".join(self._parts)).strip()
            text_plain = plain(raw)
            if self._capture == "title" and text_plain:
                self.title = text_plain
            elif self._capture == "h1" and text_plain and not self.h1:
                self.h1 = text_plain
            elif self._capture in ("h2", "h3", "h4") and text_plain:
                if STOP_HEADINGS.match(text_plain) or RELATED_HEADING.search(text_plain):
                    # Harvest "Other Testing Services" / related widgets; ignore chrome headings
                    if RELATED_HEADING.search(text_plain):
                        self._related_mode = True
                        self.stopped = False
                    elif self._related_mode and not self._in_pages_widget:
                        self._related_mode = False
                        if not self.in_aside and any(
                            b["type"] in ("p", "li", "table", "image", "heading")
                            for b in self.blocks
                        ):
                            self.stopped = True
                    elif (
                        not self.in_aside
                        and not self._in_pages_widget
                        and any(
                            b["type"] in ("p", "li", "table", "image", "heading")
                            for b in self.blocks
                        )
                    ):
                        self.stopped = True
                        self._related_mode = False
                elif not JUNK_PLAIN.search(text_plain):
                    if self.in_aside or self._related_mode or self._ignoring():
                        # Do not treat chrome/widget titles as article headings
                        if self._related_mode and not self._in_pages_widget and not self.in_aside:
                            self.stopped = True
                            self._related_mode = False
                    else:
                        self.blocks.append(
                            {
                                "type": "heading",
                                "text": text_plain,
                                "level": int(self._capture[1]),
                            }
                        )
            elif (
                self._capture in ("p", "li")
                and text_plain
                and len(text_plain) > 2
                and not self.in_aside
                and not self._related_mode
            ):
                if (
                    not JUNK_PLAIN.search(text_plain)
                    and not COUNTRY_BLOB.match(text_plain.replace(" ", ""))
                    and not STOP_HEADINGS.match(text_plain)
                ):
                    kind = "li" if self._capture == "li" else "p"
                    payload = raw if "<a " in raw.lower() else text_plain
                    self.blocks.append({"type": kind, "text": payload})
            self._capture = None
            self._parts = []
            self._link_href = None

    def handle_data(self, data):
        if self._related_mode and self._related_href is not None and not self.in_script:
            self._related_label_parts.append(data)
            return
        if not self._capture:
            return
        # Allow heading text capture inside aside/chrome for stop/related detection
        if self._capture in ("title", "h1", "h2", "h3", "h4"):
            if self.in_script or self.in_style:
                return
            self._parts.append(data)
            return
        if self._ignoring():
            return
        chunk = html_lib.escape(data)
        if self._link_href and self._capture in ("p", "li", "cell"):
            local = resolve_internal_path(self._link_href)
            if local:
                self._parts.append(f'<a href="{html_lib.escape(local, quote=True)}">{chunk}</a>')
            else:
                self._parts.append(chunk)
        else:
            self._parts.append(chunk)


def looks_like_pseudo_heading(text: str) -> bool:
    """Promote short label paragraphs into section headings (common on flat WP pages)."""
    t = plain(text).strip()
    if not t or len(t) < 8 or len(t) > 90:
        return False
    if ZONE_LINE.match(t):
        return False
    if JUNK_PLAIN.search(t) or STOP_HEADINGS.match(t):
        return False
    # Zone lines sometimes include a trailing colon with little else
    if re.match(r"^zone\s*\d.*/\s*zone\s*\d", t, re.I) and len(t) < 40:
        return False
    if t.endswith(":"):
        # Skip instructional / imperative lines that happen to end with ':'
        if re.match(
            r"^(please|note|see|click|check|refer|visit|for more|read more)\b",
            t,
            re.I,
        ):
            return False
        words_c = t.rstrip(":").split()
        lower_content = sum(
            1
            for w in words_c
            if w and w[0].islower() and w.lower() not in SMALL_WORDS
        )
        if lower_content >= 3 and len(words_c) >= 8:
            return False
        return True
    if t.endswith("?") and t.count(" ") <= 12:
        return True
    if PSEUDO_NUMBERED.match(t) and not t.endswith("."):
        # e.g. "2. IECEx CERTIFICATION" / "1. ATEX CERTIFICATION"
        body = re.sub(r"^\d+\.\s+", "", t)
        if len(body.split()) <= 8 and not body.endswith("."):
            return True
    if t.endswith("."):
        return False
    words = t.split()
    if len(words) > 14 or len(words) < 2:
        return False
    if "," in t and len(t) > 50:
        return False
    # Title Case / short ALL-CAPS labels without a long sentence feel
    def _word_ok(w: str) -> bool:
        core = re.sub(r"[^A-Za-z0-9/]", "", w)
        if not core:
            return True
        low = core.lower()
        if low in SMALL_WORDS:
            return True
        return core[0].isupper() or core.isupper() or any(ch.isdigit() for ch in core)

    if all(_word_ok(w) for w in words):
        return True
    return False


def promote_pseudo_headings(blocks: list[dict]) -> list[dict]:
    out: list[dict] = []
    for b in blocks:
        if b.get("type") == "p" and looks_like_pseudo_heading(b.get("text") or ""):
            out.append(
                {
                    "type": "heading",
                    "text": plain(b["text"]).rstrip(":").strip() or plain(b["text"]),
                    "level": 2,
                }
            )
        elif b.get("type") == "li" and looks_like_pseudo_heading(b.get("text") or ""):
            # Numbered cert labels sometimes land as list items
            out.append(
                {
                    "type": "heading",
                    "text": plain(b["text"]).rstrip(":").strip() or plain(b["text"]),
                    "level": 2,
                }
            )
        else:
            out.append(b)
    return out


def blocks_to_sections(blocks: list[dict]) -> list[dict]:
    blocks = promote_pseudo_headings(blocks)
    sections: list[dict] = []
    current: dict = {
        "heading": "Overview",
        "paragraphs": [],
        "bullets": [],
        "tables": [],
        "images": [],
    }

    def push():
        if (
            current["paragraphs"]
            or current["bullets"]
            or current["tables"]
            or current["images"]
            or current["heading"] != "Overview"
        ):
            sections.append(dict(current))

    for b in blocks:
        t = b["type"]
        if t == "heading":
            push()
            current = {
                "heading": b["text"],
                "paragraphs": [],
                "bullets": [],
                "tables": [],
                "images": [],
            }
        elif t == "p":
            # Keep short body lines (zone blurbs etc.); headings already promoted
            if len(plain(b["text"])) > 2:
                current["paragraphs"].append(b["text"])
        elif t == "li":
            if len(plain(b["text"])) > 2:
                current["bullets"].append(b["text"])
        elif t == "table":
            current["tables"].append({"headers": b["headers"], "rows": b["rows"]})
        elif t == "image":
            current["images"].append({"src": b["src"], "alt": b.get("alt") or ""})
    push()

    # Deduplicate paragraphs inside each section
    cleaned = []
    for sec in sections:
        seen = set()
        paras = []
        for p in sec["paragraphs"]:
            key = plain(p)[:100]
            if key in seen:
                continue
            seen.add(key)
            paras.append(p)
        sec["paragraphs"] = paras
        if sec["paragraphs"] or sec["bullets"] or sec["tables"] or sec["images"]:
            cleaned.append(sec)
    return cleaned


def download_image(url: str, dest: Path) -> str | None:
    try:
        if url.startswith("//"):
            url = "https:" + url
        # Encode non-ASCII path segments (e.g. DALL·E filenames)
        parsed = urlparse(url)
        safe_path = quote(parsed.path, safe="/%")
        url = parsed._replace(path=safe_path).geturl()
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=45) as res:
            data = res.read()
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        rel = str(dest.relative_to(ROOT / "public")).replace("\\", "/")
        return "/" + rel if not rel.startswith("/") else rel
    except Exception as e:
        print("IMG FAIL", url[:120], e)
        return None


def localize_images(
    live: str, remote_images: list[dict], slug: str
) -> tuple[list[dict], dict[str, str]]:
    """Download unique content images; return local list + remote->local map."""
    img_dir = IMG_ROOT / slug
    used: set[str] = set()
    local: list[dict] = []
    mapping: dict[str, str] = {}

    def _score(im: dict) -> tuple[int, int]:
        abs_url = urljoin(live, im.get("src") or "")
        low = abs_url.lower()
        # Prefer media library uploads over chrome/theme assets
        prefer = 0 if "/wp-content/uploads/" in low else 1
        return (prefer, 0)

    ordered = sorted(remote_images, key=_score)

    for im in ordered:
        abs_url = urljoin(live, im["src"])
        if abs_url in used:
            continue
        low = abs_url.lower()
        if any(
            x in low
            for x in (
                "logo",
                "icon",
                "favicon",
                "sprite",
                "emoji",
                "captcha",
                "wpcf7",
                "cropped-images",
                "banner-luminaires",
                "/cwv-webp-images/",
            )
        ):
            continue
        # Skip tiny thumbs in path
        if re.search(r"-\d{2,3}x\d{2,3}\.(jpg|jpeg|png|webp|gif)$", low):
            continue
        used.add(abs_url)
        ext = Path(urlparse(abs_url).path).suffix.lower() or ".jpg"
        if ext not in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
            ext = ".jpg"
        name = hashlib.md5(abs_url.encode()).hexdigest()[:12] + ext
        rel = download_image(abs_url, img_dir / name)
        if rel:
            item = {"src": rel, "alt": im.get("alt") or ""}
            local.append(item)
            mapping[im["src"]] = rel
            mapping[abs_url] = rel
        if len(local) >= MAX_IMAGES:
            break
    return local, mapping


def remap_section_images(sections: list[dict], mapping: dict[str, str], live: str) -> list[dict]:
    out = []
    for sec in sections:
        images = []
        for im in sec.get("images") or []:
            src = im.get("src") or ""
            abs_url = urljoin(live, src)
            local = mapping.get(src) or mapping.get(abs_url)
            if local:
                images.append({"src": local, "alt": im.get("alt") or ""})
        out.append({**sec, "images": images})
    return out


def extract_related(
    sections: list[dict], page_path: str, sidebar: list[dict] | None = None
) -> list[dict]:
    page = resolve_internal_path(page_path) or page_path
    seen = set()
    out = []

    def add(href: str, label: str):
        nonlocal out
        if not href.startswith("/") or not label:
            return
        if href.rstrip("/") == (page or "").rstrip("/"):
            return
        if href in seen:
            return
        seen.add(href)
        out.append({"href": href, "label": label[:90]})

    # Prefer curated sidebar / Other Testing Services links first
    for item in sidebar or []:
        add(item.get("href") or "", plain(item.get("label") or ""))
        if len(out) >= 24:
            return out
    blob = json.dumps(sections)
    for m in re.finditer(r'<a\s+href="([^"]+)">([^<]*)</a>', blob):
        add(m.group(1), plain(m.group(2)))
        if len(out) >= 24:
            break
    return out


def process_pack(
    fp: Path,
    *,
    force: bool = False,
    text_only: bool = False,
) -> dict:
    data = json.loads(fp.read_text(encoding="utf-8"))
    path = data.get("path") or "/"
    slug = data.get("slug") or fp.stem
    live = data.get("source") or (BASE + (path if path.endswith("/") else path + "/"))
    if not live.endswith("/"):
        live = live.rstrip("/") + "/"

    html = fetch(live)
    if not html:
        return {"path": path, "ok": False}

    parser = FullPageParser()
    try:
        parser.feed(html)
    except Exception as e:
        print("PARSE FAIL", path, e)
        return {"path": path, "ok": False}

    sections = blocks_to_sections(parser.blocks)
    n_paras = sum(len(s.get("paragraphs") or []) for s in sections)
    n_bullets = sum(len(s.get("bullets") or []) for s in sections)
    n_tables = sum(len(s.get("tables") or []) for s in sections)
    old_sections = data.get("sections") or []
    old_paras = sum(len(s.get("paragraphs") or []) for s in old_sections)
    old_bullets = sum(len(s.get("bullets") or []) for s in old_sections)

    # Never overwrite a pack with an empty scrape; weaker guard unless --force
    new_weight = n_paras + n_bullets + n_tables * 2 + len(sections)
    old_weight = old_paras + old_bullets + len(old_sections)
    if new_weight == 0:
        print("SKIP empty", path, "old", old_weight)
        return {"path": path, "ok": False, "reason": "empty"}
    if (
        not force
        and old_weight > 0
        and new_weight < max(2, old_weight // 3)
    ):
        print(
            "SKIP weaker",
            path,
            "new",
            new_weight,
            "old",
            old_weight,
        )
        return {"path": path, "ok": False, "reason": "empty_or_weaker"}

    local_images = data.get("images") or data.get("scrapedImages") or []
    if text_only:
        # Keep existing localized images; drop unresolved remote section imgs
        for sec in sections:
            kept = []
            for im in sec.get("images") or []:
                src = im.get("src") or ""
                if src.startswith("/images/"):
                    kept.append(im)
            sec["images"] = kept
    else:
        remote_imgs = []
        if parser.og_image:
            remote_imgs.append({"src": parser.og_image, "alt": parser.h1 or ""})
        remote_imgs.extend(parser.images)
        for sec in sections:
            for im in sec.get("images") or []:
                remote_imgs.append(im)

        local_images, mapping = localize_images(live, remote_imgs, slug)
        sections = remap_section_images(sections, mapping, live)

    title = parser.title or parser.h1 or data.get("title") or slug
    title = re.sub(r"\s*[|\-–—]\s*ITC India.*$", "", title, flags=re.I).strip() or title
    h1 = parser.h1 or data.get("h1") or title
    h1 = re.sub(r"\s*[|\-–—]\s*ITC India.*$", "", h1, flags=re.I).strip() or h1
    description = parser.meta_desc or data.get("description") or ""
    if sections and sections[0]["paragraphs"] and not description:
        description = plain(sections[0]["paragraphs"][0])[:180]

    # Preserve art-direction fields
    keep_keys = (
        "hero",
        "heroPortrait",
        "generatedIntro",
        "generatedMid",
        "generatedSections",
        "category",
        "action",
        "note",
        "slug",
        "path",
        "source",
    )
    pack = {k: data[k] for k in keep_keys if k in data}
    pack.update(
        {
            "path": path,
            "slug": slug,
            "action": data.get("action") or "EXPAND",
            "ok": True,
            "title": title,
            "h1": h1,
            "description": description,
            "sections": sections,
            "images": local_images,
            "scrapedImages": local_images,
            "relatedLinks": extract_related(sections, path, parser.sidebar_links),
            "source": live,
            "note": data.get("note", ""),
        }
    )
    # If no assigned hero yet, fall back to first scraped image
    if not pack.get("hero") and local_images:
        pack["hero"] = local_images[0]["src"]

    fp.write_text(json.dumps(pack, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        "OK",
        path,
        "sections",
        len(sections),
        "paras",
        n_paras,
        "tables",
        n_tables,
        "imgs",
        len(local_images),
        "text_only" if text_only else "full",
    )
    return {
        "path": path,
        "ok": True,
        "sections": len(sections),
        "paras": n_paras,
        "imgs": len(local_images),
    }


def needs_rescrape(fp: Path) -> bool:
    """Skip packs that already have substantial structured content."""
    try:
        data = json.loads(fp.read_text(encoding="utf-8"))
    except Exception:
        return True
    sections = data.get("sections") or []
    paras = sum(len(s.get("paragraphs") or []) for s in sections)
    tables = sum(len(s.get("tables") or []) for s in sections)
    # Fresh full scrape writes tables key even when empty; old thin packs lack it
    has_tables_key = any("tables" in s for s in sections)
    if sections and paras >= 4 and has_tables_key:
        return False
    if sections and paras >= 2 and tables:
        return False
    return True


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true", help="Re-scrape every pack")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite even when the new scrape is lighter than the old pack",
    )
    parser.add_argument(
        "--text-only",
        action="store_true",
        help="Refresh title/sections/FAQs only; keep existing localized images",
    )
    parser.add_argument(
        "--only",
        nargs="*",
        metavar="SLUG",
        help="Optional slug list (also accepts --only=slug)",
    )
    args = parser.parse_args()

    refresh_maps()
    packs = sorted(PACK_DIR.glob("*.json"))
    only = args.only or []
    # Normalize --only=a,b and --only=a --only=b
    wanted: set[str] = set()
    for item in only:
        for part in str(item).split(","):
            part = part.strip()
            if part:
                wanted.add(part)
    if wanted:
        packs = [p for p in packs if p.stem in wanted]
        if not packs:
            print("no packs matched --only", sorted(wanted))
            return
    elif not args.all:
        packs = [p for p in packs if needs_rescrape(p)]
    print(
        "full-scraping",
        len(packs),
        "packs",
        "force" if args.force else "safe",
        "text-only" if args.text_only else "with-images",
    )
    ok = fail = 0
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
        futs = {
            ex.submit(
                process_pack,
                fp,
                force=args.force or args.all,
                text_only=args.text_only,
            ): fp
            for fp in packs
        }
        for fut in as_completed(futs):
            res = fut.result()
            if res.get("ok"):
                ok += 1
            else:
                fail += 1
            time.sleep(0.15)
    print("done ok", ok, "fail", fail)


if __name__ == "__main__":
    main()
