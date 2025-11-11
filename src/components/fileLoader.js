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
