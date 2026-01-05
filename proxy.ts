import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = ["http://localhost:3000"];

// This **must** be named `middleware`
export function proxy(request: NextRequest) {
  // Example: redirect if not logged in
  const token = request.cookies.get('authToken')?.value;
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const origin = request.headers.get("origin");
  const res = NextResponse.next();
  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }

  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res
}
// Optional: configure which routes it applies to
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
