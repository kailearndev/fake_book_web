import { createFileRoute, redirect, useRouter, useRouterState } from '@tanstack/react-router'
import { z } from 'zod'
import { useAuth } from '../auth'
import React from 'react'
import { Code } from 'lucide-react'
import { authService } from '../services/auth.service'
const fallback = '/' as const

export const Route = createFileRoute('/register')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: RouteComponent,
})
function RouteComponent() {
  const auth = useAuth()
  const router = useRouter()
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  const navigate = Route.useNavigate()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const search = Route.useSearch()

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setIsSubmitting(true)
    try {
      const data = new FormData(evt.currentTarget)
      const emailField = data.get('email')

      if (!emailField) return
      const email = emailField.toString()
      const password = data.get('password')?.toString() ?? ''
      const name = data.get('name')?.toString() ?? ''

      await authService.register(email, password, name)

      await router.invalidate()
      await navigate({ to: search.redirect || fallback })
    } catch (error) {
      console.error('Error registering: ', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoggingIn = isLoading || isSubmitting

  return (
    <div className="flex justify-center items-center h-screen flex-col mx-auto p-4  ">
      <div className='bg-white/20  p-20 shadow-hard '>
        <h3 className="text-xl">
          Đăng ký để tiếp tục
        </h3>
        {search.redirect ? (
          <p className="text-red-500">
            tiếp tục thì phải đăng ký <Code>{search.redirect}</Code>
          </p>
        ) : (
          <p>Đăng ký để xem tất cả nội dung thú vị ở đây.</p>
        )}
        <form onSubmit={onFormSubmit}>
          <fieldset disabled={isLoggingIn} className="w-full grid gap-2">
            <div className="grid gap-2 items-center min-w-75">
              <label htmlFor="email-input" className="text-sm font-medium">
                Meo
              </label>
              <input
                id="email-input"
                name="email"
                placeholder="Nhập meo của bạn"
                type="email"
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            <div className="grid gap-2 items-center min-w-75">
              <label htmlFor="password-input" className="text-sm font-medium">
                Mật khẩu
              </label>
              <input
                id="password-input"
                name="password"
                placeholder="Nhập mật khẩu của bạn"
                type="password"
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            <div className="grid gap-2 items-center min-w-75">
              <label htmlFor="name-input" className="text-sm font-medium">
                Tên hiển thị
              </label>
              <input
                id="name-input"
                name="name"
                placeholder="Nhập tên hiển thị của bạn"
                type="text"
                className="border rounded-md p-2 w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isLoggingIn ? 'Loading...' : 'Đăng ký'}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
