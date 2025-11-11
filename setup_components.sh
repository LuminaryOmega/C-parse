#!/data/data/com.termux/files/usr/bin/bash

echo "[*] Creating folder structure..."
mkdir -p src/components
mkdir -p src/utils

# -------------------------------
# NAVBAR
# -------------------------------
cat > src/components/navbar.js << 'EOF'
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
EOF

# -------------------------------
# FILE LOADER
# -------------------------------
cat > src/components/fileLoader.js << 'EOF'
import { parseJSON } from "../utils/parseJSON.js";
import { parseHTML } from "../utils/parseHTML.js";
import { parseText } from "../utils/parseText.js";
import { getExtension } from "../utils/fileHelpers.js";

export default class FileLoader {
    constructor(app) {
        this.app = app;
        this.input = null;
    }

    mount() {
        this.input = document.createElement("input");
        this.input.type = "file";
        this.input.accept = ".json,.txt,.html,.htm";
        this.input.style.display = "none";
        document.body.appendChild(this.input);

        this.input.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) this.loadFile(file);
        });

        this.app.on("open-file-dialog", () => this.input.click());
    }

    async loadFile(file) {
        try {
            const ext = getExtension(file.name);
            const text = await file.text();
            let parsed;

            switch (ext) {
                case "json": parsed = parseJSON(text); break;
                case "html":
                case "htm": parsed = parseHTML(text); break;
                default: parsed = parseText(text); break;
            }

            this.app.setData(parsed);
            this.app.emit("data-updated", parsed);

        } catch (err) {
            console.error("[FileLoader] Error:", err);
            this.app.emit("error", "Failed to load file.");
        }
    }
}
EOF

# -------------------------------
# VIEWER
# -------------------------------
cat > src/components/viewer.js << 'EOF'
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
EOF

# -------------------------------
# FILTER PANEL
# -------------------------------
cat > src/components/filterPanel.js << 'EOF'
export default class FilterPanel {
    constructor(app) {
        this.app = app;
        this.panel = null;
    }

    mount() {
        this.panel = document.getElementById("sidebar");
        if (!this.panel) {
            console.error("[FilterPanel] #sidebar not found.");
            return;
        }
        this.app.on("open-filter-panel", () => this.render());
    }

    render() {
        this.panel.innerHTML = `
            <div class="filter-box">
                <h3>Filters</h3>

                <label>Role:</label>
                <select id="filter-role">
                    <option value="">Any</option>
                    <option value="user">User</option>
                    <option value="assistant">Assistant</option>
                </select>

                <label>Keyword:</label>
                <input type="text" id="filter-keyword" placeholder="Search content..." />

                <button id="filter-apply" class="apply-btn">Apply</button>
            </div>
        `;

        document.getElementById("filter-apply")
            ?.addEventListener("click", () => this.apply());
    }

    apply() {
        const role = document.getElementById("filter-role").value;
        const keyword = document.getElementById("filter-keyword").value.trim();
        this.app.emit("apply-filters", { role, keyword });
    }
}
EOF

# -------------------------------
# EXPORTER
# -------------------------------
cat > src/components/exporter.js << 'EOF'
export default class Exporter {
    constructor(app) {
        this.app = app;
        this.data = [];
    }

    mount() {
        this.app.on("data-updated", (data) => this.data = data);
        this.app.on("export-dataset", () => this.export());
    }

    export() {
        if (!this.data || this.data.length === 0) {
            alert("No data available to export.");
            return;
        }

        const jsonl = this.data.map(entry => JSON.stringify(entry)).join("\\n");

        const blob = new Blob([jsonl], { type: "application/jsonl" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "dataset.jsonl";
        a.click();

        URL.revokeObjectURL(url);
    }
}
EOF

# -------------------------------
# UTIL FILES
# -------------------------------
cat > src/utils/fileHelpers.js << 'EOF'
export function getExtension(filename) {
    const parts = filename.split(".");
    return parts.pop().toLowerCase();
}
EOF

cat > src/utils/parseJSON.js << 'EOF'
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
EOF

cat > src/utils/parseHTML.js << 'EOF'
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
EOF

cat > src/utils/parseText.js << 'EOF'
export function parseText(text) {
    const lines = text.split("\\n").filter(a => a.trim().length > 0);

    return lines.map((line, idx) => ({
        timestamp: null,
        role: "text",
        content: line.trim(),
        meta: { line: idx + 1 }
    }));
}
EOF

echo "[✓] All components + utils generated successfully!"
EOF
