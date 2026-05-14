import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthContext } from '../auth'

const RootLayout = () => (
    <>
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRouteWithContext<{ auth: AuthContext }>()({
    component: RootLayout,
})
