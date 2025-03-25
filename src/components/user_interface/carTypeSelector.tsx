import { Zap, Truck, Car, Leaf } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"

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
          className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all min-w-[160px]"
        >
          <motion.div
              className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full mb-3"
              whileHover={{ scale: 1.1, backgroundColor: "#e0f2fe" }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
            {type.icon}
          </motion.div>
          <span className="font-medium">{type.name}</span>
        </Link>
      ))}
    </div>
  </div>
  )
}

