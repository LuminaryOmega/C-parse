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
