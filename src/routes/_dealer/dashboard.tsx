import { createFileRoute } from '@tanstack/react-router'
import CarsList from '@/components/dealer_interface/allCars'


export const Route = createFileRoute('/_dealer/dashboard')({
  loader: async () => {
    const storedUser = localStorage.getItem("user")
    const { id } = storedUser ? JSON.parse(storedUser).id : null
    if (!id)
      return []
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/car/all?` + new URLSearchParams({
        id
      }), {
        method: "GET",
        credentials: "include",
      })
      const resObj = response.json()
      return (resObj)

    } catch (err) {
      throw Error(`Error fetching for this route. ${err}`)
    }
  },
  component: CarsList,
})
