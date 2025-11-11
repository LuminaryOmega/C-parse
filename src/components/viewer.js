export default class Viewer {
    constructor(app) {
        this.app = app;
        this.element = null;
    }

    mount() {
        this.element = document.getElementById("viewer");
        if (!this.element) {
            console.error("[Viewer] #viewer not found.");
            return;
        }
        this.app.on("data-updated", (data) => this.render(data));
        this.app.on("clear-all", () => this.clear());
    }

    render(data) {
        if (!data || data.length === 0) {
            this.element.innerHTML = "<div class='empty'>No data loaded.</div>";
            return;
        }

        const html = data.map(msg => `
            <div class="msg">
                <div class="meta">
                    <span class="role">${msg.role || "unknown"}</span>
                    <span class="time">${msg.timestamp || ""}</span>
                </div>
                <div class="content">${this.escape(msg.content)}</div>
            </div>
        `).join("");

        this.element.innerHTML = html;
    }

    clear() {
        this.element.innerHTML = "<div class='empty'>Cleared.</div>";
    }

    escape(str) {
        return (str || "")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
}
