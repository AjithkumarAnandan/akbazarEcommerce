import { pool } from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

interface RefreshTokenPayload extends JwtPayload {
  username: string;
}

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let payload: RefreshTokenPayload;

  try {
    payload = jwt.verify(
      refreshToken,
      REFRESH_SECRET
    ) as RefreshTokenPayload;
  } catch {
    return new NextResponse("Invalid refresh token", { status: 403 });
  }

  const result = await pool.query(
    `SELECT username, role FROM akstore.userlist
   WHERE username = $1 AND is_active = true`,
    [payload.username]
  );

  if (result.rowCount === 0) {
    throw new Error("User not found or inactive");
  }
  const { username, role } = result.rows[0];


  const newAccessToken = jwt.sign(
    { username: username, role: role },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  cookieStore.set({
    name: "authToken",
    value: newAccessToken,
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 15,
    path: "/",
  });

  return NextResponse.json({ success: true });
}

