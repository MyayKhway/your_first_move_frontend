import CarDetails from '@/components/cars/carDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cars/$carId')({
  loader: async ({ params }) => {
    try {
      const baseUrl = import.meta.env.BITE_API_BASE_URL || "http://localhost:3000"
      const res = await fetch(`${baseUrl}/car/${params.carId}`, {
        method: "GET",
        credentials: "include"
      })
      const res2 = await fetch(`${baseUrl}/dealer/bycar/${params.carId}`, {
        method: "GET",
        credentials: "include"
      })
      const dealerData = await res2.json()
      const data = await res.json()
      return { dealer: dealerData, CarDetails: data }
    } catch (err) {
      throw Error(`Error in fetching data for route ${err}`)
    }
  },
  component: CarDetails,
})
