import { NavBar } from '@/components/navbar'
import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import Landing from '@/components/user_interface/landing'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const { location } = useRouterState()
  const isRootPath = location.pathname === '/'
  return (
    <div>
      <NavBar />
      {isRootPath ? <Landing /> : <Outlet />}
    </div>
  )
}
