import { useRouterState } from "@tanstack/react-router"
import { AIGeneratedTag } from "../aiGeneratedTag"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

export default function DescriptionSection() {
  const route = useRouterState()
  const url = route.location.pathname.split("/")
  const carId = url[url.length - 1]

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["description"],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
      const descRes = await fetch(`${baseUrl}/openai/desc/${carId}`, {
        method: "GET",
        credentials: "include",
      })
      const data = await descRes.json()
      return data
    },
  })

  return (
    <div className="mb-10">
      <div className="flex items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Details</h2>
        <AIGeneratedTag />
      </div>

      {isLoading && (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12 mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12 mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-9/12 mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-10/12 mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-8/12"></div>
          <div className="mt-4 flex items-center justify-center text-blue-600">
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            <span className="text-sm">Generating description...</span>
          </div>
        </div>
      )}

      {isError && (
        <div className="text-red-500 p-4 rounded-md bg-red-50 border border-red-200">
          <p>Sorry, we couldn't load the description. Please try again later. {error as string}</p>
        </div>
      )}

      {!isLoading && !isError && data && <p className="text-[#484848] leading-relaxed">{data}</p>}
    </div>
  )
}


