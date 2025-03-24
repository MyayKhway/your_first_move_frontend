import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import CarTypeSelector from "@/components/user_interface/carTypeSelector"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      <div className="w-full bg-gradient-to-b from-purple-800 via-purple-700 to-teal-400 pb-16 relative">
        <div className="container mx-auto px-4 pt-16 pb-32 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Let&apos;s find your perfect car</h1>

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
                    placeholder="Describe what you're looking for"
                    className="bg-gray-200 w-full py-3 px-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleSearch(e)
                      }
                    }}
                  />
                </div>
              </motion.form>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Wave shape */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              className="fill-white"
            />
          </svg>
        </div>
      </div>

      {/* Car type selector section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-center mb-10">Search By Type</h2>
        <CarTypeSelector />
      </div>
    </main>
  )
}
