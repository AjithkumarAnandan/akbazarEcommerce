import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";

const allowedOrigins = ["http://localhost:3000"];
const ACCESS_SECRET = process.env.JWT_SECRET ?? "supersecret";

// This **must** be named `middleware`
export function proxy(request: NextRequest) {
  // Example: redirect if not logged in
  const token: string | null = request.cookies.get('authToken')?.value ?? null;
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // ✅ Verify access token
    jwt.verify(token ?? "", ACCESS_SECRET);

    const res = NextResponse.next();

    const origin = request.headers.get("origin");
    if (origin && allowedOrigins.includes(origin)) {
      res.headers.set("Access-Control-Allow-Origin", origin);
    }
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res
  } catch (err) {
    // ❌ Expired / invalid access token
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
// Optional: configure which routes it applies to
export const config = {
  matcher: ['/dashboard/:path*'],
};
