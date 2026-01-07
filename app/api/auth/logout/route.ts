"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ NO await
    // cookieStore.delete({
    //   name: "authToken",
    //   path: "/",
    // });
    cookieStore.delete("authToken");
    // cookieStore.delete("refreshToken");

    return NextResponse.json(
      { status: 200, success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
