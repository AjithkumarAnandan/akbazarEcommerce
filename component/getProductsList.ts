import axios from "axios";

export async function getProductsList() {
    try {
        const res = await axios.get("http://localhost:3000/api");
        return res.data;
    } catch (error) {
        console.log("Server error:", (error as Error).message);
        return [];
    }
}

export async function getSelectProduct(id: Number | string) {
    try {
        const res = await axios.get(`http://localhost:3000/api/${id}`);
        return res.data;
    } catch (error) {
        console.log("Server error:", (error as Error).message);
        return [];
    }
}