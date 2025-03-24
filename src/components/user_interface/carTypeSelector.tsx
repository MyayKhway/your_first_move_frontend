import { Zap, Truck, Car, Leaf } from "lucide-react"
import { Link } from "@tanstack/react-router"

const carTypes = [
  {
    name: "EV",
    icon: <Zap className="h-6 w-6" />,
    href: "cars/search/ev",
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
    <div className="w-full overflow-x-auto">
    <div className="flex space-x-4 px-4 py-2  flex items-center justify-evenly">
      {carTypes.map((type) => (
        <Link
          key={type.name}
          to={type.href}
          className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all min-w-[140px]"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3">
            {type.icon}
          </div>
          <span className="font-medium">{type.name}</span>
        </Link>
      ))}
    </div>
  </div>
  )
}

