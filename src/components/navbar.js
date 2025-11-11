// src/components/navbar.js
export default class Navbar {
    constructor(app) {
        this.app = app;
        this.element = null;
    }

    mount() {
        this.element = document.getElementById("navbar");
        if (!this.element) {
            console.error("[Navbar] #navbar not found in DOM.");
            return;
        }
        this.element.innerHTML = this.render();
        this.attachEvents();
    }

    render() {
        return `
            <div class="nav-left">
                <span class="nav-title">Constellation Parser Suite</span>
            </div>

            <div class="nav-right">
                <button id="nav-load" class="nav-btn">Load File</button>
                <button id="nav-filters" class="nav-btn">Filters</button>
                <button id="nav-export" class="nav-btn">Export</button>
                <button id="nav-clear" class="nav-btn danger">Clear</button>
            </div>
        `;
    }

    attachEvents() {
        document.getElementById("nav-load")
            ?.addEventListener("click", () => this.app.emit("open-file-dialog"));

        document.getElementById("nav-filters")
            ?.addEventListener("click", () => this.app.emit("open-filter-panel"));

        document.getElementById("nav-export")
            ?.addEventListener("click", () => this.app.emit("export-dataset"));

        document.getElementById("nav-clear")
            ?.addEventListener("click", () => this.app.emit("clear-all"));
    }
}
