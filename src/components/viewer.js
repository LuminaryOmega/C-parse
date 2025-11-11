function viewerInit() {
  const viewer = document.getElementById("viewer");
  viewer.textContent = "Load a file to begin.";
}

function displayContent(text) {
  const viewer = document.getElementById("viewer");
  viewer.textContent = text;
}
