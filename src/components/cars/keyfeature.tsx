import { Check } from "lucide-react";

interface KeyFeaturesPropsType {
  features: string[]
}

export default function KeyFeatures({ features }: KeyFeaturesPropsType) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Key Features</h2>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-3">
            <Check className="text-[#1652aa] mt-1 flex-shrink-0" size={18} />
            <p className="text-[#484848]">
              <span className="font-medium">{feature}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
