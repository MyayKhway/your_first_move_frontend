import ToS from '@/components/tos'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tos')({
  component: ToS,
})
