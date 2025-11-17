import { resetProfile } from "@/Redux/Slices/profileSlice";
import { store } from "@/Redux/store";

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
    const status = error?.response?.status;
    const currentPath = window.location.pathname;

    if (currentPath === "/login") {
      return Promise.reject(error);
    }

    if (status === 401) {
      console.log("⛔ Unauthorized — clearing session");

      localStorage.clear();
      sessionStorage.clear();

      store.dispatch(resetProfile());

      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (!error.response) {
      console.error("Network error — offline?");
    }

    return Promise.reject(error);
  }
);
