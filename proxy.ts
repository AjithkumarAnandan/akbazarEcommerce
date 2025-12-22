import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This **must** be named `middleware`
export function proxy(request: NextRequest) {
  // Example: redirect if not logged in
  const token = request.cookies.get('authToken')?.value;
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continue the request
  return NextResponse.next();
}
// Optional: configure which routes it applies to
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
