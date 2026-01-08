import { pool } from "@/utils/db";
import ensureDB from "@/utils/ensure";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const paramsId = await params;
        const id = Number(paramsId.id)
        await ensureDB.postgresConnect()
        await ensureDB.ensureExistDb();
        await ensureDB.ensureProductListTable();
        await ensureDB.ensureProductImages();

        const existingData = await pool.query(`SELECT p.*, COALESCE(JSON_AGG(img_element) FILTER (WHERE img_element IS NOT NULL),'[]'
        ) AS images 
        FROM akstore.productlist p 
        LEFT JOIN LATERAL (
        SELECT unnest(i.images) AS img_element FROM akstore.productimagelist i 
        WHERE i.product_id = p.id 
        AND i.images IS NOT NULL) i_flat ON TRUE 
        WHERE p.id=$1
        GROUP BY p.id`, [id]);
        return NextResponse.json({ data: existingData.rows ? existingData.rows : [], message: "Data fetch successfully " })
    } catch (error) {
        return NextResponse.json({ data: [], error: (error as Error).message })
    }
}