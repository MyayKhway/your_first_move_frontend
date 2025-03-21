import { createFileRoute } from '@tanstack/react-router'
import ResetPassDealer from '@/components/resetPassDealer'
import { z } from 'zod'

const resetPassSchema = z.object({
  token: z.string().length(64)
})

export const Route = createFileRoute('/_auth/resetpass-dealer')({
  validateSearch: resetPassSchema,
  component: ResetPassDealer,
})
