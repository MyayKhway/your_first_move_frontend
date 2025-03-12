import { createFileRoute } from '@tanstack/react-router'
import SignInForm from '@/components/signinComponent'

export const Route = createFileRoute('/_auth/signin')({
  component: SignInForm,
})
