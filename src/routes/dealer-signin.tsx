import { createFileRoute } from '@tanstack/react-router'
import DealerSignIn from '@/components/dealerSignIn'

export const Route = createFileRoute('/dealer-signin')({
  component: DealerSignIn,
})
