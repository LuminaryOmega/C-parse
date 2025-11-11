// -----------------------------------------------------
//  Constellation Parser Suite — app.js (v1 core loop)
// -----------------------------------------------------

// Global state object
const CPS = {
  file: null,
  rawText: "",
  parsed: null,
  type: null,
};

// -----------------------------------------------------
//  File Type Detection
// -----------------------------------------------------
function detectFileType(filename) {
  const lower = filename.toLowerCase();

  if (lower.endsWith(".json")) return "json";
  if (lower.endsWith(".html") || lower.endsWith(".htm")) return "html";
  if (lower.endsWith(".txt")) return "text";

  return "unknown";
}

// -----------------------------------------------------
//  Main File Handler
// -----------------------------------------------------
async function handleFile({ name, content }) {
  CPS.file = name;
  CPS.rawText = content;
  CPS.type = detectFileType(name);

  let parsed;

  try {
    if (CPS.type === "json") {
      parsed = parseJSON(content);
    } else if (CPS.type === "html") {
      parsed = parseHTML(content);
    } else if (CPS.type === "text") {
      parsed = parseText(content);
    } else {
      parsed = { error: "Unsupported file type", content };
    }
  } catch (err) {
    parsed = { error: err.message, content };
  }

  CPS.parsed = parsed;

  // Update the UI
  renderView(parsed, CPS.type, name);
}

// -----------------------------------------------------
//  Event Wiring
// -----------------------------------------------------
function wireFileLoader() {
  const drop = document.getElementById("file-drop");
  const fileInput = document.getElementById("file-input");

  if (!drop || !fileInput) {
    console.error("⚠️ Missing DOM elements for file loader");
    return;
  }

  // Click → choose file
  drop.addEventListener("click", () => fileInput.click());

  // Drag over
  drop.addEventListener("dragover", (e) => {
    e.preventDefault();
    drop.style.borderColor = "var(--accent-purple)";
  });

  drop.addEventListener("dragleave", () => {
    drop.style.borderColor = "var(--accent-pink)";
  });

  // Drop file
  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    drop.style.borderColor = "var(--accent-pink)";
    const file = e.dataTransfer.files[0];
    if (file) processFileInput(file);
  });

  // File input manually selected
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) processFileInput(file);
  });
}

// -----------------------------------------------------
//  Convert File → Text → Parsed Output
// -----------------------------------------------------
function processFileInput(file) {
  const reader = new FileReader();

  reader.onload = () => {
    handleFile({
      name: file.name,
      content: reader.result,
    });
  };

  reader.readAsText(file);
}

// -----------------------------------------------------
//  App Init
// -----------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Constellation Parser Suite — Core Loop Ready");
  wireFileLoader();
});
