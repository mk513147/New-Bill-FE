import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: {
		id: string;
		name: string;
		email: string;
	};
	token: string;
}

export const loginUserAPI = async (credentials: LoginCredentials) => {
	return axios.post<LoginResponse>(`${API_URL}/auth/login`, credentials);
};

export const logoutUserAPI = async () => {
	return axios.post(`${API_URL}/auth/logout`);
};
