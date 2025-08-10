import { getAuthToken, useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { PATHS } from "./paths";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.data?.auth;

    // handle expired token
    if (status === 403 || message === "jwt expired") {
      // Contoh: logout user, redirect ke login, dll
      console.warn("Token expired. Redirecting to login...");

      useAuthStore.getState().logout();
      window.location.href = PATHS.auth.login;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
