import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AuthNavBar } from '@/components/authNav'
import { Toaster } from 'sonner'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

export function AuthLayout() {
  return (
    <div>
      <AuthNavBar />
      <Toaster />
      <Outlet />
    </div>
  )
}

