import { createFileRoute } from '@tanstack/react-router'
import ResetPass from '@/components/resetPass'

export const Route = createFileRoute('/_auth/resetpass')({
  component: ResetPass,
})
