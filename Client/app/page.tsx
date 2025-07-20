'use client'
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import ChatComponent from '@/components/chat';
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 as Loader2Icon } from "lucide-react";

export default function Home() {
  const [loading, setloading] = useState(false);

  const uploadfile = () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf')
    el.addEventListener('change', async (ev) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0)
        if (file) {
          const formData = new FormData();
          formData.append('pdf', file);

          try {
            setloading(true)
            const response = await fetch("http://localhost:8000/upload/pdf", {
              method: 'POST',
              body: formData
            });
            if (!response.ok) {
              throw new Error("❌ Upload failed");
            }

            toast.success(" File uploaded successfully!");

          } catch (err) {
            toast.error("❌ Upload failed!");
            console.error(err);
          } finally {
            setloading(false);
          }
        }
      }
    });
    el.click();
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ContextMenu>
        <ContextMenuTrigger
          onClick={uploadfile}
          className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm cursor-pointer">
          {loading ? <Loader2Icon className="animate-spin color-blue" /> : "Upload"}
        </ContextMenuTrigger>
      </ContextMenu>
      <ChatComponent />
    </div>
  );
}
