import * as React from 'react'
import type { AuthUser } from './services/auth.service'


export interface AuthContext {
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    token: string | null
    user: AuthUser | null
}

export const AuthContext = React.createContext<AuthContext | null>(null)

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
