'use client';
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useLayoutEffect(() => {
    const logout = async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });
        router.replace("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logout();
  }, [router]);

  return null;
}
