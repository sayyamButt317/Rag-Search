import express from "express";
import CreateVectorEmbedding from "../controllers/ai.controller.js";
import { TextToSpeech } from "../controllers/tts.controller.js";
import {UploadPDF} from "../controllers/upload-file.controller.js";
import { upload } from "../Config/multer.config.js";

const router = express.Router();

router.post("/upload/pdf", upload.single("pdf"), UploadPDF);
router.get("/chat", CreateVectorEmbedding);
router.post("/text", TextToSpeech);

export default router;
