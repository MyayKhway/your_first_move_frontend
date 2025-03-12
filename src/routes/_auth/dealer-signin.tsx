import { createFileRoute } from '@tanstack/react-router'
import DealerSignIn from '@/components/dealerSignIn'

export const Route = createFileRoute('/_auth/dealer-signin')({
  component: DealerSignIn,
})
