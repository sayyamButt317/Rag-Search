import { Worker } from "bullmq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import embeddings from "./src/Config/embedding.config.js";
import loadFile from "./src/services/loadfile.service.js";
import loadFolder from "./src/services/loadfolder.service.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    try {
      console.log(`🚀 Processing job: ${job.id}`);
      const { folderName, folderPath, path, isFolder } = job.data;
      console.log("job.data", job.data);

      let docs = [];
      if (isFolder) {
        console.log(`📄 Folder name: ${folderName}`);
        docs = await loadFolder(folderPath, folderName);
      } else {
        console.log(`📄 File path: ${path}`);
        docs = await loadFile(path);
      }

      console.log(`📄 Loaded ${docs.length} pages`);

      // Check if collection exists
      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          vectors: {
            size: 768,
            distance: "Cosine",
          },
          optimizers_config: {
            default_segment_number: 16,
            max_segment_size: 5000000,
          },
        },
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
