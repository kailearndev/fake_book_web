import { createFileRoute } from '@tanstack/react-router'
import CreatePost from '../../pages/CreatePost'

export const Route = createFileRoute('/_auth/_auth/create-post')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreatePost />
}
