"""Wait until itcindia.org responds, then scrape remaining thin packs."""

from __future__ import annotations

import subprocess
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROBE = "https://www.itcindia.org/rohs-testing/"
UA = "Mozilla/5.0 (compatible; ITCIndiaMigrator/1.0)"


def site_up() -> bool:
    try:
        req = urllib.request.Request(PROBE, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=20) as res:
            return res.status < 500
    except Exception:
        return False


def main():
    print("waiting for itcindia.org …")
    while not site_up():
        print("still down; retry in 45s")
        time.sleep(45)
    print("site up — starting residual scrape")
    env = dict(**{k: v for k, v in __import__("os").environ.items()})
    env["PYTHONUNBUFFERED"] = "1"
    subprocess.check_call(
        [sys.executable, str(ROOT / "scripts" / "full_scrape_content.py")],
        cwd=str(ROOT),
        env=env,
    )


if __name__ == "__main__":
    main()
