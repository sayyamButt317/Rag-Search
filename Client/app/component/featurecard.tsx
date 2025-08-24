import FeatureCardProps from "@/Types/featurecard.type";

  export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-slate-600 text-sm">{description}</p>
      </div>
    )
  }