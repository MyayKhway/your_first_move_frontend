import { createFileRoute } from '@tanstack/react-router'
import DealerSignUp from '@/components/dealerSignup'

export const Route = createFileRoute('/_auth/dealer-signup')({
  component: DealerSignUp,
})
