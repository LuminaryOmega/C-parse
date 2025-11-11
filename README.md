# Constellation Parser Suite
### A browser-based, privacy-focused toolkit for exploring and exporting AI conversation data.

**Constellation Parser Suite** is a modern, client-side web application for loading, viewing, filtering, and exporting ChatGPT/OpenAI data exports.  
Everything runs inside your browser — no servers, no uploads, and no privacy risks.

Whether you are a casual user trying to navigate your exported history, a developer extracting datasets, or an LFSL researcher working with symbolic-AI language structures, Constellation provides a unified, powerful interface designed for clarity and depth.

> **Data stays 100% on your device.**  
> Constellation never transmits, uploads, or stores your exported files.

---

## ✨ Features

### ✅ **General User Features**
- Upload and load your **ChatGPT/OpenAI data export** (`conversations.json`)
- Browse conversations in a clean, easy interface  
- Search by:
  - keyword  
  - date  
  - conversation title  
  - user/assistant role  
- View images, files, and attachments inline  
- Export selected messages or full threads as:
  - TXT  
  - Markdown  
  - JSON  

---

## 🔧 Developer Mode

Designed for developers, researchers, and dataset builders.

- Export in multiple ML formats:
  - JSONL (OpenAI-style)
  - ChatML
  - Alpaca format
  - Vicuna format
- Deduplicate conversations  
- Extract only:
  - code  
  - Python  
  - JSON  
  - assistant messages  
  - user messages
- Token estimation & word-frequency analysis  
- Conversation-level statistics  
- Thread flattening & role normalization  

---

## 🜁 LFSL Developer Tools (Advanced)

A dedicated module for working with the **Lumae Fractal Sigil Language (LFSL)**:

- Detect LFSL sigils and symbolic blocks  
- LFSL → Human translation (Hybrid Layer)  
- Human → LFSL compiler (AI Layer)  
- Sigil frequency analysis  
- Syntax validator  
- Compression preview  
- AI-optimized token-view (non-human-readable)  

The suite is the **first LFSL-native parsing toolkit**, designed for symbolic AI experimentation.

---

## 🛰 Architecture

Constellation is built as a fully static, browser-based application:

- **SvelteKit** (frontend + client logic)
- **TailwindCSS** (UI styling)
- **TypeScript** (core parser engine)
- **JSZip** (local ZIP export loading)
- **No backend**, no API keys, no cloud dependencies

Runs on:

✅ Windows  
✅ macOS  
✅ Linux  
✅ Android  
✅ iPhone / iPad  
✅ ChromeOS  
✅ Anything with a web browser  

---
LICENSE:

## 📄 License

This project is licensed under the **PolyForm Noncommercial License 1.0.0**.  
This means:

✅ Free for personal and noncommercial use  
✅ Free for research and educational use  
❌ Not permitted for commercial use without written permission  
❌ Not permitted for integration into commercial products  
❌ Not permitted for corporate/enterprise use  

To inquire about a commercial license, contact:  
CORE: lixil_ii_lixil@proton.me**


