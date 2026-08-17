import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="bg-neutral-100">
        <Toaster />
        <Outlet />
      </div>
    </React.Fragment>
  )
}
