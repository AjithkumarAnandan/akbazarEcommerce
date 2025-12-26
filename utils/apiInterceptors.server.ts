import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create();

api.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }else{
    console.log("No auth token found in cookies");    
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized server-side (maybe throw an error)
      throw new Error("Unauthorized");
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
