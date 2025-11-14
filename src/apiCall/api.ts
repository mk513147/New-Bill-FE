import axios from "axios";

export const API = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,

	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			console.error("Unauthorized access - redirecting to login.");
		}
		if (!error.response) {
			console.log("Network error detected. Navigating to offline page...");
		}

		return Promise.reject(error);
	}
);
