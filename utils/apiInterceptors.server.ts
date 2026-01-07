import axios from "axios";
import { cookies } from "next/headers";
import { refreshTokenApi } from "./refresh";
import { redirect } from "next/navigation";

const api = axios.create({
  baseURL: process.env.ENVHOSTSITE ?? 'http://localhost:3000/',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    redirect("/login");
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    error.config._retry = true;
    if (error.response?.status === 401) {
      // Handle unauthorized server-side (maybe throw an error)
      const cookieStore = await cookies();
      const refreshToken = cookieStore.get("refreshToken")?.value as string;
      if (refreshToken) {
        refreshTokenApi()
      } else {
        redirect("/login");
      }
      console.log("No auth token found incookies");
      redirect("/login");
    }
    throw new Error("Unauthorized");
  }
);

export default api;
