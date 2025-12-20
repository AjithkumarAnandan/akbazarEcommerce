
import { pool } from "@/libs/db";
import ensureDB from "@/utils/ensure";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await ensureDB.postgresConnect()
        await ensureDB.ensureExistDb();
        await ensureDB.ensureProductListTable();
        const existingList = await pool.query(`SELECT 
    p.*,
    COALESCE(
        JSON_AGG(img_elem) FILTER (WHERE img_elem IS NOT NULL),
        '[]'
    ) AS images
FROM akstore.productlist p
LEFT JOIN LATERAL (
    SELECT unnest(i.images) AS img_elem
    FROM akstore.productimagelist i
    WHERE i.product_id = p.id AND i.images IS NOT NULL
) i_flat ON TRUE
GROUP BY p.id;
`);

        const products = existingList.rows;
            return NextResponse.json({ data: products, message: "successfully" });
        // const productIds = products.map(p => p.product_id);
        // const response = await pool.query(`SELECT images FROM akstore.productimagelist WHERE product_id= ANY($1)`, [productIds])

        // return NextResponse.json({
        //     data: [
        //         ...products,
        //         ...response.rows
        //     ], message: "successfully "
        // })

    } catch (error) {
        return NextResponse.json({ message: (error as Error).message })
    }
}

