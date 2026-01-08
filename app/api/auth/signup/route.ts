import { NextResponse } from "next/server";
import { pool } from "@/utils/db";
import ensureDB from "@/utils/ensure";

export const POST = async (req: Request) => {
  const { username, password, email, phone, role = 'user' } = await req.json();
  try {
    await ensureDB.postgresConnect()
    await ensureDB.ensureExistDb();
    await ensureDB.ensureUserListTable()

    if(!username){
      return Response.json({ message: "Username is required" }, { status: 400 });
    }
    const existingUser = await pool.query(
      "SELECT username FROM akstore.userlist WHERE username= $1 ",
      [username]
    );
    if ((existingUser.rowCount ?? 0) > 0) {
      return Response.json({data:existingUser, message: "User already exists" }, { status: 400 });
    }
    const newUser = await pool.query(
      "INSERT INTO akstore.userlist (username, password, email, phone, role) VALUES ($1, $2, $3, $4, $5)",
      [username, password, email, phone, role]
    );
    if (newUser.rowCount === 0) {
      return Response.json({ message: "User creation failed" }, { status: 400 });
    }
    return Response.json({ message: "User created successful" });
  } catch (error) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
