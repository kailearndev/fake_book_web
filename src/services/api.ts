import { getAccessToken, setAccessToken } from './token-storage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ApiOptions = RequestInit & {
	auth?: boolean;
};

export const api = async <T>(
	endpoint: string,
	options?: ApiOptions,
): Promise<T> => {
	const token = getAccessToken();

	const headers: HeadersInit = {
		...(options?.body instanceof FormData
			? {}
			: {
					"Content-Type": "application/json",
				}),

		...(options?.auth !== false && token
			? {
					Authorization: `Bearer ${token}`,
				}
			: {}),
	};

	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			...options,
			headers: {
				...headers,
				...options?.headers,
			},
		});

		// Unauthorized
		if (response.status === 401) {
			console.warn("Session expired");

			setAccessToken(null);

			window.location.href = "/login";

			throw new Error("Unauthorized");
		}

		// Other errors
		if (!response.ok) {
			const errorText = await response.text();

			throw new Error(errorText || "Something went wrong");
		}

		// Handle empty response
		if (response.status === 204) {
			return null as T;
		}

		return await response.json();
	} catch (error) {
		console.error("API Error:", error);

		throw error;
	}
};
