# JSON Parser & Navigator
### A modern, browser-based JSON/JSONL parser with interactive tree navigation

**JSON Parser & Navigator** is a fully client-side web application for viewing, exploring, and exporting JSON and JSONL files. Everything runs in your browser — no servers, no uploads, complete privacy.

> **Data stays 100% on your device.**  
> The parser never transmits, uploads, or stores your files.

---

## ✨ Features

### 📂 **File Support**
- Load **JSON** files (standard JSON format)
- Load **JSONL** files (JSON Lines / newline-delimited JSON)
- Automatic format detection
- Drag & drop file loading
- File browser selection

### 🔍 **Interactive Navigation**
- **Expandable tree view** - Click arrows to expand/collapse nested objects and arrays
- **Syntax highlighting** - Color-coded keys, values, strings, numbers, booleans, and nulls
- **Smart formatting** - Clean, readable JSON structure
- **Deep nesting support** - Navigate through complex nested structures
- **Item count display** - See the number of items in collapsed objects/arrays

### 📊 **Data Insights**
- **Format detection** - Automatically identifies JSON vs JSONL
- **Type information** - Shows if data is an object, array, string, etc.
- **Item counting** - Displays total number of items in collections
- **Real-time stats** - View file metadata at a glance

### 💾 **Export Options**
- **Export as JSON** - Download data in formatted JSON
- **Export as JSONL** - Download data in JSON Lines format
- **Preserves structure** - Maintains data integrity during export

---

## 🚀 Quick Start

### Using GitHub Pages (Easiest)

Visit the live application:
```
https://luminaryomega.github.io/C-parse/
```

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/LuminaryOmega/C-parse.git
cd C-parse
```

2. Serve the files with any static file server:
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

3. Open your browser to `http://localhost:8080`

---

## 📖 Usage

1. **Load a file**
   - Click the "📁 Load File" button or the "Choose File" button in the sidebar
   - Select a `.json` or `.jsonl` file from your computer
   - Or drag and drop a file onto the sidebar

2. **Navigate the data**
   - Click the `▶` arrow to expand an object or array
   - Click the `▼` arrow to collapse it
   - Explore nested structures by expanding inner objects/arrays

3. **Export data**
   - Click "💾 Export JSON" to download as formatted JSON
   - Click "💾 Export JSONL" to download as JSON Lines

4. **Clear data**
   - Click "🗑️ Clear" to remove all loaded data

---

## 🛰 Architecture

The parser is built as a fully static, client-side application:

- **Pure JavaScript** (ES6 modules)
- **No frameworks** - Vanilla JS for maximum performance and simplicity
- **No build step** - Runs directly in the browser
- **No dependencies** - Zero external libraries
- **Fully portable** - Works anywhere with a modern browser

### Browser Compatibility

✅ Chrome / Edge (Chromium)  
✅ Firefox  
✅ Safari  
✅ Mobile browsers (iOS Safari, Chrome Mobile)

Requires a browser with ES6 module support (all modern browsers).

---

## 📁 File Formats

### JSON Format
Standard JSON format with a single root object or array:
```json
{
  "name": "Alice",
  "age": 30,
  "hobbies": ["reading", "coding"]
}
```

### JSONL Format
Newline-delimited JSON (JSON Lines), one object per line:
```jsonl
{"name": "Alice", "age": 30}
{"name": "Bob", "age": 25}
{"name": "Charlie", "age": 35}
```

---

## 🎨 Features Showcase

- **Dark theme** - Easy on the eyes with a modern color scheme
- **Color-coded syntax** - Pink for keys, gold for strings, cyan for numbers
- **Smooth interactions** - Responsive expand/collapse animations
- **Clean typography** - Monospace font for code readability
- **Mobile-friendly** - Works great on phones and tablets

---

## 🔒 Privacy & Security

- ✅ **100% client-side** - All processing happens in your browser
- ✅ **No tracking** - No analytics, no cookies, no telemetry
- ✅ **No uploads** - Files never leave your device
- ✅ **No servers** - Direct file parsing in JavaScript
- ✅ **Open source** - Full transparency, audit the code yourself

---

## 📄 License

This project is licensed under the **PolyForm Noncommercial License 1.0.0**.  

✅ Free for personal and noncommercial use  
✅ Free for research and educational use  
❌ Not permitted for commercial use without written permission  
❌ Not permitted for integration into commercial products  

To inquire about a commercial license, contact:  
**CORE:** lixil_ii_lixil@proton.me

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs via GitHub Issues
- Suggest new features
- Submit pull requests

---

## 🙏 Acknowledgments

Built with ❤️ for developers, data analysts, and anyone who works with JSON data.

---

**Enjoy exploring your JSON data! 🚀**
