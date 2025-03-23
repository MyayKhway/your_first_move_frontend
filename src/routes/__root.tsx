import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { AuthContextType } from '@/authContext'


export const Route = createRootRouteWithContext<AuthContextType>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
