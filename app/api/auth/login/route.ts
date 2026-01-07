"use server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { serialize } from "cookie";
import { cookies } from "next/headers";
import { pool } from "@/utils/db";
import ensureDB from "@/utils/ensure";

const SECRET = process.env.JWT_SECRET ?? "supersecret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "supersecretrefresh";

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
    const cookieStore = await cookies();
    
    // Sign JWT
    const token = jwt.sign({ username, role,type: "access" }, SECRET, { expiresIn: "15m" });

    // Set JWT as HttpOnly cookie
    cookieStore.set({
      name: "authToken",
      value: token,
      secure: false, // ✅ FIX
      httpOnly: false,
      maxAge: 60 * 15, // 15 minutes
      path: "/",
      sameSite: "lax", // ✅ safer default than "strict"
    });


    // Refresh token
    const refreshToken = jwt.sign({ username, type: "refresh" }, REFRESH_SECRET, { expiresIn: "7d" }
    );
    // Set JWT as HttpOnly refresh token cookie

    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
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
