export function parseHTML(text) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    const messages = [];

    doc.querySelectorAll("*").forEach(el => {
        if (el.innerText && el.innerText.trim().length > 0) {
            messages.push({
                timestamp: null,
                role: "html",
                content: el.innerText.trim(),
                meta: {}
            });
        }
    });

    return messages;
}
