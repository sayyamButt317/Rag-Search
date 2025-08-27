import fs from "fs/promises";
import path from "path";
import loadFile from "./loadfile.service.js";

export default async function loadFolder(folderPath) {
  console.log("📄 Start Processing folder:");
  const allDocs = [];
  console.log("📄 Processing folder:", folderPath);
  // Read directory recursively and gather relative file paths
  const files = await fs.readdir(folderPath, { recursive: true });
  console.log("📄 Files in folder:", files);

  for (const filename of files) {
    const fullPath = path.join(folderPath, filename);
    const stats = await fs.stat(fullPath);
    if (stats.isFile()) {
      console.log("📄 Processing file:", fullPath);
      const fileDocs = await loadFile(fullPath);
      allDocs.push(...fileDocs);
    }
  }
  return allDocs;
}
