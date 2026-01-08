"use server"
import { authSignupApi } from "@/utils/api.path";
import api from "@/utils/apiInterceptors.server";

export const signUpApiProps = async (formData: any) => {
    try {
        const response = await api.post(authSignupApi, formData)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // const status = error.response.status;
            const message = error.response.data?.message || error.message || "Unknown error";
            // Throw a custom error object
            throw message;
        }
        throw error
    }
}