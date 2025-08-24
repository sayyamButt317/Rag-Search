import path from "path";
import fs from "fs/promises";                         
import loadFile from "./loadfile.service.js";

export default async function loadFolder(folderPath) {
  const allDocs = [];
  const files = await fs.readdir(folderPath);

  for (const filename of files) {
    const fullPath = path.join(folderPath, filename);
    const stats = await fs.stat(fullPath);                       
    console.log("📄 Processing file:", fullPath);

    if (stats.isFile()) {
      const fileDocs = await loadFile(fullPath);
      allDocs.push(...fileDocs);
    }
  }

  return allDocs;
}
