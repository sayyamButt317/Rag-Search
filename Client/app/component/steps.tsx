type StepProps = {
    index: number;
    title: string;
    description: string;
  };
  
  export default function Step({ index, title, description }: StepProps) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
            {index}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="mt-3 text-slate-600 text-sm">{description}</p>
      </div>
    );
  }