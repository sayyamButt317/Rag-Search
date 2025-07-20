import { Queue } from "bullmq";


const queue = new Queue("file-upload-queue", {
  connection: {
    host: "localhost",
    port: "6379",
  },
});

export async function UploadPDF(req,res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    await queue.add("file-ready", {
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
    });

    return res.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
