import { dashboardApi, productIdApi } from "@/utils/api.path";
import api from "@/utils/apiInterceptors.server";

export async function getProductsList() {
    try {
        const res = await api.get(dashboardApi);
        console.log("res, res",res)
        return await res.data;
    } catch (error) {
        console.log("Server error:", (error as Error).message);
        return [];
    }
}

export async function getSelectProduct(id: Number | string) {
    try {
        const res = await api.get(`${productIdApi}/${id}`);
        return res.data;
    } catch (error) {
        console.log("Server error:", (error as Error).message);
        return [];
    }
}