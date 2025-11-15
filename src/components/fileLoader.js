import { getExtension } from "../utils/fileHelpers.js";
import { parseJSON } from "../utils/parseJSON.js";
import { parseHTML } from "../utils/parseHTML.js";
import { parseText } from "../utils/parseText.js";

export default class FileLoader {
    constructor(app) {
        this.app = app;
    }

    mount() {
        const input = document.getElementById("file-input");
        input.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                this.loadFile(e.target.files[0]);
            }
        });
    }

    async loadFile(file) {
        try {
            const text = await file.text();
            const sample = text.slice(0, 8000);

            // --- ROLE INFERENCE ---
            const { inferRoles } = await import("../utils/inferRoles.js");
            const info = inferRoles(sample);

            // Always notify UI of what was detected
            this.app.emit("roles-detected", info);

            // If strong confidence, ask user politely whether to apply
            if (info.confidence >= 0.50) {
                this.app.emit("roles-confirm", info);
                return; // Wait for user to choose
            }

            // Low confidence → manual labeling required
            this.app.emit("roles-manual", info);
        } catch (err) {
            console.error("[FileLoader] Error reading file:", err);
            this.app.emit("error", "Failed to load file.");
        }
    }

    // --- Called once user approves roles ---
    async continueParse(fileText, roles) {
        try {
            const ext = getExtension("file.txt");
            let parsed;

            switch (ext) {
                case "json": parsed = parseJSON(fileText, roles); break;
                case "html":
                case "htm": parsed = parseHTML(fileText, roles); break;
                default: parsed = parseText(fileText, roles); break;
            }

            this.app.setRoles(roles);
            this.app.setData(parsed);
            this.app.emit("data-updated", parsed);

        } catch (err) {
            console.error("[FileLoader] Parsing error:", err);
            this.app.emit("error", "Failed to parse file.");
        }
    }
}
