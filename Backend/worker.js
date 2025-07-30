import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import embeddings from "./src/services/embedding.service.js";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    try {
      console.log(`🚀 Processing job: ${job.id}`);
      const { path: filepath } = job.data;
      const loader = new PDFLoader(filepath);
      const docs = await loader.load();
      console.log(`📄 Loaded ${docs.length} pages from: ${filepath}`);

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
      console.log(`✅ Vectorization complete for: ${filepath}`);
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
