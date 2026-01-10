import { pool } from "@/utils/db";
import ensureDB from "@/utils/ensure";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const formData = await req.json();
    const {name, actual_price, discount_price, rating, review_customer_count, favorite, discount, category, best_seller, description,image} =formData

    //  const name = formData.get("name");
    // const actual_price = formData.get("actual_price");
    // const discount_price = formData.get("discount_price");
    // const rating = formData.get("rating");
    // const review_customer_count = formData.get("review_customer_count") ?? 0;
    // const favorite = formData.get("favorite");
    // const discount = formData.get("discount_percentage");
    // const category = formData.get("category");
    // const best_seller = formData.get("best_seller");
    // const description = formData.get("description");
    // const image = formData.getAll("image[]") ?? [];
     try {
        await ensureDB.postgresConnect()
        await ensureDB.ensureExistDb();
        await ensureDB.ensureProductListTable();
        await ensureDB.ensureProductImages();
        //  await pool.query( `ALTER TABLE akstore.productlist ADD COLUMN description TEXT;`)
        // 1️⃣ Insert product and get its ID
        const productResult = await pool.query(`INSERT INTO akstore.productlist ( name, actual_price, discount_price, rating, review_customer_count, favorite, discount, category,  best_seller, description ) 
        VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [name, actual_price, discount_price, rating, review_customer_count, favorite, discount, category, best_seller, description]);
        const product_id = productResult.rows[0].id;
        // 2️⃣ Insert images
        const images = await pool.query(
            `INSERT INTO akstore.productimagelist (product_id, name, images) 
            VALUES ($1, $2, $3) RETURNING *`,
            [product_id, name, image]
        );
        if (true) {
        const res = await pool.query(`SELECT * FROM akstore.productlist`)
        return NextResponse.json({
            data: {               
                ...productResult.rows[0],
                ...images.rows[0]
            }, message: "successfully created"
        });
        }
        // return NextResponse.json({data:image,  message: "successfully fetch" })
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message, })
    }
}

