// src/app.js
// Central controller for Constellation Parser Suite

import Navbar from "./components/navbar.js";
import FileLoader from "./components/fileLoader.js";
import Viewer from "./components/viewer.js";
import FilterPanel from "./components/filterPanel.js";
import Exporter from "./components/exporter.js";

class App {
    constructor() {
        this.data = [];
        this.listeners = {}; // event bus
    }

    // --------------------------
    // EVENT SYSTEM
    // --------------------------
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    emit(event, payload) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(cb => cb(payload));
    }

    // --------------------------
    // STATE MANAGEMENT
    // --------------------------
    setData(newData) {
        this.data = newData;
    }

    // --------------------------
    // INITIALIZATION
    // --------------------------
    init() {
        this.navbar = new Navbar(this);
        this.fileLoader = new FileLoader(this);
        this.viewer = new Viewer(this);
        this.filterPanel = new FilterPanel(this);
        this.exporter = new Exporter(this);

        // Mount UI components
        this.navbar.mount();
        this.fileLoader.mount();
        this.viewer.mount();
        this.filterPanel.mount();
        this.exporter.mount();
    }
}

// --------------------------
// BOOTSTRAP APP
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    window.ConstellationApp = app; // for debugging in browser
    app.init();
})
