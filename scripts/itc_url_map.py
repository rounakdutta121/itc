"""Map itcindia.org URLs to local app paths (migrated + built + redirects)."""

from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]

# Prefer nav destinations over duplicate migrated leaves where both exist.
SPECIAL: dict[str, str] = {
    "/": "/",
    "/home": "/",
    "/about-us": "/about-us",
    "/nabl-scope-certificate-india": "/about-us/accreditations",
    "/about-us/tec-fee-schedule": "/about-us/tec-fee-schedule",
    "/terms-conditions": "/about-us/terms-conditions",
    "/products": "/products",
    "/services": "/services",
    "/contact-us": "/contact-us",
    "/customer-support": "/contact-us/customer-support",
    "/inquiry": "/contact-us/inquiry",
    "/jobs": "/careers",
    "/vibration-testing": "/vibration-testing",
    "/drop-testing": "/drop-testing",
    "/salt-testing": "/salt-testing",
    "/salt-spray-testing": "/salt-testing",
    "/jss-55555": "/jss-55555",
    "/jss-55555-testing": "/jss-55555",
    "/jss-55555-testing-laboratory-in-india-itc-india": "/jss-55555",
    "/mil-std-810h-vibration-shock-testing": "/vibration-testing/mil-std-810h",
    "/mil-std-810h-vibration-shock-testing-laboratory-in-india": "/vibration-testing/mil-std-810h",
    "/iec-61373-vibration-testing": "/vibration-testing/iec-61373",
    "/iec-61373-vibration-shock-testing-for-railway-equipment": "/vibration-testing/iec-61373",
    "/iec-60068-2-6-vibration-testing-2-2": "/vibration-testing/iec-60068-2-6",
    "/iec-60068-2-6-sine-vibration-testing-services-in-india": "/vibration-testing/iec-60068-2-6",
    "/jss-5855-11-testing-2": "/vibration-testing/jss-5855-11",
    "/jss-5855-11-environmental-testing-services": "/vibration-testing/jss-5855-11",
    "/jss-50101-testing": "/vibration-testing/jss-50101",
    "/jss-50101-environmental-testing-for-electronic-components": "/vibration-testing/jss-50101",
    "/rdso-tl-0091-testing": "/vibration-testing/rdso-tl-0091",
    "/rdso-tl-0091-testing-for-railway-led-luminaires-in-india": "/vibration-testing/rdso-tl-0091",
    "/ista-2a-2b-2c": "/vibration-testing/ista-2a",
    "/ista-1a-1b-1c-1d-testing": "/vibration-testing/ista-1a",
    "/astm-d999-vibration-testing-of-shipping-containers": "/vibration-testing",
}


def _norm_path(path: str) -> str:
    path = (path or "").strip()
    if not path:
        return "/"
    if path.startswith("#"):
        return path
    # Drop query/fragment for routing; keep hash for in-page anchors on known pages
    if "?" in path:
        path = path.split("?", 1)[0]
    frag = ""
    if "#" in path:
        path, frag = path.split("#", 1)
        frag = "#" + frag
    path = path.rstrip("/") or "/"
    # Fix broken redirect targets in older manifests (trailing commas/colons)
    path = re.sub(r"[,:]+$", "", path) or "/"
    if not path.startswith("/"):
        path = "/" + path
    return path + frag if frag and path != "/" else (path if not frag else path + frag)


def _load_redirects() -> dict[str, str]:
    out: dict[str, str] = {}
    manifest = ROOT / "scripts" / "migration-manifest.json"
    if manifest.exists():
        for e in json.loads(manifest.read_text(encoding="utf-8")):
            if e.get("action") == "REDIRECT" and e.get("redirectTo"):
                src = _norm_path(e["path"])
                dst = _norm_path(str(e["redirectTo"]).split("#")[0])
                if dst and dst != "/":
                    out[src] = dst
    force = {
        "/salt-spray-testing": "/salt-testing",
        "/jss-55555-testing": "/jss-55555",
    }
    out.update(force)

    vercel = ROOT / "vercel.json"
    if vercel.exists():
        data = json.loads(vercel.read_text(encoding="utf-8"))
        for r in data.get("redirects") or []:
            src = _norm_path(r.get("source") or "")
            dst = _norm_path(str(r.get("destination") or "").split("#")[0])
            if src and dst:
                out[src] = dst
    return out


