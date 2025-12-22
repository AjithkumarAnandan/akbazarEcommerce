import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { serialize } from "cookie";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET ?? "supersecret";

export const POST = async (req: Request) => {
  try {
    const payload = { role: "user" };

    // Sign JWT
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    const cookieStore = await cookies();
    // Set JWT as HttpOnly cookie
    cookieStore.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // ✅ FIX
      secure: true,
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
