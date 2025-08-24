import BullQueue from "../../../Config/BullQueue.js";


export async function UploadPDF(req,res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    await BullQueue.add("file-ready", {
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
      isFolder: false,
    });

    return res.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
