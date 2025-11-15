# parser_codeblocks.py
# IaeroCoreAI — Fenced Code Block Extractor (v0.1)
#
# PURPOSE:
# - Take "blocks" from parser_core.py
# - Extract any ``` fenced code content
# - Return clean, re-parsable segments

import re

FENCE = re.compile(
    r"```(?P<lang>[a-zA-Z0-9_-]*)\n(?P<code>.*?)```",
    re.DOTALL
)

def extract_codeblocks(blocks):
    """
    Input: list of strings
    Output: list of {lang, code}
    """
    results = []

    for text in blocks:
        for match in FENCE.finditer(text):
            lang = match.group("lang") or "plain"
            code = match.group("code").strip()
            results.append({
                "lang": lang,
                "code": code
            })

    return results

if __name__ == "__main__":
    # for quick direct testing
    sample = ["Here:\n```python\nprint('hi')\n```"]
    print(extract_codeblocks(sample))
