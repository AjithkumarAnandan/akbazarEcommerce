"use client"
// react-form-hook is client side and also server side vbalidation is not posible that means cannot possible throw error in front end
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { productSchema } from "./_internal/zodValidationAddProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileToBinaryArray } from "@/utils/fileToBinaryArray";

interface ProductFormValues {
    name: string;
    actual_price: number;
    // discount_price: number;
    rating: number;
    // review_customer_count: number;
    discount_percentage: number;
    category: string;
    favorite?: boolean;
    best_seller?: boolean;
    image: FileList | null;
}

export default function ProductForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<any>({ resolver: zodResolver(productSchema) });

    const onSubmit: SubmitHandler<ProductFormValues> = async (formData) => {
        try {
            const files = watch("image");
            const image = [];
            for (const file of files) {
                const byteArray = await fileToBinaryArray(file);
                image.push(byteArray);
            }
            const validatedData = productSchema.parse(formData);
            const discount_price = (formData.actual_price ?? 0) * ((100 - Number(formData.discount_percentage ?? 0)) / 100);
            // You can now send formData to your API
            const res = await axios.post("/api/addproduct", { ...formData, discount_price, image }, { headers: { "Content-Type": "multipart/form-data" } });
            console.log(res);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    }

    const fields: Array<keyof Omit<ProductFormValues, "favorite" | "best_seller" | "image">> = [
        "name",
        "actual_price",
        // "discount_price",
        "rating",
        // "review_customer_count",
        "discount_percentage",
        "category",
    ];

    const mandotoryField = ["name", "actual_price", "rating", "review_customer_count", "category",]

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 bg-white rounded-xl shadow-lg space-y-4 w-92"       >
            <h1 className="font-bold text-[2rem] flex justify-center">Add Product Form</h1>
            {fields.map((field) => (
                <div key={field}>
                    <label className="block font-semibold capitalize mb-1">
                        {field.replace("_", " ").replace("_", " ")}{mandotoryField.includes(field) ? <span className="text-red-700">*</span> : ""}
                    </label>
                    <input
                        {...register(field)}
                        type={["actual_price", "rating", "review_customer_count", "discount"].includes(field) ? "number" : "text"}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors?.[field]?.message && <p className="text-red-500">{(errors[field].message as string)}</p>}
                </div>
            ))}

            {/* File Input */}
            <div className="bg-white rounded-xl shadow-lg space-y-4">
                <label className="block font-semibold capitalize mb-1">Image</label>
                <input multiple type="file" {...register('image')} />
                {/* <input type="file" accept="image/*" name="image" className="w-full p-2 border rounded-lg" /> */}
            </div>

            <div className="flex gap-2 items-center">
                <label>Favorite</label>
                <input type="checkbox" {...register("favorite")} />
            </div>

            <div className="flex gap-2 items-center">
                <label>Best Seller</label>
                <input type="checkbox" {...register("best_seller")} />
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
                Add Product
            </button>
        </form>
    );
}
