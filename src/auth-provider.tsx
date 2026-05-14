import * as React from 'react'
import { AuthContext } from './auth'
import { authService, type AuthUser, type LoginResponse } from './services/auth.service'
import { getAccessToken, setAccessToken } from './services/token-storage'

function getTokenFromLoginResponse(response: LoginResponse) {
    return response.access_token ?? response.accessToken ?? response.token
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = React.useState<string | null>(() => getAccessToken())
    const [user, setUser] = React.useState<AuthUser | null>(null)
    const isAuthenticated = !!token

    const logout = React.useCallback(async () => {
        setAccessToken(null)
        setToken(null)
        setUser(null)
    }, [])

    const login = React.useCallback(async (email: string, password: string) => {
        const res = await authService.login(email, password)
        const nextToken = getTokenFromLoginResponse(res)

        if (!nextToken) {
            throw new Error('Login response is missing an access token')
        }

        setAccessToken(nextToken)
        setToken(nextToken)
        setUser(res.user ?? null)
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
