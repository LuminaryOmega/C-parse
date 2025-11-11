function fileLoaderInit() {
  const btn = document.getElementById("load-btn");
  const input = document.getElementById("file-input");

  btn.addEventListener("click", () => input.click());

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      displayContent(reader.result);
    };

    reader.readAsText(file);
  });
}
