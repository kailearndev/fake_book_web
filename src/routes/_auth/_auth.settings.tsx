import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_auth/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/_auth/setting"!</div>
}
