'use client';
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { authLogout, loginPath } from "@/utils/api.path";

export default function LogoutPage() {
  const router = useRouter();

  useLayoutEffect(() => {
    const logout = async () => {
      try {
        await fetch(authLogout, {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });
        router.replace(loginPath);
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logout();
  }, [router]);

  return null;
}
