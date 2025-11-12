import axios from "axios";

export const API = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,

	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

export const authAPI = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,

	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		withCredentials: true,
	},
});

export const profileAPI = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
