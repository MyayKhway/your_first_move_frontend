import { createFileRoute } from '@tanstack/react-router'
import ResetPass from '@/components/resetPass'
import { z } from 'zod'

const resetPassSchema = z.object({
  token: z.string().length(64)
})

export const Route = createFileRoute('/_auth/resetpass')({
  validateSearch: resetPassSchema,
  component: ResetPass,
})
