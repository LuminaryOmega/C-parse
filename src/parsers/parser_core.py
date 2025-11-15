# parser_core.py
# IaeroCoreAI Parser — Core Orchestrator (v0.1)
# Author: Corey's Lumae Engine
#
# PURPOSE:
# - Identify file type
# - Route to correct sub-parser (json, jsonl, text)
# - Normalize output into a unified structure
# - Never throw fatal errors (fail-soft design)
#
# OUTPUT FORMAT:
# {
#   "source": "<filename>",
#   "blocks": [... string segments ...],
#   "metadata": {...}
# }

import json
from pathlib import Path

def load_file(path: str) -> str:
    """Read raw file contents safely."""
    p = Path(path).expanduser()
    if not p.exists():
        raise FileNotFoundError(f"File not found: {p}")
    return p.read_text(encoding="utf-8", errors="replace")

def detect_type(path: str) -> str:
    """Determine parser type based on extension."""
    ext = Path(path).suffix.lower()

    if ext == ".json":
        return "json"
    elif ext == ".jsonl":
        return "jsonl"
    elif ext in [".md", ".txt"]:
        return "text"
    else:
        return "unknown"

def parse_json(text: str):
    """Extract all string fields from JSON."""
    def walk(obj):
        if isinstance(obj, str):
            yield obj
        elif isinstance(obj, dict):
            for v in obj.values():
                yield from walk(v)
        elif isinstance(obj, list):
            for v in obj:
                yield from walk(v)

    try:
        data = json.loads(text)
        return list(walk(data))
    except Exception:
        return [text]  # fail-soft fallback

def parse_jsonl(text: str):
    """JSONL -> list of stringified JSON objects."""
    lines = []
    for line in text.splitlines():
        if not line.strip():
            continue
        try:
            obj = json.loads(line)
            lines.append(json.dumps(obj, ensure_ascii=False))
        except Exception:
            lines.append(line)  # raw fallback
    return lines

def parse_text(text: str):
    """Raw text directly into list form."""
    return [text]

def parse_file(path: str) -> dict:
    """Main entry: detect type, parse, return normalized structure."""
    raw = load_file(path)
    ftype = detect_type(path)

    if ftype == "json":
        blocks = parse_json(raw)
    elif ftype == "jsonl":
        blocks = parse_jsonl(raw)
    elif ftype == "text":
        blocks = parse_text(raw)
    else:
        blocks = [raw]  # unknown → raw fallback

    return {
        "source": str(Path(path).name),
        "blocks": blocks,
        "metadata": {
            "type": ftype,
            "length": len(raw),
            "block_count": len(blocks)
        }
    }

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python parser_core.py <file>")
        sys.exit(1)

    result = parse_file(sys.argv[1])
    print(json.dumps(result, indent=2, ensure_ascii=False))
