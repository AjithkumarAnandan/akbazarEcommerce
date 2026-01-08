import { redirect } from "next/navigation";
import { dashboardPath } from "@/utils/api.path";

export default function Home() {
  redirect(dashboardPath);
}
