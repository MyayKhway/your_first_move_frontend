import { createFileRoute, redirect } from '@tanstack/react-router'
import AddCarForm from '@/components/dealer_interface/addCarForm'

export const Route = createFileRoute('/_dealer/add-car')({
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated()) {
      throw redirect({
        to: '/signin',
        replace: true,
        search: {
          redirect: location.href
        }
      })
    }
    if (!context.isDealer()) {
      throw redirect({
        to: '/',
        replace: true,
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: AddCarForm,
})