def _known_paths() -> set[str]:
    known = set(SPECIAL.values())
    known.update(SPECIAL.keys())
    index = ROOT / "scripts" / "migration-index.json"
    if index.exists():
        data = json.loads(index.read_text(encoding="utf-8"))
        for p in data.get("paths") or []:
            known.add(_norm_path(p))
        for r in data.get("redirects") or []:
            known.add(_norm_path(r.get("from") or ""))
            known.add(_norm_path(r.get("to") or ""))
    # Built pages
    known.update(
        {
            "/",
            "/about-us",
            "/about-us/accreditations",
            "/about-us/tec-fee-schedule",
            "/about-us/terms-conditions",
            "/products",
            "/services",
            "/contact-us",
            "/contact-us/customer-support",
            "/contact-us/inquiry",
            "/careers",
            "/vibration-testing",
            "/drop-testing",
            "/salt-testing",
            "/jss-55555",
        }
    )
    pack_dir = ROOT / "public" / "data" / "migrated"
    if pack_dir.exists():
        for fp in pack_dir.glob("*.json"):
            try:
                path = json.loads(fp.read_text(encoding="utf-8")).get("path")
                if path:
                    known.add(_norm_path(path))
            except Exception:
                continue
    return {p for p in known if p}


_REDIRECTS: dict[str, str] | None = None
_KNOWN: set[str] | None = None


def refresh_maps() -> None:
    global _REDIRECTS, _KNOWN
    _REDIRECTS = _load_redirects()
    _KNOWN = _known_paths()


def resolve_internal_path(href: str) -> str | None:
    """
    Return a local path for an itcindia.org (or root-relative) href, or None
    if the link is external / unusable.
    """
    if _REDIRECTS is None or _KNOWN is None:
        refresh_maps()
    assert _REDIRECTS is not None and _KNOWN is not None

    raw = (href or "").strip()
    if not raw or raw.startswith(("mailto:", "tel:", "javascript:", "data:")):
        return None

    if raw.startswith("#"):
        return raw

    if raw.startswith("//"):
        raw = "https:" + raw

    if raw.startswith("http://") or raw.startswith("https://"):
        parsed = urlparse(raw)
        host = (parsed.netloc or "").lower()
        if host and "itcindia.org" not in host:
            return None
        path = parsed.path or "/"
        if parsed.fragment:
            path = path.rstrip("/") + "#" + parsed.fragment
    else:
        path = raw

    path = _norm_path(path)
    base, frag = (path.split("#", 1) + [""])[:2]
    base = _norm_path(base)

    if base in SPECIAL:
        dest = SPECIAL[base]
    else:
        dest = base
        # Follow redirect chain (cap)
        for _ in range(5):
            nxt = _REDIRECTS.get(dest)
            if not nxt or nxt == dest:
                break
            dest = _norm_path(nxt)

    if dest not in _KNOWN and dest.split("#")[0] not in _KNOWN:
        # Still route locally — catch-all / placeholder is better than old domain
        pass

    if frag and "#" not in dest:
        return f"{dest}#{frag}"
    return dest


def rewrite_anchor_html(html: str) -> str:
    """Rewrite href= in a limited HTML snippet to local paths."""

    def repl(m: re.Match[str]) -> str:
        quote = m.group(1)
        href = m.group(2)
        local = resolve_internal_path(href)
        if not local:
            return m.group(0)
        return f"href={quote}{local}{quote}"

    return re.sub(r"href=(['\"])([^'\"]+)\1", repl, html, flags=re.I)
