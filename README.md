# 🌌 Constellation Parser Suite

A modular toolkit for transforming unstructured conversation logs into clean, AI-ready datasets.  
This suite supports JSON parsing, HTML extraction, text cleanup, dataset building, and optional Web UI filtering/export.

---

## 📁 Folder Structure

C-parse/
 ├── README.md
 ├── LICENSE
 ├── commercial_license.txt
 ├── NovaWebUI/                # Optional front-end interface
 ├── OParser/                  # Older/alternate parser module
 ├── src/                      # Active utilities & components
 │    ├── utils/
 │    │    ├── parseJSON.js
 │    │    ├── parseHTML.js
 │    │    ├── parseText.js
 │    │    ├── datasetBuilder.js
 │    │    ├── fileHelpers.js
 │    ├── components/
 │    │    ├── navbar.js
 │    │    ├── viewer.js
 │    │    ├── exporter.js
 │    │    ├── fileLoader.js
 │    ├── index.html
 │    ├── styles.css
 ├── app.js
 ├── viewer.js
 ├── index.html

---

## 🚀 Core Purpose

The suite converts:
- `conversations.json`
- ChatGPT exports
- HTML chat logs
- raw text dumps

…into clean, consistent datasets suitable for:
- LoRA fine-tuning  
- persona training  
- embedding databases  
- long-term memory systems  
- dataset archival  

---

## 🧩 Main Tools

### JSON Parsing
```javascript
import { parseJSON } from './src/utils/parseJSON.js';
