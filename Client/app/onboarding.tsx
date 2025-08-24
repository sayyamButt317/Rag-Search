"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Footer from "./component/footer";
import Header from "./component/header";
import Pricing from "./component/pricing";
import Works from "./component/work";
import Feature from "./component/feature";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_300px_at_50%_-50%,rgba(59,130,246,0.25),transparent)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl py-20 md:py-28 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Sparkles className="h-3.5 w-3.5" /> Enterprise-grade AI Based RAG
              for your company knowledge
            </p>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
              Find answers across your internal docs in seconds
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Oblio turns (pdf.docx.epub.txt.csv) and knowledge bases into a
              secure, searchable assistant. Upload files and chat to get
              precise, cited answers instantly.
            </p>
            <Button
              className="mt-8 flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              size="lg"
              variant="outline"
              asChild
            >
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                href="/chat"
              >
                <Sparkles className="h-3.5 w-3.5" /> Try the live demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <Feature />

      {/* How it works */}
      <Works />
      {/* Pricing */}
      <Pricing />
      {/* Footer */}
      <Footer />
    </main>
  );
}
