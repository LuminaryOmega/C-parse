# JSON Parser & Navigator - Quick Start Guide

## 🚀 Getting Started

### Option 1: Use GitHub Pages (Recommended)
Simply visit: `https://luminaryomega.github.io/C-parse/`

### Option 2: Run Locally
1. Clone the repository
2. Serve with any static file server (Python, Node.js, etc.)
3. Open in your browser

---

## 📖 How to Use

### Loading Files

**Method 1: Click to Load**
1. Click the "📁 Load File" button in the navbar OR the "Choose File" button in the sidebar
2. Select your `.json` or `.jsonl` file
3. The file will automatically parse and display

**Method 2: Drag & Drop**
1. Drag your JSON or JSONL file
2. Drop it onto the sidebar area
3. The file will automatically parse and display

### Navigating Your Data

**Expanding Items**
- Click the `▶` arrow next to any object or array to expand it
- Click the `▼` arrow to collapse it back
- Nested structures can be expanded/collapsed independently

**Understanding the Display**
- **Keys** appear in pink/magenta
- **Strings** appear in gold/yellow with quotes
- **Numbers** appear in cyan/blue
- **Booleans** appear in pink (true/false)
- **Null** values appear in gray
- Collapsed items show a count: `{3 items}` or `[5 items]`

### Viewing Statistics

The stats panel shows:
- **Format**: JSON or JSONL
- **Type**: object, array, string, number, etc.
- **Items**: Total count of top-level items

### Exporting Data

**Export as JSON**
1. Click "💾 Export JSON" in the navbar
2. A formatted JSON file will download

**Export as JSONL**
1. Click "💾 Export JSONL" in the navbar
2. A JSON Lines file will download (one object per line)

### Clearing Data

1. Click "🗑️ Clear" in the navbar
2. Confirm the dialog
3. All data will be removed from view

---

## 📂 Supported File Formats

### JSON Format
Standard JSON with a single root element:
```json
{
  "users": [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
  ]
}
```

### JSONL Format (JSON Lines)
One JSON object per line:
```jsonl
{"name": "Alice", "age": 30}
{"name": "Bob", "age": 25}
```

---

## 💡 Tips & Tricks

1. **Large Files**: Expand only the sections you need to explore
2. **Deep Nesting**: Navigate level by level for complex structures
3. **Mobile**: Works great on phones - tap to expand/collapse
4. **Privacy**: All processing happens in your browser - no uploads!
5. **Offline**: Once loaded, the app works without internet

---

## 🔒 Privacy & Security

- ✅ **100% Client-Side** - Everything runs in your browser
- ✅ **No Uploads** - Your files never leave your device
- ✅ **No Tracking** - No analytics or data collection
- ✅ **No Storage** - Data is cleared when you close the tab

---

## ❓ Troubleshooting

**File won't load**
- Ensure the file is valid JSON or JSONL
- Check the file extension is `.json` or `.jsonl`
- Try opening the file in a text editor to verify format

**Arrow won't expand**
- Refresh the page and try again
- Make sure you're clicking the arrow, not the text

**Export not working**
- Check your browser's download settings
- Ensure pop-ups are not blocked

---

## 🤝 Need Help?

- Report issues on GitHub
- Check the README for more details
- Contact: lixil_ii_lixil@proton.me

---

**Enjoy exploring your JSON data! 🎉**
