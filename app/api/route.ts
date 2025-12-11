
import { pool, postgresConnect } from "@/utils/db";
import { ensureExistDb, ensureProductListTable } from "@/utils/ensure";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await postgresConnect()
        await ensureExistDb();
        await ensureProductListTable();
        const existingList = await pool.query(`SELECT * FROM akstore.productlist`)

        if (existingList.rows.length > 0) {
            return NextResponse.json({ data: existingList.rows, message: "successfully " })
        } else {
            return NextResponse.json({ data: [], message: "successfully " })
        }
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message })
    }
}

