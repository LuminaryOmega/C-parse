export function parseJSON(text) {
    try {
        const data = JSON.parse(text);

        if (Array.isArray(data)) return normalize(data);

        if (typeof data === "string") {
            return normalize(data.split("\\n").map(l => JSON.parse(l)));
        }

        return normalize([data]);

    } catch (err) {
        console.error("[parseJSON] Error:", err);
        return [];
    }
}

function normalize(arr) {
    return arr.map(entry => ({
        timestamp: entry.timestamp || null,
        role: entry.role || null,
        content: entry.content || "",
        meta: entry.meta || {}
    }));
}
