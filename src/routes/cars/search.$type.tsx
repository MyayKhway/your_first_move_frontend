import { createFileRoute } from '@tanstack/react-router'
import CarSearchResults from '@/components/user_interface/carSearchResults'

export const Route = createFileRoute('/cars/search/$type')({
  component: CarSearchResults,
})
