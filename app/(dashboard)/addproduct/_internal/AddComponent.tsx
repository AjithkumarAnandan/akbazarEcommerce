"use client"
// react-form-hook is client side and also server side validation is not posible that means cannot possible throw error in front end
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileToBinaryArray } from "@/libs/fileToBinaryArray";
import { addProductProps } from "@/component/addProductsComponent";
import { productSchema } from "./zodValidationAddProduct";
import React, { useState } from "react";

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
    description: string;
}

function AddProductForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<any>({ resolver: zodResolver(productSchema) });
    const [files, setFiles] = useState<File[]>([]);

    const onSubmit: SubmitHandler<ProductFormValues> = async (values) => {
        try {
            const validatedData = productSchema.safeParse(values);
            if (!validatedData.success) {
                console.error(validatedData.error.flatten());
                return;
            }
            // Calculate discount price
            const actualPrice = values.actual_price ?? 0;
            const discountPercentage = Number(values.discount_percentage ?? 0);
            const discount_price = actualPrice * ((100 - discountPercentage) / 100);
            //Images array
            const image: string[] = [];
            for (const file of files) {
                const byteArray = await fileToBinaryArray(file);
                image.push(byteArray as string);
            }
            const formData = { ...values, image, discount_price, discount: discountPercentage };
            const res = await addProductProps(formData);
            // console.log("res", res);
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
        "description"
    ];

    const mandotoryField = ["name", "actual_price", "rating", "review_customer_count", "category",]

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files; // FileList | null
        if (!files) return;
        setFiles(Array.from(files));
    };
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
                {/* <input multiple type="file" {...register('image')} /> */}
                <input type="file" multiple onChange={handleFileChange} />
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


export default React.memo(AddProductForm)