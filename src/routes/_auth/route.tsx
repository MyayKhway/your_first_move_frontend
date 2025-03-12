import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AuthNavBar } from '@/components/authNav'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

export function AuthLayout() {
  console.log('auth index rendered')
  return (
    <div>
      <AuthNavBar />
      <Outlet />
    </div>
  )
}

