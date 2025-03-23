import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FeatureInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export default function FeatureInput({ value = [], onChange, placeholder = "Add a feature..." }: FeatureInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleAddFeature = (e) => {
    e.preventDefault()
    if (inputValue.trim() === "") return

    // Add the new feature to the array if it doesn't already exist
    if (!value.includes(inputValue.trim())) {
      const newFeatures = [...value, inputValue.trim()]
      onChange(newFeatures)
    }

    // Clear the input
    setInputValue("")
  }

  const handleRemoveFeature = (featureToRemove: string) => {
    const newFeatures = value.filter((feature) => feature !== featureToRemove)
    onChange(newFeatures)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddFeature(e)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button variant="default" onClick={(e) => handleAddFeature(e)}>
          Add
        </Button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((feature, index) => (
            <div key={index} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm">
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(feature)}
                className="rounded-full p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Remove ${feature}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

