#!/data/data/com.termux/files/usr/bin/bash

PROJECT="$HOME/C-parse"
INDEX="$PROJECT/index.html"
APPJS="$PROJECT/src/app.js"
OVERLAY_ID='id="app-overlay"'
OVERLAY_BIND='this.overlay = document.getElementById("app-overlay");'

echo ""
echo "✨ Constellation Suite — Auto-Fix & Overlay Injector"
echo "-----------------------------------------------------"

# Ensure directory exists
if [ ! -d "$PROJECT" ]; then
    echo "❌ Project folder not found at $PROJECT"
    exit 1
fi

# Ensure index.html exists
if [ ! -f "$INDEX" ]; then
    echo "❌ index.html not found — creating placeholder..."
    mkdir -p "$PROJECT"
    cat <<EOF > "$INDEX"
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Constellation Parser Suite</title></head>
<body>
<div id="app"></div>
<div id="app-overlay"></div>
<script type="module" src="./src/app.js"></script>
</body>
</html>
EOF
fi

# Inject overlay div if missing
if ! grep -q "$OVERLAY_ID" "$INDEX"; then
    echo "✅ Adding overlay container to index.html..."
    sed -i '/<body>/a \
<div id="app-overlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.35);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;z-index:9999;"></div>' "$INDEX"
else
    echo "✅ Overlay container already present."
fi

# Ensure app.js exists
if [ ! -f "$APPJS" ]; then
    echo "❌ src/app.js missing — creating skeleton..."
    mkdir -p "$PROJECT/src"
    cat <<EOF > "$APPJS"
export default class ConstellationApp {
    constructor() {
        this.overlay = document.getElementById("app-overlay");
    }
}
document.addEventListener("DOMContentLoaded",()=>new ConstellationApp());
EOF
fi

# Inject overlay binding if missing
if ! grep -q "$OVERLAY_BIND" "$APPJS"; then
    echo "✅ Adding overlay binding into app.js..."
    sed -i "/constructor()/a \        ${OVERLAY_BIND}" "$APPJS"
else
    echo "✅ Overlay binding already present in app.js."
fi

# Kill previous servers cleanly
echo "🔪 Killing stale server processes..."
pkill -f http-server >/dev/null 2>&1
pkill -f python3 >/dev/null 2>&1

# Restart server
echo "🚀 Starting http-server fresh..."
cd "$PROJECT"
http-server -c-1 &

echo ""
echo "✅ All fixes applied."
echo "✅ Server running."
echo "📂 Project folder: $PROJECT"
echo ""
