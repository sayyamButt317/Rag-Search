"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface Doc {
  pageContent?: string;
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

  const handlechatmessage = async () => {
    if (!message.trim()) return;
    setMessage("");
    // Add user message to history
    setMessageHistory((prev) => [...prev, { role: "user", content: message }]);
    try {
      const res = await fetch(
        `http://localhost:8000/chat?message=${encodeURIComponent(message)}`
      );
      const data = await res.json();
      // Add assistant response to history
      setMessageHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          documents: data.docs,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      {/* Message History Display */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messageHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.role === "user" ? `bg-blue-500 text-white `  : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your Query"
          onKeyUp={(e) => e.key === "Enter" && handlechatmessage()}
        />
        <Button onClick={handlechatmessage} disabled={!message.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
}
