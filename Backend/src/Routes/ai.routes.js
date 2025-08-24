import express from "express";
import { TextToSpeech } from "../controllers/Voice/tts.controller.js";
import {UploadPDF} from "../controllers/Embedding/File/upload-file.controller.js";
import { uploadfile } from "../Config/multer.config.js";
import VideoGenerator from "../controllers/Video/VideoGenerator.controller.js";
import { folderupload } from "../Config/multer.config.js";
import CreateVectorEmbedding from "../controllers/Embedding/File/vector-embedding.controller.js";
import { UploadFolder } from "../controllers/Embedding/Folder/upload-folder.queue.js";
import DirectoryEmbedding from "../controllers/Embedding/Folder/directory-embedding.controller.js";


const router = express.Router();
// AI Routes
router.post("/upload/pdf", uploadfile.single("pdf"), UploadPDF);
router.post("/upload/folder", folderupload.array("folder", 100), UploadFolder);
router.get("/chat", CreateVectorEmbedding,DirectoryEmbedding);
router.post("/video-prompt", VideoGenerator);
router.post("/text", TextToSpeech);

export default router;
