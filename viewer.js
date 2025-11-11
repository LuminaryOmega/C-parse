let viewer;

export function viewerInit() {
  viewer = document.getElementById("viewer");
  viewer.textContent = "Load a file to begin.";
}

// pretty message blocks
export function displayParsed(parsed) {
  viewer.innerHTML = "";

  parsed.forEach(block => {
    const div = document.createElement("div");
    div.className = "msg-block " + block.role;

    const role = document.createElement("div");
    role.className = "msg-role";
    role.textContent = block.role.toUpperCase();
    div.appendChild(role);

    const content = document.createElement("div");
    content.className = "msg-content";
    content.textContent = block.content;
    div.appendChild(content);

    viewer.appendChild(div);
  });
}

export function displayRaw(text) {
  viewer.textContent = text;
}
