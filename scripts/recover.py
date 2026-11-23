#!/usr/bin/env python3
"""Preserve publicly deployed HTML, JS, CSS and assets from the original Netlify URL.

This is a copy of the deployed build, not the original Vite source.
No authentication, credentials or environment variables are downloaded.
"""
from __future__ import annotations

import json
import mimetypes
import re
from collections import deque
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urljoin, urlsplit
from urllib.request import Request, urlopen

BASE = "https://bank-ai-assistant-case-club.netlify.app/"
ROOT = Path(__file__).resolve().parent.parent / "deployed"
MAX_FILES = 200
MAX_BYTES = 15_000_000


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs: list[str] = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "img", "source") and a.get("src"):
            self.refs.append(a["src"])
        if tag == "link" and a.get("href"):
            self.refs.append(a["href"])


def path_for(url: str) -> Path | None:
    parts = urlsplit(url)
    root = urlsplit(BASE)
    if parts.netloc != root.netloc or parts.scheme != "https":
        return None
    name = unquote(parts.path).lstrip("/") or "index.html"
    components = Path(name).parts
    if any(part in ("..", ".") for part in components):
        return None
    return ROOT.joinpath(*components)


def candidate_urls(text: str, url: str, mime: str) -> list[str]:
    candidates = []
    if "html" in mime or urlsplit(url).path in ("", "/"):
        parser = Links()
        parser.feed(text)
        candidates.extend(parser.refs)
    if "css" in mime or urlsplit(url).path.endswith(".css"):
        candidates.extend(re.findall(r"url\(\s*['\"]?([^)'\"\s]+)", text))
        candidates.extend(re.findall(r"@import\s+['\"]([^'\"]+)", text))
    # Vite bundles can reference images and lazy-loaded chunks via root-relative URLs.
    if urlsplit(url).path.endswith((".js", ".css", ".html")):
        candidates.extend(re.findall(r"['\"](/assets/[^'\"?\s]+)['\"]", text))
    candidates.append(url + ".map") if urlsplit(url).path.endswith((".js", ".css")) else None
    return [urljoin(url, item) for item in candidates if item and not item.startswith(("data:", "#", "javascript:"))]


def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    queue = deque([BASE])
    visited: set[str] = set()
    manifest = []
    while queue and len(visited) < MAX_FILES:
        url = queue.popleft().split("#", 1)[0]
        if url in visited:
            continue
        visited.add(url)
        target = path_for(url)
        if target is None:
            continue
        try:
            with urlopen(Request(url, headers={"User-Agent": "SisyphusRepositoryRecovery/1.0"}), timeout=20) as response:
                data = response.read(MAX_BYTES + 1)
                mime = response.headers.get("Content-Type", "").split(";", 1)[0]
                if len(data) > MAX_BYTES:
                    raise ValueError("File exceeds size limit")
        except (HTTPError, URLError, ValueError) as error:
            manifest.append({"url": url, "error": str(error)})
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        manifest.append({"url": url, "path": target.relative_to(ROOT).as_posix(), "bytes": len(data), "content_type": mime})
        if mime.startswith("text/") or any(target.suffix == ext for ext in (".js", ".css", ".html", ".json")):
            text = data.decode("utf-8", "replace")
            for candidate in candidate_urls(text, url, mime):
                if path_for(candidate) is not None and candidate not in visited:
                    queue.append(candidate)
    record = {
        "source": BASE,
        "downloaded_at": datetime.now(timezone.utc).isoformat(),
        "note": "Deployed build only; not original Vite sources.",
        "files": manifest,
    }
    (ROOT / "recovery-manifest.json").write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n")
    print("Recovered", sum("path" in item for item in manifest), "files; errors", sum("error" in item for item in manifest))
    for item in manifest:
        if "error" in item:
            print("ERROR", item["url"], item["error"])
    if not (ROOT / "index.html").exists():
        raise SystemExit("Could not retrieve site index.html")


if __name__ == "__main__":
    main()
