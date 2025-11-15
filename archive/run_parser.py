
#!/usr/bin/env python3
import sys, json, os, re
from datetime import datetime

def extract_blocks(text):
    """Extract any block that looks like code, text fragments, or raw strings."""
    blocks = []

    # 1. Triple-backtick blocks ```...```
    for m in re.finditer(r"```(.*?)```", text, re.S):
        blocks.append(m.group(1).strip())

    # 2. Lines with keywords (for meaningful fragments)
    for line in text.splitlines():
        if any(k in line.lower() for k in ["nova", "corey", "system", "truth", "omega", "protocol"]):
            blocks.append(line.strip())

    # 3. Any long paragraph > 80 chars
    paragraphs = re.split(r"\n\s*\n", text)
    for p in paragraphs:
        if len(p.strip()) > 80:
            blocks.append(p.strip())

    return blocks


def process_file(path):
    if not os.path.exists(path):
        return {"error": f"File not found: {path}"}

    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()

    blocks = extract_blocks(raw)

    out_items = []
    for b in blocks:
        out_items.append({
            "timestamp": datetime.utcnow().isoformat(),
            "role": "unknown",
            "content": b,
            "meta": {}
        })

    return out_items


def write_jsonl(items, output_path):
    with open(output_path, "w", encoding="utf-8") as out:
        for item in items:
            out.write(json.dumps(item, ensure_ascii=False) + "\n")


def main():
    if len(sys.argv) < 2:
        print("Usage: python run_parser.py <input-file>")
        sys.exit(1)

    source = sys.argv[1]

    items = process_file(source)

    # Auto-name output
    timestamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    output_path = f"parsed_{timestamp}.jsonl"

    # If parser returned an error
    if isinstance(items, dict) and "error" in items:
        print(json.dumps(items))
        sys.exit(1)

    # Write final JSONL
    write_jsonl(items, output_path)

    # Minimal output only
    print(f"{len(items)} items written → {output_path}")


if __name__ == "__main__":
    main()
