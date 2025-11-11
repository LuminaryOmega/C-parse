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
