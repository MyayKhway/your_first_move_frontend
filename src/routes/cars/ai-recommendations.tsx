import { createFileRoute } from '@tanstack/react-router'
import CarRecommendations from '@/components/user_interface/AIrecommendations'

export const Route = createFileRoute('/cars/ai-recommendations')({
  component: CarRecommendations,
})
