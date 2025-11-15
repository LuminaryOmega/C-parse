export default class RolePrompt {
    constructor(app) {
        this.app = app;
    }

    mount() {
        this.app.on("roles-confirm", info => this.askConfirmation(info));
        this.app.on("roles-manual", info => this.manualPrompt(info));
    }

    askConfirmation(info) {
        const html = `
            <div class="msg glass">
                <div class="meta">Role Detection</div>
                <div class="content">
                    <p>The system has identified the following default roles:</p>

                    <strong>User</strong><br>
                    <strong>Assistant</strong><br><br>

                    <p>Would you like to automatically apply these labels to the conversation?</p>

                    <button id="confirmApply" class="nav-btn">Apply Automatically</button>
                    <button id="confirmManual" class="nav-btn danger">Label Manually</button>
                </div>
            </div>
        `;

        this.app.showOverlay(html);

        document.getElementById("confirmApply").onclick = () => {
            this.app.emit("roles-applied", info.roles);
        };

        document.getElementById("confirmManual").onclick = () => {
            this.manualPrompt(info);
        };
    }

    manualPrompt(info) {
        const html = `
            <div class="msg glass">
                <div class="meta">Manual Role Labeling</div>
                <div class="content">
                    <p>Please enter custom role labels:</p>

                    <label>User:</label>
                    <input id="manualUser" placeholder="User" />

                    <label style="margin-top:10px;">Assistant:</label>
                    <input id="manualAssistant" placeholder="Assistant" />

                    <button id="applyManual" class="nav-btn" style="margin-top:15px;">Apply</button>
                </div>
            </div>
        `;

        this.app.showOverlay(html);

        document.getElementById("applyManual").onclick = () => {
            const roles = {
                user: document.getElementById("manualUser").value || "User",
                assistant: document.getElementById("manualAssistant").value || "Assistant"
            };

            this.app.emit("roles-applied", roles);
        };
    }
}
