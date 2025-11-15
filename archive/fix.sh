#!/data/data/com.termux/files/usr/bin/bash

echo "⟦LFSL⟧ Automated Fix Running…"

# 1. Remove stray incorrect files
rm -f fileHelpers.js parseJSON parseText.js parseHTML.js viewer_js fileLoader.js 2>/dev/null

# Ensure directories exist
mkdir -p src/utils
mkdir -p src/components

#######################################
# 2. Create correct utils files
#######################################

cat > src/utils/fileHelpers.js << 'EOF'
// File Helpers (minimal functional version)
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsText(file);
  });
}
EOF

cat > src/utils/parseJSON.js << 'EOF'
// Minimal JSON parser
export function parseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { error: "Invalid JSON" };
  }
}
EOF

cat > src/utils/parseText.js << 'EOF'
// Basic text parser
export function parseText(text) {
  return text.split("\n");
}
EOF

cat > src/utils/parseHTML.js << 'EOF'
// Extracts readable text from HTML
export function parseHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText;
}
EOF

#######################################
# 3. Create minimal components
#######################################

cat > src/components/fileLoader.js << 'EOF'
import { readFileAsText } from "../utils/fileHelpers.js";

export async function handleFileLoad(file, callback) {
  const text = await readFileAsText(file);
  callback(text, file.name);
}
EOF

cat > src/components/viewer.js << 'EOF'
export function renderViewer(content) {
  const viewer = document.getElementById("viewer");
  viewer.innerHTML = "<pre>" + content + "</pre>";
}
EOF

#######################################
# 4. Ensure styles.css exists
#######################################

cat > styles.css << 'EOF'
:root {
  --bg: #0d0d0f;
  --panel: #111417;
  --text: #e4e4ea;
  --accent: #ff2fd5;  /* pink */
  --accent2: #8c40ff; /* purple */
  --accent3: #ffd86b; /* gold */
}

body {
  background: var(--bg);
  color: var(--text);
  margin: 0;
  padding: 0;
  font-family: system-ui;
}
EOF

echo "✅ Completed."
echo "✅ Correct files placed."
echo "✅ You may now: git add . && git commit -m 'Automated fix' && git push"
