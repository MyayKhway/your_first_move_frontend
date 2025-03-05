import { createFileRoute } from '@tanstack/react-router'
import SignInForm from '@/components/ui/loginComponent'

export const Route = createFileRoute('/signin')({
  component: SignInForm,
})
