import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from "../services/embedding.service.js";
import client from "../services/ai.service.js";

export default async function CreateVectorEmbedding(req, res) {
  const userQuery = req.query.message;

  if (!userQuery) {
    return res.status(400).json({ error: "Query message is required" });
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
  const SYSTEM_PROMPT = `You are a knowledgeable and helpful AI assistant designed to answer user questions using only the information extracted from a PDF document. Your task is to provide clear, accurate, and concise answers strictly based on the provided context. Do not use any external knowledge or assumptions beyond the given context. If the answer is not explicitly stated in the context, reply with "The information is not available in the document."

Context from the PDF:
 ${JSON.stringify(result)};
 `;

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
