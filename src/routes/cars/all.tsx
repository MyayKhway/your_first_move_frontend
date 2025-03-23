import CarSearchResults from '@/components/user_interface/carSearchResults'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cars/all')({
  loader: async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || `http://localhost:3000`
      const res = await fetch(`${baseUrl}/car/type/all`, {
        method: "GET",
        credentials: "include"
      })
      if (!res.ok) {
        throw new Error(`Error fetching data for route.`)
      }
      const data = await res.json()
      return { carResults: data }
    } catch (err) {
      throw new Error(`Error fetching data for route. ${err}`)
    }
  },
  component: CarSearchResults,
})
