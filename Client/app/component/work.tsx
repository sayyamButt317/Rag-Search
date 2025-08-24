import Step from "./steps";

export default function Works(){
    return(
        <>
             <section id="how" className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            How it works
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Step
              index={1}
              title="Upload"
              description="Import PDFs or connect your knowledge sources."
            />
            <Step
              index={2}
              title="Index"
              description="We chunk, embed, and store securely for fast retrieval."
            />
            <Step
              index={3}
              title="Ask"
              description="Chat to get precise answers with citations and context."
            />
          </div>
        </div>
      </section>
        </>
    )
}