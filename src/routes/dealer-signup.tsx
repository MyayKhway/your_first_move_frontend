import { createFileRoute } from '@tanstack/react-router'
import DealerSignUp from '@/components/dealerSignup'

export const Route = createFileRoute('/dealer-signup')({
  component: DealerSignUp,
})
