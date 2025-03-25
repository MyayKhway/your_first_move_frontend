import CarDetails from '@/components/cars/carDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cars/$carId')({
  loader: async ({ params }) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
      const res = await fetch(`${baseUrl}/car/${params.carId}`, {
        method: "GET",
        credentials: "include"
      })
      const res2 = await fetch(`${baseUrl}/dealer/bycar/${params.carId}`, {
        method: "GET",
        credentials: "include"
      })
      const reviewRes = await fetch(`${baseUrl}/car/reviews/${params.carId}`, {
        method: "GET",
        credentials: "include"
      })
      if (!res.ok || !res2.ok || !reviewRes.ok) {
        throw Error(`Error fetching data for route.`)
      }
      const dealerData = await res2.json()
      const data = await res.json()
      const reviews = await reviewRes.json()
      return { dealer: dealerData, CarDetails: data, reviews }
    } catch (err) {
      throw Error(`Error in fetching data for route ${err}`)
    }
  },
  component: CarDetails,
})
