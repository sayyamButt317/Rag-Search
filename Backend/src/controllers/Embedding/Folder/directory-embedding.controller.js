import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from "../../../Config/embedding.config.js";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { JSONLinesLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import client from "../../../Config/ai.config.js";
import AI_PROMPT from "../../../Utils/Prompt.js";

export default async function DirectoryEmbedding(req, res) {
  try {
    const folderPath = req.query.folderPath;
    const userQuery = req.query.userQuery;

    if (!folderPath) {
      return res.status(400).json({ error: "❌ Folder path is required" });
    }
    if (!userQuery) {
      return res.status(400).json({ error: "❌ userQuery is required" });
    }

    console.log("🔍 Connecting to Qdrant collection: pdf-docs");

    // 1️⃣ Load docs from directory
    const loader = new DirectoryLoader(folderPath, {
      ".pdf": (path) => new PDFLoader(path, { parsedItemSeparator: "" }),
      ".json": (path) => new JSONLoader(path, "/texts"),
      ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
      ".txt": (path) => new TextLoader(path),
      ".csv": (path) => new CSVLoader(path, "text"),
    });
    const docs = await loader.load();
    console.log(`📄 Loaded ${docs.length} docs from: ${folderPath}`);

    // 2️⃣ Split documents
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);
    console.log(`✂️ Split into ${splitDocs.length} chunks`);

    // 3️⃣ Store in Qdrant
    const vectorStore = await QdrantVectorStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: "pdf-docs",
      }
    );

    // 4️⃣ Query relevant docs
    const retriever = vectorStore.asRetriever({ k: 2 });
    const result = await retriever.invoke(userQuery);
    console.log("✅ Retrieved docs for query");

    // 5️⃣ Call GPT with context
    const SYSTEM_PROMPT = AI_PROMPT + JSON.stringify(result);
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
  } catch (err) {
    console.error("❌ Error in DirectoryEmbedding:", err);
    return res.status(500).json({ error: err.message });
  }
}
