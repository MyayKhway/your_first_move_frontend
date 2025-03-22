import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { AuthProvider, useAuth } from './authContext.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen.ts'

const router = createRouter({
  routeTree,
  context: {
    user: null,
    login: () => { return },
    logout: () => { return },
    isAuthenticated: () => false,
    isUser: () => false,
    isDealer: () => false,
  }
})
const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  const auth = useAuth()
  return (
    <RouterProvider router={router} context={auth} />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
