// Minimal JSON parser
export function parseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { error: "Invalid JSON" };
  }
}
