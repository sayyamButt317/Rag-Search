import { Worker } from "bullmq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import embeddings from "./src/Config/embedding.config.js";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { JSONLinesLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import loadFile from "./src/services/loadfile.service.js";
import loadFolder from "./src/services/loadfolder.service.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    try {
      console.log(`🚀 Processing job: ${job.id}`);
      const { folderPath, path, isFolder,fileName } = job.data;
      let docs = [];
      if (isFolder) {
          docs = await loadFolder(folderPath);
      } else {
        console.log(`📄 Loading single file: ${path}`);
        docs = await loadFile(path);
      }
      // Check if collection exists
      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          url: process.env.QDRANT_URL,
          apiKey: process.env.QDRANT_API_KEY,
          collectionName: "pdf-docs",
        }
      );

      const textSplitter = new CharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      const splitDocs = await textSplitter.splitDocuments(docs);
      console.log(`✂️ Split into ${splitDocs.length} chunks`);

      await vectorStore.addDocuments(splitDocs);
      console.log(`✅ Vectorization complete`);
    } catch (error) {
      console.error(`❌ Job ${job.id} failed:`, error);
      throw error;
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    },
  }
);
