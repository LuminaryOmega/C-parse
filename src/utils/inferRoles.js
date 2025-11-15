export function inferRoles(sampleText) {
    // Default neutral roles
    let inferred = {
        user: "User",
        assistant: "Assistant"
    };

    // JSON role detection ("role": "user", etc.)
    const userCount = (sampleText.match(/"role"\s*:\s*"user"/g) || []).length;
    const assistantCount = (sampleText.match(/"role"\s*:\s*"assistant"/g) || []).length;

    if (userCount > 0 || assistantCount > 0) {
        return {
            roles: inferred,
            confidence: 0.95,
            method: "json"
        };
    }

    // Speaker label pattern, e.g. "Name:" or "Name —"
    const namePattern = /^([A-Za-z0-9_]+)[\s]*[:\-–—]/gm;
    const matches = [...sampleText.matchAll(namePattern)];

    if (matches.length >= 2) {
        return {
            roles: inferred,
            confidence: 0.60,
            method: "speaker-pattern"
        };
    }

    return {
        roles: inferred,
        confidence: 0.20,
        method: "unknown"
    };
}
