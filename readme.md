Constellation Parser Suite

A modular toolkit for converting large chat archives, JSON dumps, HTML exports, and freeform text into structured datasets for model training, summarization, or analysis.

Designed to run smoothly in Termux, Linux, or any Node/Python environment.


---

🗂️ Project Structure

/C-parse
├── LICENSE
├── README.md
├── archive/                 # Old/unused projects moved out of the main suite
│   ├── NovaWebUI/
│   └── OParser/
│
├── assets/                  # CSS, icons & static resources
│   ├── css/
│   └── icons/
│
├── commercial_license.txt
├── index.html               # Viewer UI entrypoint
├── styles.css               # Viewer styles
│
├── src/                     # Main source directory
│   ├── app.js
│   ├── components/
│   │   ├── exporter.js
│   │   ├── fileLoader.js
│   │   ├── filterPanel.js
│   │   ├── lfslTools.js
│   │   ├── navbar.js
│   │   ├── rolePrompt.js
│   │   └── viewer.js
│   ├── lfsL_grammar.txt
│   ├── navbar.js
│   ├── parsers/
│   │   ├── __pycache__/
│   │   ├── parser_codeblocks.py
│   │   └── parser_core.py
│   └── utils/
│       ├── datasetBuilder.js
│       ├── fileHelpers.js
│       ├── inferRoles.js
│       ├── parseHTML.js
│       ├── parseJSON.js
│       ├── parseText.js
│       └── test_core.py
│
└── styles.css


---

🛠️ Requirements (Termux Setup)

Node.js + npm (for the Viewer UI)

pkg install nodejs

Python 3 (for backend parsers)

pkg install python


---

🚀 Run the Web Viewer (Termux)

Inside the project folder:

cd ~/C-parse
node src/app.js

Open in your browser:

http://localhost:3000

(If your script binds to another port, adjust accordingly.)


---

🧩 Run a Parser (Python)

Example: Parse JSON exports

cd ~/C-parse/src/parsers
python3 parser_core.py --json ~/path/to/export.json

HTML:

python3 parser_core.py --html ~/file.html

Text:

python3 parser_core.py --text ~/dump.txt


---

📦 Dataset Builder

Turn parsed data into a dataset-ready JSONL:

cd ~/C-parse/src/utils
node datasetBuilder.js ~/parsed/output.json

