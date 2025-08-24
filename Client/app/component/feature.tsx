import { Search, Shield, Layers, Gauge, Sparkles, Rocket } from "lucide-react";
import FeatureCard from "./featurecard";

export default function Feature() {
  return (
    <>
      <section
        id="features"
        className="border-t border-slate-100 bg-slate-50/50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Search className="h-6 w-6" />}
              title="Lightning-fast semantic search"
              description="Search by meaning, not keywords. Find the right page and paragraph in milliseconds."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Private by default"
              description="Your data stays in your VPC. No training on your content, ever."
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6" />}
              title="Plug-and-play ingestion"
              description="Drop in PDFs today; connect wikis and drives next. Automatic chunking, embeddings, and citations."
            />
            <FeatureCard
              icon={<Gauge className="h-6 w-6" />}
              title="Accurate, cited answers"
              description="Every answer links to sources. Tuned for low hallucination rates and high precision."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Natural chat interface"
              description="Ask complex questions, refine follow-ups, and share threads with your team."
            />
            <FeatureCard
              icon={<Rocket className="h-6 w-6" />}
              title="Deploy in minutes"
              description="Docker-first backend and a modern Next.js client. Get to value fast."
            />
          </div>
        </div>
      </section>
    </>
  );
}
