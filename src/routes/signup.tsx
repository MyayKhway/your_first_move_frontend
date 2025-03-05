import { createFileRoute } from '@tanstack/react-router'
import SignUpForm from '@/components/ui/signupComponent'

export const Route = createFileRoute('/signup')({
  component: SignUpForm,
})
