import { NavBar } from '@/components/navbar'
import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import Landing from '@/components/user_interface/landing'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/')({
  loader: async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/car/best`, {
      method: "GET",
      credentials: "include"
    })
    if (!res.ok) {
      return []
    }
    const featuredCars = await res.json()
    return { featuredCars }
  },
  component: IndexComponent,
})

function IndexComponent() {
  const { location } = useRouterState()
  const isRootPath = location.pathname === '/'
  return (
    <div>
      <NavBar />
      {isRootPath ? <Landing /> : <Outlet />}
      <Footer />
    </div>
  )
}
