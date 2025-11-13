// src/components/navbar.js
export default class Navbar {
    constructor(app) {
        this.app = app;
        this.element = null;
        this.fileName = "";
    }

    mount() {
        this.element = document.getElementById("navbar");
        if (!this.element) {
            console.error("[Navbar] #navbar not found in DOM.");
            return;
        }
        this.element.innerHTML = this.render();
        this.attachEvents();

        // Listen for file name updates
        this.app.on("data-loaded", () => {
            this.fileName = this.app.fileName || "";
            this.updateTitle();
        });
    }

    render() {
        return `
            <div class="nav-left">
                <span class="nav-title">JSON Parser & Navigator</span>
                <span id="file-name" style="color: #888; font-size: 0.9rem; margin-left: 1rem;"></span>
            </div>

            <div class="nav-right">
                <button id="nav-load" class="nav-btn">📁 Load File</button>
                <button id="nav-export-json" class="nav-btn">💾 Export JSON</button>
                <button id="nav-export-jsonl" class="nav-btn">💾 Export JSONL</button>
                <button id="nav-clear" class="nav-btn danger">🗑️ Clear</button>
            </div>
        `;
    }

    attachEvents() {
        document.getElementById("nav-load")
            ?.addEventListener("click", () => this.app.emit("open-file-dialog"));

        document.getElementById("nav-export-json")
            ?.addEventListener("click", () => this.app.emit("export-json"));

        document.getElementById("nav-export-jsonl")
            ?.addEventListener("click", () => this.app.emit("export-jsonl"));

        document.getElementById("nav-clear")
            ?.addEventListener("click", () => {
                if (confirm("Clear all data?")) {
                    this.app.emit("clear-all");
                    this.fileName = "";
                    this.updateTitle();
                }
            });
    }

    updateTitle() {
        const fileNameElement = document.getElementById("file-name");
        if (fileNameElement) {
            fileNameElement.textContent = this.fileName ? `(${this.fileName})` : "";
        }
    }
}
