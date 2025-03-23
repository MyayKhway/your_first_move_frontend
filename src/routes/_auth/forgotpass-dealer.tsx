import ForgotPasswordDealer from '@/components/forgotPassDealer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/forgotpass-dealer')({
  component: ForgotPasswordDealer,
})
