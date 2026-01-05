"use server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { serialize } from "cookie";
import { cookies } from "next/headers";
import { pool } from "@/utils/db";
import ensureDB from "@/utils/ensure";

const SECRET = process.env.JWT_SECRET ?? "supersecret";

export const POST = async (req: Request) => {
  const { username, password } = await req.json();

  try {
    await ensureDB.ensureUserListTable()
    const existingUser = await pool.query(
      "SELECT * FROM akstore.userlist WHERE phone = $1 OR email = $1",
      [username])

      const user = existingUser.rows[0];
      if (!user || user.password !== password) {
        return NextResponse.json({ message: "Invalid username or password" }, { status: 404 });
      }
      const { role } = user;
      
    // Sign JWT
    const token = jwt.sign({ username, password ,role}, SECRET, { expiresIn: "1h" });
    const cookieStore = await cookies();
    // Set JWT as HttpOnly cookie
    cookieStore.set({
      name: "authToken",
      value: token,
      secure: true, // ✅ FIX
      httpOnly: true,      
      maxAge: 60 * 60, // 1 hour
      path: "/",
      sameSite: "lax", // ✅ safer default than "strict"
    });
 
    // serialize("authToken", token, {
    //   httpOnly: true,       // JS cannot access this cookie
    //   secure: true,
    //   sameSite: "strict",
    //   maxAge: 60 * 60 * 24, // 1 day
    //   path: "/",
    // })

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
