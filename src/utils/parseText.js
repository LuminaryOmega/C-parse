export function parseText(text) {
    const lines = text.split("\\n").filter(a => a.trim().length > 0);

    return lines.map((line, idx) => ({
        timestamp: null,
        role: "text",
        content: line.trim(),
        meta: { line: idx + 1 }
    }));
}
