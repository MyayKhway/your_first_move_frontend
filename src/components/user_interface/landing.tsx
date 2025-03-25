import type React from "react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Search } from "lucide-react"
import CarTypeSelector from "@/components/user_interface/carTypeSelector"
import { toast } from "sonner"
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import LoadingSpinner from "../loadingSpinner"
import KeyFeatures from "../cars/keyfeature"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedCar, setSelectedCar] = useState(0)
  const ref = useRef(null)
  const mainControl = useAnimation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const routeApi = getRouteApi('/')
  const { featuredCars } = routeApi.useLoaderData()

  const TypewriterEffect = ({ text, delay = 70 }) => {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)

    useEffect(() => {
      let timeout

      if (isWaiting) {
        timeout = setTimeout(() => {
          setIsWaiting(false)
          setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(timeout)
      }

      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % text.length)
          return
        }

        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
        }, delay / 2)
        return () => clearTimeout(timeout)
      }

      if (displayText === text[currentIndex]) {
        setIsWaiting(true)
        return
      }

      timeout = setTimeout(() => {
        setDisplayText(text[currentIndex].slice(0, displayText.length + 1))
      }, delay)

      return () => clearTimeout(timeout)
    }, [displayText, currentIndex, delay, isDeleting, isWaiting, text])

    return displayText
  }

  const searchTexts = [
    "Tesla Model 3 in red...",
    "SUV with low mileage...",
    "Family car under $30,000...",
    "Hybrid with good fuel economy...",
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)



    if (!searchQuery.trim()) return
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/ai-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        searchQuery
      }),
      credentials: "include"
    })
    if (!response.ok) {
      toast.error('Error querying your-first-move AI')
      navigate({
        to: '/',
        replace: true,
      })
    } else {
      const { reason, carRecommendations } = await response.json()
      setIsAnimating(true)
      navigate({
        to: '/cars/ai-recommendations',
        replace: true,
        state: {
          reason: reason,
          carRecommendations: carRecommendations
        }
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Gradient background with wave */}
      <div className="w-full bg-gradient-to-b from-grey-800 via-blue-600 to-blue-800 pb-16 relative">
        <div className="container mx-auto px-4 pt-16 pb-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-10 mb-10">Let's find your perfect car</h1>

          <AnimatePresence>
            {!isAnimating ? (
              <motion.form
                onSubmit={handleSearch}
                initial={{ y: 0, scale: 1, opacity: 1 }}
                exit={{
                  y: -100,
                  scale: 0.5,
                  opacity: 0,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
                className="max-w-2xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={TypewriterEffect({ text: searchTexts })}
                    className="bg-white w-full py-3 pl-12 pr-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleSearch(e)
                      }
                    }}

                  />
                  {loading && <LoadingSpinner />}
                </div>
              </motion.form>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white -mb-1" style={{ borderRadius: "100% 100% 0 0" }}></div>
      </div>

      {/* Car type selector section */}
      <div className="container mx-auto px-4 py-12 mb-20 -mt-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10">Search By Type</h2>
          <CarTypeSelector />
        </motion.div>
      </div>


      {/* Featured Cars Section */}
      <div ref={ref} className="container margin-top: 100px mx-auto px-4 py-8 -mt-8">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Cars</h2>
        <motion.div
          initial="invisible"
          animate={mainControl}
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 }
          }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl overflow-hidden shadow-lg mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="p-8">
                {/* for make and model */}
                <div className="text-sm text-gray-500 mb-2">YFM SELECT</div>
                <h2 className="text-3xl font-bold mb-4">{featuredCars[selectedCar].make} {featuredCars[selectedCar].model}</h2>
                {/* for features */}
                <KeyFeatures features={featuredCars[selectedCar].features} />
              </div>
              <div className="relative h-64 md:h-auto">
                <img
                  src={featuredCars[selectedCar].mainPicUrl || "/placeholder.svg"}
                  alt={featuredCars[selectedCar].name}
                  className="object-contain w-full h-full"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-4 gap-2 p-4 border-t">
            {featuredCars.map((car, index) => (
              <div
                key={car.id}
                className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${selectedCar === index ? 'scale-105 opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                onClick={() => setSelectedCar(index)}
              >
                <div className={`relative h-auto w-24 mb-2 ${selectedCar === index ? 'border-b-2 border-blue-900' : ''}`}>
                  <img
                    src={car.mainPicUrl || "/placeholder.svg"}
                    alt={`${car.make} ${car.model}`}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-xs text-center">{car.make} {car.model}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
