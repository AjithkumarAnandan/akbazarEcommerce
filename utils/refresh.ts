import { authRefreshApi } from "./api.path";
import api from "./apiInterceptors.server"

export const refreshTokenApi = async () => {
    try {
        const response = await api.post(authRefreshApi)
        return response.data
    } catch (error) {
        console.error("Failed to add product:", error);
    }
}