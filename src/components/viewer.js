export function renderViewer(content) {
  const viewer = document.getElementById("viewer");
  viewer.innerHTML = "<pre>" + content + "</pre>";
}
