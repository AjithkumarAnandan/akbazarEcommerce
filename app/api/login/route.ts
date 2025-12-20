import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

export const POST = async (req: Request) => {
  try {
    // const body = await req.json();
    // const { email, password } = body;

    // TODO: Replace this with real user validation
    // if (email !== "test@example.com" || password !== "123456") {
    //   return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    // }

    // Create JWT payload
    // const payload = { email, role: "user" };
    const payload = {  role: "user" };

    // Sign token
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    // Set token as HttpOnly cookie
    let response = NextResponse.json({ message: "Login successful" });
    response.cookies.set({
      name: "authToken",
      value: token,
      httpOnly: true,       // 🔒 HttpOnly
      secure: true,
    //   process.env.NODE_ENV === "production", // only send over HTTPS in prod
      maxAge: 60 * 60,      // 1 hour
      path: "/",            // cookie valid for entire site
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
