// Extracts readable text from HTML
export function parseHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText;
}
