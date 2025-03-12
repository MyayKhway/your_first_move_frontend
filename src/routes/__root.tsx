import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  console.log('root rendered')
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
