import { createFileRoute } from '@tanstack/react-router'
import AddCarForm from '@/components/dealer_interface/addCarForm'

export const Route = createFileRoute('/_dealer/add-car')({
  component: AddCarForm,
})
