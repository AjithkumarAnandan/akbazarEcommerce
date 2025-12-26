import { NextResponse } from "next/server";
import { pool } from "@/utils/db";
import ensureDB from "@/utils/ensure";

export const POST = async (req: Request) => {
  const { username, password, email, phone, role = 'user' } = await req.json();

  try {
    // const payload = { role: "user", username, password };
    await ensureDB.ensureUserListTable()

    if(!username || !password || !email || !phone){
      return NextResponse.json({ message: "Email, username, password and phone are required" }, { status: 400 });
    }
    const existingUser = await pool.query(
      "SELECT * FROM akstore.userlist WHERE email = $1 OR phone = $2 ",
      [email, phone]
    );
    if (existingUser?.rowCount ?? 0 > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    const newUser = await pool.query(
      "INSERT INTO akstore.userlist (username, password, email, phone, role) VALUES ($1, $2, $3, $4, $5)",
      [username, password, email, phone, role]
    );
    if (newUser.rowCount === 0) {
      return NextResponse.json({ message: "User creation failed" }, { status: 400 });
    }
    return NextResponse.json({ message: "User created successful" });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
