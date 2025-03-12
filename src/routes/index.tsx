import { NavBar } from '@/components/navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}
