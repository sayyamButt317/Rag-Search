import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from "../services/embedding.service.js";
import client from "../services/ai.service.js";
import AI_PROMPT from "../Utils/Prompt.js";

export default async function PDFFolderEmbedding(req, res) {
  const folderPath = req.query.folderPath;
  if (!folderPath) {
    return res.status(400).json({ error: "Folder path is required" });
  }
  console.log("🔍 Searching in Qdrant collection: pdf-docs");
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
      collectionName: "pdf-docs",
    }
  );
  const ret = vectorStore.asRetriever({ k: 2 });
  const result = await ret.invoke(userQuery);
  const SYSTEM_PROMPT = AI_PROMPT + JSON.stringify(result);
  const loader = new DirectoryLoader(folderPath, {
    ".pdf": (path) => new PDFLoader(path, { parsedItemSeparator: "" }),
  });
  const docs = await loader.load();
  console.log(`📄 Loaded ${docs.length} pages from: ${folderPath}`);
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await textSplitter.splitDocuments(docs);
  console.log(splitDocs[0]);
  
  const chatResult = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userQuery },
    ],
  });
  return res.json({
    message: chatResult.choices[0].message.content,
    docs: result,
  });
}
