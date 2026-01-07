import api from "./apiInterceptors.server"

export const refreshTokenApi = async () => {
    try {
        const response = await api.post("api/auth/refresh")
        return response.data
    } catch (error) {
        console.error("Failed to add product:", error);
    }
}