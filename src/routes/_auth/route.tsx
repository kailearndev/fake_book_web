import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Layout from '../../components/Layout'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>)
}

