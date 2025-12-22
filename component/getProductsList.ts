import api from "@/utils/apiInterceptors.server";

export async function getProductsList() {
    try {
        const res = await api.get("http://localhost:3000/api/dashboard");
        return await res.data;
    } catch (error) {
        console.log("Server error:", (error as Error).message);
        return [];
    }
}

export async function getSelectProduct(id: Number | string) {
    try {
        const res = await api.get(`http://localhost:3000/api/${id}`);
        return res.data;
    } catch (error) {
        console.log("Server error:", (error as Error).message);
        return [];
    }
}