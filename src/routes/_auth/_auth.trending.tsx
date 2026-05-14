import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_auth/trending')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about"!</div>
}
