import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { NavBar } from '@/components/navbar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <NavBar />
      <Outlet />
    </React.Fragment>
  )
}
