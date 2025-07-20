import { QdrantVectorStore } from '@langchain/qdrant';
import { OpenAIEmbeddings } from '@langchain/openai';
import client from '../services/ai.service.js';

export default async function CreateVectorEmbedding(){
      const userQuery = req.query.message;
  const embeddings = new OpenAIEmbeddings({
    modelName: 'text-embedding-3-small',
    apiKey: process.env.OPENAI_API_KEY,
  });
  const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: 'http://localhost:6333',
    collectionName: 'pdf-docs',
  })
  const ret = vectorStore.asRetriever({
    k: 2,
  });
  const result = await ret.invoke(userQuery)
  const SYSTEM_PROMPT = `You are helpful AI Assistant who answers the user Query based on the available context from PDF File.
 Context:
 ${JSON.stringify(result)};
 `;

  const chatResult = await client.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userQuery },
    ],
  })
  return res.json({
    message: chatResult.choices[0].message.content,
    docs: result
  });
}