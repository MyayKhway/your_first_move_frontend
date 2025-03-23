import { createFileRoute, redirect } from '@tanstack/react-router'
import CarsList from '@/components/dealer_interface/allCars'


export const Route = createFileRoute('/_dealer/dashboard')({
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated()) {
      throw redirect({
        to: '/signin',
        replace: true,
        search: {
          redirect: location.href
        }
      })
    }
    if (!context.isDealer()) {
      throw redirect({
        to: '/',
        replace: true,
        search: {
          redirect: location.href
        }
      })
    }
  },
  preload: true,
  loader: async () => {
    const storedUser = localStorage.getItem("user")
    const user = storedUser ? JSON.parse(storedUser) : null
    const id = user ? user.id : null
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
      if (!response.ok)
        return []
      const cars = response.json()
      return (cars)

    } catch (err) {
      throw Error(`Error fetching for this route. ${err}`)
    }
  },
  component: CarsList,
})
