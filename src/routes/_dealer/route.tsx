import { createFileRoute, Outlet } from '@tanstack/react-router'
import { DealerNavBar } from '@/components/dealerNav'
import { Toaster } from 'sonner'

export const Route = createFileRoute('/_dealer')({
  component: DealerLayout,
})

export function DealerLayout() {
  return (
    <div>
      <DealerNavBar />
      <Toaster />
      <Outlet />
    </div>
  )
}

