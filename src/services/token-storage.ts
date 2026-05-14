export const TOKEN_KEY = 'access_token'

export function getAccessToken() {
	return localStorage.getItem(TOKEN_KEY)
}

export function setAccessToken(token: string | null) {
	if (token) {
		localStorage.setItem(TOKEN_KEY, token)
		return
	}

	localStorage.removeItem(TOKEN_KEY)
}
