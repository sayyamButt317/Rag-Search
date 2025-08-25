"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Doc {
  pageContent?: string;
  folderName?: string;
  fileName?: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}

type IMessage = {
  role: "assistant" | "user";
  content?: string;
  documents?: Doc[];
};

export default function ChatComponent() {
  const [message, setMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const handlechatmessage = async () => {
    if (!message.trim()) return;
    setMessage("");
    setMessageHistory((prev) => [...prev, { role: "user", content: message }]);
    setIsThinking(true);
    try {
      const res = await fetch(
        `http://localhost:8000/chat?message=${encodeURIComponent(message)}`
      );

      const data = await res.json();
      setMessageHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          documents: data.docs,
          
        },
        
      ]);
      setIsThinking(false);
    } catch (error) {
      console.error("Error:", error);
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      {/* Message History Display */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messageHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-semibold">
                AI
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-slate-900"
              }`}
            >
              {msg.content}
              {msg.documents && msg.documents.length > 0 && (
                <div className="mt-1 text-sm text-slate-500">
                  <p className="text-sm font-semibold bg-emerald-500 text-white px-2 py-1 rounded-md w-fit">Source:</p>
                  <ul className="list-disc pl-5">
                    <li>{msg.documents[0].metadata?.source || "Unknown"}</li>
                    
                    <li><span>Page Number: </span>{msg.documents[0].metadata?.loc?.pageNumber || "Unknown"}</li>
                  </ul>
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                You
              </div>
            )}
          </div>
        ))}
        {isThinking && (
          <div className="mb-4 flex justify-start">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-semibold">
              AI
            </div>
            <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-100 text-slate-900 shadow-sm">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your Query"
          onKeyUp={(e) => e.key === "Enter" && handlechatmessage()}
        />
        <Button onClick={handlechatmessage} disabled={!message.trim()}>
          Search
        </Button>
      </div>
    </div>
  );
}
