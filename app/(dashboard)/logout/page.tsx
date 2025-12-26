'use client';
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/api/logout", {
          method: "GET",
          credentials: "include",
        });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logout();
  }, [router]);

  return redirect("/login"); 
}
