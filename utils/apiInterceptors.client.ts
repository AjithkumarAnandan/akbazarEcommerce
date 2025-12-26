import axios from "axios";
import { redirect } from "next/navigation";

const api = axios.create({
  baseURL: process.env.ENVHOSTSITE??'http://localhost:3000/',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("authToken="))
      ?.split("=")[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }else{
      delete config.headers.Authorization;
      redirect('/logout');
    }
    return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
        if (
      typeof window !== "undefined" &&
      error.response?.status === 401
    ) {
      try {
        await api.post("/api/logout");
      } catch {
        
      }
      // Clear auth cookie (adjust path/domain if needed)
      document.cookie =
        "authToken=; Max-Age=0; path=/";

      // Redirect to login
      window.location.replace("/login");
    }

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject({
      ...error,
      message,
    });
  }
);



export default api;
