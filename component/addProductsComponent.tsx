"use server"

import { addProductApi } from "@/utils/api.path";
import api from "@/utils/apiInterceptors.server";

export const addProductProps = async (formData: any) => {
    try {
        const response = await api.post(addProductApi, formData);
        console.log("response_ 9", response);
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
// { headers: { "Content-Type": "multipart/form-data" } }

