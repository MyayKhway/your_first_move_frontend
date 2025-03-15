import { Check } from "lucide-react";

export default function KeyFeatures() {
  // In a real app, these would come from props or a data source
  const features = [
    {
      title: "Smart Infotainment System",
      description:
        "A 9-inch touchscreen with Apple CarPlay & Android Auto for seamless connectivity, navigation, and entertainment.",
    },
    {
      title: "Advanced Safety Suite",
      description:
        "Equipped with automatic emergency braking, lane departure warning, and a rearview camera for enhanced driver confidence.",
    },
    {
      title: "Fuel Efficiency & Performance",
      description:
        "The DUALJET engine and CVT transmission maximize fuel economy while ensuring smooth acceleration.",
    },
    {
      title: "Premium Interior Comfort",
      description:
        "Ergonomically designed seats, automatic climate control, and a spacious cabin crafted for comfort and convenience.",
    },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Key Features</h2>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-3">
            <Check className="text-[#1652aa] mt-1 flex-shrink-0" size={18} />
            <p className="text-[#484848]">
              <span className="font-medium">{feature.title}</span> –{" "}
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
