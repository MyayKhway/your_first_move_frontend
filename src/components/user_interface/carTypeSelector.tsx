import { Zap, Truck, Car, Leaf } from "lucide-react"
import { Link } from "@tanstack/react-router"

const carTypes = [
  {
    name: "EV",
    icon: <Zap className="h-6 w-6" />,
    href: "cars/category/ev",
  },
  {
    name: "SUV",
    icon: <Car className="h-6 w-6" />,
    href: "cars/search/suv",
  },
  {
    name: "Truck",
    icon: <Truck className="h-6 w-6" />,
    href: "cars/search/truck",
  },
  {
    name: "Sedan",
    icon: <Car className="h-6 w-6" />,
    href: "cars/search/sedan",
  },
  {
    name: "Hybrid",
    icon: <Leaf className="h-6 w-6" />,
    href: "cars/search/hybrid",
  },
]

export default function CarTypeSelector() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
      {carTypes.map((type) => (
        <Link
          key={type.name}
          to={type.href}
          className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3">{type.icon}</div>
          <span className="font-medium">{type.name}</span>
        </Link>
      ))}
    </div>
  )
}

