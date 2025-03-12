import { createFileRoute } from '@tanstack/react-router'
import ForgotPassword from '@/components/forgotPass'

export const Route = createFileRoute('/_auth/forgotpass-dealer')({
  component: ForgotPassword,
})
