import { useState, useEffect, useRef } from "react"
import { Sparkles } from "lucide-react"

interface AIReasonDisplayProps {
  text: string
  typingSpeed?: number
  label?: string
  title?: string
}

export default function AIReasonDisplay({
  text,
  typingSpeed = 5,
  label = "generated by your-first-move-AI",
  title = "Why we picked those cars",
}: AIReasonDisplayProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentIndex = 0
    setDisplayedText("")
    setIsTyping(true)

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text.charAt(currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [text, typingSpeed])

  return (
    <div className="w-full rounded-lg bg-blue-50 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-blue-800">{title}</h2>
        <div className="flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
          <Sparkles className="mr-1 h-4 w-4" />
          <span>{label}</span>
        </div>
      </div>

      <div ref={textRef} className="relative text-gray-700">
        {displayedText}
        {isTyping && <span className="ml-0.5 inline-block h-5 w-0.5 animate-blink bg-blue-500"></span>}
      </div>
    </div>
  )
}

