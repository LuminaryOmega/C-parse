import { readFileAsText } from "../utils/fileHelpers.js";

export async function handleFileLoad(file, callback) {
  const text = await readFileAsText(file);
  callback(text, file.name);
}
