import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  actual_price: z.coerce
    .number()
    .positive("Actual price must be greater than 0"),
  // discount_price: z.coerce
  //   .number()
  //   .positive("Discount price cannot be negative"),
  rating: z.coerce
    .number()
    .min(1, "Rating cannot be less than 1")
    .max(5, "Rating cannot be more than 5"),
  // review_customer_count: z.coerce
  //   .number()
  //   .positive("Review count cannot be negative").optional(),
  discount_percentage: z.coerce
    .number()
    // .min(0, "Discount cannot be less than 0")
    .max(100, "Discount cannot be more than 100").optional(),
  category: z.string().min(1, "Category is required"),
//  image: z.instanceof(File, { message: "Image is required" }).optional(), // File input
  favorite: z.boolean().optional(),
  best_seller: z.boolean().optional(),
});
