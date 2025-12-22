import axios from "axios";

const api = axios.create();

api.interceptors.request.use((config) => {
if (typeof window !== "undefined") {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
