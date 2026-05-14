import { api } from "./api";

export interface AuthUser {
	id?: string | number;
	email?: string;
	name?: string;
}

export interface LoginResponse {
	access_token?: string;
	accessToken?: string;
	token?: string;
	user?: AuthUser;
}

const login = async (email: string, password: string) => {
	const res = await api<LoginResponse>("/auth/login", {
		method: "POST",
		auth: false,
		body: JSON.stringify({ email, password }),
	});
	return res;
};

const register = async (email: string, password: string, name?: string) => {
	const res = await api<LoginResponse>("/auth/register", {
		method: "POST",
		auth: false,
		body: JSON.stringify({ email, password, name }),
	});
	return res;
};

const getMe = async () => {
	const res = await api<AuthUser>("/auth/profile", {
		method: "GET",
	});
	return res;
};
export const authService = {
	login,
	register,
	getMe,
};
