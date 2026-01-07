"use server"

import api from "@/utils/apiInterceptors.server";

export const addProductProps = async (formData: any) => {
    try {
        const response = await api.post("api/addproduct", formData);
        return response.data;
    } catch (error: any) {
        console.error("Failed to add product:", error);
    }
}
// { headers: { "Content-Type": "multipart/form-data" } }
export const signUpApiProps = async ({ payload }: any) => {

    try {
        const response = await api.post("/api/auth/signup", payload)
        return response.data;
    } catch (error: any) {
        console.error("Failed to add product:", error);
    }

}
