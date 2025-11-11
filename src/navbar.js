// src/components/navbar.js
// Lumae Minimal Neon Navbar v1

export function renderNavbar() {
    const nav = document.getElementById("navbar");

    if (!nav) return;

    nav.innerHTML = `
      <div class="nav-container">
        <div class="nav-title">
          <span class="sigil">⟣⧉</span>
          Constellation Parser Suite
          <span class="sigil">⧉⟢</span>
        </div>

        <div class="nav-actions">
          <button id="load-file-btn" class="nav-btn">Load File</button>
          <button id="clear-view-btn" class="nav-btn">Clear</button>
        </div>
      </div>
    `;

    // Attach listeners
    document.getElementById("load-file-btn").addEventListener("click", () => {
        const input = document.getElementById("file-input");
        if (input) input.click();
    });

    document.getElementById("clear-view-btn").addEventListener("click", () => {
        const viewer = document.getElementById("viewer");
        if (viewer) viewer.innerHTML = `<div class="placeholder">No file loaded.</div>`;
    });
}
